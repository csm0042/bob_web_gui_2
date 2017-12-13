// DEFINE DEVICES
//===========================================================================
// Outside devices
var fylt1 = new Device('fylt1-icon', '192.168.86.21');
var fylt2 = new Device('fylt2-icon', '192.168.86.22');
var bylt1 = new Device('bylt1-icon', '192.168.86.24');
// Basement devices
var bmlt1 = new Device('bmlt1-icon', '192.168.86.25');
var wslt1 = new Device('bmlt1-icon', '192.168.86.26');
// First floor devices
var cclt1 = new Device('cclt1-icon', '192.168.86.28');
var ewlt1 = new Device('ewlt1-icon', '192.168.86.27');
var lrlt1 = new Device('lrlt1-icon', '192.168.86.29');
var lrlt2 = new Device('lrlt2-icon', '192.168.86.30');
var drlt1 = new Device('drlt1-icon', '192.168.86.31');
// Second floor devices
var br1lt1 = new Device('br1lt1-icon', '192.168.86.35');
var br1lt2 = new Device('br1lt2-icon', '192.168.86.36');
var br2lt1 = new Device('br2lt1-icon', '192.168.86.37');
var br2lt2 = new Device('br2lt2-icon', '192.168.86.38');
var br3lt1 = new Device('br3lt1-icon', '192.168.86.39');
var br3lt2 = new Device('br3lt2-icon', '192.168.86.40');
// Flex devices
var insight1 = new Device('insight1-icon', '192.168.86.44');
var insight2 = new Device('insight2-icon', '192.168.86.45');


// REFRESH DEVICE STATES
//===========================================================================
function refreshDeviceStates() {
    // Outside devices
    fylt1.getState();
    fylt2.getState();
    bylt1.getState();
    // Basement devices
    bmlt1.getState();
    wslt1.getState();
    // First floor devices
    ewlt1.getState();
    cclt1.getState();
    lrlt1.getState();
    lrlt2.getState();
    drlt1.getState();
    // Second floor devices
    br1lt1.getState();
    br1lt2.getState();
    br2lt1.getState();
    br2lt2.getState();
    br3lt1.getState();
    br3lt2.getState();
    // Flex devices
    insight1.getState();
    insight2.getState();
}


// Device switch visibility control
//===========================================================================
function setVis(id, state) {
    if(state == 'ON') {
        document.getElementById(id).className = "fa fa-toggle-on fa-3x fg-green";
    } else if(state == "OFF") {
        document.getElementById(id).className = "fa fa-toggle-off fa-3x fg-white";
    } else {
        document.getElementById(id).className = "fa fa-exclamation-circle fa-3x fg-red";
    }
}


// AJAX Call for command state changes
//===========================================================================
function setState(id, addr, state) {
    // Look up device address
    var id_sep = id.split("-");
    var dev_name = id_sep[0];
    var dev_addr = addr;
    // Create new HTTP Request object
    var xhttp = new XMLHttpRequest();
    // Create callbacks
       xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //window.alert(this.responseText);
            // Search result for keywords
            if (this.responseText.search(/on/i) != -1 || this.responseText == '1') {
                setVis(id, 'ON');
            }
            if ((this.responseText.search(/off/i) != -1 && this.responseText.search(/offline/i) == -1) || this.responseText.search(/0/i) != -1) {
                setVis(id, 'OFF');
            }
            if (this.responseText.search(/offline/i) != -1 || this.responseText.search(/error/i) != -1) {
                setVis(id, 'OFFLINE');
            }
        }
    };
    // Set URL and header info, then send request
    var url = "php/set_state_socket.php?";
    xhttp.open("POST", url, true); 
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("devname=" + dev_name + "$devaddr=" + dev_addr + "&devcmd=" + state);
}


