<template>
    <div class="wrap">
        <el-form>
            <slot></slot>
        </el-form>
    </div>
</template>
<style lang="less"
       rel="stylesheet/less"
       scoped>
    .wrap{
        border: 1px solid silver;
        min-height: 100px;
        padding-top: 100px;
    }
</style>
<script>
    export default {
        props:{},
        name:'wmForm',
        data(){
            return {}
        },
        components: {}
    }
</script>
