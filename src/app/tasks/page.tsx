import { TaskCard } from "@/components/tasks/TaskCard";
import prisma from "@/lib/prisma";
import { SimpleTask } from "@/lib/types";
import { z } from 'zod';

const TaskSchema = z.object({
  name: z.string().min(3, {message: 'Minimum amount of characters is 3'}).max(15, {message: 'Maximum amount of characters is 15'}).trim(),
  description: z.string().min(5, {message: 'Minimum amount of characters is 5'}).max(160, {message: 'Minimum amount of characters is 160'}),
  priority: z.enum(['low', 'medium', 'high', 'urgent'], {message: 'Priority must be one of the following options: low, medium, high or urgent'}),
});

async function TaskPage () {

  const tasks = await prisma.task.findMany();


  return (
    <div>
      <h1 className="my-4 text-xl font-medium">Tasks Dashboard</h1>
        <div className="flex-auto flex w-full flex-wrap">
            { tasks.map((task) => {   
              return <TaskCard key={task.id} task={task}/>
            }) }
        </div>
    </div>
    
  )
}

export default TaskPage;
