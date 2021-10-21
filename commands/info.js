/*
Copyright (C) 2020-2021 Nicholas Christopher
Copyright (C) <year> YOUR NAME
This file is part of <bot_name>.
Toast is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published by
the Free Software Foundation, version 3.
Toast is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License
along with Toast.  If not, see <https://www.gnu.org/licenses/>.
*/

const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const { version } = require("../package.json");

module.exports = {
	data: new SlashCommandBuilder()  // Using the slash command builder from @discordjs/builders to create the slash command in Discord. This is required!
		.setName("info")  // see https://discordjs.guide/interactions/registering-slash-commands.html#option-types for more info on slash command builders
		.setDescription("Displays information about <bot_name>"),
	cooldown: 1,  // cooldown for members to use the command in seconds
	guildOnly: false, // whether or not the command can only be used in servers
	async execute(interaction) {  // the function to be run when the command is used
		const {
			client: { uptime, guilds, ws },
			createdTimestamp,
		} = interaction;

		const now = new Date().getTime();

		const serverCount = guilds.cache.size;
		const msgPing = now - createdTimestamp;
        const time = Math.floor(new Date(now - uptime).getTime() / 1000);
		const startedAt = `<t:${time}:R>`;
		const memberCount = guilds.cache
			.reduce((acc, g) => acc + g.memberCount, 0)
			.toLocaleString();

		await interaction.reply({
			embeds: [
				new MessageEmbed()
					.setTitle("💬 Information")
					.setColor("BLUE")
					.setDescription(
						`This is a really cool bot
**[🤖 Add Toast to your server](https://discord.com)**
[🙋 Support Server](https://discord.gg) 
[🐛 Report Bugs](https://github.com)
[🛠️ Source Code](https://github.com)`
					)
					.addField(
						"Server Count",
						`I'm in **${serverCount}** servers with a total of **${memberCount}** members!`,
						true
					)
					.addField(
						"Uptime",
						`Online since **${startedAt}**!`,
						true
					)
					.addField(
						"Latency",
						`I received your message in \`${msgPing}\`ms. WebSocket ping is \`${ws.ping}\`ms`,
						true
					)
					.setFooter(`Toast v${version}`),
			],
		});
	},
};