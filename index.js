const {	Rocketchat} = require('@rocket.chat/sdk');
const fetch = require("node-fetch");

global.fetch = fetch;

// Test credentials
const host = 'http://rocketchat.local:3000'
const credentials = {
    username: 'frdmn',
    password: 'frdmn',
};

async function connect() {
    const client = new Rocketchat({
        logger:console,
        host,
        useSsl:true,
    });

    await client.connect();
}

connect()
