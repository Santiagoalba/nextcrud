import { redirect } from "next/navigation"

export default function Home() {

  // const createProduct = async (formData: FormData) => {
  //   "use server"
  // }
  redirect('/tasks');

  return (


    <div>
      
      <p>Home Page</p>

    </div>
  );
}
