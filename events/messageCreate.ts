
import { TaskManagementService } from '../services/task-management/TaskManagementService'
import prisma from '../database'

import { addTask } from '../commands/addTask'
import { moveTask } from '../commands/moveTask'
import { showTasks } from '../commands/showTasks'
import { updateTask } from '../commands/updateTask'

import type { PrismaClient } from '@prisma/client'
import type { Message } from 'discord.js'

const taskManagementService = new TaskManagementService(prisma)


export const messageCreateHandler = (message: Message, prisma: PrismaClient) => {
  if (message.author.bot) return

  const [command, ...args] = message.content.trim().split(/\s+/)

  switch(command.toLowerCase()) {
    case '!ping':
      message.reply('Pong!')
      break
    case '!echo':
      message.reply(args.join(' '))
      break
    case '!help':
      message.reply('Available commands: !ping, !echo')
      break
    case '!addTask':
      addTask(message, args, taskManagementService)
      break
    case '!moveTask':
      moveTask(message, args, taskManagementService)
      break
    case '!showTasks':
      showTasks(message, taskManagementService)
      break
    case '!updateTask':
      updateTask(message, args, taskManagementService)
      break        
    default:
      break
  }
}