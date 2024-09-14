import type { Message } from "discord.js"
import type { TaskManagementService } from "../services/task-management/TaskManagementService"

export const updateTask = async (message: Message, args: string[], taskManagementService: TaskManagementService ) => {
  const [taskId, title, description, assigneeId, column] = args

  if (!taskId) {
    message.reply('Please provide a taskId for the task')
    
    return
  }

  if (!title || !description || !assigneeId || !column) {
    message.reply('Please provide at least a title, description, assigneeId, or column for the task')
    
    return
  }

  try {
    await taskManagementService.updateTask(taskId, {
      title,
      description,
      assigneeId,
      column
    })

    message.reply('Task updated.')
  } catch (error) {
    message.reply('An error occurred while updating the task.')
  }
}