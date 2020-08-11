console.ready = (name) => console.log("[ ready ]", name);

const { token } = require("./config.json");
const { Client } = require("discord.js");
const Enmap = require("enmap");
const App = require("./src/App");

const db = new Enmap({
  name: "db",
  autoFetch: true,
  fetchAll: false,
});

const client = new Client();

(async function () {
  await db.defer;
  console.ready("Enmap");
  await client.login(token);
  console.ready("Client");

  client.db = db;

  App(client).catch(console.error);
})();
