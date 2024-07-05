"use server";

import prisma from "@/lib/prisma";
import { z } from 'zod';

const TaskSchema = z.object({
    name: z.string().min(3, {message: 'Minimum amount of characters is 3'}).max(15, {message: 'Maximum amount of characters is 15'}).trim(),
    description: z.string().min(5, {message: 'Minimum amount of characters is 5'}).max(160, {message: 'Minimum amount of characters is 160'}),
    priority: z.enum(['low', 'medium', 'high', 'urgent'], {message: 'Priority must be one of the following options: low, medium, high or urgent'}),
  });

export async function createTask(name: string, description: string, priority: string) {
    
    const newTask = {name, description, priority};

    console.log(newTask);
    const result = TaskSchema.safeParse(newTask);

    if( !result.success ) {
        let errorMessage: any;
        
        result.error.issues.forEach((issue) => {
            errorMessage = errorMessage + issue.path[0] + ": " + issue.message + ". ";
        });

        return {
            error: errorMessage,
        }
    }

    // if(!name || !description || !priority) {
    //   return;
    // }

    const task = await prisma.task.create({
      data: {
        name: name,
        description: description,
        priority: priority
      }
    })
  }