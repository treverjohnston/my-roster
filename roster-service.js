function PlayerService() {
    //private

    var playersData = [];
    var myRoster = JSON.parse(localStorage.getItem('roster')) || [];

    function saveRoster() {
        localStorage.setItem('roster', JSON.stringify(myRoster))
    }

    //Start the spinner
    // var loading = true;

    // var apiUrl = "http://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=football&response_format=json";

    //TODO
    // var playerService = new PlayerService(apiUrl, ready);

    // function ready() {
    //     loading = false; //stop the spinner

    //     //Now that all of our player data is back we can safely setup our bindings for the rest of the view.
    //     $('some-button').on('click', function () {
    //         var teamSF = playerService.getPlayersByTeam("SF");
    //     })
    // }

    function loadPlayersData() {
        //Lets check the localstorage for the data before making the call.
        var localData = localStorage.getItem('playersData');
        if (localData) {
            playersData = JSON.parse(localData);
            return playersData
            //return will short-circuit the loadPlayersData function
            //this will prevent the code below from ever executing
        }

        var url = "//bcw-getter.herokuapp.com/?url=";
        var endpointUri = "http://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=football&response_format=json";
        var apiUrl = url + encodeURIComponent(endpointUri);

        $.getJSON(apiUrl, function (data) {
            playersData = data.body.players;
            console.log('Player Data Ready')
            console.log('Writing Player Data to localStorage')
            localStorage.setItem('playersData', JSON.stringify(playersData))
            console.log('Finished Writing Player Data to localStorage')
        });
    }
    loadPlayersData(); //call the function above every time we create a new service

    function search(query, cb) {
        results = []
        playersData.filter(function (player) {
            if (player.pro_team.toLowerCase() == query.toLowerCase()) {
                // console.log(player-pro_team)
                results.push(player)
            } if (player.lastname.toLowerCase() == query.toLowerCase() || player.firstname.toLowerCase() == query.toLowerCase() || player.fullname.toLowerCase() == query.toLowerCase()) {
                // console.log(player.fullname)
                results.push(player)
            } if (player.position.toLowerCase() == query.toLowerCase()) {
                // console.log(player.position)
                results.push(player)
            }
        })
        cb(results)
    }

    // function addToRoster(id) {
    //     var count = 0
    //     var players = playersData
    //     for (var i = 0; i < players.length; i++) {
    //         var player = players[i];
    //         if (player.id == id) {
    //             myRoster.forEach((rosterPlayer) => {
    //                 if (myRoster.indexOf(player) == -1) {
    //                     if (rosterPlayer.position == player.position) {
    //                         count++
    //                     }
    //                 }
    //                 if (count <= 0) {
    //                     myRoster.push(player)
    //                 }
    //             });
    //         }
    //     }
    //     saveRoster()
    // }

    function addToRoster(id) {
        var players = playersData
        var count = 0
        for (var i = 0; i < players.length; i++) {
            var player = players[i];
            if (player.id == id) {
                if (myRoster.indexOf(player) == -1) {
                    if (myRoster.includes(player)) {
                        return
                    }
                    myRoster.forEach((rosterPlayer) => {
                        if (myRoster.indexOf(player) == -1) {
                            if (rosterPlayer.position == player.position) {
                                return count++
                            }
                        }
                    })
                    if (count <= 0) {
                        myRoster.push(player)
                    }
                }
            }
        }
        saveRoster()
    }

    function removeFromRoster(id) {
        var players = myRoster
        for (var i = 0; i < players.length; i++) {
            var player = players[i];
            if (player.id == id) {
                var index = myRoster.indexOf(player)
                myRoster.splice(index, 1)
            }
        }
        saveRoster()
    }

    //public

    this.search = function (query, cb) {
        return search(query, cb)
    }

    this.drawResults = function () {
        return getPlayersByTeam(team)
    }

    this.getAddToRoster = function (id) {
        addToRoster(id)
    }

    this.getRemoveFromRoster = function (id) {
        removeFromRoster(id)
    }

    this.getRoster = function () {
        return JSON.parse(JSON.stringify(myRoster))
    }
}