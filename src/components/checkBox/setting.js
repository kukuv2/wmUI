import index from './index'
index.props['settingDefinition'] = {
    setting: {
        checkbox: {
            type: 'el-checkbox',
            label: '显示信息',
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
                checkbox: this.checkbox.value
            }
        }
    },
    methods:{
        backFill:function (submitData) {
            this.checkbox.value = submitData.checkbox
        }
    }
}
export default index
