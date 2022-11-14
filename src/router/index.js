import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/windows",
      name: "windows",
      component: () => import("../views/WindowsView.vue"),
    },
    {
      path: "/heaters",
      name: "heaters",
      component: () => import("../views/HeatersView.vue"),
    },
    {
      path: "/rooms",
      name: "rooms",
      component: () => import("../views/RoomsView.vue"),
    },
    {
      path: "/buildings",
      name: "buildings",
      component: () => import("../views/BuildingsView.vue"),
    },
  ],
});

export default router;
