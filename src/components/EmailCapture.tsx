import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from 'lucide-react';

interface EmailCaptureProps {
  onSubmit: (name: string, email: string) => void;
}

const EmailCapture: React.FC<EmailCaptureProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    if (email.trim() && name.trim()) {
      try {
        const response = await fetch('https://formspree.io/f/manbbppy', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: name.trim(), email: email.trim() })
        });

        if (response.ok) {
          console.log('Form submitted successfully!');
          onSubmit(name.trim(), email.trim());
        } else {
          console.error('Form submission failed:', response.status, response.statusText);
          setError('Submission failed. Please try again.');
        }
      } catch (err) {
        console.error('Form submission error:', err);
        setError('A network error occurred. Please check your connection and try again.');
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setError('Please enter both your name and email.');
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>You're Almost There!</CardTitle>
        <CardDescription>Enter your name and email to see your personalized growth plan.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={isSubmitting}
          />
          <Input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isSubmitting}
          />
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Show Me My Results"
            )}
          </Button>
          {error && <p className="text-sm text-red-500 text-center pt-2">{error}</p>}
        </form>
      </CardContent>
    </Card>
  );
};

export default EmailCapture;