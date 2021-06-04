<template>
  <!-- <div id="map"></div> -->
  <div app id="map">
    <!-- <img src="@/assets/markerClusterGroup.svg"> -->
    <v-overlay :value="loading" :z-index="2"></v-overlay>
    <l-map v-if='!loading' :zoom="zoom" :center="changedCenter" style="height: 100%; width: 100%" :min-zoom="6" :max-zoom="15">
      <l-tile-layer :url="url" :attribution="attribution" />
      <l-geo-json :geojson="geojsonData" :options="options" :options-style="styleFunction" />

        <v-marker-cluster :options="clusterOptions">
          <v-marker v-for="(i,key) in theaterData"  :key="key" :lat-lng="[i.y, i.x]"> <!-- 영화관 위치 -->
            <v-popup :content="i.poi_nm"></v-popup>
          </v-marker>
        </v-marker-cluster>
    </l-map>
    <v-card v-else class='now-loading-page'>
      <v-card-title>
        파일을 분석하고 있습니다. 잠시만 기다려 주세요...
        <v-progress-linear
      color="cyan"
    ></v-progress-linear>
      </v-card-title>
    </v-card>
  </div>
</template>

<script>
import { Icon } from 'leaflet';
import Vue2LeafletMarkerCluster from 'vue2-leaflet-markercluster'
import * as Vue2Leaflet from 'vue2-leaflet'

import {LMap, LTileLayer, LGeoJson} from "vue2-leaflet";
import axios from 'axios'
import 'leaflet/dist/leaflet.css'
export default {
    name: 'MapView',
    components: {
      'v-marker-cluster': Vue2LeafletMarkerCluster,
      'v-marker': Vue2Leaflet.LMarker,
      'v-popup': Vue2Leaflet.LPopup,
      LMap,
      LTileLayer,
      LGeoJson,
    },
    props:{
      color: String
    },

    data() {
      return {
        show: true,
        enableTooltip: true,
        zoom: 10,
        center: [37.9, 127],
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
        num4:0
      }
    },
    created(){
      delete Icon.Default.prototype._getIconUrl;

      Icon.Default.mergeOptions({
          iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
          iconUrl: require('leaflet/dist/images/marker-icon.png'),
          shadowUrl: require('leaflet/dist/images/marker-shadow.png')
      });
    },
    async mounted() {
      // delete L.Icon.Default.prototype._getIconUrl;
      // L.Icon.Default.mergeOptions({
      //   iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
      //   iconUrl: require('leaflet/dist/images/marker-icon.png'),
      //   shadowUrl: require('leaflet/dist/images/marker-shadow.png')
      // });
      this.$store.state.loading = true;
      var response = await axios.get(`https://lesser-korea-geojson.s3.ap-northeast-2.amazonaws.com/seoul.geo.json`)
      var data = response.data
      this.geojson = data;
      this.$store.state.geojsonData = this.geojson
      this.$store.state.center = [37.57, 127];
      this.$store.state.loading = false;

    },
    computed: {

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
      changedCenter: function(center) {
        [this.num1,this.num2,this.num3,this.num4] = [0,0,0,0]
        // let self = this;
        this.geojson = this.$store.state.geojsonData
        this.$store.state.center = center;
        // console.log(this.$store.state.statisticData)
      },
      changedSido: function(){
        // let self = this;
        [this.num1,this.num2,this.num3,this.num4] = [0,0,0,0]
        // self.$store.state.statisticData = [0,0,0,0]
        var data = this.$store.state.statisticData
        this.$store.state.statisticData = data
      }

    },
    methods: {
      
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
        // console.log(this.$store.state.statisticData)
        return color
      },
    }
  }
</script>

<style scoped>
  /* @import "../../node_modules/leaflet/dist/leaflet.css"; */
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
  @media screen and (max-width: 600px){
    #map{
        flex: 1;
        z-index: 2;
        height: 100%;
        
    }
}
</style>