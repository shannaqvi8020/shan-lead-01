import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface QuizOption {
  text: string;
  points: number;
}

interface QuizQuestionProps {
  question: string;
  options: QuizOption[];
  selectedOption?: number;
  onSelect: (optionIndex: number) => void;
  onNext: () => void;
  showNext: boolean;
  isMultiSelect?: boolean;
  selectedOptions?: number[];
  onMultiSelect?: (optionIndex: number) => void;
}

export const QuizQuestion = ({
  question,
  options,
  selectedOption,
  onSelect,
  onNext,
  showNext,
  isMultiSelect = false,
  selectedOptions = [],
  onMultiSelect,
}: QuizQuestionProps) => {
  const handleOptionClick = (index: number) => {
    if (isMultiSelect && onMultiSelect) {
      onMultiSelect(index);
    } else {
      onSelect(index);
    }
  };

  const isSelected = (index: number) => {
    if (isMultiSelect) {
      return selectedOptions.includes(index);
    }
    return selectedOption === index;
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground leading-tight">
        {question}
      </h2>
      
      <div className="space-y-3">
        {options.map((option, index) => (
          <Card
            key={index}
            className={cn(
              "p-4 cursor-pointer transition-all duration-200 hover:shadow-md border-2",
              isSelected(index)
                ? "border-primary bg-primary/5 shadow-md"
                : "border-border hover:border-primary/50"
            )}
            onClick={() => handleOptionClick(index)}
          >
            <div className="flex items-center space-x-3">
              <div
                className={cn(
                  "w-4 h-4 rounded-full border-2 transition-all",
                  isSelected(index)
                    ? "border-primary bg-primary"
                    : "border-muted-foreground"
                )}
              />
              <span className="text-foreground font-medium">
                {option.text}
              </span>
            </div>
          </Card>
        ))}
      </div>

      {isMultiSelect && (
        <p className="text-sm text-muted-foreground">
          Select all that apply
        </p>
      )}

      {showNext && (
        <div className="pt-4">
          <Button 
            onClick={onNext}
            size="lg"
            className="w-full font-semibold"
          >
            Continue
          </Button>
        </div>
      )}
    </div>
  );
};