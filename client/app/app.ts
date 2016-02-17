import {Component, provide} from 'angular2/core';
import {ROUTER_PROVIDERS, RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import Programs from './programs/programs';
import Auth from './auth/auth';
import Login from './login/login';

@Component({
    selector: 'app',
    providers: [ROUTER_PROVIDERS],
    template: `
        <router-outlet></router-outlet>
    `,
    directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
    {path: '/', redirectTo: ['Login']},
    {path: '/programs', name: 'Programs', component: Programs},
    {path: '/auth', name: 'Auth', component: Auth},
    {path: '/login', name: 'Login', component: Login}
])
export default class App {
    constructor() {
    }
}
