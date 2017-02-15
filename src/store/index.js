import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)
/*
    state定义应用状态的数据
    actions定义提交触发更改信息的描述（从服务端获取数据，在数据获取完成后调用）
    mutations：唯一允许更新应用状态的地方
    getters: 允许组件从store中获取数据
    modules:modules对象允许将单一的Store拆分成多个Store的同事保存在单一的状态树中
*/
const state = {
    tableData: [
        {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
        }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
        }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
        }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
        }
    ]
}

export default new Vuex.Store({
        state,
        getters,
        actions,
        mutations
    }
)
