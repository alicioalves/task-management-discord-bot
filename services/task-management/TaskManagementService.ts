import type { PrismaClient, Task } from '@prisma/client/'
import { Columns } from '../../constants/columns'

export class TaskManagementService {
  private readonly prisma: PrismaClient

  constructor(prisma: PrismaClient) {
    this.prisma = prisma
  }

  async createTask(title: string): Promise<Task> {
    return this.prisma.task.create({
      data: {
        title,
        column: Columns.TODO
      }
    })
  }

  async updateTask(id: string, params: Partial<Task>): Promise<Task> {
    return this.prisma.task.update({
      where: {
        id
      },

      data: {
        ...params
      }
    })
  }

  async deleteTask(id: string): Promise<Task> {
    return this.prisma.task.delete({
      where: {
        id
      }
    })
  }

  async getTasks(): Promise<Task[]> {
    return this.prisma.task.findMany()
  }

  async findTaskById(id: string): Promise<Task | null> {
    return this.prisma.task.findUnique({
      where: {
        id
      }
    })
  }
}