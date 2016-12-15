<script>
    import Vue from 'vue';
    import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
    import _ from 'lodash'
    export default{
        name: 'engine',
        props: {
            config: {
                type: Object,
                default: function () {
                    return {
                        renderData: []
                    }
                }
            },
            mapConfig: {
                type: Object,
                default: function () {
                    return {}
                }
            }
        },
        data(){
            return {}
        },
        computed: {
            freezeConfig: function () {
                return _.cloneDeep(this.config);
            },
            freezeMapConfig: function () {
                return _.cloneDeep(this.mapConfig);
            }
        },
        methods: {
            getOptions: function (ref) {
                var refComponent;
                refComponent = this.$options.components[ref]
                if (!refComponent) {
                    refComponent = Vue.component(ref)
                }
                if (refComponent) {
                    return refComponent.options
                }
                return false;
            },
            mergeOptionsByMapConfig: function (definition, itemMapConfig) {
                var vuexSetting = itemMapConfig.vuex;
                var extend = itemMapConfig.extend || {};
                var options = {
                    conputed: {
                        ...extend.computed,
                        ...mapState(vuexSetting.state ? vuexSetting.state : {}),
                        ...mapGetters(vuexSetting.getters ? vuexSetting.getters : {})
                    },
                    methods: {
                        ...extend.methods,
                        ...mapMutations(vuexSetting.mutations ? vuexSetting.mutations : {}),
                        ...mapActions(vuexSetting.actions ? vuexSetting.actions : {})
                    }
                };
                Object.assign(extend, options)
                return Vue.util.mergeOptions(definition, extend);
            },
            createVnode: function (h, item) {
                var data = item.data;
                var mapConfig = this.freezeMapConfig;
                var definition = item.tag;
                var children = [];
                /*if (data && data.ref) {
                    var ref = data.ref;
                    var itemMapConfig = mapConfig[ref];
                    if (itemMapConfig) {
                        definition = this.getOptions(ref)
                        definition = this.mergeOptionsByMapConfig(definition, itemMapConfig)
                    }
                }*/
                if (item.children) {
                    children = item.children.map((childItem, index)=> {
                        return this.createVnode(h, childItem);
                    })
                }
                if (item.data) {
                    if (children.length) {
                        return h(definition, item.data, children);
                    } else {
                        return h(definition, item.data);
                    }
                } else {
                    return h(definition, children);
                    if (children.length) {
                        return h(definition, children);
                    } else {
                        return h(definition);
                    }
                }

            }
        },
        render: function (_h) {
            var wrapVnode = this.createVnode(_h, {
                tag: 'div',
                data: {},
                children: this.freezeConfig.renderData
            });

            var vnode = _h('el-table', {
                ref: "table",
                staticStyle: {"width": "100%"},
            }, [
                _h('el-table-column', {
                    attrs: {
                        "prop": "date",
                        "label": "日期",
                        "width": "180"
                    }
                }), " ", _h('el-table-column', {
                    attrs: {
                        "prop": "name",
                        "label": "姓名",
                        "width": "180"
                    }
                }), " ", _h('el-table-column', {
                    attrs: {
                        "prop": "address",
                        "label": "地址"
                    }
                })
            ])

            return wrapVnode
//            return vnode

        },
        components: {}
    }
</script>
