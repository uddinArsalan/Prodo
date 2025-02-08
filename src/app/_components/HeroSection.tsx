import { Button } from '@/components/ui/button'
import { ChevronRight, Rocket } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const HeroSection = () => {
  return (
    <div className="bg-black relative overflow-hidden pt-24 pb-16">
    <div className="container mx-auto px-6 flex flex-col items-center">
      <div className="max-w-4xl text-center space-y-6">
        <div className="inline-flex items-center rounded-full bg-accent/30 px-4 py-1.5 text-sm text-foreground/80 mx-auto">
          <Rocket className="mr-2 h-4 w-4 text-primary" />
          Boost Your Productivity
        </div>
        
        <h1 className="text-5xl font-extrabold tracking-tight text-foreground lg:text-6xl">
          Organize Your Work, 
          Simplify Your Life
        </h1>
        
        <p className="mt-4 text-lg text-foreground/70 max-w-3xl mx-auto">
          Prodo helps you manage tasks, collaborate with teams, 
          and achieve more with less stress.
        </p>
        
        <div className="flex justify-center space-x-4 mt-8">
          <Button size="lg" className="rounded-full">
            Get Started
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
          <Button variant="outline" size="lg" className="rounded-full text-white">
            Learn More
          </Button>
        </div>
      </div>
      
      <div className="mt-16 w-full max-w-5xl">
        <div className="bg-accent/20 rounded-2xl p-6 shadow-2xl">
          <Image 
            src="/dashboard-mockup.png" 
            alt="Task Management Dashboard" 
            width={1200} 
            height={700}
            className="rounded-xl border border-border object-cover"
          />
        </div>
      </div>
    </div>
  </div>
  )
}

export default HeroSection