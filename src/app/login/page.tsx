// import Login from "@/components/login";

// export default function LoginPage() {
//   return (
//     <div className="flex items-center justify-center h-screen">
//       <Login />
//     </div>
//   );
// }

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authStateListener } from "@/lib/auth";
import Login from "@/components/login";
import { User } from "firebase/auth";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = authStateListener((user: User | null) => {
      if (user) {
        router.push("/admin"); // ✅ Redirect if logged in
      }
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
      <Login /> {/* ✅ Use your existing login component */}
    </div>
  );
}