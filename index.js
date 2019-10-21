const {	Rocketchat} = require('@rocket.chat/sdk');

global.fetch = require("node-fetch");
global.FormData = require('form-data');

// Load config from file
const config = require('./config.json');

// Populate credentials object
const credentials = {
    username:config.username,
    password:config.password
};

// Mute logger function
const logger = false || {
	debug: (...args) => true || console.log(args),
	info: (...args) => true || console.log(args),
	warning: (...args) => true || console.log(args),
	warn: (...args) => true || console.log(args),
	error: (...args) => { console.error(args)},
};

// Function to connect to RocketChat instance using SDK
async function connect() {
    const client = new Rocketchat({
        logger:console,
        host: config.hostname,
        useSsl: config.hostname.match("^https") ? true : false
    });

    await client.connect();
    await client.login(credentials);

    const names = await client.users.onlineNames();
    console.log(names);
}

// Execute connect function
connect()
