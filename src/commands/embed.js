const { MessageEmbed } = require("discord.js")
const awaitMessages = require("../utils/awaitMessages")

async function cmd (message) {
    const embed = new MessageEmbed()

    const messageEmbed = await message.channel.send(embed)

    const refresh = () => messageEmbed.edit(embed)

    const results = await awaitMessages([
        {
            pattern: /^title\s*:?\s+(.+)/si,
            action: groups => {
                embed.setTitle(groups[0])
                refresh()
            }
        },
        {
            pattern: /^author\s*:?\s+(.+?)(?:\s+([^\s]+\.[a-z]+))?$/si,
            action: groups => {
                embed.setAuthor(groups[0],groups[1])
                refresh()
            }
        }
    ])
}

cmd.admin = true

module.exports = cmd