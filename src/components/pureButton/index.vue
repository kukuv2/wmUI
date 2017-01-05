<template>
    <div class="pureButton">
        <el-button type="primary">{{ text }}</el-button>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'pureButton',
        props: {
            text: {
                type: String,
                default: 'submit'
            }
        },
        data () {
            return {}
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h1 {
        color: #42b983;
    }
</style>
