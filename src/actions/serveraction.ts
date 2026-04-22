"use server"
import { connectDB } from "@/dbconnect";
import User from "@/model/dbschema";
import { redirect } from "next/navigation";
import { auth } from "../auth"
import { ProfileFormData } from "@/formschema";

export async function registeruser() {
  const session = await auth()
  await connectDB()
  const user = await User.findOne({ username: session?.user?.name })
  if (user) {
    return
  }
  const data = new User({
  username: session?.user?.name,
  email: session?.user?.email,
  profilepicture: session?.user?.image,
  displayName: "",
  bio: "",
  customMessage: "",
  socialLinks: {
    twitter: "",
    github: "",
    website: ""
  }});
   await data.save()

}

export async function getuserdata() {
  const session = await auth();

  if (!session) {
    redirect('/');
  }

  await connectDB();

  const data = await User.findOne({
    username: (session as any).user.name,
  }).lean()

  if (!data) return null;


  return JSON.parse(JSON.stringify(data));
}

export async function updateprofie(data:ProfileFormData){
  const session = await auth();
  await  connectDB()
  await User.updateOne({username:session?.user?.name},{$set:{...data}})
  
}

export async function showcreator(query:string) {
   if (!query) return [];
   await  connectDB()
  const users = await User.find({username: { $regex: query, $options: "i" }},{username:1,_id:0}).limit(10).lean();
  return JSON.parse(JSON.stringify(users));
}