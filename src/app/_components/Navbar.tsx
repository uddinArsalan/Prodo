import React from "react";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/40">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <div className="flex items-center space-x-3">
          <CheckCircle className="w-8 h-8 text-primary" strokeWidth={2.5} />
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Prodo
          </h1>
        </div>
        
        <div className="flex items-center space-x-6">
          <nav className="flex space-x-4">
            {['Features', 'Contact', 'FAQ'].map((item) => (
              <Button 
                key={item} 
                variant="ghost" 
                className="text-muted-foreground hover:text-foreground rounded-full transition-colors"
              >
                {item}
              </Button>
            ))}
          </nav>
          
          <div className="flex text-foreground items-center space-x-4">
            <Link href="/signup">
            <Button variant="outline" className="rounded-full">
              Sign Up
            </Button>
            </Link>
            <Link href="/login">
            <Button className="rounded-full">
              Log In
            </Button>
            </Link>   
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
