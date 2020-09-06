/**
 *  app.js
 *
 *  Discord bot template.
 */

/*******************
 * Library Imports *
 *******************/
const colors = require("chalk");
const Discord = require("discord.js");
const fetch = require('node-fetch');
const dotenv = require('dotenv').config();


/*********************
 * Global Properties *
 *********************/
const roleIDs = {
    "comp sci": '706898820126212276',
    "comp info systems": '706898908499935325',
    engineering: '750513328819929230',
    cs120: '748931788856098956',
    cs125: '748931828974616577',
    cs160: '748931880451178556',
    cs230: '748933684941553734',
    cs260: '748933794379333723',
    cs290: '748933893247205397',
    cs315: '748933948784115732',
    cs325: '748930889391669249',
    cs360: '748934081928101908',
    cs363: '697156222603886632',
    cs430: '749058909188259861',
    cs440: '748931747663708202',
    cs452: '748934122155540722',
    cs465: '748936610871115987',
    cs470: '748940044999458916',
    cs480: '750529220127752253',
    cs491: '748954666225631322',
    cs495: '748955119223046184',
    engr150: '751509284067475516',
    engr210: '751518122405789818',
    engr215: '751509288727347261',
    engr240: '751509291923407008',
    engr245: '751509294922465412',
    engr271: '751518128655302778',
    engr310: '751509299666354287',
    engr325: '751509302077947977',
    engr340: '751518171176894536',
    engr345: '751518173223977120',
    engr420: '751509306058342440',
    engr470: '751509309376168087',
    engr480: '751518174939447387',
    engr491: '751517911427973181',
}

const emojis = {

}
// Config properties
const CONFIG = {
    // Bot token
    token: process.env.TOKEN,
    // Activity shown when the bot appears 'online'
    defaultActivity: {
        type: "WATCHING", // Activity types: 'PLAYING', 'STREAMING', 'LISTENING', 'WATCHING'
        message: "your mistakes",
    },
};


/*************
 * Functions *
 *************/

 /**
  *  Handle a command from a Discord user.
  *
  *  @param  {Object}     embed           The message object.
  *  @param  {String}     member          The recipient part of the message.
  *  @param  {String}     author          The message header.
  *  @param  {Array}      fields          The message content.
  *  @param  {Array}      reactions       The optional recations to the message.
  *  @param  {String}     finalMsg        The optional final message, to be sent after the previous message.
  *
  *  @note - Discord messages which are treated as commands are expected to look like: "!commandName arg1 arg2 arg3".
  */
function embedTemplate(embed, member, author, fields, reactions, finalMsg) {
  embed.setAuthor(author)
  embed.addFields(fields);
  member.send(embed).then(embedMessage => {
    let promises = [];
    if (reactions) {
      for (var i = 0; i < reactions.length; i++) {
        promises.push(
          embedMessage.react(client.emojis.cache.get(reactions[i]))
        );
      }
    }
    return Promise.all(promises).then(function() {
        if (finalMsg) {
          member.send(finalMsg);
        }
        return embedMessage;
      });
  });
}

/**
 *  Handle a command from a Discord user.
 *
 *  @param  {Object}    msg         The message object.
 *  @param  {String}    command     The `commandName` part of the message.
 *  @param  {Array}     args        The optional list of arguments from the message.
 *
 *  @note - Discord messages which are treated as commands are expected to look like: "!commandName arg1 arg2 arg3".
 */
