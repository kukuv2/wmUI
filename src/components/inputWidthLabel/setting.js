import index from './index'
index.props['settingDefinition'] = {
    setting: {
        msg: {
            type: 'el-input',
            label: '显示信息',
            require: true,
            componentData: {
                value:'',
                template: '%i',
                inputValue: []
            },
        }
    },
    computed: {
        submitData: function () {
            return {
                labelText: this.labelText.value
            }
        }
    },
    methods:{
        backFill:function (submitData) {
            this.labelText.value = submitData.labelText
        }
    }
}
export default index
