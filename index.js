const {	Rocketchat} = require('@rocket.chat/sdk');

const {
	TRY_REGISTER = 'yes',
	SSL_ENABLED,
	NO_SUBSCRIBE,
} = process.env;

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
