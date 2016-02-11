import {Injectable} from "angular2/core";
import {Http} from "angular2/http";

@Injectable()
export class ProgramsService {

    private http;

    constructor(http:Http) {
        this.http = http;
    }

    findPrograms() {
        return new Promise(resolve => {
            this.http.get('http://rrr-api.bendherville.ninja/programs')
                .subscribe(programs => {
                    resolve(programs.json());
                });
        });
    };

    getLatestPlaylist(programId) {
        return new Promise(resolve => {
            this.http.get(`http://rrr-api.bendherville.ninja/programs/${programId}/latestplaylist`)
                .subscribe(playlist => {
                    resolve(playlist.json());
                });
        });
    }
}
