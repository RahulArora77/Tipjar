"use client"
import React, { useState,useEffect } from "react";
import { IUser } from "@/model/dbschema";
import { useParams } from "next/navigation";
import useRazorpay from "../hooks/userazorpay";
import { createOrder } from "@/actions/paymenthandling"
import { varifypayment } from "@/actions/paymenthandling";
import { getpagedetails } from "@/actions/serveraction";


const page = () => {
  const [pagedata, setpagedata] = useState<IUser|{}>({})
  const [paymentdata, setpaymentdata] = useState({amount:0,message:"hello"})
  const { users: params } = useParams()
  const fetchpagedata=async(params:string)=>{
     const pagedetails= await getpagedetails(params)
     if(!pagedetails){
      console.log("usernot exits")
     }
     else{setpagedata(pagedetails)}

  }
  console.log(pagedata)
  useEffect(() => {
    fetchpagedata(String(params))
   
  }, [])
  
  const { loadScript, openCheckout } = useRazorpay();
  const handlechange=(e)=>{
    setpaymentdata({...paymentdata,[e.target.name]:e.target.value})
  }
  const  paymentsuccesshandle=async(response)=>{
    if(response){
      await varifypayment(response)
    }


  }
  const handlePayment = async () => {
    const loaded = await loadScript();
    if (!loaded) return;
    const {amount,message}=paymentdata
    let order= await createOrder(String(params),amount,message)
    if(order){
    const options: RazorpayOptions = {
      //            ↑ no import needed
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
      amount: order.amount,
      currency: order.currency,
      retry: false,
      name: "TipJar",
      order_id: order.id, // from your API route
      prefill: {
        contact: "9999999999",  // ← pass empty string to skip
        email: "",
      },
      handler: (response: RazorpayResponse) => {
        paymentsuccesshandle(response)
      },
    };

    const rzp = openCheckout(options);
    rzp.on('payment.failed',()=>{
      console.log("payement failed")
    })}
    else{console.log("try again")}
  };
  return (
    <div className='parent  bg-gray-50 py-10 px-25'>
      <div className='bg-white shadow-lg rounded-lg'>
        <div>
          <h1 className='text-center text-3xl'>Featured Creater</h1>
        </div>
        <div className='flex justify-around'>
          <div>
            <div className='rounded-full size-20 bg-amber-600'></div>
            <h1>Rahul arora</h1>
            <h2>rahul0777</h2>
          </div>
          <div>
            bio
          </div>
          <div className='flex flex-col'>
            rating
            <button className='border-amber-400 bg-amber-400 p-2 border-2 text-amber-50'>supportme</button>
          </div>

        </div>
        <div>
          <h1>Message from Creator</h1>
        </div>


      </div>
      <div className='flex'>
        <div className='messages'></div>
        <div className="payment p-10 my-10 bg-white shadow-lg rounded-lg">
          <div className='text-xl font-bold p-5 border-b-2 border-amber-300'>Support creator name</div>
          <div className='flex justify-center items-center my-5 gap-2 text-xl font-semibold'>
            <div className='rounded-full size-20  bg-amber-600'></div>
            <div>creator name</div>
          </div>
          <h1 className='font-bold text-lg'>Buy a Tip for Creator</h1>
          <div className='flex gap-3 justify-center py-2'>
            <div className="p-5 shadow-lg bg-amber-400">10</div>
            <div className="p-5 shadow-lg bg-amber-400">20</div>
            <div className="p-5 shadow-lg bg-amber-400">25</div>

          </div>
          <input onChange={(e)=>{handlechange(e)}} value={paymentdata.amount} type="number" name="amount" id="" />
          <input onChange={(e)=>{handlechange(e)}} value={paymentdata.message} type="text" name="message" id="" />
          <button onClick={handlePayment}>pay</button>
        </div>
      </div>
    </div>
  )
}

export default page