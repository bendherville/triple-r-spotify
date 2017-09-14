var assert = require('assert');
var YQL = require('yql');
var Nightmare = require('nightmare');
var vo = require('vo');

module.exports = class ProgramsService {

    findAll() {

        console.log("findAll()");

        return new Promise((resolve, reject) => {

            console.log("findAll() promise");

            vo(function *() {

                console.log("findAll() vo");

                var url = "https://www.rrr.org.au/programs/program-guide/";

                var nightmare = Nightmare({waitTimeout: 10000});

                var programAnchors = yield nightmare
                    .goto(url)
                    .wait(function () {
                        return document.getElementsByClassName('program').length > 0;
                    })
                    .evaluate(() => {
                        var anchors = $('.program a');
                        return $.makeArray(anchors.map(k => {
                            var a = anchors[k];
                            return {
                                href: a.href,
                                content: a.innerText
                            }
                        }));
                    });

                yield nightmare.end();

                console.dir(programAnchors);

                return programAnchors;
            })((err, programAnchors) => {
                if (err) reject(err);

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
                    reject('No programs found');
                }
            });
        });
    };

    createId(program) {
        console.log(program);
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
