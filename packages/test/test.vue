<template>
    <div>
        <h3>{{name}}</h3>
        <div>{{count}}</div>
        <button>增加</button>
    </div>
</template>
<script lang="ts">

export default {
    name:'test',
    props:{
        name: String ,
        default: String
    },
    data (){
        return {
            count:0
        }
    },
    methods:{
        
    }
}
</script>
<style lang="scss">
    
</style>