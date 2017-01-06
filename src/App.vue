<template>
    <div id="app">
        <div class="box-card el-card componentWrap el-col-8">
            <div class="el-card__header">
                <div class="clearfix">
                    <h2>组件列表</h2>
                </div>
            </div>
            <draggable :list="componentShowList"
                       :options="componentListSortableOption"
                       :clone="clone"
                       class="dragArea">
                <li v-for="item in componentShowList"
                    :data-name="item">
                    <div id="mount" class="el-menu-item">
                        {{item}}
                    </div>
                </li>
            </draggable>
        </div>
        <div class="box-card el-card canvasWrap el-col-8">
            <div class="el-card__header">
                <div class="clearfix">
                    <h2>页面画布</h2>
                </div>
            </div>
            <draggable :list="canvasComponentList"
                       :options="canvasSortableOption"
                       class="canvasSortable"
                       @add="onAdd">
                <div v-for="(item,index) in canvasComponentList"
                     class="canvasItemWrap">
                    <div class="filter filterWrap">
                        <i class="el-icon-edit filter"
                           @click="clickCanvasItem(item)"></i>
                    </div>
                    <component :is="item.name"
                               :ref="item.ref">
                        <draggable :list="canvasComponentList"
                                   v-if="item.name === 'wmForm'"
                                   :options="canvasSortableOption"
                                   class="canvasSortable"
                                   @add="onAdd"></draggable>
                    </component>
                </div>
            </draggable>
        </div>
        <div class="box-card el-card settingForm el-col-8">
            <div class="el-card__header">
                <div class="clearfix">
                    <h2>组件设置</h2>
                </div>
            </div>
            <setting-bridge ref="settingBridge"
                            :setting-data="settingData"
                            :instance="settingInstance"></setting-bridge>
        </div>
    </div>
</template>

<script>
    import checkBox from './components/checkBox/setting'
    import dateTimePicker from './components/dateTimePicker/setting'
    import Hello from './components/Hello/setting'
    import inputWidthLabel from './components/inputWidthLabel/setting'
    import pureButton from './components/pureButton/setting'
    import pureInput from './components/pureInput/setting'
    import radios from './components/radios/setting'
    import wmForm from './components/wmForm/setting'
    import wmTable from './components/wmTable/setting'
    import settingBridge from './components/settingBridge'
    import vue from 'vue'
    import sortable from './directive/vueSortable'
    import draggable from 'vuedraggable'

    export default {
        name: 'App',
        directives: {
            sortable
        },
        components: {
            checkBox,
            dateTimePicker,
            Hello,
            inputWidthLabel,
            pureButton,
            pureInput,
            radios,
            settingBridge,
            wmForm,
            wmTable,
        },
        methods: {
            clone: function (origin) {
                return {
                    name: origin,
                    ref: new Date().getTime()
                }
            },
            renderSettingForm: function (componentName, instance, e) {
                var setting = instance.$options.props.settingDefinition
                setting.id = setting.id ? setting.id + 1 : 1
                this.settingData = setting
                this.settingInstance = instance
//                this.$refs.settingBridge.render(setting);
//                var target = e.target;
//                console.log(arguments);
            },
            clickCanvasItem: function (item) {
                var instance = this.$refs[item.ref]
                if (Array.isArray(instance)) {
                    instance = instance[0]
                }
                var setting = instance.$options.props.settingDefinition
                setting.id = setting.id ? setting.id + 1 : 1
                this.settingData = setting
                this.settingInstance = instance
            },
            onAdd: function (evt) {
                var item = evt.item;
                var name = item.dataset.name;
//                this.canvasComponentList.push({name})
                /*var mountNode = item.childNodes[0];
                 var componentConstruct = me.$options.components[name];
                 var instance = new vue(Object.assign(componentConstruct, {
                 el: mountNode
                 }));
                 var handler = me.renderSettingForm.bind(me, name, instance);
                 item.onclick = handler;*/
            }
        },
        data: function () {
            var me = this;
            return {
                componentList: [
                    'checkBox',
                    'dateTimePicker',
                    'Hello',
                    'inputWidthLabel',
                    'pureButton',
                    'pureInput',
                    'radios',
                    'wmForm',
                    'wmTable',
                ],
                settingData: {},
                settingInstance: {},
                componentListSortableOption: {
                    group: {
                        name: 'canvasSortableGroup',
                        pull: 'clone',
                        put: false
                    },
                    sort: false,
                    animation: 150
                },
                canvasSortableOption: {
                    group: {
                        name: 'canvasSortableGroup1',
                        pull: false,
                        put: ['canvasSortableGroup']
                    },
                    draggable: ".canvasItemWrap",
                    animation: 150,
                    filter: '.filter',
                }
            }
        },
        computed: {
            componentShowList: function () {
                var me = this;
                return this.componentList.map((item) => {
                    var componentConstruct = me.$options.components[item];
                    if (!componentConstruct) {
                        componentConstruct = vue.options.components[item];
                    }
                    var instance = new vue(componentConstruct);
                    me.$options.childInstance[item] = instance;
                    if (instance.$options.name) {
                        return instance.$options.name
                    }
                    return componentConstruct.options.name
                })
            }
        },
        watch: {
            componentShowList: {
                handler: function () {
                },
                immediate: true
            }
        },
        beforeCreate: function () {
            this.$options.childInstance = {};
        }

    }
</script>
<style lang="less"
       rel="stylesheet/less">
    @import './styles/index.less';

    .fullHeight {
        height: 100%;
    }

    .fullWight {
        width: 100%;
    }

    html, body, #app {
        .fullHeight;
        .fullWight;
    }

    @componentWidth: 750px;
    #app {
        display: flex;
        .componentWrap {
            width: 280px;
            height: 100vh;
            font-family: 'microsoft yahei';

            .el-menu-item{
                font-size: 1.6rem;
                height: 2.66667rem;
                line-height: 2;
                font-family: 'helvetica';
            }
        }
        .canvasWrap {
            flex-grow: 1;
            .canvasSortable {
                .fullHeight;
                .canvasItemWrap {
                    position: relative;
                    .filterWrap {
                        position: absolute;
                        z-index: 100;
                        padding: 0 10px;
                        right: 10px;
                        border: 1px solid silver;
                    }
                }
            }
        }
        .settingForm {
            width: 900px;
            background-color: silver;
            #settingBridge{
                background-color: #eff2f7;
                height: 100vh;
            }
        }
    }
</style>
