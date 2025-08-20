import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { QuizProgress } from "@/components/QuizProgress";
import { QuizQuestion } from "@/components/QuizQuestion";

import { quizQuestions, calculateScore } from "@/data/quizData";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Header } from "@/components/Header";

const Quiz = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1); // 1-7 = questions, 8 = GHL form
  const [answers, setAnswers] = useState<Record<number, number | number[]>>({});
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);

  const totalQuestions = quizQuestions.length;
  const isQuestionStep = currentStep >= 1 && currentStep <= totalQuestions;
  const isGHLFormStep = currentStep === totalQuestions + 1;

  const currentQuestion = isQuestionStep ? quizQuestions[currentStep - 1] : null;
  const selectedOption = currentQuestion ? answers[currentQuestion.id] : undefined;

  const handleOptionSelect = (optionIndex: number) => {
    if (!currentQuestion) return;
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: optionIndex
    }));
  };

  const handleMultiSelect = (optionIndex: number) => {
    if (!currentQuestion) return;
    
    const newSelection = selectedOptions.includes(optionIndex)
      ? selectedOptions.filter(idx => idx !== optionIndex)
      : [...selectedOptions, optionIndex];
    
    setSelectedOptions(newSelection);
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: newSelection
    }));
  };

  const canContinue = () => {
    if (!currentQuestion) return false;
    
    if (currentQuestion.isMultiSelect) {
      return selectedOptions.length > 0;
    }
    
    return selectedOption !== undefined;
  };

  const handleNext = () => {
    if (currentQuestion?.isMultiSelect) {
      setSelectedOptions([]);
    }
    setCurrentStep(prev => prev + 1);
  };

  useEffect(() => {
    if (isGHLFormStep) {
      const score = calculateScore(answers);
      
      // Store quiz data in localStorage for later retrieval
      localStorage.setItem('quizData', JSON.stringify({
        score: score,
        answers: answers,
        timestamp: Date.now()
      }));
      
      // Environment detection
      const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname.includes('lovable.app');
      
      if (isDevelopment) {
        // In development, show a message and navigate to thank-you after delay
        setTimeout(() => {
          navigate("/thank-you");
        }, 2000);
      } else {
        // In production, redirect to GHL form
        const ghlFormUrl = `https://api.campaignpipe.com/widget/form/9ytRfFXjCZCNOvNSWQtg?quiz_score=${score}`;
        window.location.href = ghlFormUrl;
      }
    }
  }, [isGHLFormStep, navigate]);

  if (isGHLFormStep) {
    const score = calculateScore(answers);
    const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname.includes('lovable.app');
    
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center p-4 min-h-[calc(100vh-80px)]">
          <Card className="p-8 text-center max-w-md mx-auto">
            <h1 className="text-2xl font-bold text-foreground mb-4">
              {isDevelopment ? "Development Mode" : "Redirecting..."}
            </h1>
            {isDevelopment ? (
              <div>
                <p className="text-muted-foreground mb-4">
                  Quiz completed! Score: {score}
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  In production, this would redirect to the GHL form.
                </p>
                <a 
                  href={`https://api.campaignpipe.com/widget/form/9ytRfFXjCZCNOvNSWQtg?quiz_score=${score}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Test GHL Form (Opens in new tab)
                </a>
                <p className="text-xs text-muted-foreground mt-2">
                  Redirecting to thank you page...
                </p>
              </div>
            ) : (
              <div>
                <p className="text-muted-foreground mb-4">
                  Taking you to the form...
                </p>
                <div className="animate-pulse flex space-x-1 justify-center">
                  <div className="h-2 w-2 bg-primary rounded-full animate-bounce"></div>
                  <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    );
  }

  if (isQuestionStep && currentQuestion) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="p-4 py-8">
          <div className="max-w-2xl mx-auto">
          <QuizProgress currentStep={currentStep} totalSteps={totalQuestions} />
          
          <Card className="p-6 lg:p-8">
            <QuizQuestion
              question={currentQuestion.question}
              options={currentQuestion.options}
              selectedOption={typeof selectedOption === 'number' ? selectedOption : undefined}
              onSelect={handleOptionSelect}
              onNext={handleNext}
              showNext={canContinue()}
              isMultiSelect={currentQuestion.isMultiSelect}
              selectedOptions={selectedOptions}
              onMultiSelect={handleMultiSelect}
            />
          </Card>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default Quiz;
