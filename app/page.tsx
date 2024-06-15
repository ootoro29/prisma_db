import Image from "next/image";
import {auth,signIn,signOut} from "@/app/auth";


export default async function Home() {
  const user = await auth();
  return (
    <div>
      <form action={async() => {
          "use server";
          await signIn("google");
      }}>
          <button>サインイン</button>
      </form>
      <form action={async() => {
          "use server";
          await signOut();
      }}>
          <button>サインアウト</button>
      </form>
      <p>test</p>
      <p>{JSON.stringify(user)}</p>
    </div>
  );
}
