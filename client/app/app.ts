import {Component, provide} from 'angular2/core';
import {ROUTER_PROVIDERS, RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import Programs from './programs/programs';
import Auth from './auth/auth';

@Component({
    selector: 'app',
    providers: [ROUTER_PROVIDERS],
    template: `
        <router-outlet></router-outlet>
    `,
    directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
    {path: '/', redirectTo: ['Programs']},
    {path: '/programs', name: 'Programs', component: Programs},
    {path: '/auth', name: 'Auth', component: Auth}
])
export default class App {
    constructor() {
    }
}
