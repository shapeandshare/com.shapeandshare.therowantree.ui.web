(function (doc, nav) {
    "use strict";
    var userGUID = 'd7ea6c9e-14de-11e8-b845-b3b77b42da81';

    var accessKeyGuid = '285bc061-a271-4463-89f9-c52567656e48';
    var apiVersion = '0.1.0';
    var api_url = 'http://localhost:5000';

    var stores;
    var storesString = '';
    var storesPanel;

    var pollButton;

    var status;
    var statusString = '';
    var statusPanel;

    function UpdateAllTheThings() {
        // set the initial game state
        updateGameState();

        // build the initial ui
        updateUI();
    }

    function buildStatus() {
        if (status == null) {
            statusString = 'You are dreaming..';
        }
        else{
            statusString = 'You are active.';
        }
        return statusString;
    }

    function buildStores() {
        if (stores == null) {
            storesString = 'Your pockets are empty..';
        }
        else{
            storesString = '+-- stores ----------------<br>';
            for (var key in stores){
                var store_obj = stores[key]
                var amount = store_obj['amount']
                var description = store_obj['description']
                storesString += "| " + key + " (" + amount + ")"
                if (description != null) {
                    storesString += " (" + description + ")";
                }
                storesString += "<br>";
            }
            storesString += '+--------------------------';
        }
        return storesString;
    }

    function updateUI() {
        statusPanel.innerHTML = buildStatus();
        storesPanel.innerHTML = buildStores();
    }

    function updateGameState() {
        var json_packet = { 'guid': userGUID };
        var json_out = JSON.stringify(json_packet);
        updateUserStoresGameState(json_out);
        updateUserStatusGameState(json_out);
    }

    function updateUserStoresGameState(guid) {
        $.ajax({
            url: api_url + '/api/user/stores',
            type: 'POST',
            headers:
                {
                    'Content-type': 'application/json',
                    'API-ACCESS-KEY': accessKeyGuid,
                    'API-VERSION': apiVersion
                },
            data: guid,
            success: function(data) {
                stores = data.stores;
            }
        });
    }

    function updateUserStatusGameState(guid) {
        $.ajax({
            url: api_url + '/api/user/active/state',
            type: 'POST',
            headers:
                {
                    'Content-type': 'application/json',
                    'API-ACCESS-KEY': accessKeyGuid,
                    'API-VERSION': apiVersion
                },
            data: guid,
            success: function(data) {
                status = data.active;
            }
        });
    }

    function initialize() {
        statusPanel = doc.getElementById("statusPanel");
        storesPanel = doc.getElementById("storesPanel");
        pollButton = doc.getElementById("pollButton");
        pollButton.addEventListener("click", function(){
            UpdateAllTheThings;
        });
        // build the initial ui
        updateUI();
        setInterval(UpdateAllTheThings, 1000);
    }
    addEventListener("DOMContentLoaded", initialize);
})(document, navigator);
