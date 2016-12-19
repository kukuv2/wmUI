export default {
    renderData: [
        {
            tag: 'el-table',
            data: {
                ref: "table",
                staticStyle: {"width": "100%"}
            },
            children: [
                {
                    tag: 'el-table-column',
                    data: {
                        attrs: {
                            "prop": "date",
                            "label": "日期",
                            "width": "180"
                        }
                    }
                }, {
                    tag: 'el-table-column',
                    data: {
                        attrs: {
                            "prop": "name",
                            "label": "姓名",
                            "width": "180"
                        }
                    }
                }, {
                    tag: 'el-table-column',
                    data: {
                        attrs: {
                            "prop": "address",
                            "label": "地址"
                        }
                    }
                }
            ]
        }
    ]
}
