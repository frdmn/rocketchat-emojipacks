const {	Rocketchat } = require('@rocket.chat/sdk');
const program = require('commander');

// Construct args parser
program
    .option('-f, --file <path>', 'Path of the emoji file')
    .option('-n, --emojiname <emoji>', 'Name of the emoji')
    .option('-a, --aliasname <name>', 'Optional alias of the emoi')
    .option('-y, --yaml <url>', 'URL to Emojipacks YAML file')
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

// Function to parse args of script
async function parseArgs(){
    var emojis = [];

    // Check for --yaml switch
    if (program.yaml) {
        console.log('parse yaml file.')
    // Check for single --file
    } else if(program.file) {
        // Make sure emoji name is set
        if(!program.emojiname){
            program.outputHelp();
            process.exit(1);
        }

        // Construct object to process for upload
        var emojiObject = {
            emoji: true,
            name: program.emojiname
        };

        // Check for optional emoji alias
        if(program.aliasname){
            emojiObject.alias = program.aliasname;
        }

        // Push into emojiObject
        emojis.push(emojiObject);
    }

    console.log(emojis)
}

// Function to connect to RocketChat instance using SDK
async function connect() {
    const client = new Rocketchat({
        logger:console,
        host: config.hostname,
        useSsl: config.hostname.match("^https") ? true : false
    });

    await client.connect();
    await client.login(credentials);

    await uploadEmoji(client);
}

// Function to list emojis
async function listEmoji(client) {
    const emojis = await client.get('emoji-custom.list');
    console.log(emojis.emojis.update.length + ' emojis found');
}

// Function to upload a custom emoji
async function uploadEmoji(client) {
    const form = new FormData();
    form.append('emoji', 'test');
    form.append('name', 'test');
    form.append('aliases', 'test');
    client.getBody = (data) => data;
    const emojis = await client.post("emoji-custom.create", form, true, new RegExp(''), {
        customHeaders: {
            ...client.client._headers,
        }
    })
    console.log(emojis);
}

parseArgs();

// Execute connect function
// connect();
