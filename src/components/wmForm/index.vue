<template>
    <div class="wrap">
        <el-form>
            <slot></slot>
            <el-row>
                <el-col :span="12" :offset="10">
                    <el-button>提交</el-button>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>
<style lang="less"
       rel="stylesheet/less"
       scoped>
    .wrap {
        border: 1px solid silver;
        min-height: 50px;
        padding-top: 100px;
    }
</style>
<script>
    export default {
        props: {},
        name: 'wmForm',
        data(){
            return {}
        },
        components: {}
    }
</script>
