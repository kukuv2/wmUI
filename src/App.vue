<template>
    <div id="app">
        <div class="componentWrap">
            <ul v-sortable="componentListSortableOption">
                <template v-for="item in componentShowList">
                    <li :data-name="item">{{item}}</li>
                </template>
            </ul>
        </div>
        <div class="canvasWrap">
            <ul class="canvasSortable" @click="renderSettingForm" v-sortable="canvasSortableOption">
                <template v-for="item in componentShowList">
                    <li :data-name="item">{{item}}</li>
                </template>
            </ul>
        </div>
        <div class="settingForm"></div>
    </div>
</template>

<script>
    import Hello from './components/Hello'
    import sortable from './directive/vue-sortable'

    export default {
        name: 'App',
        directives: {
            sortable
        },
        components: {
            Hello
        },
        methods:{
            renderSettingForm:function (e) {
                var target = e.target;
                var name = target.dataset.name;
                debugger;
                var componentConstruct = this.$options.components['Hello'];
                var instance = new componentConstruct({});
            }
        },
        data: function () {
            var me = this;
            return {
                componentList: ['Hello'],
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
                        debugger;
                        var item = evt.item;
                        var name = item.dataset.name;
                        var componentConstruct = me.$options.components[name];
                        var instance = new componentConstruct({
                            el:item
                        })
                    }
                }
            }
        },
        computed: {
            componentShowList: function () {
                var me = this;
                return this.componentList.map((item) => {
                    var componentConstruct = me.$options.components[item];
                    var instance = new componentConstruct({})
                    me.$options.childInstance[item] = instance;
                    return instance.$options.name
                })
            }
        },
        beforeCreate:function () {
            this.$options.childInstance = {};
        }

    }
</script>

<style lang="less">
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
            .canvasSortable{
                .fullHeight
            }
        }
        .settingForm {
            background-color: silver;
            flex-grow: 1;
        }
    }
</style>
