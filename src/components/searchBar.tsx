// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";

// export default function SearchBar() {
//   const [query, setQuery] = useState("");
//   const router = useRouter();

//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (query.trim()) {
//       router.push(`/search_result?query=${encodeURIComponent(query)}`);
//     }
//   };

//   return (
//     <form onSubmit={handleSearch} className="flex items-center space-x-2">
//       <Input
//         type="text"
//         placeholder="Search products..."
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//         className="bg-white border border-black w-64 px-3 py-2 rounded-md"
//       />
//       <Button type="submit">Search</Button>
//     </form>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const router = useRouter();

  // 🔹 Fetch suggestions when user types
  useEffect(() => {
    if (query.trim().length > 1) {
      fetch(`/api/search_suggestions?query=${query}`)
        .then((res) => res.json())
        .then((data) => {
          setSuggestions(data.suggestions.map((item: { product_name: string }) => item.product_name));
          setShowSuggestions(true);
        })
        .catch((error) => console.error("Error fetching suggestions:", error));
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query]);

  // 🔹 Handle form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search_result?query=${encodeURIComponent(query)}`);
      setShowSuggestions(false);
    }
  };

  // 🔹 Handle clicking on a suggestion
  const handleSelectSuggestion = (suggestion: string) => {
    setQuery(suggestion);
    setShowSuggestions(false);
    router.push(`/search_result?query=${encodeURIComponent(suggestion)}`);
  };

  return (
    <div className="relative">
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

      {/* 🔹 Search Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-10 w-64 bg-white border border-gray-300 mt-1 rounded-md shadow-md">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelectSuggestion(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

