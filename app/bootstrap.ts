/// <reference path="../typings/_custom.d.ts" />

import { bootstrap, bind } from 'angular2/angular2';

import { routerInjectables, LocationStrategy, HashLocationStrategy } from 'angular2/router';

import { Spotify } from './spotify/spotify';
import { App } from './app';


var universalInjectables = [
    routerInjectables,
    Spotify,
    bind(LocationStrategy).toClass(HashLocationStrategy)
];

bootstrap(App, [universalInjectables]);
