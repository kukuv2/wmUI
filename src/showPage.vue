<template>
    <div id="a">
        this is show page
    </div>
</template>

<script>
    import Hello from './components/Hello/setting'
    import radioHello from './components/radioHello/setting'
    import settingBridge from './components/settingBridge'
    import vue from 'vue'
    import sortable from './directive/vueSortable'

    export default {
        name: 'App',
        directives: {
            sortable
        },
        components: {
            Hello,
            settingBridge,
            radioHello
        },
        methods:{
        },
        data: function () {
            var me = this;
            return {
            }
        },
        computed: {
        },
        beforeCreate:function () {
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
