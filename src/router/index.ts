import { createRouter, createWebHistory } from "vue-router";
import DisconnessoView from "../views/DisconnessoView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "disconnesso",
      component: DisconnessoView,
    },
    {
      path: "/home",
      name: "home",
      component: () => import("../views/HomeView.vue"),
    },
  ],
});

export default router;
