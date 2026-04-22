"use client"
import React, { useEffect } from 'react'
import SearchBar from './Searchbar'
import Image from 'next/image'
import { registeruser } from '@/actions/serveraction'
import { signIn } from "next-auth/react"
import { useSession } from "next-auth/react"
import { signOut } from "next-auth/react"
import { useState } from 'react'
import Link from 'next/link'

const Navbar = () => {
  const { data: session,status } = useSession()
  const delay = (ms:number) => new Promise(res => setTimeout(res, ms));
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setmessage] = useState<string>("")
  
const adduser = async (retries = 3) => {
    try {
       await registeruser()
    } catch (err) {
      if (retries > 0) {
        await delay(1000);
       return adduser(retries - 1);
      } else {
        setmessage("please sign in again")
        await delay(3000);
        signOut()
      }
    }
  };

  useEffect(() => {
    if(status==="authenticated"){
      setLoading(true);
      adduser().finally(()=>{setLoading(false)})
    }
   
  }, [status])
  
  const managelogin=()=>{
    if(session){
      signOut()
    }
    else{
      signIn()
    }
  }
  return (
    <div className='bg-blue p-5  bg-cyan-800 text-amber-50 '>
      <div className='flex justify-around items-center border-b-2 p-2'>
          <div className="logo relative size-20 rounded-full bg-amber-50">
            <Image src="/logo.png" alt="Example" fill className="object-cover"/>
          </div>
          <div className='signup flex gap-5 items-center'>
           <SearchBar/>
            {session && <button className="border-2 border-amber-50 py-2 px-5"><Link href="/profile">My Profile</Link></button>}
            <button onClick={() => managelogin()} className="bg-amber-400 border-2 border-amber-400 p-2 ">{session?.user?"Sign Out":"Sign In"}</button>
            </div>
            
      </div>
      
      {loading&& <h1>loading{message}</h1> }
    </div>
    
  )
}

export default Navbar