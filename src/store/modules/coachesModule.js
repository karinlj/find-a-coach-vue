export const coachesModule = {
  namespaced: true,
  state: {
    lastFetch: null,
    userIsCoach: false,
    coaches: [
      {
        id: "c1",
        firstname: "Maximilian",
        lastname: "Schwarzmüller",
        areas: ["frontend", "backend", "career"],
        description:
          "I'm Maximilian and I've worked as a freelance web developer for years. Let me help you become a developer as well!",
        hourlyRate: 30,
      },
      {
        id: "c2",
        firstname: "Julie",
        lastname: "Jones",
        areas: ["frontend", "career"],
        description:
          "I am Julie and as a senior developer in a big tech company, I can help you get your first job or progress in your current role.",
        hourlyRate: 35,
      },
    ],
  },
  //get my state
  getters: {
    coaches(state) {
      return state.coaches;
    },
    haveCoaches(state) {
      //if I have any coaches
      return state.coaches && state.coaches.length > 0;
    },
    // isCoach(state) {
    //   return state.userIsCoach;
    // },
    //lint: not using arguments
    isCoach(_, getters, _2, rootGetters) {
      //this approach: have to loop all the coaches
      const coaches = getters.coaches;
      const userId = rootGetters.userId;
      //loop the coaches to see if we already have that userId
      //some(): if some coach fulfills a criteria: return true
      //The difference is in the output. find() will return the value, some() will return a boolean.
      const someCoach = coaches.some((coach) => {
        return coach.id === userId;
      });
      //   const someCoach = coaches.find((coach) => {
      //     return coach.id === userId;
      //     // return false;
      //   });
      //  console.log("someCoach", someCoach);
      return someCoach;
    },
    shouldUpdate(state) {
      const lastFetch = state.lastFetch;
      if (!lastFetch) {
        //we should update if we do not have a timestamp
        return true;
      } else {
        const currentTimestamp = new Date().getTime();
        //return the result of comparing stored and current timestamp
        //if it is more than a minute ago = return true
        return (currentTimestamp - lastFetch) / 1000 > 60;
      }
    },
  },
  actions: {
    //call mutation to register a coach
    async registerCoach(context, payload) {
      //use the real userId from rootGetters
      const userId = context.rootGetters.userId;
      //make new object with matching props
      const coachData = {
        // id: new Date().toISOString(),
        firstname: payload.first,
        lastname: payload.last,
        description: payload.desc,
        hourlyRate: payload.rate,
        areas: payload.areas,
      };
      //console.log("coachData.id_registerCoach_action", coachData.id);
      //send request to firebase to add the coach
      //fetch() is built in to the browser - default: get-request. Returns a promise
      //later you have to sign up before register as coach, so userId already exists
      //PUT: override if already exist (edit)
      //When sending data to a web server, the data has to be a string.
      //JSON.stringify makes object a string like ({"name":"John","age":30,"city":"New York"})
      //the fetch() will only be stored in the const when it is done
      const response = await fetch(
        `https://findacoach-31ded-default-rtdb.europe-west1.firebasedatabase.app/coaches/${userId}.json`,
        {
          method: "PUT",
          body: JSON.stringify(coachData),
        }
      );
      //when we have the response
      //we get the parsed responseData
      // parse back string to object
      //returns a promise
      //res.json() basically is a shortcut for res.text().then(JSON.parse)

      // const responseData = await response.json();
      // console.log("responseData", responseData);

      if (!response.ok) {
        console.log("error");
      }

      // context.commit("registerCoach", coachData);
      context.commit("registerCoach", {
        //take all props and merge them into a new object
        ...coachData,
        id: userId,
      });
    },
    async loadCoaches(context, payload) {
      if (!payload.forceRefresh && !context.getters.shouldUpdate) {
        return;
      }
      //send request only if we shouldUpdate

      //send request to load all coaches from firebase
      const response = await fetch(
        "https://findacoach-31ded-default-rtdb.europe-west1.firebasedatabase.app/coaches.json"
      );
      //parse back to object
      //an object full of coaches
      const responseData = await response.json();
      // console.log("responseData", responseData);

      //error handling
      if (!response.ok) {
        //Error() is bulit in to js
        const error = new Error(responseData.message || "Failed to fetch!");
        throw error;
      }

      let coachesFromDb = [];
      //make response an array instead of object
      //key = one coachId
      for (const key in responseData) {
        const coach = {
          id: key,
          firstname: responseData[key].firstname,
          lastname: responseData[key].lastname,
          description: responseData[key].description,
          hourlyRate: responseData[key].hourlyRate,
          areas: responseData[key].areas,
        };
        //ligger inuti for() ju
        coachesFromDb = [...coachesFromDb, coach];
      }
      //  console.log("coachesFromDb", coachesFromDb);
      context.commit("setCoaches", coachesFromDb);
      context.commit("setFetchTimestamp");
    },
  },
  mutations: {
    //register a coach and add to array
    registerCoach(state, payload) {
      //  console.log("payload_mutations", payload);
      state.coaches = [...state.coaches, payload];
      // state.coaches.push(payload);
      // console.log("coaches_mutations", state.coaches);
    },
    setCoaches(state, payload) {
      state.coaches = payload;
    },
    setFetchTimestamp(state) {
      //current date as timestamp
      state.lastFetch = new Date().getTime();
    },
  },
};
