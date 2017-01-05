export default {
    renderData: [
        {
            tag: 'el-form',
            data: {
                staticClass: "demo-form-inline",
                attrs: {
                    "inline": true,
                }
            },
            children: [
                {
                    tag: 'el-form-item',
                    data: {},
                    children: [
                        {
                            tag: 'el-input',
                            data: {
                                directives: [
                                    {
                                        name: "model",
                                        rawName: "v-model",
                                        value: (formInline.user),
                                        expression: "formInline.user"
                                    }
                                ],
                                attrs: {
                                    "placeholder": "审批人"
                                },
                                domProps: {
                                    "value": (formInline.user)
                                },
                                on: {
                                    "input": function ($event) {
                                        formInline.user = $event
                                    }
                                }
                            }
                        }
                    ]
                },
                {
                    tag: 'el-form-item',
                    data: {},
                    children: [
                        {
                            tag: 'el-select',
                            data: {
                                directives: [
                                    {
                                        name: "model",
                                        rawName: "v-model",
                                        value: (formInline.region),
                                        expression: "formInline.region"
                                    }
                                ],
                                attrs: {
                                    "placeholder": "活动区域"
                                },
                                domProps: {
                                    "value": (formInline.region)
                                },
                                on: {
                                    "input": function ($event) {
                                        formInline.region = $event
                                    }
                                }
                            },
                            children: [
                                _c('el-option', {
                                    attrs: {
                                        "label": "区域一",
                                        "value": "shanghai"
                                    }
                                }), _v(" "), _c('el-option', {
                                    attrs: {
                                        "label": "区域二",
                                        "value": "beijing"
                                    }
                                })
                            ]
                        }
                    ]
                },
                {
                    tag: 'el-form-item',
                    data: {},
                    children: [
                        {
                            tag: 'el-button',
                            data: {
                                attrs: {
                                    "type": "primary"
                                },
                                on: {
                                    "click": onSubmit
                                }
                            },
                            children: ["查询"]
                        }
                    ]
                }
            ]
        },
        {
            tag: 'ElButton',
            data: {
                ref: 'button'
            },
            children: ['clear']
        },
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
