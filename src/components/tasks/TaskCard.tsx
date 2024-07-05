import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SimpleTask } from "@/lib/types";
import clsx from "clsx";
import { DeleteTaskButton } from "./DeleteTaskButton";
import Link from "next/link";
import { Button } from "../ui/button";

interface Props {
  task: SimpleTask;
}

export const TaskCard = ({ task }: Props) => {
  const { id, name, description, updatedAt, priority } = task;

  return (
    <div className="w-1/3 p-2 min-h-72">
      <Card className="min-h-full flex flex-col border border-black dark:border-white">
        <CardHeader className="rounded-t-md overflow-hidden w-full p-0 flex flex-1 flex-row shadow-none border-none">
            <div className="p-4 text-white w-2/3">
                <CardTitle className="text-xl font-bold text-blue-400">{ name }</CardTitle>
                <CardDescription className={`text-sm text-black dark:text-white`}>{ description }</CardDescription>
            </div>
            <div className="w-1/3 flex flex-col items-center">
                <div className="w-full flex justify-end">
                  <p className={`w-max p-2 text-white text-sm capitalize mt-4 mr-4 rounded-md ${clsx({
                      "bg-red-950": priority === "urgent",
                      "bg-red-600": priority === "high",
                      "bg-green-600": priority === "low",
                      "bg-yellow-600": priority === "medium",
                  }) }`}>{priority}</p>
                </div>

            </div>
        </CardHeader>

        <CardContent className="flex items-center justify-center p-0">
            <div className="mt-auto flex items-end mb-2">
              <DeleteTaskButton id={id}/>
              <Button className="ml-2 h-auto py-2 px-4 border border-black font-semibold text-sm">
                <Link href={`/tasks/edit/${id}`}>
                  Edit
                </Link>
              </Button>
            </div>
        </CardContent>

        <CardFooter className="p-4 bg-gray-100 rounded-b-md">
          <p className="text-sm text-gray-500">Last updated {updatedAt.toDateString()}</p>
        </CardFooter>
      </Card>
    </div>
  );
};
