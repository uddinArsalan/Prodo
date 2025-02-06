import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const CTASection = () => {
    return (
      <section className="py-16 bg-black/70">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-6">
            Ready to Boost Your Productivity?
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto mb-8">
            Join thousands of professionals who have transformed their workflow with TickTick.
          </p>
          <div className="flex justify-center space-x-4">
            <Button size="lg" className="rounded-full">
              Start Free Trial
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="rounded-full">
              Watch Demo
            </Button>
          </div>
        </div>
      </section>
    );
  };

export default CTASection