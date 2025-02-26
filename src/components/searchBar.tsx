// import { Input } from "@/components/ui/input";
// import { Search } from "lucide-react";

// export default function SearchBar() {
//   return (
//     <div className="relative w-80">
//       <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
//       <Input
//         type="text"
//         placeholder="Search..."
//         className="pl-10 pr-4 py-2 border border-black bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//       />
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search_result?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center space-x-2">
      <Input
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="bg-white border border-black w-64 px-3 py-2 rounded-md"
      />
      <Button type="submit">Search</Button>
    </form>
  );
}

