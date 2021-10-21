/*
Copyright (C) 2020-2021 Nicholas Christopher
Copyright (C) <year> YOUR NAME

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

const mongoose = require("mongoose");
const { mongoPath } = require("../config.json");

module.exports = {
	name: "ready",
	once: true,
	async execute(client) {
		console.log(`Logged in as ${client.user.tag} (${client.user.id})`);

		await mongoose.connect(mongoPath, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		console.log("Connected to mongoDB");

		const currentGuilds = client.guilds.cache.map((g) => g.id);

		if (currentGuilds.size <= 0) {
			return console.warn(
				"An error occurred while retrieving guild cache, or this bot isn't in any guilds. Data deletion will be skipped."
			);
		}

		const update = () => {
			client.user.setPresence({
				activities: [
					{
						name: `${client.guilds.cache.size} servers!`,
						type: "WATCHING",
					},
				],
			});
		};
		update();
		setInterval(update, 600000);
	},
};
