import { createStore } from 'vuex'
import { engagementDataResponse } from '@/store/mockData'

export default createStore({
  state: {
    data: engagementDataResponse
  },
  mutations: {
  },
  getters: {
    data: (state) => {
      return [
        { x: 100, y: 60, val: 10 },
        { x: 30, y: 80, val: 20 },
        { x: 50, y: 40, val: 12 },
        { x: 190, y: 100, val: 40 },
        { x: 80, y: 170, val: 20 }
      ]
    }
  },
  actions: {
  },
  modules: {
  }
})
