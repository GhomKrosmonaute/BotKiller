const { MessageEmbed } = require("discord.js");
const awaitFreeChoices = require("../utils/awaitFreeChoices");

async function cmd(message) {
  const embed = new MessageEmbed();

  const messageEmbed = await message.channel.send(embed);

  await message.channel.send(
    "Entrez de quoi modifier l'embed. Quand vous aurez fini, tapez `done`"
  );

  await awaitFreeChoices(
    message.channel,
    [
      {
        pattern: /^tit[lr]e\s*:?\s+(.+)/is,
        action: (result, embed, messageEmbed) => {
          embed.setTitle(result.groups[0]);
          messageEmbed.edit(embed);
        },
      },
      {
        pattern: /^aut(?:ho|eu)r\s*:?\s+(.+?)(?:\s+([^\s]+\.[a-z]+))?$/is,
        action: (result, embed, messageEmbed) => {
          let mention =
            result.message.mentions.members.first() ||
            result.message.mentions.users.first();
          if (mention) {
            mention = mention.user || mention;
            embed.setAuthor(
              mention.username,
              mention.displayAvatarURL({ dynamic: true })
            );
          } else {
            embed.setAuthor(result.groups[0], result.groups[1]);
          }
          messageEmbed.edit(embed);
        },
      },
    ],
    embed,
    messageEmbed
  );
}

cmd.admin = true;

module.exports = cmd;
