"use client"
import {useSession,signIn,signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
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
    const {data:session,status} = useSession();
    const router = useRouter();
    const [user,setUser] = useState<User|null>(null);
    const [articles,setArticles] = useState<Article[]>([]);
    const [inputArticle,setInputArticle] = useState<Article>({id:"0",title:"",content:"",users:[]});
    useEffect(() => {
        if(status !== "authenticated")return;
        const dataFetch = async() => {
            await fetch(`/api/user/${session?.user?.email}`,{method:"GET"})
            .then(async(res) => {
                const user = await res.json();
                setUser({id:user.id,name:user.name,image:user.image});
            });
        }
        dataFetch();
    },[status])
    useEffect(() => {
        if(status !== "authenticated")return;
        const dataFetch = async() => {
            if(user === null)return;
            await fetch(`/api/article/${user.id}`,{method:"GET"})
            .then(async(res) => {
                const articles = await res.json() as Article[];
                articles.map((article) => {
                    setArticles((prev) => [...prev,article])
                })
            });
        }
        dataFetch();
    },[user,status]);
    useEffect(() => {
        if(status !== "authenticated")return;
        if(!user)return;
        setInputArticle({id:"0",title:"",content:"",users:[user]});
    },[user,status]);
    
    if(status === "unauthenticated"){
        router.push("/");
        return null;
    }
    if(status === "loading"){
        return (
            <p>Loading...</p>
        );
    }
    const onSubmitHandler = async(e:FormEvent) => {
        e.preventDefault();
        if(!user)return;
        const res = await fetch('/api/article',{
            method:"POST",
            headers: {
                'Content-Type':"application/json"
            },
            body: JSON.stringify({title:inputArticle.title,content:inputArticle.content,user_id:user.id})
        })
        const data = await res.json() as Article;
        console.log(data);
        setArticles((prev) => [...prev,{id:data.id,title:data.title,content:data.content,users:[user]}])
        setInputArticle({id:"0",title:"",content:"",users:[]});
    }
    return (
        <div>
            <p>aaa</p>
            <p>{JSON.stringify(session)}</p>
            <button onClick={() => signOut()}>サインアウト</button>
            <form onSubmit={onSubmitHandler}>
                <input type="text" name="title" value={inputArticle.title} 
                        onChange={(e) => {
                            const changedInputArticle:Article = {id:inputArticle.id,title:e.target.value,content:inputArticle.content,users:[]}
                            setInputArticle(changedInputArticle);
                        }} />
                <input type="text" name="content" value={inputArticle.content} 
                        onChange={(e) => {
                            const changedInputArticle:Article = {id:inputArticle.id,title:inputArticle.title,content:e.target.value,users:[]}
                            setInputArticle(changedInputArticle);
                        }} />
                <button type="submit">送信</button>
            </form>
            <div>
                {
                    articles.map((article,i) => (
                        <div key={i}>
                            {
                                article.users.map((user,i) => (
                                    <div key = {i} style={{width:"100%",display:"flex",flexDirection:"row"}}>
                                        <p>{user.name}</p>
                                        <img src={user.image} alt="prof" style={{width:50,height:50}} />
                                    </div>       
                                ))
                            }
                            <p>{article.title}</p>
                            <p>{article.content}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}