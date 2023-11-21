import axios from "axios"
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
  const [data , setData] = useState(null);
   const router = useRouter();
   useEffect(()=>{
    console.log('working');
    if(router.query && router.query.data){
    const query = decodeURIComponent(router.query.data);
    console.log('working',JSON.parse(query));
    try{ 
      setData(JSON.parse(query));
      console.log(data);
    }catch(error){
      console.log(error);
    }
   }
   },[router.query.data])
   
  
  return (
    <main
      className={`flex min-h-screen flex-col items-center mb-2 p-24`}
    >
      <Link href={'/api/authLog'}><button>
        clickHere
      </button></Link>
      <h1>Working</h1>
      <h1>data - {data ? data.display_name : 'hello'}</h1>
    </main>
  )
}
