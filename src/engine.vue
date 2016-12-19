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
            getComponent: function (ref) {
                var refComponent;
                refComponent = this.$options.components[ref]
                if (!refComponent) {
                    refComponent = Vue.component(ref)
                }
                if (refComponent) {
                    return refComponent
                }
                return false;
            },
            mergeOptionsByMapConfig: function (component, data, itemMapConfig) {
                var vuexSetting = _.cloneDeep(itemMapConfig.vuex);
                var extend = itemMapConfig.extend || {};
                var config = itemMapConfig.data || {};
                var options = {};
                if(vuexSetting){
                    options = {
                        computed: {
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
                }
                Object.assign(extend, options)
                Object.assign(data, config)
//                var optionsArray = [
//                    'data', 'props', 'computed', 'methods',
//                    'watch',
////                    'el',
//                    'template', 'render', 'beforeCreate',
//                    'created',
//                    'beforeMount',
//                    'mounted',
//                    'beforeUpdate',
//                    'updated',
//                    'beforeDestroy',
//                    'destroyed',
//                    'activated',
//                    'deactivated',
//                    'directives',
//                    'filters',
//                    'components',
//                    'parent',
//                    'mixins',
////                    'name',
//                    'extends',
//                    'delimiters',
//                    'functional'
//                ];
//                var result, cloneDefinition, newDefinition = {};
//                cloneDefinition = _.cloneDeep(definition);
//                optionsArray.forEach(function (item) {
//                            var value = cloneDefinition[item];
//                            if (typeof value === 'function') {
//                                newDefinition[item] = value
//                            } else {
//                                newDefinition[item] = _.cloneDeep(value)
//                            }
//                        }
//                )
                var result = component.extend(extend);

//                result = Vue.util.mergeOptions(newDefinition, extend);
////                result = Vue.util.mergeOptions(cloneDefinition, extend);
//                result.id = result.id ? result.id + 1 : 1
                return result;
            },
            createVnode: function (h, item) {
                var data = _.cloneDeep(item.data || {});
                var mapConfig = this.freezeMapConfig;
                var definition = item.tag;
                var children = [];
                var result;
                if (data && data.ref) {
                    var ref = data.ref;
                    var itemMapConfig = mapConfig[ref];
                    if (itemMapConfig) {
                        definition = this.getComponent(item.tag)
                        result = this.mergeOptionsByMapConfig(definition, data, itemMapConfig)
                    }
                }
                if (item.children) {
                    var cloneChildren = _.cloneDeep(item.children)
                    cloneChildren.forEach((childItem) => {
                                if (typeof childItem === 'string') {
                                    children.push(childItem);
                                }
                                children.push(this.createVnode(h, childItem));
                            }
                    )
                }
                if (result) {
                    return h(result, data, children);
                }
                return h(definition, data, children);


            }
        },
        render: function (_h) {
            var wrapVnode = this.createVnode(
                    _h, {
                        tag: 'div',
                        data: {},
                        children: _.cloneDeep(this.freezeConfig.renderData)
                    }
            );

            /*var vnode = _h('div', {}, [
             _h('el-table', {
             ref: "table",
             staticStyle: {"width": "100%"},
             }, [
             _h('el-table-column', {
             attrs: {
             "prop": "date",
             "label": "日期",
             "width": "180"
             }
             }), _h('el-table-column', {
             attrs: {
             "prop": "name",
             "label": "姓名",
             "width": "180"
             }
             }), _h('el-table-column', {
             attrs: {
             "prop": "address",
             "label": "地址"
             }
             })
             ])
             ])*/

//            return vnode
            return wrapVnode

        },
        components: {}
    }
</script>
