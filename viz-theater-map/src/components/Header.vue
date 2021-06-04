<template>
<div>
    <v-app-bar class="tool-bar" dense fixed app dark >
        <v-card-text style="align-items: center;">
            <v-row no-gutters> 
                <v-col no-gutters xs="7" sm="8" md="9" class="pt-1 cols" >
                    시즌1 <a href="https://soprize.so/question/51">"영화 한 편 보는데도 지역별 격차?"</a> 의 프로젝트 입니다.
                    <div v-if="!show"> 좌측에서 시도명을 선택해주세요.</div>
                    <v-chip  v-else-if="show & !loading" color="blue" small class="ml-5" @click="sheet = !sheet" >
                        <v-icon>mdi-chart-pie</v-icon>
                        &nbsp; 분포그래프</v-chip>
                 </v-col>
                 <v-col no-gutters class="pt-2 cols-mobile" >
                    <a href="https://soprize.so/question/51">링크</a>
                    <v-chip  v-if="show & !loading" color="blue" small class="ml-5" @click="sheet = !sheet" >
                        <v-icon>mdi-chart-pie</v-icon>
                        &nbsp; 그래프</v-chip>
                 </v-col>
                 <v-col no-gutters  xs="5" sm="4" md="3" >
                    <img class='ml-5' style="margin-top:7px;" :src="marker"  height=30px> 영화관 위치
                 </v-col>
                </v-row>
        </v-card-text>
        
    </v-app-bar>

     <v-navigation-drawer
     class="sheet"
      absolute
      right
      v-model="sheet"
      width="200px"
    >
    
    <pie-chart :chartdata="statisticData" :options="chartOptions"  class='chart-graph'/>
    <color-bar />
    </v-navigation-drawer>
</div>
</template>

<script>
    import PieChart from '@/components/PieChart.js'
    import ColorBar from '@/components/ColorBar'
    import marker from 'leaflet/dist/images/marker-icon.png'
    export default {
        components: {
            PieChart,
            ColorBar
        },
        data() {
            return {
                show: false,
                sheet: false,
                data: [0, 0, 0,  0],
                marker: null
            }
        },
        created(){
            this.marker=marker
        },
        computed: {
            loading(){
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
            chartOptions(){
                return {
                    responsive: true,
                    maintainAspectRatio: false,
                    title: {
                        display: true,
                        text: this.sido + " 분포 비율"
                    },
                    legend:{
                        position: 'bottom'
                    },
                    tooltip:{
                        enabled: true
                    },
                    
                
                }
            }
            
            
        },
        watch: {
            sido: function(val) {
                let self = this;
                self.show=true;
                self.$store.state.selectedSido = val;
            },
           
            
        },
        methods: {
        }
    }
</script>

<style scoped>
    .tool-bar {
        z-index: 100;
    }
    .sheet{
        z-index: 1000;
        display: flex;
        justify-content: center;
        align-items: center;
        padding-top:30px;
    }
    .chart-graph{
        width: 200px;
        height: 200px;
        /* float: left; */
        /* position: absolute; */
    }
    img{
        z-index:0;
    }
    path{
        z-index:0
    }

     @media screen and (max-width: 600px){
    .cols{
            display: none;
        }
    }
    @media screen and (min-width: 600px){
    .cols-mobile{
            display: none;
        }
    }
</style>