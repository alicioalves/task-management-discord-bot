import type { Message } from "discord.js"
import type { TaskManagementService } from "../services/task-management/TaskManagementService"

export const moveTask = async (message: Message, args: string[], taskManagementService: TaskManagementService ) => {
  const [taskId, toColumn] = args

  if (!taskId || !toColumn) {
    message.reply('Usage: !moveTask <taskId> <toColumn>')
    
    return
  }

  try {
    await taskManagementService.updateTask(taskId, {
      column: toColumn
    })

    message.reply(`Task moved to ${toColumn}.`)
  } catch (error) {
    message.reply('An error occurred while moving the task.')
  }
}