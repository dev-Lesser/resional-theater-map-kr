<template>
    <v-app-bar
    class="tool-bar"
    app
    dark
    >
    <v-card-subtitle><a href="https://soprize.so/">쏘프라이즈</a>의 시즌1 <a href="https://soprize.so/question/51">"영화 한 편 보는데도 지역별 격차?"</a> 의 프로젝트 입니다. 
    <v-chip class="ml-5"> {{ $store.state.selectedSido }}</v-chip>
    </v-card-subtitle>
    </v-app-bar>
</template>
<script>
export default {
    computed:{
        sido(){
            return this.$store.state.selectedSido;
        }
    },
    watch:{
        sido: function(val) {
            console.log(val,11)
            //this.sido = val
            //this.$store.state.selectedSido = sido;
        },
    }
}
</script>
<style scoped>
.tool-bar{
    z-index:3;
}
</style>