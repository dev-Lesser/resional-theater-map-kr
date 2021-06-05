<template>
    <div>
        <v-app-bar class="tool-bar" color="blue-grey darken-3" dark height=100 >
            <v-layout>
                <v-flex xs8 sm8 md8 id="cols">
                    쏘프라이즈 시즌1 <a href="https://soprize.so/question/51">"영화 한 편 보는데도 지역별 격차?"</a> 의 프로젝트 입니다. 
                    <div class='highlight-info'>&nbsp; 아래에서 지역을 선택해주세요.</div>
                    <v-chip v-if="show & !loading" color="red darken-2" small class="highlight-info ml-5" @click="sheet = !sheet">
                        <v-icon>mdi-chart-pie</v-icon>
                        &nbsp; 분포그래프</v-chip>
                </v-flex>
                <v-flex xs10 sm10 md10 class="cols-mobile">
                    <a href="https://soprize.so/question/51">프로젝트</a> 
                    <div class='highlight-info'>&nbsp; 지역을 선택해주세요.</div>
                    <v-chip v-if="show & !loading" color="red darken-2" small class="highlight-info ml-5" @click="sheet = !sheet">
                        <v-icon>mdi-chart-pie</v-icon>
                        &nbsp; 분포그래프</v-chip>
                </v-flex>
                <v-flex xs4 sm4 md4 class="desktop-explain">
                    <v-icon class="mr-3" color="#FFFFFF">mdi-information-outline</v-icon>
                    <v-row no-gutters>
                    <v-menu v-for="i in colorInfo" :key=i.info> 
                        <template v-slot:activator="{ on: menu, attrs }">
                            <v-tooltip bottom>
                            <template v-slot:activator="{ on: tooltip }">
                                <v-col :cols="5" >
                                <img
                                v-bind:src="i.img "
                                v-bind="attrs"
                                v-on="{ ...tooltip, ...menu }"
                                height=30px
                                />
                                </v-col>
                                
                            </template>
                            <span>{{ i.info }}</span>
                            </v-tooltip>
                        </template>
                    </v-menu>
                    </v-row>
                    <v-row no-gutters>
                    <v-menu v-for="i in fieldInfo" :key=i.info> 
                        <template v-slot:activator="{ on: menu, attrs }">
                            <v-tooltip bottom>
                            <template v-slot:activator="{ on: tooltip }">
                                <v-col :cols="4" >
                                    <v-btn
                                    :color="i.color"
                                    v-bind="attrs"
                                    v-on="{ ...tooltip, ...menu }"
                                    small
                                    height=30px
                                    />
                                </v-col>
                                
                            </template>
                            <span>{{ i.info }}</span>
                            </v-tooltip>
                        </template>
                    </v-menu>
                    </v-row>
                </v-flex>
                <v-flex xs1 sm1 md1 class="mobile-explain">
                    <v-menu style="z-index:500;" v-model="info_on" offset-y open-on-hover v-if="info">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn v-bind="attrs" v-on="on" text icon>
                            <v-icon color="#FFFFFF">mdi-information-outline</v-icon>
                            </v-btn>
                        </template>
                        <v-card width="300px" >
                            <v-card-text class="explain_modal_head">아이콘 설명</v-card-text>
                            <v-card-subtitle class="explain_modal_text">
                                <v-row>
                                    <v-col v-for="(i, key) in colorInfo" :key="key">
                                        <img :src="i.img" height=30px> 
                                        <div>{{i.info}}</div>
                                    </v-col>

                                </v-row>
                                <v-card-text class="explain_modal_head">필드색상 설명</v-card-text>
                                <v-row>
                                    <v-col :cols="4" v-for="(i,key) in fieldInfo" :key="key">
                                        <v-btn :color="i.color" large> </v-btn>
                                        <div>{{i.info}}</div>
                                    </v-col>

                                </v-row>
                            </v-card-subtitle>
                        </v-card>
                    </v-menu>

                    
                    </v-flex>
                </v-layout>
                <template v-slot:extension>
                    <v-tabs
                        dark
                        next-icon="mdi-menu-right"
                        prev-icon="mdi-menu-left"
                        show-arrows
                        fixed 
                        
                        >
                            <v-tab no-gutters v-for='(ival, ikey) in sidebarMenu' :key='ikey' v-on:click='getGeoJson(ival)'>
                                <div v-if='!loading' > {{ ikey }} </div>
                                <div v-else> {{ ikey }} </div>
                            </v-tab>
                    
                    </v-tabs>
                </template>
        </v-app-bar>
        <v-navigation-drawer class="sheet" absolute right v-model="sheet" width="200px">
            <v-icon class="pl-3 mb-2" @click="sheet = !sheet">mdi-close</v-icon>
            <pie-chart :chartdata="statisticData" :options="chartOptions" class='chart-graph' />
            <color-bar />
        </v-navigation-drawer>
    </div>
