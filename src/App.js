const { admins, prefix } = require("../config.json")
const splitCommand = require("./utils/splitCommand")
const codeBox = require("./utils/codeBox")

module.exports = async client => {
    client.on("message", async message => {
        if(message.content.startsWith(prefix)){
            const { name, args } = splitCommand(message.content)
            let command
            try {
                command = require("./commands/" + name)
            } catch(error) {
                return message.channel.send(`La commande ${name} n'existe pas !`)
            }
            if(!command.admin || admins.includes(message.author.id)){
                try {
                    await command(message, args)
                } catch(error){
                    message.channel.send(`La commande ${name} a rencontrée une erreur: ${codeBox(error.message)}`)
                }
            }else{
                message.channel.send(`La commande ${name} est réservée aux admins du bot.`)
            }
        }
    })
}