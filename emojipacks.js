#!/usr/bin/env node
const {	Rocketchat } = require('@rocket.chat/sdk');
const program = require('commander');
const request = require('request-promise');
const YAML = require('yaml')
const path = require('path')

// Construct args parser
program
    .option('-y, --yaml <url>', 'URL to Emojipacks YAML file')
    .option('-p, --prefix <prefix>', 'prefix which is used infront of any emoji name')
    .option('-d, --debug', 'enable debug mode')
    .parse(process.argv);

// Show help if no option is given
if (!process.argv.slice(2).length) {
    program.outputHelp();
    process.exit(1);
}

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

function debug(msg){
    if (program.debug){
        console.log(msg);
    }
}

// Function to connect to RocketChat instance using SDK
async function connect() {
    const client = new Rocketchat({
        logger,
        host: config.hostname,
        useSsl: config.hostname.match("^https") ? true : false
    });

    debug('Logging into "'+ config.hostname + '" as "' + config.username + '"...');
    await client.connect();
    await client.login(credentials);

    if (program.yaml) {
        debug('Parsing available emojis from Emojipack "' + program.yaml  + '"...')
        var emojipack = YAML.parse(await request(program.yaml));
        debug('Found ' + emojipack.emojis.length  + ' emojis to import')

        for(emoji of emojipack.emojis){
            // Construct object to process for upload
            var emojiObject = {
                src: emoji.src,
                emoji: await request({uri: emoji.src, encoding: null}),
                name: emoji.name
            };

            if(program.prefix){
                emojiObject.name = program.prefix + '-' + emoji.name
            }

            await uploadEmoji(client, emojiObject);
        }
    }

    // Exit process without error code
    process.exit(0);
}

// // Function to list emojis
// async function listEmoji(client) {
//     const emojis = await client.get('emoji-custom.list');
//     console.log(emojis.emojis.update.length + ' emojis found');
// }

// Function to upload a custom emoji
async function uploadEmoji(client, emojiObject) {
    debug('Trying to upload emoji "' + emojiObject.name + '"...');
    const form = new FormData();
    form.append('emoji', emojiObject.emoji, 'emoji.' + path.extname(emojiObject.src));
    form.append('name', emojiObject.name);

    client.getBody = (data) => data;
    const response = await client.post("emoji-custom.create", form, true, new RegExp(''), {
        customHeaders: {
            ...client.client._headers,
        }
    })

    // Check for API response
    if(response.success){
        console.log('Successfully uploaded "' + emojiObject.name + '"!');
    } else {
        console.log('Couldn\'t upload "' + emojiObject.name + '": ' + response.error);
    }
}

// Start connection to Rocket.Chat API
connect();
