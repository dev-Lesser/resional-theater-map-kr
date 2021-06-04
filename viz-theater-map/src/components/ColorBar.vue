<template>
    <v-footer  padless>
        <div class="field-1">거리<br/>3.52km 이하</div>
        <div class="field-2">거리<br/>8.03km 이하</div>
        <div class="field-3">거리<br/>13.59km 이하</div>
        <div class="field-4">거리<br/>13.58km 이상 </div>
    </v-footer>
</template>
<script>
    export default {
        data: () => ({
            links: [
                'Home',
                'About Us',
                'Team',
                'Services',
                'Blog',
                'Contact Us',
            ],
        }),
    }
    
</script>
<style scoped>
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
</style>