// AJAX Call for current state querries
//===========================================================================
function getState(id, addr) {
    // Look up device address
    var id_sep = id.split("-");
    var dev_name = id_sep[0];
    var dev_addr = addr;
    // Create new HTTP Request object
    var xhttp = new XMLHttpRequest();
    // Create callbacks
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // Search result for keywords
            if (this.responseText.search(/,on,/i) != -1 || this.responseText == '1') {
                setVis(id, 'ON');
            };
            if ((this.responseText.search(/,off,/i) != -1 && this.responseText.search(/offline/i) == -1) || this.responseText.search(/0/i) != -1) {
                setVis(id, 'OFF');
            };
            if (this.responseText.search(/,offline,/i) != -1 || this.responseText.search(/error/i) != -1) {
                setVis(id, 'OFFLINE');
            }
        }
    };
    // Set URL and header info, then send request
    var url = "php/get_state_socket.php?";   
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("devname=" + dev_name + "$devaddr=" + dev_addr);
}


// DEVICE PROTOTYPE CLASS
//===========================================================================
function Device(id, addr) {
    this.id = id;
    this.addr = addr;
    this.state = 'OFF';

    this.changeState = function(newstate) {
        if (this.state != newstate) {
            setState(this.id, this.addr, newstate);
        }
        this.state = newstate;
        setVis(this.id, this.state);
    };

    this.getState = function() {
        this.state = getState(this.id, this.addr);
        setVis(this.id, this.state);
        return this.state;
    };

    this.toggleState = function() {
        if (this.state == 'OFF') {
            this.state = 'ON';
            setState(this.id, this.addr, this.state);
            setVis(this.id, this.state);
        } else {
            this.state = 'OFF';
            setState(this.id, this.addr, this.state);
            setVis(this.id, this.state);
        }
    };
}


// first state class
//===========================================================================
var first = (function() {
    var state = 'OFF'; // Private Variable
    var pub = {};// public object - returned at end of module
    var id = 'first-icon'; 

    pub.changeState = function(newstate) {
        state = newstate;
        ewlt1.changeState(state);
        cclt1.changeState(state);
        lrlt1.changeState(state);
        lrlt2.changeState(state);
        drlt1.changeState(state);
        setVis(id, state);
    };
    pub.getState = function() {
        return state;
    };
    pub.toggleState = function() {
        if (state == 'OFF') {
            state = 'ON';
            ewlt1.changeState(state);
            cclt1.changeState(state);
            lrlt1.changeState(state);
            lrlt2.changeState(state);
            drlt1.changeState(state);
            setVis(id, state);
        } else {
            state = 'OFF';
            ewlt1.changeState(state);
            cclt1.changeState(state);
            lrlt1.changeState(state);
            lrlt2.changeState(state);
            drlt1.changeState(state);
            setVis(id, state);
        }
    };
    return pub; // expose externally
}());


// second state class
//===========================================================================
var second = (function() {
    var state = 'OFF'; // Private Variable
    var pub = {};// public object - returned at end of module
    var id = 'second-icon'; 

    pub.changeState = function(newstate) {
        state = newstate;
        br1lt1.changeState(state);
        br1lt2.changeState(state);
        br2lt1.changeState(state);
        br2lt2.changeState(state);
        br3lt1.changeState(state);
        br3lt2.changeState(state);
        setVis(id, state);
    };
    pub.getState = function() {
        return state;
    };
    pub.toggleState = function() {
        if (state == 'OFF') {
            state = 'ON';
            br1lt1.changeState(state);
            br1lt2.changeState(state);
            br2lt1.changeState(state);
            br2lt2.changeState(state);
            br3lt1.changeState(state);
            br3lt2.changeState(state);
            setVis(id, state);
        } else {
            state = 'OFF';
            br1lt1.changeState(state);
            br1lt2.changeState(state);
            br2lt1.changeState(state);
            br2lt2.changeState(state);
            br3lt1.changeState(state);
            br3lt2.changeState(state);
            setVis(id, state);
        }
    };
    return pub; // expose externally
}());
