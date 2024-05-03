import { titleFont } from "@/config/fonts";
import { redirect } from "next/navigation";

export default function AuthPage() {

  redirect("/auth/login");
  // return (
  //   <main className="">
  //     <h1 className="font-bold text-2xl">Login Page</h1>
  //   </main>
  // );
}
