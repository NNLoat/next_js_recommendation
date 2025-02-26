// import BestProduct from "@/components/bestSeller"

// export default function adminPage(){

//     return(
//         <div className="w-full">
//             <BestProduct />
//         </div>
//     )
// }

"use client";

import { useEffect, useState } from "react";
import { authStateListener, logout } from "@/lib/auth";
import { User } from "firebase/auth";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = authStateListener((user) => {
      setUser(user);
      if (!user) {
        router.push("/login"); // Redirect if not authenticated
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await logout();
    router.push("/login"); // Redirect to login after logout
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      {user ? (
        <>
          <p>Welcome, {user.email}</p>
          <Button onClick={handleLogout}>Logout</Button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
