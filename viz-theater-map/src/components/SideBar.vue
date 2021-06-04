<template>
<div>
    <v-navigation-drawer id='nav-bar' app permanent  width="100px"  dark  >
        
        <div v-for='(ival, ikey) in sidebarMenu' :key='ikey'>
        <v-btn v-if='!loading'  outlined :color='ival.color' class='pa-3 ma-2' v-on:click='getGeoJson(ival)'>
            {{ikey }}
        </v-btn>
        <v-btn v-else depressed disabled class='pa-3 ma-2' >
            {{ikey}}
        </v-btn>
        </div>
    </v-navigation-drawer>
        <v-speed-dial id="mobile-nav-bar" v-model="fab"  :bottom="bottom" :transition="transition" :direction="direction">
            <template v-slot:activator>
                <v-btn
                v-model="fab"
                class="scroll-icon"
                fab
                >
                    <v-icon v-if="fab">
                        mdi-close
                    </v-icon>
                    <v-icon v-else>
                        mdi-magnify
                    </v-icon>
                </v-btn>
            </template>
            <v-sheet>
                <v-card width=100% >
                <v-row >
                    <v-col cols="3" md="3" lg="3" sm="2"  v-for='(ival, ikey) in sidebarMenu' :key='ikey' >
                        <v-btn v-if='!loading'  outlined :color='ival.color' class='pa-3 ma-2' v-on:click='getGeoJson(ival)'>
                            {{ikey }}
                        </v-btn>
                    </v-col>
                </v-row>
                </v-card>
            </v-sheet>
        </v-speed-dial>
