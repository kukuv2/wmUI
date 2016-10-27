<script>
    import vueForm from '../vueForm'
    import vue from 'vue'
    import mixinUuid from '../../mixin/uuid'
    import _ from 'lodash'
    import getVueUtil from '../../mixin/getVueUtil'
    import appendByEl from '../../mixin/appendByEl'
    export default{
        mixins: [mixinUuid, getVueUtil, appendByEl],
        data(){
            return {
                msg: 'hello vue'
            }
        },
        props: {
            settingData: Object,
            instance:Object
        },
        components: {
            vueForm,
        },
        mounted: function () {
            this.vueFormEl = document.getElementById(`${this.uuid}formHook`)
        },
        render(h){
            var settingData = this.settingData
            var vueFormSetting = {}
            /*if (!this.$refs['vueForm']) {

             } else {
             var temp = this.$refs['vueForm'];
             //                temp.$destroy();
             }*/
            var defaultSetting = {
                extends: vueForm
            }
            Object.assign(defaultSetting, settingData);
            if (!_.isEmpty(settingData)) {
                vueFormSetting = h(defaultSetting, {
                    ref: 'vueForm',
                    on:{
                        submit:this.handleSubmit
                    }
                })
            }
            return h('div', {
                attrs: {
                    id: 'settingBridge',
                }
            }, [
                h('div', {
                    attrs: {
                        id: `${this.uuid}formHook`,
                    }
                }, [
                    vueFormSetting
                ])
            ]);
            /*return (
             <div id="settingBridge">
             <div id={`${this.uuid}formHook`}>
             {}
             <newIdVueForm ID={defaultSetting.id} ref="vueForm" id="fuck" ></newIdVueForm>
             </div>
             </div>
             )*/
        },
        methods: {
            handleSubmit:function (data) {
                debugger
                this.instance.$set(this.instance,'msg',data)
            },
            changeForm: function (setting) {

                var vueForm = this.appendByEl(this.vueFormEl, defaultSetting);
                vueForm.$parent = this
                this.$children['vueForm'] = vueForm
            }
        }
    }
</script>
<style lang="less">

</style>
