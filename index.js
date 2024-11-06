const { Client, Events, GatewayIntentBits } = require('discord.js');
const { token } = require("./config.json");
const { getBetween } = require('@remibutler/easyrandom');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers
    ]
});

client.once(Events.ClientReady, readyEvent => {
    console.log(`Logged in as ${readyEvent.user.displayName}`);
});

const { threats } = require('./extra_junk/paws_threats.json');
client.on(Events.MessageCreate, message => {
    console.log("Someone sent a message");

    if (message.author.bot) return;

    if (message.mentions.has(client.user)) {
        if (message.content.indexOf("kys") != -1) {
            message.reply("Talk all the shit you want you still owe me $80k.");
        } else {
            message.reply(threats[getBetween(0, threats.length-1)]);
        }
    }
});

client.on(Events.GuildMemberAdd, member => {
    const channel = member.guild.channels.cache.find(ch => ch.name === 'general');

    if (!channel || !channel.type !== 'GUILD_TEXT') return;

    channel.send(`Welcome to Norfeesturn University ${member}! Now fork over my $80k`);
});

client.login(token);