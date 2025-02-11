import { CheckCircle } from "lucide-react";

const Footer = () => {
    return (
      <footer className="bg-black/95 py-12 border-t border-border">
        <div className="container mx-auto px-6 grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <CheckCircle className="w-8 h-8 text-primary" strokeWidth={2.5} />
              <h3 className="text-2xl font-bold text-foreground">Prodo</h3>
            </div>
            <p className="text-foreground/70">
              Simplify your work, achieve more.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Product</h4>
            <ul className="space-y-2">
              {['Features', 'Pricing', 'Integrations'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-foreground/70 hover:text-foreground">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-2">
              {['About', 'Careers', 'Press'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-foreground/70 hover:text-foreground">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Support</h4>
            <ul className="space-y-2">
              {['Help Center', 'Contact', 'FAQ'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-foreground/70 hover:text-foreground">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-6 mt-8 pt-6 border-t border-border text-center">
          <p className="text-foreground/70">
            © 2025 Prodo. All rights reserved.
          </p>
        </div>
      </footer>
    );
  };
  
export default Footer