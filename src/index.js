require("dotenv").config()
const { Client, Collection, Interaction} = require("discord.js")
const fs = require("fs")

global.prefix = ","


const client = new Client({intents: []})
client.commands = new Collection()

const commandFiles = fs.readdirSync("./src/commands").filter(file => file.endsWith(".js"))

commandFiles.forEach(commandFile => {
    const command = require(`./commands/${commandFile}`)
    client.commands.set(command.data.name, command)
})


client.once("ready", () =>{
    console.log(`Ready! Logged in as ${client.user.tag}! I'm on ${client.guilds.cache.size} server(s).`)
    client.user.setActivity({name: "Getting developed.", type: "WATCHING"})
})

client.on("interactionCreate", async (interaction) => {
    if(!interaction.isCommand()) return

    const command = client.commands.get(interaction.commandName)

    if(command) {
        try {
            await command.execute(interaction)
        } catch(error) {
            console.error(error)

            if(interaction.deferred || interaction.replied) {
                interaction.editReply("Error happend. We apologies.")
            }else {
                interaction.reply("Error happend. We apologies.")
            }
        }
    }
})

const CommandHandler = require("./chatCommands")
client.on("message", CommandHandler) 


client.login(process.env.DISCORD_BOT_TOKEN)