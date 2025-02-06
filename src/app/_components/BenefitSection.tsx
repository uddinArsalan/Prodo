import { Button } from "@/components/ui/button";
import { Briefcase, ChevronRight, Shield, Zap } from "lucide-react";

const BenefitsSection = () => {
    const benefits = [
      {
        icon: Zap,
        title: "Increased Efficiency",
        description: "Streamline your workflow and reduce time spent on manual task management."
      },
      {
        icon: Briefcase,
        title: "Professional Organization",
        description: "Keep your projects organized, meet deadlines, and improve team coordination."
      },
      {
        icon: Shield,
        title: "Data Security",
        description: "Rest assured with our robust security measures protecting your sensitive information."
      }
    ];
  
    return (
      <section className="py-16 bg-black">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Why Choose TickTick
            </h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              Transform the way you work with our innovative task management solution.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="bg-accent/30 rounded-full p-4 inline-block mb-6">
                  <benefit.icon className="w-12 h-12 text-primary" strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">{benefit.title}</h3>
                <p className="text-foreground/70">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default BenefitsSection