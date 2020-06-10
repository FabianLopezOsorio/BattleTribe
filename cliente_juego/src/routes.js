import escenario from './components/escenario.vue'
import login from './components/login.vue'
import register from './components/register.vue'
import home from './components/home.vue'
import ranking from './components/ranking.vue'
import admin from './components/admin.vue'
import perfil from './components/perfil.vue'
import registro from './components/registro.vue'
import traslado from './components/traslado.vue'

export const routes = [
    { path: "", component: home, name: "home" },
    { path: "/escenario", component: escenario, name: "escenario" },
    { path: "/ranking", component: ranking, name: 'ranking' },
    { path: "/login", component: login, name: "login" },
    { path: "/register", component: register, name: "register" },
    { path: "/admin", component: admin, name: "admin" },
    { path: "/perfil", component: perfil, name: "perfil" },
    { path: "/registro", component: registro, name: "registro" },
    { path: "/traslado", component: traslado, name: "traslado" },
];