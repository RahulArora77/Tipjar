"use client"
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileFormData, profileSchema } from '@/formschema';
import Image from 'next/image'
import { useEffect, useState } from 'react';
import { getuserdata } from '@/actions/serveraction';
import { IUser } from '@/model/dbschema';
import { updateprofie } from '@/actions/serveraction'
import Link from 'next/link';

const page = () => {
  const [userdata, setuserdata] = useState<IUser | undefined>(undefined)
  const [toggleedit, settoggleedit] = useState<boolean>(false)
  const handledit = () => { settoggleedit(!toggleedit) }
  const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
  const wrapperuserdata = async (retries = 3) => {
    try {
      const data = await getuserdata()
      setuserdata(data)
    } catch (err) {
      if (retries > 0) {
        await delay(1000);
        return wrapperuserdata(retries - 1);
      } else {
        console.log("something is wrong")
        await delay(3000);

      }
    }
  };
  useEffect(() => {
    wrapperuserdata()
  }, [])
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      displayName: "",
      bio: "",
      customMessage: "",
      socialLinks: {
        twitter: "",
        github: "",
        website: "",
      },
    },
  });
  useEffect(() => {
    reset(userdata)
  }, [userdata])
  useEffect(() => {
    if (!toggleedit) {
      console.log(userdata)
      reset(userdata)

    }



  }, [toggleedit])
  const onSubmit = async (data: ProfileFormData) => {
    console.log(data)
    await updateprofie(data)


  };
  return (
    <>
      <div className='parent p-20'>
        <div className='head flex flex-col justify-center w-1/2 m-auto rounded-2xl shadow-lg'>
          <div className="profile bg-amber-300 p-10 rounded-2xl text-white flex justify-between items-center">
            <div>
              <div className='size-20 relative'>
                {userdata?.profilepicture && (
                  <Image src={userdata?.profilepicture} alt="Example" fill className="object-cover" />
                )}
              </div>

              <h1>{userdata?.username}</h1>
              <h1>{userdata?.email}</h1>
            </div>
            <div><Link href={`/${userdata?.username}`}>go to page</Link></div>
          </div>
          <div className='form p-10'>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

              <input placeholder="Display Name" {...register("displayName")} className="w-full border p-2 rounded" />
              {errors.displayName && <p className="text-red-500">{errors.displayName.message}</p>}

              <textarea placeholder="Bio" {...register("bio")} className="w-full border p-2 rounded" />

              <textarea placeholder="Message for supporters" {...register("customMessage")} className="w-full border p-2 rounded" />

              {/* 🔗 Social Links Section */}
              <div className="border p-3 rounded">
                <h3 className="font-semibold mb-2">Social Links</h3>

                <input
                  placeholder="Twitter URL"
                  {...register("socialLinks.twitter")}
                  className="w-full border p-2 rounded mb-2"
                />
                {errors.socialLinks?.twitter && (
                  <p className="text-red-500">{errors.socialLinks.twitter.message}</p>
                )}

                <input
                  placeholder="GitHub URL"
                  {...register("socialLinks.github")}
                  className="w-full border p-2 rounded mb-2"
                />
                {errors.socialLinks?.github && (
                  <p className="text-red-500">{errors.socialLinks.github.message}</p>
                )}

                <input
                  placeholder="Website URL"
                  {...register("socialLinks.website")}
                  className="w-full border p-2 rounded"
                />
                {errors.socialLinks?.website && (
                  <p className="text-red-500">{errors.socialLinks.website.message}</p>
                )}
              </div>
              {toggleedit && <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-black text-white p-2 rounded"
              >
                Confirm Changes
              </button>}

            </form>
            <button className='bg-amber-400 w-full p-2 my-5' onClick={handledit}>{toggleedit ? "cancel" : "update"}</button>
          </div>

        </div>

      </div>
      <div className="flex gap-5 p-10 items-center flex-col bg-cyan-800 text-white " >
        <h1 className="text-lg text-white font-bold">Ready to support your favourite creator</h1>
        <button className='bg-amber-400 p-2 border-2 border-amber-400 mr-4  '>Get started</button>
      </div>
    </>
  )
}

export default page