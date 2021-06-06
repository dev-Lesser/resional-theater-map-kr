import pandas as pd
import numpy as np
from haversine import haversine # 위경도 -> km 변환 라이브러리

# 데이터 불러오기
print("""
Load Data (address, theater)...
""")
df_address = pd.read_csv('./data/address.csv', index_col=0)
df_theater = pd.read_csv('./data/KC_497_DMSTC_MCST_THEART_2020.csv', index_col=0)

# 법정동 매칭 함수
def match_bjdong(d): 
    
    bjdong_code,hjdong_code = d['badm_cd'], d['hadm_cd']
    query = (df_address['bjdong_code']==bjdong_code) & (df_address['hjdong_cd']==hjdong_code)
    result = df_address[query]
    if len(result) ==1:
        result = result.values.tolist()[0]
        return pd.Series(tuple(result))
    else:
        query = (df_address['bjdong_code']==bjdong_code)
        result = df_address[query].values.tolist()[0]
        return pd.Series(tuple(result))

# 위경도를 이용한 유클리드 거리 함수
def euclidian_distance(d): 
    start_point = np.array((d['dong_x'],d['dong_y']))
    end_point = np.array((d['x'],d['y']))
    return np.linalg.norm(end_point - start_point)


# 동 기준 
def closest_theater(d): # 
    x,y = d['lon'],d['lat']
    result = np.sqrt((np.array([x,y])- df_theater[['x','y']].values)**2).sum(axis=1)
    sort_index = np.argsort(result)
    a = df_theater[['poi_nm','sido_nm','sgg_nm','bemd_nm','ri_nm','beonji', 'dong_y', 'dong_x']].iloc[sort_index[0]].values.tolist()
    b = result[sort_index][0]
    sido, sigungu, sigungu_split, bjdong, hjdong, lat, lon = d['sido'],d['sigungu'],d['sigungu_split'],d['bjdong'], d['hjdong'],d['lat'],d['lon']
    r = [sido, sigungu, sigungu_split, bjdong, hjdong, lat, lon] + a + [b]
    
    return pd.Series(tuple(r))

# 위경도 -> km
def distance_km(d):
    d = d[['latitude','longitude','dong_y','dong_x']].values.tolist()
    start, end = d[:2], d[2:]
    return haversine(start, end, unit = 'km')



if __name__ == "__main__":
    print("법정동을 매칭하고 있습니다...")
    df_theater[['dong_y','dong_x',
            'sido','sigungu','sigungu_split',
            'bjdong','bjdong_code','hjdong','hjdong_code']] = df_theater.apply(match_bjdong, axis=1)

    column = ['sido','sigungu','sigungu_split','bjdong','hjdong','latitude','longitude',
    'poi_name','sido_nm','sgg_nm','bemd_nm','ri_nm','beonji','dong_y','dong_x','distance']

    print("위경도 기준 가장 거리가 가까운 시설을 분석하고 있습니다...")
    df_euclid = pd.DataFrame([], columns=column)
    df_euclid[column] = df_address.apply(closest_theater, axis=1)

    print("위경도를 km 로 변환하고 있습니다.")
    df_euclid['km_distance'] = df_euclid.apply(distance_km, axis=1)
    df_euclid.sort_values(by='km_distance', ascending=False)

    print("위경도 기준 가장 거리가 가까운 시설을 분석하고 있습니다...")
    with open('./data/analysis.json', 'w', encoding='utf-8') as file:
        df_euclid[['sido','sigungu','sigungu_split','bjdong','hjdong','poi_name','sido_nm','sgg_nm','bemd_nm','ri_nm','beonji','distance','km_distance']].sort_values(by='sido').to_json(file, force_ascii=False,orient='records')


    df_theater = df_theater[['poi_nm','sido_nm','sgg_nm','bemd_nm','ri_nm','beonji','badm_cd','hadm_cd','x','y']]


    with open('./data/theater.json', 'w', encoding='utf-8') as file:
        df_theater.sort_values(by='sido_nm').to_json(file, force_ascii=False,orient='records')

    print("""
    파일 분석이 완료 되었습니다.
    data/analysis.json : 각 법정동 별 가장 가까운 영화관의 위경도 및 거리(km) 데이터
    data/theater : 2020년 영화관 poi 및 위경도 등 상세 정보
    """)
