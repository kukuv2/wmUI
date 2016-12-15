<!--<template>
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
                    <component :is="val.item.type"
                               :ref="val.key"
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
    {this._t('default', <div class="control-group form-btn-box">
                            <label></label>
                            <div class="submitBtn">
                                <button on-click={this.formSubmit}
                                        class="btn btn-primary btn-commit large-btn">
                                    提交
                                </button>
                            </div>
                        </div>)}
</template>-->
<style>

</style>
<script>
    import _ from 'lodash'
    import radioGroup from '../radioGroup'
    import templateInput from '../templateInput'
    export default{
        name: 'vueForm',
        props: {
            /*childComponentDatas: {
             type: Object,
             required: true
             },*/
            /*valueTransform: {
             type: Object
             },*/
            /*submitData: {
             type: Object,
             default: function () {
             return {}
             }
             },*/
            /*submit: {
             type: Function
             }*/
        },
        render: function (h) {
            return (
                    <div class="vueForm">
                        <div class="content">
                            {
                                this.sortChildComponentData.map(function (childComponentData, key) {
                                    var item = childComponentData.item
                                    return (
                                            <div class="row"
                                                 v-show={item.hidden !== true}>
                                                <div class="col-md-3 form-label">
                                                    {
                                                        (function () {
                                                            if (item.require) {
                                                                return <span class="red">*</span>
                                                            }
                                                        })()
                                                    } &nbsp;{item.label} :
                                                </div>
                                                <div class="col-md-9">
                                                <span class={childComponentData.key}>
                                                    {h(item.type, {
                                                        ref: childComponentData.key,
                                                        props: item.componentData
                                                    })}
                                                </span>
                                                </div>
                                            </div>
                                    )
                                })
                            }
                        </div>
                    </div>
            )
        },
        watch: {
            submitData: function (newVal) {
                this.$emit('submit', this.submitData)
            }
        },
        methods: {
            /*formSubmit: function () {
             if (this.validate()) {
             this.gatherValue()
             if (this.submit) {
             this.submit()
             } else {
             this.$emit('submit', this.submitData)
             }
             }
             },
             gatherValue: function () {
             var formVm = this;
             _.forEach(this.valueTransform, function (transformValue, submitDataPath) {
             var submitValue = '';
             var componentValue = '';
             var submitAbsolutePath = 'submitData.' + submitDataPath;
             var transformValueAbsolutePath = 'childComponentDatas.' + transformValue.path;
             var transformKeyAbsolutePath = transformValueAbsolutePath.slice(0,
             transformValueAbsolutePath.indexOf('.componentData') + 14);
             if (transformValue.value) {
             _.set(formVm, submitAbsolutePath, JSON.parse(JSON.stringify(transformValue.value)));
             } else {
             submitValue = _.get(formVm, submitAbsolutePath);
             var gatherTransform = transformValue.gatherTransform;
             componentValue = _.get(formVm, transformValueAbsolutePath);
             var argumentArray = [
             componentValue, _.get(formVm, transformKeyAbsolutePath), submitValue, formVm.submitData,

             ];

             if (gatherTransform && (typeof gatherTransform === 'function')) {
             submitValue = gatherTransform.apply(formVm, argumentArray);
             if (!_.isUndefined(submitValue)) {
             _.set(formVm, submitAbsolutePath, JSON.parse(JSON.stringify(submitValue)));
             }
             } else {
             if (!_.isUndefined(componentValue)) {
             _.set(formVm, submitAbsolutePath, JSON.parse(JSON.stringify(componentValue)));
             }
             }
             }
             })
             },
             backFillValue: function () {

             },
             validate: function () {
             var validateResult = true;
             return validateResult;
             }*/
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
            var setting = this.$options.setting
            var sortChildComponentData = []
            var result = {}
            _.forEach(setting, function (item, key) {
                result[key] = item.componentData
                result[key + 'Setting'] = item
                sortChildComponentData.push({
                    key,
                    item
                });
            });
            result.sortChildComponentData = sortChildComponentData
            return result
        },
        computed: {
            /*sortChildComponentData: function () {
             var setting = {};
             var resutl = [];
             if (!this.childComponentDatas) {
             setting = this.$options.setting
             } else {
             setting = this.childComponentDatas
             }
             setting = JSON.parse(JSON.stringify(setting))
             _.forEach(setting, function (item, key) {
             resutl.push({
             key,
             item
             });
             });
             return resutl
             }*/
        },
        components: {
            templateInput,
            radioGroup
        },
        /*created: function () {
         this.backFillValue();
         }*/
    }


</script>
