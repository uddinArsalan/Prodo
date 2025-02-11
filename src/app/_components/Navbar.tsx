"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/lib/store/AuthStore";
import { useUser } from "@/hooks/queries/useUser";

const Navbar = () => {
  const { setUserInfo, isLoggedIn, logout } = useAuthStore();
  const { user } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (user) setUserInfo(user);
  }, [user, setUserInfo]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/40">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <div className="flex items-center space-x-3">
          <CheckCircle className="w-8 h-8 text-primary" strokeWidth={2.5} />
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Prodo
          </h1>
        </div>

        <div className="md:hidden">
          <Button
            variant="ghost"
            onClick={toggleMenu}
            className="p-2 text-muted-foreground hover:text-foreground"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <nav className="flex space-x-4">
            {["Features", "Contact", "FAQ"].map((item) => (
              <Button
                key={item}
                variant="ghost"
                className="text-muted-foreground hover:text-foreground rounded-full transition-colors"
              >
                {item}
              </Button>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <Link href="/dashboard">
                  <Button variant="outline" className="rounded-full">
                    Dashboard
                  </Button>
                </Link>
                <Button
                  onClick={logout}
                  className="rounded-full bg-red-500 hover:bg-red-600"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/signup">
                  <Button variant="outline" className="rounded-full">
                    Sign Up
                  </Button>
                </Link>
                <Link href="/login">
                  <Button className="rounded-full">Log In</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-t border-border/40">
          <div className="container mx-auto py-4 px-6">
            <nav className="flex flex-col space-y-4">
              {["Features", "Contact", "FAQ"].map((item) => (
                <Button
                  key={item}
                  variant="ghost"
                  className="text-muted-foreground hover:text-foreground rounded-full transition-colors"
                >
                  {item}
                </Button>
              ))}
            </nav>

            <div className="flex flex-col space-y-4 mt-4">
              {isLoggedIn ? (
                <>
                  <Link href="/dashboard">
                    <Button variant="outline" className="rounded-full w-full">
                      Dashboard
                    </Button>
                  </Link>
                  <Button
                    onClick={logout}
                    className="rounded-full bg-red-500 hover:bg-red-600 w-full"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/signup">
                    <Button variant="outline" className="rounded-full w-full">
                      Sign Up
                    </Button>
                  </Link>
                  <Link href="/login">
                    <Button className="rounded-full w-full">Log In</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