async function handleCommand(msg, cmd, args) {
    const channel = msg.channel;
    const member = msg.author;
    let embed = new Discord.MessageEmbed();
    let roleID = '';
    switch (cmd) {
        case "major":
            if (channel.type === 'dm') {
              embed = (await embedTemplate(embed, member, 'What is your major?\n',
              [{
                  name: '<:seth:697168106858217593> Computer Science',
                  value: '\u200B'
              },
              {
                  name: '<:aaron:751882504918663308> Computer Information Systems',
                  value: '\u200B',
              },
              {
                  name: '<:beau:751882719889326100> Engineering',
                  value: '\u200B',
              }],
              ['697168106858217593',
              '751882504918663308',
              '751882719889326100'],
              "Please select the appropriate emote, in accordance with your major."));

            } else if (channel.type === 'guild_text') {
                embed
                    .setAuthor('What is your major?');
                channel.send(embed);
            }

            // member.send("Please run the !classes command to enroll the classes you've taken/taking");
            break;
        case "classes":

            // if (channel.type === "dm"){
            //     if (year.includes("5th year")){
            //         roleID = roleIDs.fifthyear;
            //     }else if (year.includes("senior")){
            //         roleID = roleIDs.seniors;
            //     } else if(year.includes("junior")){
            //         roleID = roleIDs.juniors;
            //     } else if(year.includes("sophomore")){
            //         roleID = roleIDs.sophomores;
            //     } else if(year.includes("freshman")){
            //         roleID = roleIDs.freshman;
            //     } else if(year.includes("faculty/staff")){
            //         roleID = roleIDs.facultyStaff;
            //     } else{
            //         member.send("Im sorry something was not correct, please try the !myinfo command again.")
            //     }
            //     let role = await Guild.RoleManager.fetch(roleID)
            //     let memberObj = await Guild.MemberManager.fetch(member.id)
            //     let nickname = await memberObj.setNickname(name);
            //     //console.log(memberObj);
            //     memberObj.roles.add(role);
            //     //memberObj.setNickname(firstName + " " + lastName);
            //     console.log(nickname);
            //     member.send("Your name on the server has been set to: " + name);
            //     member.send("You have been assigned the " + role + ". You now have access to the server! Enjoy!");
            // }
            if (channel.type === 'dm') {
                // Reaction role pole here
                embed
                    .setAuthor('Classes Taken/Taking')
                    .setDescription('Please select the classes you have taken/currently taking.');
                member.send(embed);

            }
            member.send('');
            break;
        case "help":
            embed
                .setAuthor("Role Management Bot Commands")
                .addFields(
                    {
                        name: '!major',
                        value: 'Sends a DM with reactions to self assign major taken/taking.'
                    },
                    {
                        name: '!classes',
                        value: 'Sends a DM with reactions to self assign classes taken/taking.'
                    },
                    {
                        name: '!help',
                        value: 'Lists available commands for this bot.'
                    }
                );
                member.send(embed);
            break;
        default:
            msg.reply(
                `The command ${cmd} probably doesn't exist. Try again?`
            );
            break;
    }
}

/**
 *  Print a Discord message to the console with colors for readability.
 *
 *  @param  {Object}     msg     The message object.
 */
function logMessageWithColors(msg) {
    const d = new Date(msg.createdTimestamp),
        h = d.getHours(),
        m = d.getMinutes(),
        s = d.getSeconds(),
        time = colors.grey(`[${h}:${m}:${s}]`),
        author = colors.cyan(`@${msg.author.username}`);

    console.log(`${time} ${author}: ${msg.content}`);
}

/**************************
 * Discord Initialization *
 **************************/

const client = new Discord.Client();

// Handle bot connected to the server
client.on("ready", () => {
    console.log(colors.green(`Logged in as: ${client.user.tag}`));

    // Set the bot's activity
    client.user
        .setActivity(CONFIG.defaultActivity.message, {
            type: CONFIG.defaultActivity.type,
        })
        .then();
});

// Handle message from user
client.on("message", (msg) => {
    logMessageWithColors(msg);

    // Message is a command (preceded by an exclaimation mark)
    if (msg.content[0] === "!") {
        let words = msg.content.split(" "),
            cmd = words.shift().split("!")[1], // First word, sans exclaimation mark
            args = words; // Everything after first word as an array

        handleCommand(msg, cmd, args);
        return;
    }

    // Handle messages that aren't commands
    if (msg.content === "ping") {
        msg.reply("pong");
    }
});
client.on("guildMemberAdd", (member) => {
    member.send(`Welcome to the ${member} server!\nPlease use the command !major to verify your major.`);

});

// Login with the bot's token
client.login(CONFIG.token).then();
