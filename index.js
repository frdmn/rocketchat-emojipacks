const {	Rocketchat} = require('@rocket.chat/sdk');

global.fetch = require("node-fetch");
global.FormData = require('form-data');

// const logger = false || {
// 	debug: (...args) => true || console.log(args),
// 	info: (...args) => true || console.log(args),
// 	warning: (...args) => true || console.log(args),
// 	warn: (...args) => true || console.log(args),
// 	error: (...args) => { console.error(args)},
// };

// Test credentials
const host = 'http://rocketchat.local:3000'
const credentials = {
    username: 'frdmn',
    password: 'frdmn',
};

// Function to connect to RocketChat instance using SDK
async function connect() {
    const client = new Rocketchat({
        logger:console,
        host,
        useSsl: host.match("^https") ? true : false
    });

    await client.connect();
    await client.login(credentials);

    const names = await client.users.onlineNames();
    console.log(names);
}

// Execute connect function
connect()
