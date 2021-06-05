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
        '서울':{color:'#53CFDA', center: [37.47,     127],      geojson:'seoul.geo.json',},
        '부산':{color:'#89903A', center: [35.2,   129.13],      geojson:'busan.geo.json',},
        '대구':{color:'#FF7994', center: [35.79,  128.58],      geojson:'daegu.geo.json',},
        '인천':{color:'#FF8860', center: [37.469, 126.57],      geojson:'incheon.geo.json',},
        '광주':{color:'#90D635', center: [35.126, 126.83],      geojson:'gwangju.geo.json',},
        '대전':{color:'#26E119', center: [36.32,  127.37],      geojson:'daejeon.geo.json',},
        '울산':{color:'#F9C002', center: [35.52,  129.24],      geojson:'ulsan.geo.json',},
        '세종':{color:'#9F995F', center: [36.5,    127.4],      geojson:'sejong.geo.json',},
        '경기':{color:'#FF3747', center: [37.567, 127.19],      geojson:'gyeonggi.geo.json',},
        '강원':{color:'#FF29FF', center: [37.755,  128.2],      geojson:'gangwon.geo.json',},
        '충북':{color:'#C0413B', center: [36.63,  127.92],      geojson:'chungbuk.geo.json',},
        '충남':{color:'#D77B5F', center: [36.557, 126.78],      geojson:'chungnam.geo.json',},
        '전북':{color:'#5064F2', center: [35.716,127.144],      geojson:'jeonbuk.geo.json',},
        '전남':{color:'#8CB5B5', center: [34.82,  126.89],      geojson:'jeonnam.geo.json',},
        '경북':{color:'#6C69DD', center: [36.248, 128.66],      geojson:'kyeongbuk.geo.json',},
        '경남':{color:'#BC7576', center: [35.259,128.564],      geojson:'kyeongnam.geo.json',},
        '제주':{color:'#696B7E', center: [33.36,  126.54],      geojson:'jeju.geo.json',}
    },
    filterData:[],
    theaterData: [],
    allData:[
      {name:'서울', center: [37.47,     127], img: '/chart/seoul.png'},
      {name:'부산', center: [34.96,   129.13],img: '/chart/busan.png'},
      {name:'대구', center: [35.79,  128.58], img: '/chart/daegu.png'},
      {name:'인천', center: [37.069, 126.1], img: '/chart/incheon.png'},
      {name:'광주', center: [35.126, 126.83], img: '/chart/gwangju.png'},
      {name:'대전', center: [36.02,  127.77], img: '/chart/daejeon.png'},
      {name:'울산', center: [35.56,  129.34], img: '/chart/ulsan.png'},
      {name:'세종', center: [36.5,    127.3], img: '/chart/sejong.png'},
      {name:'경기', center: [37.16, 127.4],   img: '/chart/gyeonggi.png'},
      {name:'강원', center: [37.755,  128.2], img: '/chart/gangwon.png'},
      {name:'충북', center: [36.63,  127.92], img: '/chart/chungbuk.png'},
      {name:'충남', center: [36.557, 126.48], img: '/chart/chungnam.png'},
      {name:'전북', center: [35.716,127.144], img: '/chart/jeonbuk.png'},
      {name:'전남', center: [34.52,  126.89], img: '/chart/jeonnam.png'},
      {name:'경북', center: [36.548, 128.96], img: '/chart/kyeongbuk.png'},
      {name:'경남', center: [35.259,128.564], img: '/chart/kyeongnam.png'},
      {name:'제주', center: [33.36,  126.54], img: '/chart/jeju.png'},
    ]


  },
  mutations: {},
  actions: {},
  modules: {}
});