"use client";

import { useState, useEffect } from "react";
import { login, logout, authStateListener } from "@/lib/auth";
import { User } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Login() {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = authStateListener(setUser);
    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  const handleLogin = async () => {
    setError(null);
    try {
      await login(email, password);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {user ? (
        <div className="flex flex-col items-center">
          <p className="text-lg font-semibold">Welcome, {user.email}!</p>
          <Button variant="outline" onClick={handleLogout}>Logout</Button>
        </div>
      ) : (
        <div className="flex flex-col space-y-2">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button onClick={handleLogin}>Login</Button>
        </div>
      )}
    </div>
  );
}