</div>
</template>
<script>
import axios from 'axios'
export default ({
    data(){
        return {
            geojson: null,
            fab: false,
            hidden: false,
            bottom: true,
            transition: 'slide-y-reverse-transition',
            direction: 'bottom',
        }
    },
    computed: {
        sidebarMenu() {
            return this.$store.state.dataList;
        },
        analysisData() {
            return this.$store.state.analysisData;
        },
        theaterData() {
            return this.$store.state.theaterData;
        },
   
        loading(){
            return this.$store.state.loading;
        }
    },
  
    methods:{
        async getGeoJson(event){
            this.$store.state.loading = true
            this.geojson = event.geojson
            this.$store.state.center = event.center
            this.$store.state.fillColor = event.color
            var response = await axios.get(`https://lesser-korea-geojson.s3.ap-northeast-2.amazonaws.com/${this.geojson}`)
            this.$store.state.geojsonData = response.data
            var data = this.filterSido(this.geojson.split('.')[0])
            this.$store.state.loading = false
            this.$store.state.filterData = data
        },
        filterSido(sido){
            switch(sido){
                case 'seoul':
                    var i =0;
                    this.$store.state.filterData = []
                    for (i in this.analysisData){
                        if(this.analysisData[i].sido == '서울특별시'){
                            this.$store.state.filterData.push(this.analysisData[i])
                        }
                    }
                    break
                case 'busan':
                    this.$store.state.filterData = []
                    for (i in this.analysisData){
                        if(this.analysisData[i].sido == '부산광역시'){
                            this.$store.state.filterData.push(this.analysisData[i])
                        }
                    }
                
                    break
                case 'daegu':
                    this.$store.state.filterData = []
                    for (i in this.analysisData){
                        if(this.analysisData[i].sido == '대구광역시'){
                            this.$store.state.filterData.push(this.analysisData[i])
                        }
                    }
                
                    break
                case 'incheon':
                    this.$store.state.filterData = []
                    for (i in this.analysisData){
                        if(this.analysisData[i].sido == '인천광역시'){
                            this.$store.state.filterData.push(this.analysisData[i])
                        }
                    }
                    break
                case 'gwangju':
                    this.$store.state.filterData = []
                    for (i in this.analysisData){
                        if(this.analysisData[i].sido == '광주광역시'){
                            this.$store.state.filterData.push(this.analysisData[i])
                        }
                    }
                    break
                case 'daejeon':
                    this.$store.state.filterData = []
                    for (i in this.analysisData){
                        if(this.analysisData[i].sido == '대전광역시'){
                            this.$store.state.filterData.push(this.analysisData[i])
                        }
                    }
                    break
                case 'ulsan':
                    this.$store.state.filterData = []
                    for (i in this.analysisData){
                        if(this.analysisData[i].sido == '울산광역시'){
                            this.$store.state.filterData.push(this.analysisData[i])
                        }
                    }
                    break
                case 'sejong':
                    this.$store.state.filterData = []
                    for (i in this.analysisData){
                        if(this.analysisData[i].sido == '세종특별자치시'){
                            this.$store.state.filterData.push(this.analysisData[i])
                        }
                    }
                    break
                case 'gyeonggi':
                    this.$store.state.filterData = []
                    for (i in this.analysisData){
                        if(this.analysisData[i].sido == '경기도'){
                            this.$store.state.filterData.push(this.analysisData[i])
                        }
                    }
                    break
                case 'gangwon':
                    this.$store.state.filterData = []
                    for (i in this.analysisData){
                        if(this.analysisData[i].sido == '강원도'){
                            this.$store.state.filterData.push(this.analysisData[i])
                        }
                    }
                    break
                case 'chungbuk':
                    this.$store.state.filterData = []
                    for (i in this.analysisData){
                        if(this.analysisData[i].sido == '충청북도'){
                            this.$store.state.filterData.push(this.analysisData[i])
                        }
                    }
                    break
                case 'chungnam':
                    this.$store.state.filterData = []
                    for (i in this.analysisData){
                        if(this.analysisData[i].sido == '충청남도'){
                            this.$store.state.filterData.push(this.analysisData[i])
                        }
                    }
                    break
                case 'jeonbuk':
                    this.$store.state.filterData = []
                    for (i in this.analysisData){
                        if(this.analysisData[i].sido == '전라북도'){
                            this.$store.state.filterData.push(this.analysisData[i])
                        }
                    }
                    break
                case 'jeonnam':
                    this.$store.state.filterData = []
                    for (i in this.analysisData){
                        if(this.analysisData[i].sido == '전라남도'){
                            this.$store.state.filterData.push(this.analysisData[i])
                        }
                    }
                    break
                case 'kyeongbuk':
                    this.$store.state.filterData = []
                    for (i in this.analysisData){
                        if(this.analysisData[i].sido == '경상북도'){
                            this.$store.state.filterData.push(this.analysisData[i])
                        }
                    }
                    break
                case 'kyeongnam':
                    this.$store.state.filterData = []
                    for (i in this.analysisData){
                        if(this.analysisData[i].sido == '경상남도'){
                            this.$store.state.filterData.push(this.analysisData[i])
                        }
                    }
                    break
                case 'jeju':
                    this.$store.state.filterData = []
                    for (i in this.analysisData){
                        if(this.analysisData[i].sido == '제주특별자치도'){
                            this.$store.state.filterData.push(this.analysisData[i])
                        }
                    }
                    break

                default:
                    console.log('error')
            }
            return this.$store.state.filterData;
        }
    }

})
</script>
<style scoped>
@import "../../node_modules/leaflet/dist/leaflet.css";
  @import "~leaflet/dist/leaflet.css";
  @import "~leaflet.markercluster/dist/MarkerCluster.css";
  @import "~leaflet.markercluster/dist/MarkerCluster.Default.css";
#nav-bar {
    display: flex;
    justify-content: center;
    align-items: center;
    color: rgba(255,255,255,1)
}
#mobile-nav-bar {
    display: flex;
    position: absolute;
    align-items: center;
    z-index: 100;
}
/* @media screen and (max-width: 600px){
    #nav-bar{
        display: none;
    }
} */
@media screen and (min-width: 0px){
    #mobile-nav-bar{
        
        display: none;
        
    }
}
</style>