</template>

<script>
    import PieChart from '@/components/PieChart.js'
    import ColorBar from '@/components/ColorBar'
    import axios from 'axios'

    export default {
        components: {
            PieChart,
            ColorBar
        },
        data() {
            return {
                info_on: null,
                showMenu: true,
                info: true,
                show: false,
                sheet: false,
                data: [0, 0, 0, 0],
                marker: null,
                green: null,
                geojson: null,
                transition: 'slide-y-reverse-transition',
                direction: 'bottom',
                colorInfo: [
                    {img: '/marker-icon.png',info:'영화관 위치'},
                    {img: '/green-circle.svg',info:'개수 10미만'},
                    {img: '/yellow-circle.svg',info:'개수 100미만'},
                    {img: '/orange-circle.svg',info:'개수 100이상'},
        
                    ],
                fieldInfo: [
                    {color: '#26678F',info:'3.5km 이하'},
                    {color: '#6FC7A4',info:'8km 이하'},
                    {color: '#FDC771',info:'13km 이하'},
                    {color: '#D53E47',info:'13km 이상'},
                    {color: '#000000',info:'분석불가'},
                    ]
            }
        },
     
        computed: {
         
            sidebarMenu() {
                return this.$store.state.dataList;
            },
            analysisData() {
                return this.$store.state.analysisData;
            },
    
   
            loading() {
                return this.$store.state.loading;
            },
            sido() {
                return this.$store.state.selectedSido;
            },
            statisticData() {
                return this.$store.state.statisticData;
            },
            filteredData() {
                return this.$store.state.filterData
            },
            chartOptions() {
                return {
                    responsive: true,
                    maintainAspectRatio: false,
                    title: {
                        display: true,
                        text: this.sido + " 분포 비율"
                    },
                    legend: {
                        position: 'bottom'
                    },
                    tooltip: {
                        enabled: true
                    },
                }
            }
        },
        watch: {
            sido: function(val) {
                let self = this;
                self.show = true;
                self.$store.state.selectedSido = val;
            },
           
        },
        methods: {
            async initMap(){
                // 중심좌표 변경
                this.$store.state.center = [35.4, 127.9];
                // zoom 변경
                this.$store.state.zoom = 7
                // marker, geojson 삭제
                this.$store.state.seleted = false
                this.geojson = null;
                this.show = false;
                this.$store.state.loading=false;
                this.sheet  = false;
            },
            async getGeoJson(event){
                if (this.geojson == event.geojson) return null
                if (event.geojson=='all'){
                    this.$store.state.loading = true;
                    console.log(event)
                    await this.initMap()
                    return true
                }
                this.sheet = false;
                this.show = true;
                this.$store.state.showChart = false;
                this.$store.state.seleted = true;
                this.$store.state.loading = true;
                this.$store.state.zoom = 10
                this.geojson = event.geojson
                this.$store.state.center = event.center
                this.$store.state.fillColor = event.color
                var response = await axios.get(`https://lesser-korea-geojson.s3.ap-northeast-2.amazonaws.com/${this.geojson}`)
                this.$store.state.geojsonData = response.data
                var data = await this.filterSido(this.geojson.split('.')[0])
                this.$store.state.loading = false
                this.$store.state.filterData = data
                this.sheet = true;
                
            },
      
            filterSido(sido){
                let self = this;
                switch(sido){
                    case 'seoul':
                        var i =0;
                        // 
                        self.$store.state.selectedSido="서울특별시"
                        for (i in self.analysisData){
                            if(self.analysisData[i].sido == '서울특별시'){
                                self.$store.state.filterData.push(this.analysisData[i])
                            }
                        }
                        break
                    case 'busan':
                        
                        this.$store.state.selectedSido="부산광역시"
                        for (i in this.analysisData){
                            if(this.analysisData[i].sido == '부산광역시'){
                                this.$store.state.filterData.push(this.analysisData[i])
                            }
                        }
                    
                        break
                    case 'daegu':
                        
                        this.$store.state.selectedSido="대구광역시"
                        for (i in this.analysisData){
                            if(this.analysisData[i].sido == '대구광역시'){
                                this.$store.state.filterData.push(this.analysisData[i])
                            }
                        }
                    
                        break
                    case 'incheon':
                        
                        this.$store.state.selectedSido="인천광역시"
                        for (i in this.analysisData){
                            if(this.analysisData[i].sido == '인천광역시'){
                                this.$store.state.filterData.push(this.analysisData[i])
                            }
                        }
                        break
                    case 'gwangju':
                        
                        this.$store.state.selectedSido="광주광역시"
                        for (i in this.analysisData){
                            if(this.analysisData[i].sido == '광주광역시'){
                                this.$store.state.filterData.push(this.analysisData[i])
                            }
                        }
                        break
                    case 'daejeon':
                        
                        this.$store.state.selectedSido="대전광역시"
                        
                        for (i in this.analysisData){
                            if(this.analysisData[i].sido == '대전광역시'){
                                this.$store.state.filterData.push(this.analysisData[i])
                            }
                        }
                        break
                    case 'ulsan':
                        
                        this.$store.state.selectedSido="울산광역시"
                        
                        for (i in this.analysisData){
                            if(this.analysisData[i].sido == '울산광역시'){
                                this.$store.state.filterData.push(this.analysisData[i])
                            }
                        }
                        break
                    case 'sejong':
                        
                        self.$store.state.selectedSido="세종특별자치시"
                        
                        for (i in self.analysisData){
                            if(self.analysisData[i].sido == '세종특별자치시'){
                                self.$store.state.filterData.push(self.analysisData[i])
                            }
                        }
                        break
                    case 'gyeonggi':
                        
                        this.$store.state.selectedSido="경기도"
                        
                        for (i in this.analysisData){
                            if(this.analysisData[i].sido == '경기도'){
                                this.$store.state.filterData.push(this.analysisData[i])
                            }
                        }
                        break
                    case 'gangwon':
                        
                        this.$store.state.selectedSido="강원도"
                        
                        for (i in this.analysisData){
                            if(this.analysisData[i].sido == '강원도'){
                                this.$store.state.filterData.push(this.analysisData[i])
                            }
                        }
                        break
                    case 'chungbuk':
                        
                        this.$store.state.selectedSido="충청북도"
                        
                        for (i in this.analysisData){
                            if(this.analysisData[i].sido == '충청북도'){
                                this.$store.state.filterData.push(this.analysisData[i])
                            }
                        }
                        break
                    case 'chungnam':
                        
                        this.$store.state.selectedSido="충청남도"
                        
                        for (i in this.analysisData){
                            if(this.analysisData[i].sido == '충청남도'){
                                this.$store.state.filterData.push(this.analysisData[i])
                            }
                        }
                        break
                    case 'jeonbuk':
                        
                        this.$store.state.selectedSido="전라북도"
                        
                        for (i in this.analysisData){
                            if(this.analysisData[i].sido == '전라북도'){
                                this.$store.state.filterData.push(this.analysisData[i])
                            }
                        }
                        break
                    case 'jeonnam':
                        
                        this.$store.state.selectedSido="전라남도"
                        
                        for (i in this.analysisData){
                            if(this.analysisData[i].sido == '전라남도'){
                                this.$store.state.filterData.push(this.analysisData[i])
                            }
                        }
                        break
                    case 'kyeongbuk':
                        
                        this.$store.state.selectedSido="경상북도"
                        
                        for (i in this.analysisData){
                            if(this.analysisData[i].sido == '경상북도'){
                                this.$store.state.filterData.push(this.analysisData[i])
                            }
                        }
                        break
                    case 'kyeongnam':
                        
                        this.$store.state.selectedSido="경상남도"
                        
                        for (i in this.analysisData){
                            if(this.analysisData[i].sido == '경상남도'){
                                this.$store.state.filterData.push(this.analysisData[i])
                            }
                        }
                        break
                    case 'jeju':
                        
                        self.$store.state.selectedSido="제주특별자치도"
                        
                        for (i in self.analysisData){
                            if(self.analysisData[i].sido == '제주특별자치도'){
                                self.$store.state.filterData.push(self.analysisData[i])
                            }
                        }
                        break

                    default:
                        console.log('error')
                }
                return this.$store.state.filterData;
            }
        
        }
    }
