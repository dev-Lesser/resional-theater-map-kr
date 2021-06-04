<template>
<div>
    <v-navigation-drawer id='nav-bar' app permanent  width="70px"  dark mobile-breakpoint="400" >
        <div v-for='(ival, ikey) in sidebarMenu' :key='ikey'>
        <v-btn small v-if='!loading'  outlined :color='ival.color' class='pa-3 ma-2' v-on:click='getGeoJson(ival)'>
            {{ikey }}
        </v-btn>
        <v-btn small v-else depressed disabled class='pa-3 ma-2' >
            {{ikey}}
        </v-btn>
        </div>
    </v-navigation-drawer>
        
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
    
        loading(){
            return this.$store.state.loading;
        }
    },
  
    methods:{
        async getGeoJson(event){
            if (this.geojson == event.geojson) return null
       
            this.$store.state.loading = true
            this.geojson = event.geojson
            this.$store.state.center = event.center
            this.$store.state.fillColor = event.color
            var response = await axios.get(`https://lesser-korea-geojson.s3.ap-northeast-2.amazonaws.com/${this.geojson}`)
            this.$store.state.geojsonData = response.data
            var data = await this.filterSido(this.geojson.split('.')[0])
            this.$store.state.loading = false
            this.$store.state.filterData = data
            
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
}
@media screen and (min-width: 600px){
    #mobile-nav-bar{
        
        display: none;
        
    }
} */
</style>
