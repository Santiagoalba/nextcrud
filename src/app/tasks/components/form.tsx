"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createTask } from "../new/actions/create-task";
import { z } from "zod";
import { useState } from "react";
import { redirect } from "next/navigation";
import { Task } from "@prisma/client";
import { updateTask } from "../actions/update-task";
import { useParams } from "next/navigation";
import Link from "next/link";


const TaskSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Minimum amount of characters is 3" })
    .max(15, { message: "Maximum amount of characters is 15" })
    .trim(),
  description: z
    .string()
    .min(5, { message: "Minimum amount of characters is 5" })
    .max(160, { message: "Minimum amount of characters is 160" }),
  priority: z.enum(["low", "medium", "high", "urgent"], {
    message:
      "Priority must be one of the following options: low, medium, high or urgent",
  }),
});


export const Form = ({task}: {task: Task}) => {
  const [errorsZod, setErrorsZod] = useState<any>();

  let { id } = useParams();
  if (id) id.toString();

  const clientAction = async (formData: FormData) => {

    const name = formData.get("name")?.toString();
    const description = formData.get("description")?.toString();
    const priority = formData.get("priority")?.toString();

    let newFormData = {name, description, priority};

    const validatedData = TaskSchema.safeParse(newFormData);
    

    if (!validatedData.success) {
      setErrorsZod(validatedData.error.format());
      return;
    } else {
      setErrorsZod(null);
    }

    const { name: validatedName, description: validatedDescription, priority: validatedPriority } = validatedData.data;

    // Si no llego la tarea por props crea una nueva tarea.
    if ( !task ) {
      let createdTask = await createTask(validatedName, validatedDescription, validatedPriority);
  
      if (!createdTask) {
        redirect("/tasks");
      } else {
        console.log(createdTask.error);
      }
    // Caso contrario si llego tarea por props debo editar una tarea.
    } else {
      await updateTask({id, name: validatedName, description: validatedDescription, priority: validatedPriority})
    }

  };


  return (
    <form action={clientAction}>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>
            {
              task
              ? ('Edit task')
              : ('Create task')
            }
          </CardTitle>
          <CardDescription>
            Fill the form to { task ? ('Edit the task.') : ('Create a new task.')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input name="name" id="name" placeholder="Name of your task" defaultValue={task?.name} />
              {errorsZod?.name?._errors && <p>{errorsZod.name._errors[0]}</p>}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Description of your task"
                name="description"
                defaultValue={task?.description || ''}
              />
              {errorsZod?.description?._errors && (
                <p>{errorsZod.description._errors[0]}</p>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="priority">Priority</Label>
              <Select name="priority" defaultValue={task?.priority}>
                <SelectTrigger id="priority">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
              {errorsZod?.priority?._errors && (
                <p>{errorsZod.priority._errors[0]}</p>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href='/tasks' className="border border-black dark:border-white p-2 rounded-md">Cancel</Link>
          <Button className="dark:bg-transparent dark:text-white dark:border-white dark:border" type="submit">{
              task
              ? ('Edit task')
              : ('Create task')
            }</Button>
        </CardFooter>
      </Card>
    </form>
  );
};
