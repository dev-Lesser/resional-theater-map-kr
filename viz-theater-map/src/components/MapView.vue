<template>
  <div app id="map">
    <v-overlay :value="loading" :z-index="2"></v-overlay>
    <l-map v-if='!loading' :zoom="zoom" :center="changedCenter" class="leaflet-map"  :min-zoom="minZoom" :max-zoom="maxZoom">
      <l-tile-layer :url="url" :attribution="attribution" />
        <l-control-scale position="bottomleft" :imperial="false" :metric="true"></l-control-scale>

        <l-geo-json v-if="$store.state.seleted" :geojson="geojsonData" :options="options" :options-style="styleFunction" />
        <l-geo-json v-else :geojson="initGeoJsonData" :options="initOptions" :options-style="initStyleFunction" />
        <v-marker-cluster v-if="$store.state.seleted" :options="clusterOptions">
          <v-marker v-for="(i,key) in theaterData" :key="key" :lat-lng="[i.y, i.x]"> <!-- 영화관 위치 -->
            <v-popup :content="i.poi_nm"></v-popup>
            
          </v-marker>
        </v-marker-cluster>

        <v-marker v-for="i in allData" :key="i.name" :lat-lng="i.center" v-else>
          <l-icon
                    :icon-size="dynamicSize"
                    :icon-anchor="dynamicAnchor"
                    :icon-url="i.img" >
          </l-icon>
          <l-tooltip ref="popup" >{{i.name}}</l-tooltip>
          
        </v-marker>
    </l-map>
    <v-card v-else class='now-loading-page' flat>
      <v-img :src="img"
        max-height="200"
        max-width="200" 
        ></v-img>
         <v-card-title>파일을 분석하고 있습니다. 잠시만 기다려 주세요...</v-card-title>
  
    </v-card>
    
  </div>
</template>

