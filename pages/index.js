import axios from "axios"
import Link from "next/link";

export default function Home() {

  const Func = async ()=>{
    const response = await axios('/api/authLog');
    const data = response.data;

  }
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >
      <Link href={'/api/authLog'}><button>
        clickHere
      </button></Link>
      <h1>Working</h1>
    </main>
  )
}
