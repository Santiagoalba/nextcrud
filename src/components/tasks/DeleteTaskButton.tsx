'use client';

import toast from "react-hot-toast";
import { deleteTask } from "@/app/tasks/actions/delete-task";
import { IoTrashBin } from "react-icons/io5";

interface Props {
    id: number
}

export const DeleteTaskButton = ({ id }: Props) => {
    
    const deleteTaskClient = async (formData: FormData) => {
        const taskId = formData.get('taskid');

        const result = await deleteTask( id );

        toast.success(`Eliminaste correctamente la tarea ${result.name}!`);
    }

  return (
    <form 
        action={deleteTaskClient}
        className="rounded-sm p-2 hover:bg-opacity-80 bg-white items-center font-semibold flex w-max border border-black dark:text-black"
    >
        <input type="hidden" name="taskid" value={id} />
        <button className="flex items-center text-sm" type="submit"><IoTrashBin size={16} className="mr-2"/>Delete</button>
    </form>
  )
}
