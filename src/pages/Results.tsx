import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { QuizResults } from "@/components/QuizResults";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Results = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [quizData, setQuizData] = useState<{
    score: number;
    userName?: string;
  } | null>(null);

  useEffect(() => {
    // Try to get data from URL params first
    const score = searchParams.get('score');
    const userName = searchParams.get('name');
    
    if (score) {
      setQuizData({
        score: parseInt(score, 10),
        userName: userName || undefined
      });
      return;
    }

    // Fallback to localStorage
    const storedData = localStorage.getItem('quizData');
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        if (parsedData.score !== undefined) {
          setQuizData({
            score: parsedData.score,
            userName: undefined // GHL form doesn't pass back the name in this flow
          });
          return;
        }
      } catch (error) {
        console.error('Error parsing stored quiz data:', error);
      }
    }

    // No quiz data found - this shouldn't happen in normal flow
    console.warn('No quiz data found');
  }, [searchParams]);

  if (!quizData) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center p-4 min-h-[calc(100vh-80px)]">
          <Card className="p-8 text-center max-w-md mx-auto">
            <h1 className="text-2xl font-bold text-foreground mb-4">
              No Results Found
            </h1>
            <p className="text-muted-foreground mb-6">
              We couldn't find your quiz results. Please take the quiz again to see your personalized scorecard.
            </p>
            <Button onClick={() => navigate('/quiz')} className="w-full">
              Take Quiz Again
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="p-4 py-12">
        <QuizResults score={quizData.score} userName={quizData.userName} />
      </div>
    </div>
  );
};

export default Results;