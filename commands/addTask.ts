import type { Message } from "discord.js"
import type { TaskManagementService } from "../services/task-management/TaskManagementService"

export const addTask = async (message: Message, args: string[], taskManagementService: TaskManagementService ) => {
  const [title] = args

  if (!title) {
    message.reply('Please provide a title for the task')
    
    return
  }

  try {
    await taskManagementService.createTask(title)

    message.reply('Task created.')
  } catch (error) {
    message.reply('An error occurred while creating the task.')
  }
}