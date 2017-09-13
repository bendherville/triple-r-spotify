var assert = require('assert');
var YQL = require('yql');
var Nightmare = require('nightmare');
var vo = require('vo');

module.exports = class ActivitiesService {

    findAll() {
        return new Promise((resolve, reject) => {
            var url = "https://www.rrr.org.au/programs/program-guide/";

            var nightmare = Nightmare({waitTimeout: 10000});

            var programAnchors = yield nightmare
                .goto(url)
                .wait(function () {
                    return document.getElementsByClassName('program').length > 0;
                })
                .evaluate(() => {
                    return $('.program a').toArray();
                });

            console.dir(playlistAnchors);

            yield nightmare.end();

            if (programAnchors) {

                var programs = programAnchors.map(program => {
                    return {
                        id: this.createId(program),
                        name: program.content,
                        url: program.href
                    };
                });
                programs = this.uniqueSort(programs);

                resolve(programs);
            } else {
                reject('No programs found: ' + error);
            }
            //
            // new YQL('select * from data.html.cssselect where url="https://www.rrr.org.au/programs/program-guide/" and css=".program a"')
            //     .exec((error, response) => {
            //
            //         if (response
            //             && response.query
            //             && response.query.results
            //             && response.query.results.results
            //             && response.query.results.results.a) {
            //
            //             var programs = response.query.results.results.a.map(program => {
            //                 return {
            //                     id: this.createId(program),
            //                     name: program.content,
            //                     url: program.href
            //                 };
            //             });
            //             programs = this.uniqueSort(programs);
            //             resolve(programs);
            //         } else {
            //             reject('No programs found: ' + error);
            //         }
            //     });
        });
    };

    createId(program) {
        var results = /https:\/\/www.rrr.org.au\/program\/(.+?)\//.exec(program.href);
        return results[1];
    };

    uniqueSort(programs) {
        var uniquePrograms = [];
        programs.forEach(program => {
            if (!uniquePrograms.find(uniqueProgram => uniqueProgram.name === program.name && uniqueProgram.url === program.url)) {
                uniquePrograms.push(program);
            }
        });
        return uniquePrograms.sort((program1, program2) => program1.name.localeCompare(program2.name));
    };

    latestPlaylist(programId) {
        return new Promise((resolve, reject) => {

            vo(function *() {
                var url = 'https://airnet.org.au/program/javascriptEmbed.php?station=4&rpid=' + programId + '&view=3&helperStart=http%3A%2F%2Fwww.rrr.org.au';

                var nightmare = Nightmare({waitTimeout: 10000});

                var playlistAnchors = yield nightmare
                    .goto(url)
                    .wait(function () {
                        return document.getElementsByClassName('playlist-track').length > 0;
                    })
                    .evaluate(() => {
                        return $('.playlist-track td')
                            .not('.trackId')
                            .not('.trackShareUrl')
                            .not('.noTrackContent')
                            .map(function () {
                                return this.innerText;
                            })
                            .toArray();
                    });

                console.dir(playlistAnchors);

                yield nightmare.end();

                var artistTracks;
                if (playlistAnchors) {
                    artistTracks = playlistAnchors
                        .filter(playlistAnchor => playlistAnchor != 'info')
                        .map(artistTrackText => {
                            var [artist, track] = artistTrackText.split(' - ');
                            return {artist, track};
                        });
                }

                console.log(artistTracks);

                return artistTracks;
            })(function (err, artistTracks) {
                if (err) reject(err);
                resolve(artistTracks);
            });
        });
    };
};
