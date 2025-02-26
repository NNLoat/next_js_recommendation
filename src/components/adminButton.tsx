// 'use client';

// import { usePathname } from 'next/navigation';
// import Link from 'next/link';
// import { Button } from '@/components/ui/button';

// export default function AdminButton() {
//   const pathname = usePathname();

//   // Check if the current pathname starts with '/admin'
//   if (pathname.startsWith('/admin')) {
//     return (
//       <Link href="/admin/editProduct">
//         <Button variant="outline" className="text-black">
//           Edit Products
//         </Button>
//       </Link>
//     );
//   }

//   return null; // Render nothing if not on an admin page
// }

"use client";

import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { authStateListener } from "@/lib/auth"; // Import auth listener
import { User } from "firebase/auth";

export default function AdminButton() {
  const [user, setUser] = useState<User | null>(null);
  // const router = useRouter();

  useEffect(() => {
    const unsubscribe = authStateListener((loggedInUser) => {
      setUser(loggedInUser);
    });

    return () => unsubscribe();
  }, []);

  if (!user) return null; // Hide button if user is not logged in

  return (
    <div className="space-x-4">
      <Link href="/admin">
        <Button variant="outline" className="text-black">
          Admin
        </Button>
      </Link>
      <Link href="/admin/editProduct">
        <Button variant="outline" className="text-black">
          Edit Products
        </Button>
      </Link>
    </div>
    
  );
}

