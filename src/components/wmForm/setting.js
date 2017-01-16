import index from './index'
index.props['settingDefinition'] = {
    nest: {
        render:function (h,component,item) {

            var label = item ? item.label : '默认'
            return (
                <el-form-item label={label}>
                    {component}
                </el-form-item>
            )
        }
    },

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
                nestedData:[{
                    label:this.text.value
                }],
                msg: this.text.value
            }
        }
    },
    methods:{
        backFill:function (submitData) {
            this.text.value = submitData.msg
        }
    }
}
export default index
