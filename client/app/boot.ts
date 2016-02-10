import {bootstrap} from "angular2/platform/browser";
import App from "./app";
import {provide} from "angular2/core";
import {HTTP_PROVIDERS} from "angular2/http";
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from "angular2/router";
import {SPOTIFY_PROVIDERS} from './spotify/spotify';

bootstrap(App, [
    provide(LocationStrategy, {useClass: HashLocationStrategy}),
    ROUTER_PROVIDERS,
    HTTP_PROVIDERS,
    SPOTIFY_PROVIDERS
]);
