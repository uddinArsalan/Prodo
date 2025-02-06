'use client'
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock } from 'lucide-react';

const SignupPage = () => {
    const [isLoading, setIsLoading] = useState(false);
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsLoading(false);
    };
  
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-black/95 p-4">
        <Card className="w-full max-w-md bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-zinc-100">
              Create an account
            </CardTitle>
          </CardHeader>
  
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-zinc-200">
                  Full Name
                </Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  className="bg-zinc-800 border-zinc-700 text-zinc-100 placeholder:text-zinc-400 focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>
  
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
                    className="pl-10 bg-zinc-800 border-zinc-700 text-zinc-100 placeholder:text-zinc-400 focus:ring-2 focus:ring-blue-600"
                    required
                  />
                </div>
              </div>
  
              <div className="space-y-2">
                <Label htmlFor="password" className="text-zinc-200">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-zinc-400" />
                  <Input
                    id="password"
                    type="password"
                    className="pl-10 bg-zinc-800 border-zinc-700 text-zinc-100 placeholder:text-zinc-400 focus:ring-2 focus:ring-blue-600"
                    required
                  />
                </div>
              </div>
  
              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Create account"}
              </Button>
            </form>
          </CardContent>
  
          <CardFooter className="flex flex-col space-y-4">
            <p className="text-sm text-zinc-400 text-center">
              Already have an account?{' '}
              <a href="/login" className="text-blue-400 hover:text-blue-300">
                Sign in
              </a>
            </p>
            <p className="text-xs text-zinc-400 text-center">
              By signing up, you agree to our{' '}
              <a href="#" className="text-blue-400 hover:text-blue-300">Terms of Service</a>
              {' '}and{' '}
              <a href="#" className="text-blue-400 hover:text-blue-300">Privacy Policy</a>
            </p>
          </CardFooter>
        </Card>
      </div>
    );
  };

  export default SignupPage