export const requestsModule = {
  namespaced: true,
  state: {
    requests: [],
  },
  getters: {
    getRequests(state, getters, rootState, rootGetters) {
      //return state.requests;
      //filter for all requests with the the same userId as in rootState
      const coachId = rootGetters.userId;
      //  console.log("all requests", state.requests);
      return state.requests.filter((req) => {
        // console.log("req.coachId", req.coachId);
        // console.log("coachId", coachId);
        return req.coachId === coachId;
      });
    },
    hasRequests(state, getters) {
      //   return state.requests && state.requests.length > 0;
      return getters.getRequests && getters.getRequests.length > 0;
    },
  },
  actions: {
    //contact a Coach
    async contactCoach(context, payload) {
      //make new contact object
      const newRequest = {
        // id: Math.random(),
        coachId: payload.coachId,
        userEmail: payload.email,
        message: payload.message,
      };
      //a request node in firebase for this coachId
      //fetch() returns a promise
      const response = await fetch(
        `https://findacoach-31ded-default-rtdb.europe-west1.firebasedatabase.app/requests/${payload.coachId}.json`,
        {
          //for a post request firebase will return a generated id
          method: "POST",
          //string format
          body: JSON.stringify(newRequest),
        }
      );
      //object format again
      const responseData = await response.json();

      //error handling
      if (!response.ok) {
        const error = new Error(responseData.message || "Failed to send request.");
        throw error;
      }
      //add a new prop to the object
      //name from firebase holds the id
      newRequest.id = responseData.name;
      console.log("newRequest.id", newRequest.id);

      //added to local data but not getting sent to server
      // newRequest.coachId = payload.coachId;

      context.commit("addRequest", newRequest);
    },

    //fetch requests to the coach logged in
    async fetchRequests(context, payload) {
      console.log("banan");
      //getting requests from ContactCoach
      //only the once to the active user
      const coachId = context.rootGetters.userId;

      //get requests
      console.log("coachId_fetchRequests", coachId);
      const response = await fetch(
        `https://findacoach-31ded-default-rtdb.europe-west1.firebasedatabase.app/requests/${coachId}.json`
      );

      console.log("banan2");
      //object format
      const responseData = await response.json();

      console.log("responseData", responseData);

      if (!response.ok) {
        const error = new Error(responseData.message || "Failed to fetch request.");
        throw error;
      }
      //transform the data we get
      let requestsFromDB = [];
      for (const key in responseData) {
        const request = {
          id: key,
          coachId: coachId,
          userEmail: responseData[key].userEmail,
          message: responseData[key].message,
        };
        requestsFromDB = [...requestsFromDB, request];
      }
      context.commit("setRequests", requestsFromDB);
    },
  },
  mutations: {
    addRequest(state, payload) {
      state.requests = [...state.requests, payload];
      console.log("payload_addRequest", payload);
    },
    setRequests(state, payload) {
      state.requests = payload;
      console.log("payload_setRequests", payload);
    },
  },
};
