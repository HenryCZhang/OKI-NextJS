import { useRouter } from 'next/router'
import Link from 'next/link'
import useSWR from 'swr';

export default function Result() {
    const router = useRouter();
    // Define a custom fetcher function
    const fetcher = (url:any) => fetch(url).then((res) => res.json())

    const { data, error } = useSWR(
        router.query.session_id    
            ? `/api/checkout/${router.query.session_id}` 
            : null,
        fetcher
    );
    console.log("router.query.session_id",router.query.session_id)//testing
    console.log("data",data)//testing
    console.log("error",error)//testing

    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>

    return (
        <div>
            <h1>Payment Result</h1>
            <Link href="/">Home</Link>
             <pre>{JSON.stringify(data,null,2) ?? 'Loading...'}</pre>
        </div>
    )
}