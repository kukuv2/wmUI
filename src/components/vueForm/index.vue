<template>
    <div class="vue-form">
        <template v-for="(val, key) in sortChildComponentData"
                  track-by="$index">
            <div class="row"
                 v-show="val.item.hidden !== true">
                <div class="col-md-3 form-label">
                    <template v-if="val.item.require">
                        <span class="red">*</span>
                    </template>
                    &nbsp;{{val.item.label}} :
                </div>
                <div class="col-md-9">
                    <span :class="val.key">
                    <component :is="val.item.type" :ref="val.key"
                               :component-data.sync="val.item.componentData"></component></span>
                </div>
            </div>
        </template>
        <slot>
            <div class="control-group form-btn-box">
                <label></label>
                <div class="submitBtn">
                    <a type="button"
                       href="javascript:;"
                       @click="formSubmit"
                       class="btn btn-primary btn-commit large-btn">
                        提交
                    </a>
                </div>
            </div>
        </slot>
    </div>
</template>
<style></style>
<script>
    import _ from 'lodash'
    import radioGroup from '../radioGroup'
    import templateInput from '../templateInput'
    export default{
        name:'vueForm',
        props:{
            childComponentDatas:{
                type:Object
            }
        },
        methods:{
            formSubmit:function(){
                this.$emit('submit',this.$refs.msg[0].componentData.inputValue[0])
            }
        },
        /*beforeCreate:function () {
            console.log('beforeCreate');
        },
        created:function () {
            console.log('created');
        },
        beforeMount:function () {
            console.log('beforeMount');
        },
        updated:function () {
            console.log('updated');
        },
        activated:function () {
            console.log('activated');
        },
        deactivated:function () {
            console.log('deactivated');
        },
        beforeDestory:function () {
            console.log('beforeDestory');
        },
        destroyed:function () {
            console.log(`destoryed`);
        },*/
        data(){
            return{
                msg:'hello vue',
            }
        },
        computed:{
            sortChildComponentData:function () {
                var setting = {};
                var resutl = [];
                if(!this.childComponentDatas){
                    setting = this.$options.setting
                }else{
                    setting =  this.childComponentDatas
                }
                _.forEach(setting,function (item,key) {
                    resutl.push({
                        key,
                        item
                    });
                });
                return resutl
            }
        },
        components:{
            templateInput,
            radioGroup
        }
    }


</script>
