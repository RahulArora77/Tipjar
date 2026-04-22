"use server"
import Razorpay from "razorpay";
import crypto from "crypto";
import { auth } from "../auth";
import { connectDB } from "@/dbconnect";
import { Payment } from "@/model/paymentschema";
const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});
export async function createOrder(param:string,amount:number,message:string) {
  const session= await auth()
  if(!session){
    return 
  }
  const senderUsername=session?.user?.name
  const receiverUsername= param
  const options = {
    amount: amount*100, // amount in paise (₹500)
    currency: "INR",
    receipt: `tip_${senderUsername}${Date.now()}`,
  };
  const order = await razorpay.orders.create(options);
  await connectDB()
  const data = new Payment({ senderUsername: senderUsername,
  receiverUsername: receiverUsername,
  amount: order.amount,
  orderId: order.id,
  message:message
})
  await data.save()
  return order

}
export async function varifypayment(response:RazorpayResponse){
 
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = response
    await connectDB()
    await Payment.updateOne({orderId:razorpay_order_id},{$set:{paymentId:razorpay_payment_id,signature:razorpay_signature}})
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
    .update(body)
    .digest("hex");
    
    if (expectedSignature === razorpay_signature) {
      await Payment.updateOne({orderId:razorpay_order_id},{$set:{status:"success"}})
      return {varified:true}    

  }

}