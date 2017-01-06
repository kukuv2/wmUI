<template>
    <div class="checkBox">
        <h1>{{ text }}</h1>
        <slot></slot>
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
