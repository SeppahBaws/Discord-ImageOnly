/* Requirements */
const fs = require('fs');
const beautify = require('js-beautify').js;

/* Discord requirements */
const Discord = require('discord.js');
const bot = new Discord.Client();

/* Config file */
const config = require('./config.json');

bot.on('ready', () => {
    console.log(`Ready to go! Logged in as ${bot.user.username}.`);
    bot.user.setActivity("Monitoring image only channels");
});

bot.on('message', message => {
    if (message.author.bot && config.deleteBotMessages) return;

    if (config.imageOnlyEnabled) {
        if (config.imageOnlyChannels.indexOf(message.channel.id) > -1) {
            if (message.attachments.size <= 0) {
                message.delete();
            }
        }
    }
});

bot.login(config.token);