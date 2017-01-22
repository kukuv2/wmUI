<template>
    <div class="inputWidthLabel">
        <label class="el-form-item__label"></label>
        <el-input v-model="value" placeholder="请输入内容"></el-input>
    </div>
</template>

<script>
    export default {
        name: 'inputWidthLabel',
        props: {
            labelText: {
                type: String,
                default: '请输入内容'
            }
        },
        data () {
            return {
                value:''
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h1 {
        color: #42b983;
    }
</style>
