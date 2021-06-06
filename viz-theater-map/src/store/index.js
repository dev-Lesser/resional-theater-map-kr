import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: false,
    selected: false,
    sido: '서울',
    center: [35.7, 127.9],
    minZoom: 7,
    maxZoom: 15,
    zoom: 7,
    geojson: 'seoul.geo.json',
    geojsonData: null,
    fillColor: '#53CFDA',
    analysisData: null,
    selectedSido: '서울특별시',
    statisticData: [0,0,0,0],
    chartData:{},
    chartOptions:{},
    colormap:[
      {color:'#26678F',value:'0 - 3.5km 거리'},
      {color:'#6FC7A4',value:'3.5 - 8.0km 거리'},
      {color:'#FDC771',value:'8.0 - 13.6km 거리'},
      {color:'#D53E47',value:'13.6km 이상'}
    ],
    dataList:{
      '전체':{center: [35.7, 127.9],   geojson:'all',},
        '서울':{color:'#FF995F', center: [37.47,     127],      geojson:'seoul.geo.json',},
        '부산':{color:'#FF0000', center: [35.2,   129.13],      geojson:'busan.geo.json',},
        '대구':{color:'#FF7994', center: [35.79,  128.58],      geojson:'daegu.geo.json',},
        '인천':{color:'#9964F2', center: [37.469, 126.57],      geojson:'incheon.geo.json',},
        '광주':{color:'#90D635', center: [35.126, 126.83],      geojson:'gwangju.geo.json',},
        '대전':{color:'#D601F9', center: [36.32,  127.37],      geojson:'daejeon.geo.json',},
        '울산':{color:'#F9C002', center: [35.52,  129.24],      geojson:'ulsan.geo.json',},
        '세종':{color:'#FF995F', center: [36.5,    127.4],      geojson:'sejong.geo.json',},
        '경기':{color:'#00FF00', center: [37.567, 127.19],      geojson:'gyeonggi.geo.json',},
        '강원':{color:'#FFFFFF', center: [37.755,  128.2],      geojson:'gangwon.geo.json',},
        '충북':{color:'#F0F10B', center: [36.63,  127.92],      geojson:'chungbuk.geo.json',},
        '충남':{color:'#5F000F', center: [36.557, 126.78],      geojson:'chungnam.geo.json',},
        '전북':{color:'#058899', center: [35.716,127.144],      geojson:'jeonbuk.geo.json',},
        '전남':{color:'#880F77', center: [34.82,  126.89],      geojson:'jeonnam.geo.json',},
        '경북':{color:'#F55FFF', center: [36.248, 128.66],      geojson:'kyeongbuk.geo.json',},
        '경남':{color:'#0000FF', center: [35.259,128.564],      geojson:'kyeongnam.geo.json',},
        '제주':{color:'#696B7E', center: [33.36,  126.54],      geojson:'jeju.geo.json',}
    },
    filterData:[],
    theaterData: [],
    allData:[
      {name:'서울', center: [37.47,     127], img: '/chart/seoul.png'},
      {name:'부산', center: [34.76,   129.43],img: '/chart/busan.png'},
      {name:'대구', center: [35.79,  128.58], img: '/chart/daegu.png'},
      {name:'인천', center: [37.069, 126.1], img: '/chart/incheon.png'},
      {name:'광주', center: [35.026, 126.53], img: '/chart/gwangju.png'},
      {name:'대전', center: [35.9,  127.67], img: '/chart/daejeon.png'},
      {name:'울산', center: [35.26,  129.64], img: '/chart/ulsan.png'},
      {name:'세종', center: [36.5,    127.2], img: '/chart/sejong.png'},
      {name:'경기', center: [37.16, 127.5],   img: '/chart/gyeonggi.png'},
      {name:'강원', center: [37.755,  128.2], img: '/chart/gangwon.png'},
      {name:'충북', center: [36.63,  127.92], img: '/chart/chungbuk.png'},
      {name:'충남', center: [36.157, 126.48], img: '/chart/chungnam.png'},
      {name:'전북', center: [35.416,127.144], img: '/chart/jeonbuk.png'},
      {name:'전남', center: [34.52,  126.89], img: '/chart/jeonnam.png'},
      {name:'경북', center: [36.548, 128.96], img: '/chart/kyeongbuk.png'},
      {name:'경남', center: [35.1,128.2], img: '/chart/kyeongnam.png'},
      {name:'제주', center: [33.36,  126.54], img: '/chart/jeju.png'},
    ]


  },
  mutations: {},
  actions: {},
  modules: {}
});