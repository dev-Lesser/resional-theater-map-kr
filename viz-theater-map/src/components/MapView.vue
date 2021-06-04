<template>
  <!-- <div id="map"></div> -->
  <div app id="map">
    <v-overlay :value="loading" :z-index="2"></v-overlay>
    <l-map v-if='!loading' :zoom="zoom" :center="changedCenter" style="height: 100%; width: 100%" :min-zoom="6" :max-zoom="15">
      <l-tile-layer :url="url" :attribution="attribution" />
      <l-geo-json :geojson="geojsonData" :options="options" :options-style="styleFunction" />

        <v-marker-cluster :options="clusterOptions">
          <v-marker v-for="(i,key) in theaterData" :icon="icon" :key="key" :lat-lng="[i.y, i.x]"> <!-- 영화관 위치 -->
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
import { icon,Icon } from 'leaflet';
import Vue2LeafletMarkerCluster from 'vue2-leaflet-markercluster'
import * as Vue2Leaflet from 'vue2-leaflet'
import iconUrl from '@/assets/markerClusterGroup.svg'
import shadowUrl from 'leaflet/dist/images/marker-shadow.png'

import {LMap, LTileLayer, LGeoJson} from "vue2-leaflet";
import axios from 'axios'
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
        icon: icon(Object.assign({},
          Icon.Default.prototype.options,
          {iconUrl, shadowUrl}
        )),
        enableTooltip: true,
        zoom: 10,
        center: [37.9, 127],
        fillColor: "",
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        attribution: '',
        map: null,
        tileLayer: null,
        clusterOptions: {},
      }
    },
    async mounted() {
      this.$store.state.loading = true;
      var response = await axios.get(`https://lesser-korea-geojson.s3.ap-northeast-2.amazonaws.com/seoul.geo.json`)
      var data = response.data
      this.geojson = data;
      this.$store.state.geojsonData = this.geojson
      this.$store.state.center = [37.57, 127];
      this.$store.state.loading = false;

    },
    computed: {
      dynamicSize() {
        return [this.iconSize, this.iconSize * 1.15];
      },
      dynamicAnchor() {
        return [this.iconSize / 2, this.iconSize * 1.15];
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
      changedCenter() {
        return this.$store.state.center;
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
        this.geojson = this.$store.state.geojsonData
        this.$store.state.center = center;
      },
    },
    methods: {
      pickColor(dong_name){
        for (var i in this.filteredData){
          if(this.filteredData[i].bjdong == dong_name ){ // 
            var distance = this.filteredData[i].km_distance;
            var color = null
              if (distance <3.517778) color= '#26678F'        // 1사분위수
              else if (distance <8.033140) color= '#6FC7A4'   // 2사분위수
              else if (distance <13.588437) color= '#FDC771'  // 3사분위수
              else color= '#D53E47'
              break
          }
        }
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
    z-index: 0;
    height: 94%;
  }
  .now-loading-page{
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>