var ProgramsService = require('./programs.service');

module.exports = (router) => {

    var programsService = new ProgramsService();

    router.get('/programs', function *() {
        this.body = yield programsService.findAll();
    });

    router.get('/programs/:id/latestplaylist', function *() {
        this.body = yield programsService.latestPlaylist(this.params.id);
    });

};
