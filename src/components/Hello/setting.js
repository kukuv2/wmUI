import index from './index'
index.props['settingDefinition'] = {
    setting: {
        msg: {
            type: 'templateInput',
            label: '显示信息',
            require: true,
            componentData: {
                template: '%i',
                inputValue: []
            },
        }
    }
}
export default index
