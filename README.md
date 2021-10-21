# Discord.js Template
### About
This is a template for a Discord.js bot using Discord.js V13 with full support for slash commands. There's an explanation for how to set it up below and in the info.js command, so it should be very easy to get up and running.
### Setup

-   <bot_name> requires **Node.js `v16.8.0`** and **mongoDB `v3.0.0` or higher**.

1. Run `npm install` to install <bot_name>'s dependencies.
2. Copy `config.json.EXAMPLE` to `config.json` & change as necessary.
    - You'll probably want to add your bot's `token`, and add your own user Id to the `admins` array.
3. Run `node deployCommands.js <client Id> [guild Id]` to register slash commands.
    - Replace `<client Id>` with your bot's Id & replace `[guild Id]` with your development guild.
    - When deploying to production, omit `[guild Id]` to create global slash commands, rather than guild ones.
4. Run the bot with `node .`!

Before committing any changes, run `npm run lint:fix` to run ESLint & Prettier. Address any issues ESLint has.

## License

    Copyright (C) 2020-2021 YOUR NAME

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as published by
    the Free Software Foundation, version 3.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
