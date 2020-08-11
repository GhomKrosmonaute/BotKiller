module.exports = async (channel) => {
  let message;
  do {
    message = await new Promise((resolve) => {
      channel.client.once("message", (message) => {
        if (message.channel === channel) resolve(message);
        resolve(false);
      });
    });
  } while (!message);
  return message;
};
