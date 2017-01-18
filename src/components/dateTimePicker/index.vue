<template>
    <div class="dateTimePicker">
        <el-date-picker
                v-model="value"
                type="datetime"
                placeholder="选择日期时间">
        </el-date-picker>
    </div>
</template>

<script>
    export default {
        name: 'dateTimePicker',
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
