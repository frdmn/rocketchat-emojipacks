const {	Rocketchat} = require('@rocket.chat/sdk');
const fetch = require("node-fetch");

global.fetch = fetch;

const host = 'rocketchat.iwelt.de'

async function connect() {
    const client = new Rocketchat({
        logger:console,
        host,
        useSsl:true,
    });

    await client.connect();
}

connect()
