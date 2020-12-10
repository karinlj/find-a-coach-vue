import Vue from "vue";
import VueRouter from "vue-router";
import CoachDetails from "../pages/coaches/CoachDetails";
import CoachesList from "../pages/coaches/CoachesList";
import CoachRegistration from "../pages/coaches/CoachRegistration";
import ContactCoach from "../pages/requests/ContactCoach";
import RequestsRecieved from "../pages/requests/RequestsRecieved";
import NotFound from "../pages/NotFound";

Vue.use(VueRouter);
//new router instance
const coachRouter = new VueRouter({
  routes: [
    {
      path: "/",
      redirect: "/coaches",
    },
    {
      path: "/coaches",
      component: CoachesList,
    },
    {
      path: "/coaches/:id",
      props: true,
      component: CoachDetails,
      children: [{ path: "contact", component: ContactCoach }],
      //coaches/coach1/contact
    },
    {
      path: "/register",
      component: CoachRegistration,
    },
    {
      path: "/requests",
      component: RequestsRecieved,
    },
    {
      path: "/:notFound(.*)",
      component: NotFound,
    },
  ],
  mode: "history",
});

export default coachRouter;
