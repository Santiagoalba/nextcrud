'use server';

import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

interface Props {
    id: string;
    name: string;
    description: string;
    priority: string;
}

export const updateTask = async ({id, name, description, priority}: Props) => {



    const response = await prisma.task.update({ where: {id: Number(id)}, data: { name, description, priority } })
  
    redirect('/tasks');
}
