<template>
    <div class="checkBox">
        <el-checkbox v-model="checked">备选项</el-checkbox>
    </div>
</template>

<script>
    export default {
        name: 'checkBox',
        props: {
            checkbox: {
                type: String,
                default: 'submit'
            }
        },
        data () {
            return {
                checked:false
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
