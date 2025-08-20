import { Card } from "@/components/ui/card";
import { Header } from "@/components/Header";

const GrowthPlan = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="p-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <Card className="p-8">
            <h1 className="text-3xl font-bold text-foreground mb-6">
              Your Custom Growth Plan
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              This is a placeholder page where your custom growth plan and booking calendar would be displayed.
            </p>
            
            <div className="bg-secondary/50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Next Steps:
              </h3>
              <ul className="text-left text-muted-foreground space-y-2">
                <li>• Replace this with Calendly or TickleWare booking widget</li>
                <li>• Integrate with GoHighLevel for lead capture</li>
                <li>• Add personalized recommendations based on quiz results</li>
                <li>• Set up automated follow-up sequences</li>
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GrowthPlan;