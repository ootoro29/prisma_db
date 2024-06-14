"use client"
import { useRouter } from "next/navigation";
import { prisma } from "@/auth";
import { FormEvent, useEffect, useState } from "react";

type User = {
    id:string;
    name:string;
    image:string;
}
type Article = {
    id:string
    title:string;
    content:string;
    users:User[];
};

export default function Page() {
    const router = useRouter();
    const [user,setUser] = useState<User|null>(null);
    useEffect(() => {
        const dataFetch = async() => {
            
            
            await fetch(`/api/user/testmail`,{method:"GET"})
            .then(async(res) => {
                console.log(res);
                const user = await res.json();
                setUser({id:user.id,name:user.name,image:user.image});
            })
            
            
        }
        dataFetch();
    },[])
    
    return (
        <div>
            <p>send test</p>
            <div>
                
                {user?.name}
                <p>{prisma ? "true" : "false"}</p>
                
            </div>
        </div>
    );
}