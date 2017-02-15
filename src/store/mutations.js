/* 调用mutations是唯一允许更新应用状态的地方 */
import { set } from 'vue'
import * as types from './mutation-types'

export default {
    clear(state){
        state.tableData = [];
    }
}

