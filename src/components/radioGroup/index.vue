<template>
    <div>
        <template v-for="(item, $index) in radioData" track-by="$index">
            <div class="mgrt20">
                <input type="radio" :value='item.value' v-model='radioValue' :disabled="item.disabled"> <span
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
        props: {
            radioValue:{
                type:String
            },
            radioLabel:{
                type:Array
            }
        },
        data: function () {
            return {
                radioValue: []
            }
        },
        watch: {
            'radioValue': function (val) {
                this.$set('radioLabel', _.find(
                        this.radioData, {value: val}).label)
            }
        }
    }
</script>
