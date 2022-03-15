const { SlashCommandBuilder } = require("@discordjs/builders")
module.exports = {
    data: new SlashCommandBuilder().setName("ping").setDescription("Makes you getting pinged. hehe"),
    async execute(interaction) {
        interaction.reply("Tried to ping you but failed. sob.")

    }
}