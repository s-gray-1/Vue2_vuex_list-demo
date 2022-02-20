import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 所有的任务列表
    list: [],
    // 文本框的内容
    inputValue: 'aaa',
    nextId: 5,
    viewKey: 0
  },
  mutations: {
    initList (state, list) {
      state.list = list
    },
    setInputValue (state, val) {
      // 为store中的inputValue赋值
      state.inputValue = val
    },
    // 添加列表项目
    addItem (state) {
      const obj = {
        id: state.nextId,
        info: state.inputValue,
        done: false
      }
      state.list.push(obj)
      state.nextId++
      state.inputValue = ''
    },
    // 根据id删除对应的任务事项
    removeItem (state, id) {
      // 根据id查找对应项的索引 // 根据索引删除对应的元素
      state.list = state.list.filter(x => x.id !== id)
    },
    // 修改列表项的选中状态
    changeStatus (state, param) {
      const i = state.list.findIndex(x => x.id === param.id)

      if (i !== -1) { state.list[i].done = param.status }
    },
    // 清空已完成事项
    cleanDone (state) {
      state.list = state.list.filter(x => x.done === false)
    },
    // 修改试图的关键字
    changeViewKey (state, key) {
      state.viewKey = key
    }

  },
  actions: {
    async getList (context) {
      const { data } = await axios.get('/list.json')
      console.log(data)
      context.commit('initList', data)
    }
  },
  getters: {
    // 统计未完成的人物的条数
    unDoneLength (state) {
      return state.list.filter(x => x.done === false).length
    },
    infolist (state) {
      switch (state.viewKey) {
        case 0:return state.list
        case 1:
          return state.list.filter(x => !x.done)
        case 2:
          return state.list.filter(x => x.done)
        default:
          return state.list
      }
    }
  },
  modules: {

  }
})
