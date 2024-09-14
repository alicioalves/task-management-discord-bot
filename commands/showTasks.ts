import type { Message } from "discord.js"
import type { TaskManagementService } from "../services/task-management/TaskManagementService"

export const showTasks = async (message: Message, taskManagementService: TaskManagementService ) => {
  try {
    const tasks = await taskManagementService.getTasks()

    const formattedTasks = (status: string) => {
      return tasks
        .filter(task => task.column === status)
        .map(task => `**${task.title}** - ${task.description}: (assigned to <@${task.assigneeId}>)`)  
        .join('\n') || 'No tasks'
    }

    message.reply(`
      **To Do:**
      ${formattedTasks('todo')}
      
      **In Progress:**
      ${formattedTasks('in-progress')}
      
      **Done:**
      ${formattedTasks('done')}
    `)
    
  } catch (error) {
    message.reply('An error occurred while fetching the tasks.')
  }
}