import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Clock, Users } from "lucide-react";

const FeaturesSection = () => {
    const features = [
      {
        icon: Clock,
        title: "Smart Time Management",
        description: "Optimize your workflow with intelligent task scheduling and priority management."
      },
      {
        icon: Users,
        title: "Team Collaboration",
        description: "Seamlessly collaborate with your team, assign tasks, and track progress in real-time."
      },
      {
        icon: BarChart,
        title: "Productivity Insights",
        description: "Gain deep insights into your productivity with advanced analytics and reporting."
      }
    ];
  
    return (
      <section className="py-16 bg-black">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Powerful Features
            </h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              Prodo provides a comprehensive suite of tools to supercharge your productivity.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-accent/30 border-border">
                <CardHeader>
                  <feature.icon className="w-12 h-12 text-primary mb-4" strokeWidth={1.5} />
                  <CardTitle className="text-foreground">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/70">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  };

  export default FeaturesSection