<script>
import { Icon } from 'leaflet';
import Vue2LeafletMarkerCluster from 'vue2-leaflet-markercluster'
import * as Vue2Leaflet from 'vue2-leaflet'
import loadingImg from '@/assets/loading.png'
import initGeoJsonData from '@/assets/korea.geo.json'
import {LMap, LTileLayer, LGeoJson,LIcon,LControlScale, LTooltip} from "vue2-leaflet";
import marker from '@/assets/marker.png'
import 'leaflet/dist/leaflet.css'
export default {
    name: 'MapView',
    components: {
      'v-marker-cluster': Vue2LeafletMarkerCluster,
      'v-marker': Vue2Leaflet.LMarker,
      'v-popup': Vue2Leaflet.LPopup,

      LIcon,
      LMap,
      LTileLayer,
      LGeoJson,
      LControlScale,
      LTooltip
    },

    data() {
      return {
        initGeoJsonData: initGeoJsonData,
        iconSize: 50,
        show: true,
        marker: marker,
        enableTooltip: true,
        img: loadingImg,
        center: [35.7, 127.9],
        fillColor: "",
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        attribution: '',
        map: null,
        tileLayer: null,
        clusterOptions: {},
        dong_name:null,
        num1:0,
        num2:0,
        num3:0,
        num4:0,
        
      }
    },
    created(){
      delete Icon.Default.prototype._getIconUrl;

      Icon.Default.mergeOptions({
          iconRetinaUrl: require('@/assets/marker.png'),
          iconUrl: require('@/assets/marker.png'),
          shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
          iconSize: [20,20],
      });
    },
    async mounted() {
      this.$store.state.loading = true;
      this.$store.state.center = [35.7, 127.9];
      this.$store.state.loading = false;
      this.$store.state.minZoom = 7
      this.$store.state.maxZoom = 7
      
    },
    computed: {
      minZoom(){
        return this.$store.state.minZoom
      },
      maxZoom(){
        return this.$store.state.maxZoom
      },
      allData(){
        return this.$store.state.allData;
      },
      dynamicSize () {
        return [this.iconSize, this.iconSize ];
      },
      dynamicAnchor () {
        return [this.iconSize / 2, this.iconSize * 1.15];
      },
      zoom(){
        return this.$store.state.zoom;
      },

      loading(){
          return this.$store.state.loading;
      },
      theaterData(){
        return this.$store.state.theaterData
      },
      geojsonData() {
        return this.$store.state.geojsonData
      },

      filteredData(){
        return this.$store.state.filterData
      },
      statisticData(){
        return this.$store.state.statisticData
      },
      changedCenter() {
        return this.$store.state.center
      },
      changedSido(){
        return this.$store.state.selectedSido
      },

      options() {
        return {
          onEachFeature: this.onEachFeatureFunction
        };
      },
      initOptions() {
        return {
          onEachFeature: this.initOnEachFeatureFunction
        };
      },
      initStyleFunction() {
        return (res) => {
          return {
            weight: 1,
            color: '#000000',
            opacity: 1,
            fillColor: this.initPickColor(res.properties.CTP_KOR_NM),
            fillOpacity: 0.5
          };
        };
      },

      initOnEachFeatureFunction() {
        if (!this.enableTooltip) {
          return () => {};
        }
        return (feature, layer) => {
          layer.bindTooltip(
            "<div>구분코드:" +
            feature.properties['CTPRVN_CD'] +
            "</div><div>동명: " +
            feature.properties['CTP_KOR_NM'] +
            "</div>", {
              permanent: false,
              sticky: false
            }
          );
        };
      },
      styleFunction() {
        return (res) => {
          return {
            weight: 1,
            color: '#000000',
            opacity: 1,
            fillColor: this.pickColor(res.properties.EMD_KOR_NM),
            fillOpacity: 0.5
          };
        };
      },
      
      
      onEachFeatureFunction() {
        if (!this.enableTooltip) {
          return () => {};
        }
        return (feature, layer) => {
          layer.bindTooltip(
            "<div>구분코드:" +
            feature.properties['EMD_CD'] +
            "</div><div>동명: " +
            feature.properties['EMD_KOR_NM'] +
            "</div>", {
              permanent: false,
              sticky: true
            }
          );
        };
      }
    },
    watch: {
      changedCenter: function() {
        [this.num1,this.num2,this.num3,this.num4] = [0,0,0,0]
        this.geojson = this.$store.state.geojsonData
        //this.$store.state.center = center;
      },
      changedSido: function(){
        [this.num1,this.num2,this.num3,this.num4] = [0,0,0,0]
        var data = this.$store.state.statisticData
        this.$store.state.statisticData = data
      },


    },
    methods: {
      initPickColor(sido){ // random color generater
        var newSido = sido.substring(0,2)
        for (var i in this.$store.state.dataList){
          if (i == '전체') continue;
          if (i == newSido){
            return this.$store.state.dataList[i].color
          }
          else if (i == sido[0]+sido[2]){
            var key = sido[0]+sido[2];
            return this.$store.state.dataList[key].color
          }
        }
        
      },
      pickColor(dong_name){
        let self = this;
        
        for (var i in this.filteredData){
          if(this.filteredData[i].bjdong == dong_name ){ // 
            var distance = this.filteredData[i].km_distance;
            var color = null
            
              if (distance <3.517778) {
                color= '#26678F';  
                self.num1+=1; 
                }  // 1사분위수
              else if (distance <8.033140) {
                color= '#6FC7A4';  
                self.num2+=1; // 2사분위수
              }
              else if (distance <13.588437) {
                color= '#FDC771'; 
                self.num3+=1; // 3사분위수
              }
              else {
                color= '#D53E47'; 
                self.num4+=1;
              }
              break
          }
        }
        this.$store.state.statisticData = [self.num1,self.num2,self.num3,self.num4]
        return color
      },
    }
  }
</script>

<style scoped>
  @import "~leaflet/dist/leaflet.css";
  @import "~leaflet.markercluster/dist/MarkerCluster.css";
  @import "~leaflet.markercluster/dist/MarkerCluster.Default.css";
  #map {
    flex: 1;
    z-index: 2;
    height: 100%;

  }
  .now-loading-page{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .deploy-all-chart{
    z-index:1000000;
  }
  .leaflet-map{
    width: 100%;
    height: 100%;
  }
  @media screen and (max-width: 600px){
    #map{
        flex: 1;
        z-index: 2;
        height: 92%;
        
    }
}
</style>