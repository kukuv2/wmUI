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
            instance: Object
        },
        components: {
            vueForm,
        },
        mounted: function () {
            this.vueFormEl = document.getElementById(`${this.uuid}formHook`)
        },
        render(h){
            var settingData = _.cloneDeep(this.settingData)
            var vueFormElement = {}
            /*if (!this.$refs['vueForm']) {

             } else {
             var temp = this.$refs['vueForm'];
             //                temp.$destroy();
             }*/
            var defaultSetting = {
                extends: vueForm
            }
            var vueFormSetting = vue.util.mergeOptions(defaultSetting, settingData)
            if (!_.isEmpty(settingData)) {
                vueFormElement = h(vueFormSetting, {
                    ref: 'vueForm',
                    on: {
                        submit: this.handleSubmit
                    }
                })
            }
            return (
                    <div id="settingBridge">
                        <div id={`${this.uuid}formHook`}>
                            {vueFormElement}
                        </div>
                    </div>
            )
        },
        methods: {
            handleSubmit: function (data) {
                _.forEach(data,(item,key) => {
                    this.instance.$set(this.instance, key, item)
                })
            }
        }
    }
</script>
<style lang="less">

</style>
