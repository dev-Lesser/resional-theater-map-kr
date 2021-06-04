<template>
  <v-app class='main'>
    <v-main >
      <Header />
      <side-bar />
      <map-view/>
      <color-bar />
    </v-main>
  </v-app>
</template>

<script>
import SideBar from '@/components/SideBar'
import MapView from '@/components/MapView';
import Header from '@/components/Header'
import ColorBar from '@/components/ColorBar'
import axios from 'axios'
export default {
  name: 'App',

  components: {
    SideBar,
    MapView,
    Header,
    ColorBar
  },
  data(){
    return{
      absolute: true,
    }
  },
  async mounted(){
    await this.getAnalysisData();
    await this.getTheaterData();

  },

  computed: {
      loading(){
          return this.$store.state.loading;
      },
  },
  methods:{
    async getAnalysisData(){
      var response = await axios.get(`https://lesser-korea-geojson.s3.ap-northeast-2.amazonaws.com/analysis.json`)
      this.$store.state.analysisData = response.data
    },
    async getTheaterData(){
      var response = await axios.get(`https://lesser-korea-geojson.s3.ap-northeast-2.amazonaws.com/theater.json`)
      this.$store.state.theaterData = response.data
    },
      
    
  }
  
};
</script>
<style scoped>
#overlay{
  float:inherit;
  z-index: 3;
}
.main{
  overflow: hidden;
  overflow-y: hidden;
}
body {
        overflow: hidden;
    }
</style>
