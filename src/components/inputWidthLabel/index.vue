<template>
    <div class="inputWidthLabel">
        <el-input v-model="value" placeholder="请输入内容"></el-input>
    </div>
</template>

<script>
    export default {
        name: 'inputWidthLabel',
        props: {
            msg: {
                type: String,
                default: 'Hello Vue'
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
