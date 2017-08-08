function PlayerController() {
    //private
    var service = new PlayerService()

    function drawResults(results) {
        let template = ''
        for (var i = 0; i < results.length; i++) {
            var player = results[i];
            if (player.firstname.length >= 1){
            template += `
                        <div class="col-xs-3">
                            <div class="playerResult">
                                <div class="player-stats text-center">
                                    <h3>${player.fullname}</h3>
                                    <h4>${player.position}-${player.pro_team}</h4>
                                </div>
                                <button class="btn text-center" type="button" onclick="app.controllers.playerController.getAddToRoster(${player.id})">Add</button>
                            </div>
                        </div>
            `
            }
        }
        document.getElementById('results').innerHTML = template
    }

    function drawRoster() {
        template = ''
        var roster = service.getRoster()
        for (var i = 0; i < roster.length; i++) {
            var player = roster[i];
            template += `
                        <div class="playerCard well text-center col-xs-2">
                            <div class="rosterResult">
                                <div class="player-pic">
                                    <img src="${player.photo}" class="img-responsive rosterImage" alt="football player">
                                </div>
                                <div class="player-stats">
                                    <h4>${player.firstname}</h4>
                                    <h4>${player.lastname}</h4>
                                    <h5>${player.position}-${player.pro_team}</h5>
                                </div>
                                <button class="btn btn-warning" type="button" onclick="app.controllers.playerController.getRemoveFromRoster(${player.id})">Remove</button>
                            </div>
                        </div>
                        `
        }
        document.getElementById('player-card').innerHTML = template
    }

    //public

    this.search = function search(e) {
        e.preventDefault();
        var query = e.target.search.value.toLowerCase();
        service.search(query, drawResults);
    }

    this.getAddToRoster = function getAddToRoster(id) {
        service.getAddToRoster(id)
        drawRoster()
    }

    this.getRemoveFromRoster = function getRemoveFromRoster(id) {
        service.getRemoveFromRoster(id)
        drawRoster()
    }
    drawRoster()
}