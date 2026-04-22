
import Subbar from "./components/Subbar";
export default function Home() {
  return (
    <>
    <Subbar/>
      <div>
        <div className="bg-gray-300 flex text-l p-4 justify-center gap-1"><p>Join thousands of creators who receive support through</p><p className="font-bold">TipJar</p></div>
      </div>
      <div>
        <h1 className="text-center text-2xl font-semibold pt-4">How it Works</h1>
        <p className="text-center text-l text-gray-800">Support your favourite creator in just few steps.</p>
      </div>
      <div className="flex gap-20 justify-center m-5">
        <div>
          <div className="size-60 bg-amber-300"></div>
          <h1>Find Creator</h1>
        </div>
        <div><div className="size-60 bg-amber-300"></div>
          <h1>Find Creator</h1></div>
        <div><div className="size-60 bg-amber-300"></div>
          <h1>Find Creator</h1></div>
      </div>
      <div className="flex gap-5 p-10 items-center flex-col bg-cyan-800 text-white " >
        <h1 className="text-lg text-white font-bold">Ready to support your favourite creator</h1>
        <button className='bg-amber-400 p-2 border-2 border-amber-400 mr-4  '>Get started</button>
      </div>
    </>
  );
}
