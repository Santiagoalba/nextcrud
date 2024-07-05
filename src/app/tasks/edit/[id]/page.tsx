import prisma from "@/lib/prisma";
import { Form } from "../../components/form";
import { redirect } from "next/navigation";

interface Params {
    params: {
        id: number;
    }
}

export default async function EditTaskPage({params}: Params) {

    const { id } = params;

    const task = await prisma.task.findFirst({ where: {id: Number(id)}})


  return (
    <div className="flex flex-col">
        {
            !task
            ? `${redirect('/tasks')}`
            : (
                <div className="flex flex-col justify-center items-center h-screen w-screen">
                <h3 className="flex mb-4 text-2xl">Edit task: {`${task?.name}`}</h3>
                    <Form task={task}/>
                </div>
            )
        }
    </div>
  );
}