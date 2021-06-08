<template>
  <v-app class='main'>
    <Header />
    <v-main>
      
      
      <map-view/>
    </v-main>
  </v-app>
</template>

<script>
  import MapView from '@/components/MapView';
  import Header from '@/components/Header'
  import axios from 'axios'
  export default {
    name: 'App',
    components: {
      MapView,
      Header,
    },
    data() {
      return {
        
      }
    },
    async mounted() {
      await this.getAnalysisData();
      await this.getTheaterData();
      // console.log(process.env)
      // console.log(process.env.VUE_APP_G_ID)
  
    },
    computed: {
 
  
    },
    methods: {
      async getAnalysisData() {
        var response = await axios.get(`https://lesser-korea-geojson.s3.ap-northeast-2.amazonaws.com/analysis.json`)
        this.$store.state.analysisData = response.data
      },
      async getTheaterData() {
        var response = await axios.get(`https://lesser-korea-geojson.s3.ap-northeast-2.amazonaws.com/theater.json`)
        this.$store.state.theaterData = response.data
      },
    }
  };
</script>

<style scoped>
  #overlay {
    float: inherit;
    z-index: 3;
  }
  .main {
    overflow: hidden;
    overflow-y: hidden;
  }
  body {
    overflow: hidden;
  }
</style>
