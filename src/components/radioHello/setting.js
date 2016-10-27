import index from './index'
index.props['settingDefinition'] = {
    setting: {
        msg: {
            type: 'radioGroup',
            label: '其他优惠',
            require: true,
            hidden: false,
            componentData: {
                radioValue: '1',
                radioData: [{
                    value: '1',
                    label: '互斥',
                    disabled: false
                }, {
                    value: '0',
                    label: '同享',
                    disabled: false
                }]
            }
        }
    }
}
export default index
