import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex items-center justify-center p-4 min-h-[calc(100vh-80px)]">
        <div className="w-full max-w-2xl mx-auto">
          <Card className="p-6 md:p-8 lg:p-12">
            {/* Main Headlines */}
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
                Not sure if your marketing is working?
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                See what's working, what's not, and exactly what to do next.
              </p>
            </div>
            
            {/* Value Points - directly on card background */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-foreground mb-4 text-center">
                Get your personalized assessment in under 3 minutes
              </h3>
              <div className="flex flex-col md:flex-row gap-4 justify-center items-start md:items-center text-center md:text-left">
                <div className="flex items-center gap-2 text-tier-green font-medium">
                  <span className="text-lg">✓</span>
                  <span>See where you stand</span>
                </div>
                <div className="flex items-center gap-2 text-tier-green font-medium">
                  <span className="text-lg">✓</span>
                  <span>Find where you're losing leads</span>
                </div>
                <div className="flex items-center gap-2 text-tier-green font-medium">
                  <span className="text-lg">✓</span>
                  <span>Get your custom growth plan</span>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="text-center">
              <Button 
                size="lg" 
                onClick={() => navigate('/quiz')}
                className="w-full md:w-auto text-lg px-8 py-4 font-semibold bg-tier-yellow hover:bg-tier-yellow/90 text-background"
              >
                Take the Assessment
              </Button>
              
              <p className="text-sm text-muted-foreground mt-6">
                Powered by Growth Ring Media
              </p>
            </div>
          </Card>
        </div>
      </div>
      
      <footer className="text-center text-xs text-muted-foreground py-8">
        <p>© 2025 Growth Ring Media</p>
        <a href="https://growthringmedia.com/privacy-policy" target="_blank" rel="noopener noreferrer" className="underline">Privacy Policy</a>
        <span className="mx-2">|</span>
        <a href="https://growthringmedia.com/terms-of-service" target="_blank" rel="noopener noreferrer" className="underline">Terms of Service</a>
      </footer>
    </div>
  );
};

export default Index;
