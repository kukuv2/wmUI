<template>
    <div class="radios">
        <el-radio-group v-model="radio">
            <el-radio :label="3">备选项</el-radio>
            <el-radio :label="6">备选项</el-radio>
            <el-radio :label="9">备选项</el-radio>
        </el-radio-group>
    </div>
</template>

<script>
    export default {
        name: 'radios',
        props: {
            msg: {
                type: String,
                default: 'Hello Vue'
            }
        },
        data () {
            return {
                radio:''
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
