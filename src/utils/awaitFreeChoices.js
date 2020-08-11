const awaitMessage = require("./awaitMessage");

module.exports = async (channel, choices, ...params) => {
  let message;
  do {
    message = await awaitMessage(channel);
    await message.delete();
    for (const choice of choices) {
      if (choice.pattern.test(message.content)) {
        const [, ...groups] = choice.pattern.exec(message.content);
        choice.action({ groups, message, choice }, ...params);
      }
    }
  } while (!/^(?:close|done|exit|finish|stop)$/i.test(message.content));
};
