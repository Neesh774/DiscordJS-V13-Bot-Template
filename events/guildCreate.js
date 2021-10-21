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

const { blockedGuilds } = require("../config.json");
const { MessageEmbed } = require("discord.js");
module.exports = {
	name: "guildCreate",
	once: false,
	async execute(guild) {
		if (blockedGuilds?.includes?.(guild.id)) {
			return guild.leave();
		}
		const embed = new MessageEmbed()
			.setTitle("Hi! I'm a bot template")
			.setDescription("If you're seeing this message, you have some work to do to set up your bot.")
			.addField("1", "Replace the `<bot_name>`'s in your projects code with your bot's name,")
			.addField("2", "Replace `YOUR_NAME` in every file with your name, to properly set your copyright over the code.")
			.addField("3", "Do the steps in the README.md to update the files with your information.")
			.setColor("BLUE");
		guild.systemChannel.send({ embeds: [embed] });
	},
};
