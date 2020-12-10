import Vue from "vue";
import Vuex from "vuex";
import { coachesModule } from "./modules/coachesModule";
import { requestsModule } from "./modules/requestsModule";

Vue.use(Vuex);

export const store = new Vuex.Store({
  //merging modules
  modules: {
    //namespace-key
    coaches: coachesModule,
    requests: requestsModule,
  },
  state: {
    //later a real userId
    userId: "c3",
  },
  getters: {
    userId(state) {
      return state.userId;
    },
  },
  actions: {},
  mutations: {},
});
