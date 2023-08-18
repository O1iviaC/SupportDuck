require('dotenv').config();
const { REST,  Routes, ApplicationCommandOptionType } = require('discord.js');


const commands = [
    {
        name: 'joke',
        description: "Tells a joke",
    },
    {
        name: 'inspire',
        description: "Sends an inspirational quote",
    },
    {
        name: 'motivation',
        description: "Sends a motivational quote",
    },
    {
        name: 'rps',
        description: "Rock, paper, scissors",
        options: [
            {
                name: 'play',//names can't have spaces and must be lower case
                description: "what's your play",
                type: ApplicationCommandOptionType.Number,
                choices: [
                    {
                        name: "ROCK 🪨",
                        value: "0",
                    },
                    {
                        name: 'PAPER📃',
                        value: "1",
                    },
                    {
                        name: 'SCISSORS ✂️',
                        value: "2",
                    },
                ],
                required: true,
            },
        ],
    },
    {
        name: 'scale',
        description: 'adjusted levels of support provided',
        options: [
            {
                name: 'motivation',//names can't have spaces and must be lower case
                description: 'From 1-5 how much motivation do you REALLY need',
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
            
        ],
    },
    {
        name: 'achievement',
        description: 'Sends achievements unlocked',
        options: [
            {
                name: 'unlocked',//names can't have spaces and must be lower case
                description: 'What did they achieve?',
                type: ApplicationCommandOptionType.String,
                choices: [
                    {
                        name: 'personal goal',
                        value: "p",//since we said value is .Number, the value must be a number
                    },
                    {
                        name: 'academic goal',
                        value: "a",
                    },
                    {
                        name: 'other',
                        value: "other",
                    },
                ],
                required: true,
            },
        ],
    },

];

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;

(async () => {
    try {

        console.log('Registering slash commands ...');

        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands }
        );

        console.log('Slash commands registered successfully!');

    } catch (error) {
        console.log(`There was an error: ${error}`);
    }
})();

