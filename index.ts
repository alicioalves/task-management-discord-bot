import { Client, GatewayIntentBits } from 'discord.js'
import dotenv from 'dotenv'
import { Events } from 'discord.js'
import prisma from './database'

import { readyHandler } from './events/ready'
import { messageCreateHandler } from './events/messageCreate'

dotenv.config()

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
})

client.once(Events.ClientReady, () => readyHandler())
client.on(Events.MessageCreate, (message) => messageCreateHandler(message, prisma))

client.login(process.env.DISCORD_BOT_TOKEN)