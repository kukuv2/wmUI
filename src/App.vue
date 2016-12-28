<template>
    <div id="app">
        <div class="componentWrap">
            <!--<ul>
                <li draggable="true">fdsfsfdsfsdf</li>
            </ul>-->
            <ul v-sortable="componentListSortableOption">
                <template v-for="item in componentShowList">
                    <li :data-name="item">
                        <div id="mount">
                            {{item}}
                        </div>
                    </li>
                </template>
            </ul>
        </div>
        <div class="canvasWrap">
            <ul class="canvasSortable"
                v-sortable="canvasSortableOption">
                <engine :config="config"></engine>
            </ul>
            <!--<ul @drop="handleDrap"
                @dragenter="handleDrap"
                class="canvasSortable">
                <engine :config="config"></engine>
            </ul>-->
        </div>
        <div class="settingForm">
            <setting-bridge ref="settingBridge"
                            :setting-data="settingData"
                            :instance="settingInstance"></setting-bridge>
        </div>
    </div>
</template>

<script>
    import Hello from './components/Hello/setting'
    import radioHello from './components/radioHello/setting'
    import settingBridge from './components/settingBridge'
    import vue from 'vue'
    import sortable from './directive/vueSortable'
    import engine from './engine'

    export default {
        name: 'App',
        directives: {
            sortable
        },
        components: {
            Hello,
            settingBridge,
            radioHello,
            engine
        },
        methods: {
            handleDrap: function (e) {
                console.log(e);
                var item = e.item;
                debugger
                var name = item.dataset.name;
            },
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
                componentList: ['Hello', 'radioHello'],
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
                config: {},
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
                            var instance = new vue(componentConstruct);
                            me.$options.childInstance[item] = instance;
                            return instance.$options.name
                        }
                )
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
        }

        .canvasWrap {
            width: @componentWidth;

            .canvasSortable {
                .fullHeight
            }

        }
        .settingForm {
            background-color: silver;
            flex-grow: 1;
        }

    }
</style>
