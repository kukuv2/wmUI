import index from './index'
index.props['settingDefinition'] = {
    setting: {
        text: {
            type: 'el-input',
            label: '按钮文案',
            require: true,
            componentData: {
                value:'',
                template: '%i'
            },
        }
    },
    computed: {
        submitData: function () {
            return {
                text: this.text.value
            }
        }
    },
    methods:{
        backFill:function (submitData) {
            this.text.value = submitData.text
        }
    }
}
export default index
