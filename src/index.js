require('dotenv').config();
//var giphy = require('giphy-api')(uiuUidQea9c80UbSbQQnlup8hrTCHEdu);

var motivation = require("motivation/lib");
const { Client,
        IntentsBitField,
        EmbedBuilder,
        ActivityType,
        AttachmentBuilder, 
        ApplicationCommandOptionWithChoicesAndAutocompleteMixin} = require('discord.js'); //destructuring
const Quote = require('inspirational-quotes');

const school_duck = new AttachmentBuilder("../SupportDuck/academic_duck.png");
const winner = new AttachmentBuilder("../SupportDuck/win_duck.png");
const prize = new AttachmentBuilder("../SupportDuck/trophy.png");




//Client is the bot so you're initializing a new bot

const client = new Client({
    intents: [ //set of permissions your bot can use to get access to a set of events
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,//allows you to read messages

    ],
});

let status = [
  {
    name: 'good vibes ✨',
    type: ActivityType.Listening,
  },
  {
    name: 'serene quacking',
    type: ActivityType.Listening,
  },
  {
    name: 'the Duck Olympics',
    type: ActivityType.Competing,
  },
  {
    name: 'with duck friends🦆',
    type: ActivityType.Playing,
  },
]

client.on('ready', (c) => {
    console.log(`${c.user.tag} made it online.🦆🦆🦆`);

    setInterval(() => {
        let random = Math.floor(Math.random() * status.length);
        client.user.setActivity(status[random]);
    }, 10000); // 10 seconds
});


client.on('messageCreate', (msg) => {
  let negativity = new Array("mad", "anxious", "sad", "frustrated", "stressed");
  //  console.log(msg.content);
    if (msg.author.bot) {
        return; //we don't want anything if the author of a message is abot
    }

    if(msg.content.toLowerCase() === "hey duck") {
      msg.channel.send("Hey! What's up? 🙂");
    }


   for(let i = 0; i < negativity.length; i++) {
   if(msg.content.toLowerCase().includes(negativity[i])) {
      msg.channel.send("have you tried..... not being " + negativity[i] + " :D");
      msg.channel.send("just kidding have a snickers 🍫👀");
      return;
     }
   }  


});//message Create triggered whenever a new message is detected by the bot


client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;//code below will only run if the msg was a slash command

  if(interaction.commandName === "joke") {
    const jokeData = await fetch('https://icanhazdadjoke.com/', {
    headers: {
      'Accept': 'application/json'
      }
    });

    var jokeObject = await jokeData.json();//making data readable
    interaction.reply(jokeObject.joke.toString());
  }

  if(interaction.commandName === 'inspire'){
    interaction.reply(Quote.getQuote().text.toString() + "\n-- "
                      + Quote.getQuote().author.toString());
  }
  if(interaction.commandName === 'motivation'){
    console.log(motivation.get());
    interaction.reply(motivation.get().text.toString() + "\n-- "
                      + motivation.get().author.toString());
  }

  if(interaction.commandName === 'rps') {
    let plays = new Array(0, 1, 2);
    const rand_index = Math.floor(Math.random() * plays.length);
    const duck = plays[rand_index];
    const player = interaction.options.get('play').value
    var sym = " ";
    if(duck == 0) {
      sym = "🪨";
    } else if (duck == 1) {
      sym = "📃";
    } else {
      sym = "✂️";
    }

    if(duck == player) { // tie
      interaction.reply(sym + "... tie 😑 let's go again!");
    } else if ((duck + 1) % 3 == player) {
      interaction.reply(sym + "... awww man you're too good");
    } else {
      interaction.reply(sym + "... HAHAAAAA NICE! I WIN!");
    } 
  }
  
  if(interaction.commandName === 'scale') {
    const num = interaction.options.get('motivation').value;//need to be the exact same name as the object in rcommandsjs
    //if required was false in rcommands then you need to do )?.value
    console.log(num);
    if(num <= 2) {
      interaction.reply("bro just focus, you're good");
    } else if (num >= 3 && num <= 4) {
      interaction.reply("OKAY one step at a time and you're DUN with your issue 👍");
    } else {
      interaction.reply("AHHHHHHHHHHHHHHHHHHHHH\n jk. \nHave a cookie:\n 🍪🍪🍪");
    }

  }

  if(interaction.commandName === 'achievement') {
    let achievement_unlocked = "ACHIEVEMENT UNLOCKED";

    if(interaction.options.get('unlocked').value === "p") {
      achievement_unlocked = "ACHIEVEMENT UNLOCKED: GETTING YOUR LIFE TOGETHER";
      const certificate = new EmbedBuilder()
      .setTitle(achievement_unlocked)
      .setDescription("Y A H H H")
      .setColor(0xDAA84C)
      .setImage('attachment://win_duck.png');
      interaction.reply({ embeds: [certificate], files:[winner]});
    }
    else if (interaction.options.get('unlocked').value === "a") {
      achievement_unlocked = "ACHIEVEMENT UNLOCKED: ACADEMIC WEAPON";
      const certificate = new EmbedBuilder()
      .setTitle(achievement_unlocked)
      .setDescription("t o o ✨ e a s y ✨")
      .setColor(0xDAA84C)
      .setImage('attachment://academic_duck.png');
      interaction.reply({ embeds: [certificate], files:[school_duck]});
    }
    else {
      achievement_unlocked = "ACHIEVEMENT UNLOCKED: NOICE."
      const certificate = new EmbedBuilder()
      .setTitle(achievement_unlocked)
      .setDescription("you did... something!!!")
      .setColor(0xDAA84C)
      .setImage('attachment://trophy.png');
      interaction.reply({ embeds: [certificate], files:[prize]});
    }

  }

});

client.login(process.env.DISCORD_TOKEN);