import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface QuizResultsProps {
  score: number;
  userName?: string;
}

const getResultTier = (score: number) => {
  if (score <= 9) return "red";
  if (score <= 15) return "yellow";
  return "green";
};

const getResultContent = (tier: string) => {
  const content = {
    red: {
      headline: "You're Guessing — And It's Costing You Jobs",
      body: `You've got pieces in place, but there's no system behind them — which means good leads are slipping through the cracks. Right now, you're likely spending money (or time) without getting a consistent return.

We've seen this same setup dozens of times: word of mouth dries up, ads don't stick, and there's no clear tracking to fix what's broken.

Where to focus first:
– Dial in your lead sources
– Set up call/form tracking
– Clean up your Google profile
– Start collecting real reviews
– Build a basic follow-up routine`,
      color: "tier-red",
      bgColor: "bg-red-50 border-tier-red",
    },
    yellow: {
      headline: "You're Close — But You're Still Leaking Leads",
      body: `You've got a solid foundation: the phone rings, your team is good, and jobs are coming in. But you're likely leaving money on the table — either through missed follow-ups, underperforming channels, or lack of visibility.

Where to tighten up:
– Plug your tracking gaps
– Boost your review profile
– Align your budget with what's actually converting
– Automate follow-up to lock in more calls`,
      color: "tier-yellow",
      bgColor: "bg-yellow-50 border-tier-yellow",
    },
    green: {
      headline: "You're Set Up Right — Now It's Time to Scale",
      body: `You're ahead of the pack. You've got reviews, systems, and visibility — now it's about stacking volume, closing more of the leads you're already getting, and dialing in cost per booked job.

Next Moves:
– Double down on high-ROI channels
– Add remarketing + trust content
– Automate and tighten your follow-up
– Use real data to refine your process`,
      color: "tier-green",
      bgColor: "bg-green-50 border-tier-green",
    },
  };

  return content[tier as keyof typeof content];
};

export const QuizResults = ({ score, userName }: QuizResultsProps) => {
  const tier = getResultTier(score);
  const result = getResultContent(tier);
  const displayName = userName ? `, ${userName}` : "";

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Your Marketing Scorecard Results{displayName}
        </h1>
        <div className="text-lg font-semibold text-muted-foreground">
          Score: {score} out of 21 points
        </div>
      </div>

      <Card className={cn("p-8 border-2", result.bgColor)}>
        <div className="space-y-6">
          <h2 className={cn("text-2xl font-bold", `text-${result.color}`)}>
            {result.headline}
          </h2>
          
          <div className="prose prose-lg max-w-none">
            {result.body.split('\n').map((paragraph, index) => (
              <p key={index} className="text-foreground leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="pt-6 border-t border-border">
            <Button 
              size="lg" 
              className="w-full font-semibold text-lg bg-primary hover:bg-primary/90 transition-colors"
              onClick={() => {
                window.open("https://api.campaignpipe.com/widget/booking/ABRHXsgOXMldQjYjiTy7", "_blank");
              }}
            >
              Show Me My Growth Plan
            </Button>
            <p className="text-xs text-muted-foreground text-center mt-3">
              Free 15-minute strategy call with Growth Ring Media
            </p>
          </div>
        </div>
      </Card>

      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          A Growth Ring Media assessment
        </p>
      </div>
    </div>
  );
};