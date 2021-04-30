/*
Copyright (C) 2020-2021 Nicholas Christopher
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, version 3.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>
*/

const Discord = require("discord.js");
const db = require("quick.db");

const config = require("../config.json");

const mentionParse = async (mention, client) => {
	mention = mention.trim();

	if (mention.startsWith("<@") && mention.endsWith(">")) {
		mention = mention.slice(2, -1);
	}

	if (mention.startsWith("!")) {
		mention = mention.slice(1);
	}

	try {
		const result = await client.users.fetch(mention);
		return result.tag;
	} catch {
		return mention.substr(0, 32);
	}
};

module.exports = {
	enabled: true,
	hidden: false,
	name: "editquote",
	description: "Edits the specified quote",
	usage: "<Quote ID> <Text> [- <Author>]",
	example: "",
	aliases: ["equote", "quoteedit"],
	cooldown: 10,
	args: true,
	guildOnly: true,
	async execute(message, args) {
		if (
			message.member.permissions.has("MANAGE_GUILD") ||
			message.client.admins.get(message.author.id)
		) {
			if (args.length < 2) {
				return await message.channel.send(
					"❌ **|** Incorrect usage. Specify an existing quote ID & it's new content."
				);
			}

			const quoteID = args.shift();

			const serverQuotes = db.get(`${message.guild.id}.quotes`) || [];
			const quote = serverQuotes[quoteID - 1];

			if (!quote) {
				return await message.channel.send(
					"❌ **|** I couldn't find a quote with that ID."
				);
			}

			const quoteArgs = args.join(" ").split("-");
			let editedAuthor;

			if (quoteArgs.length > 1) {
				editedAuthor = await mentionParse(
					quoteArgs.pop(),
					message.client
				);
			}

			if (
				editedAuthor &&
				(editedAuthor.trim().toLowerCase() === "anon" ||
					editedAuthor.trim().toLowerCase() === "anonymous")
			) {
				editedAuthor = undefined;
			}

			const editedText = quoteArgs.join("-").trim();

			if (
				editedText.length >
				(db.get(`${message.guild.id}.maxQuoteSize`) || 130)
			) {
				return await message.channel.send(
					`❌ **|** Quotes cannot be longer than ${
						db.get(`${message.guild.id}.maxQuoteSize`) || 130
					} characters.`
				);
			}

			serverQuotes[quoteID - 1] = {
				text: editedText,
				author: editedAuthor,
				createdTimestamp: quote.createdTimestamp,
				editedTimestamp: Date.now(),
				quoter: quote.quoter,
				editor: message.author.id,
			};

			db.set(`${message.guild.id}.quotes`, serverQuotes);

			const successEmbed = new Discord.MessageEmbed()
				.setTitle("✅ Edited quote")
				.setColor(config.colors.success)
				.setDescription(
					`"${editedText}"${editedAuthor ? ` - ${editedAuthor}` : ""}`
				)
				.setFooter(`Quote #${quoteID}`);
			await message.channel.send(successEmbed);
		} else {
			await message.channel.send(
				"✋ **|** That action requires the **Manage Guild** permission."
			);
		}
	},
};
