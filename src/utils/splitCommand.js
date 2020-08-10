const { prefix } = require("../../config.json")

module.exports = command => {
    const full = command.replace(prefix, "").trim()
    const name = full.split(/\s+/)[0]
    const args = full.replace(name,"").trim()
    return { name, args, full }
}