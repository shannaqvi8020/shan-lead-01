import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Header } from "@/components/Header";
import { CheckCircle } from "lucide-react";

const ThankYou = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Auto-redirect to results page after 3 seconds
    const timer = setTimeout(() => {
      navigate("/results");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex items-center justify-center p-4 min-h-[calc(100vh-80px)]">
        <Card className="p-8 text-center max-w-md mx-auto">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Thank You!
          </h1>
          <p className="text-muted-foreground mb-4">
            Your information has been submitted successfully.
          </p>
          <p className="text-sm text-muted-foreground">
            Preparing your personalized marketing scorecard...
          </p>
          <div className="mt-4">
            <div className="animate-pulse flex space-x-1 justify-center">
              <div className="h-2 w-2 bg-primary rounded-full animate-bounce"></div>
              <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ThankYou;