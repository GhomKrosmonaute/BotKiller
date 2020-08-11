function cmd(message) {
  message.channel.send("Le test fonctionne.");
}

cmd.admin = true;

module.exports = cmd;
