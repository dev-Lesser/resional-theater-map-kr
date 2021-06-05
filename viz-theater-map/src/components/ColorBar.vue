<template>
<v-card class="ma-3 pa-3" tile flat>
  
    <v-card-subtitle>색상 설명</v-card-subtitle>
    <v-row class="rows" v-for='i in colormap' :key='i.color'>
        <v-col :cols='3' align-center>
            <v-chip x-large :color="i.color">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</v-chip>
        </v-col>
        <v-col :cols='9' align-center>
            {{ i.value }}
        </v-col>
    </v-row>
    </v-card>
</template>
<script>
    export default {
        data: () => ({
            fab: false,
            hidden: false,
            top:true,
            bottom: true,
            transition: 'slide-y-reverse-transition',
            direction: 'bottom',
            colormap: null,
        }),
        mounted(){
            this.colormap = this.$store.state.colormap;
        }
    }
    
</script>
<style scoped>
/* #mobile-nav-bar {
    display: flex;
    position: absolute;
    align-items: center;
    z-index: 2;
}

@media screen and (min-width: 600px){
    #mobile-nav-bar{
        
        display: none;
        
    }
} */
.field-1{
    background: linear-gradient( to right,#194b69,#26678F);
    width: 25%;
    color: white;
    text-align: center;
    font-size: 13px;
}
.field-2{
    background: linear-gradient( to right,#26678F,#6FC7A4);
    width: 25%;
    color: white;
    text-align: center;
    font-size: 13px;
}
.field-3{
    background:linear-gradient( to right,#6FC7A4, #FDC771);
    width: 25%;
    color: white;
    text-align: center;
    font-size: 13px;
}
.field-4{
    background:linear-gradient( to right, #FDC771,#D53E47); 
    width: 25%;
    color: white;
    text-align: center;
    font-size: 13px;
}
.rows{
    align-items: center;
    padding-left: 10px;
    padding-right: 5px;
    font-size: 12px;
}
</style>