</script>

<style scoped>
    .tool-bar {
        z-index: 100;
    }
    .sheet {
        z-index: 1000;
        display: flex;
        justify-content: center;
        align-items: center;
        padding-top: 30px;
    }
    .chart-graph {
        width: 200px;
        height: 200px;
        /* float: left; */
        /* position: absolute; */
    }
    .desktop-explain {
        display: flex;
    }
    .highlight-info{
        animation-duration: 800ms;
        animation-name: blink;
        animation-iteration-count: infinite;
        animation-direction: alternate;
    }
    @keyframes blink {
        from {
            opacity: 1;
        }
        to {
            opacity: 0.4;
        }
    }
    img {
        z-index: 0;
    }
    path {
        z-index: 0
    }
    /* 모바일로 하려고 할때 display none */
    @media screen and (max-width: 1000px) {
        #cols {
            display: none;

        }
        .desktop-explain {
            display: none;
        }
        .cols-mobile {
            display: flex;
            align-items:center;
            font-size:13px;
        }
    }
    /* 데스크탑으로 하려고 할때 display none */
    @media screen and (min-width: 1000px) {
        .cols-mobile {
            display: none;
        }
        .mobile-explain {
            display: none;
        }
        #cols {
            display: flex;
            font-size:13px;
            align-items:center;
        }
    }
    
</style>