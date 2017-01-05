<template>
    <div id="app">
        <div class="box-card el-card componentWrap el-col-8">
            <div class="el-card__header">
                <div class="clearfix">
                    <h2>组件列表</h2>
                </div>
            </div>
            <ul v-sortable="componentListSortableOption">
                <template v-for="item in componentShowList">
                    <li :data-name="item">
                        <div class="el-menu-item" id="mount">
                            {{item}}
                        </div>
                    </li>
                </template>
            </ul>
        </div>
        <div class="box-card el-card canvasWrap el-col-8">
            <div class="el-card__header">
                <div class="clearfix">
                    <h2>页面画布</h2>
                </div>
            </div>
            <ul class="canvasSortable"
                v-sortable="canvasSortableOption"></ul>
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
            renderSettingForm: function (componentName, instance, e) {
                var setting = instance.$options.props.settingDefinition
                setting.id = setting.id ? setting.id + 1 : 1
                this.settingData = setting
                this.settingInstance = instance
//                this.$refs.settingBridge.render(setting);
//                var target = e.target;
//                console.log(arguments);
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
                        name: 'canvasSortableGroup',
                        pull: false,
                        put: true
                    },
                    animation: 150,
                    filter: '.component-trash, .component-edit',
                    onFilter: function (evt) {
                        console.log('filter');
                    },
                    onAdd: function (evt) {
                        var item = evt.item;
                        var name = item.dataset.name;
                        var mountNode = item.childNodes[0];
                        var componentConstruct = me.$options.components[name];
                        var instance = new vue(Object.assign(componentConstruct, {
                            el: mountNode
                        }));
                        var handler = me.renderSettingForm.bind(me, name, instance);
                        item.onclick = handler;
                    }
                }
            }
        },
        computed: {
            componentShowList: function () {
                var me = this;
                return this.componentList.map((item) => {
                    var componentConstruct = me.$options.components[item];
                    if(!componentConstruct){
                        componentConstruct = vue.options.components[item];
                    }
                    var instance = new vue(componentConstruct);
                    me.$options.childInstance[item] = instance;
                    if(instance.$options.name){
                        return instance.$options.name
                    }
                    return componentConstruct.options.name
                })
            }
        },
        watch: {
            componentShowList: {
                handler: function () {
                    console.log('fuck');
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
            width: @componentWidth;
            .canvasSortable {
                .fullHeight
            }
        }
        .settingForm {
            flex-grow: 1;

            .el-card__body{
                background-color: #eff2f7;
                height: 100vh;
            }
        }
    }
</style>
