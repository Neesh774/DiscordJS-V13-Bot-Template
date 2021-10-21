/*
Copyright (C) 2020-2021 YOUR NAME

This file is part of <bot_name>.

<bot_name> is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published by
the Free Software Foundation, version 3.

<bot_name> is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with <bot_name>.  If not, see <https://www.gnu.org/licenses/>.
*/

console.log("Starting <bot_name>...");

const { Client, Collection, Intents, Options } = require("discord.js");
const mongoose = require("mongoose");
const fs = require("fs");

const config = require("./config.json");

const client = new Client({
	intents: [Intents.FLAGS.GUILDS],
	allowedMentions: { parse: [] },
	makeCache: Options.cacheWithLimits({
		MessageManager: 0,
		ThreadManager: 0,
	}),
});

client.admins = config.admins;
client.commands = new Collection();

const commandFiles = fs
	.readdirSync("./commands")
	.filter((file) => file.endsWith(".js"));
const eventFiles = fs
	.readdirSync("./events")
	.filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client));
	} else {
		client.on(event.name, (...args) => event.execute(...args, client));
	}
}

process.on("SIGINT", async () => {
	client.destroy();
	console.log("Destroyed client");
	process.exit(0);
});

client.login(config.token);
