"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from 'next/cache';

export async function deleteTask(id: number) {

    const task = await prisma.task.delete({ where: { id }})

    console.log( task );

    revalidatePath('/tasks');

    return task;
  }