export interface QuizOption {
  text: string;
  points: number;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: QuizOption[];
  isMultiSelect?: boolean;
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Where are most of your jobs coming from right now?",
    options: [
      { text: "Word of mouth", points: 1 },
      { text: "Google (Maps or Search)", points: 3 },
      { text: "Facebook or Instagram", points: 2 },
      { text: "Thumbtack or HomeAdvisor", points: 1 },
      { text: "I'm not sure", points: 0 },
    ],
  },
  {
    id: 2,
    question: "How would you describe the lead quality from those sources?",
    options: [
      { text: "Solid — most are serious buyers", points: 3 },
      { text: "Hit or miss — maybe 1 out of 4 are worth chasing", points: 2 },
      { text: "Mostly junk — lots of ghosting or tire kickers", points: 1 },
      { text: "I don't really track that", points: 0 },
    ],
  },
  {
    id: 3,
    question: "What do you have running right now?",
    isMultiSelect: true,
    options: [
      { text: "Google Ads", points: 1 },
      { text: "Facebook or Instagram Ads", points: 1 },
      { text: "Local Service Ads (Google Guaranteed)", points: 1 },
      { text: "SEO / Website work", points: 1 },
      { text: "A lead buying service (Thumbtack, Angi, etc.)", points: 0 },
      { text: "Nothing active right now", points: 0 },
    ],
  },
  {
    id: 4,
    question: "How do you follow up with leads once they come in?",
    options: [
      { text: "I call or text right away", points: 3 },
      { text: "Sometimes I follow up, sometimes I forget", points: 2 },
      { text: "They're supposed to be auto-contacted, but I'm not sure if it works", points: 1 },
      { text: "I don't have anything in place", points: 0 },
    ],
  },
  {
    id: 5,
    question: "How do you know where your leads are coming from?",
    options: [
      { text: "I have call tracking or form tracking set up by channel", points: 3 },
      { text: "I ask customers where they found us and write it down", points: 2 },
      { text: "I just go off memory or gut feeling", points: 1 },
      { text: "I don't track it at all", points: 0 },
    ],
  },
  {
    id: 6,
    question: "When's the last time you checked your Google Business profile or asked for a review?",
    options: [
      { text: "Within the last week", points: 3 },
      { text: "In the last month", points: 2 },
      { text: "A few months ago", points: 1 },
      { text: "I haven't", points: 0 },
    ],
  },
  {
    id: 7,
    question: "How many Google reviews does your business have right now?",
    options: [
      { text: "150+", points: 3 },
      { text: "100–149", points: 2 },
      { text: "50–99", points: 1 },
      { text: "25–49", points: 0 },
      { text: "Less than 25", points: 0 },
    ],
  },
];

export const calculateScore = (answers: Record<number, number | number[]>): number => {
  let totalScore = 0;

  Object.entries(answers).forEach(([questionId, answer]) => {
    const question = quizQuestions.find(q => q.id === parseInt(questionId));
    if (!question) return;

    if (question.isMultiSelect && Array.isArray(answer)) {
      // Special scoring for multi-select question (Q3)
      const selectedOptions = answer;
      const highValueOptions = [0, 1, 2, 3]; // Google Ads, FB Ads, LSA, SEO
      const lowValueOptions = [4, 5]; // Lead buying service, Nothing
      
      const hasHighValue = selectedOptions.some(idx => highValueOptions.includes(idx));
      const hasOnlyLowValue = selectedOptions.every(idx => lowValueOptions.includes(idx));
      
      if (hasOnlyLowValue || selectedOptions.length === 0) {
        totalScore += 0;
      } else {
        const highValueCount = selectedOptions.filter(idx => highValueOptions.includes(idx)).length;
        if (highValueCount >= 2) {
          totalScore += 3;
        } else if (highValueCount === 1) {
          totalScore += 2;
        } else {
          totalScore += 1;
        }
      }
    } else if (typeof answer === 'number') {
      const option = question.options[answer];
      if (option) {
        totalScore += option.points;
      }
    }
  });

  return totalScore;
};