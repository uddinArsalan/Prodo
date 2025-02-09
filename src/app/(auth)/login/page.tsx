"use client";
import React, { useActionState, useEffect } from "react";
import { login } from "@/app/actions/auth";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [state, action, pending] = useActionState(login, undefined);
  const router = useRouter();
  useEffect(() => {
    if (state?.success && state?.redirectTo) {
      router.push(state.redirectTo);
    }
  }, [state]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black/95 p-4">
      <Card className="w-full max-w-md bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-zinc-100">
            Welcome back
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form action={action} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-zinc-200">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-zinc-400" />
                <Input
                  id="email"
                  placeholder="name@example.com"
                  type="email"
                  name="email"
                  className="pl-10 bg-zinc-800 border-zinc-700 text-zinc-100 placeholder:text-zinc-400 focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>
              {state?.errors?.email && (
                <p className="text-red-400">{state.errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="password" className="text-zinc-200">
                  Password
                </Label>
                <a
                  href="#"
                  className="text-sm text-blue-400 hover:text-blue-300"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-zinc-400" />
                <Input
                  id="password"
                  type="password"
                  name="password"
                  className="pl-10 bg-zinc-800 border-zinc-700 text-zinc-100 placeholder:text-zinc-400 focus:ring-2 focus:ring-blue-600"
                  required
                />
                {state?.errors?.password && (
                  <div>
                    <p>Password must:</p>
                    <ul>
                      {state.errors.password.map((error) => (
                        <li className="text-red-400" key={error}>
                          - {error}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              disabled={pending}
            >
              {pending ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex justify-center">
          <p className="text-sm text-zinc-400">
            Don't have an account?{" "}
            <Link href="/signup" className="text-blue-400 hover:text-blue-300">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
