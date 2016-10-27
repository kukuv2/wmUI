<template>
    <div>
        <template v-for="(item, $index) in componentData.radioData" track-by="$index">
            <div class="mgrt20">
                <input type="radio" :value='item.value' v-model='componentData.radioValue' :disabled="item.disabled"> <span
                    class="pdboth5">{{item.label}}</span>
            </div>
        </template>
    </div>
</template>
<style>
</style>
<script>
    import _ from 'lodash'
    export default{
        props: ['componentData'],
        data: function () {
            return {
                radioValue: []
            }
        },
        watch: {
            'componentData.radioValue': function (val) {
                this.$set('componentData.radioLabel', _.find(
                        this.componentData.radioData, {value: val}).label)
            }
        }
    }
</script>
