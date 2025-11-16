"use client";

import { AIInput } from "@/components/ui/ai-input";
import Container from "@/components/global/container";

export default function AIInputSection() {
  const handleSubmit = (value: string) => {
    console.log("AI Input submitted:", value);
    // Add your AI processing logic here
  };

  return (
    <Container className="py-20">
      <div className="flex flex-col items-center justify-center gap-8">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            AI-Powered Input
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Interact with our AI assistant using natural language. 
            Get instant responses and intelligent suggestions.
          </p>
        </div>
        <div className="w-full max-w-2xl">
          <AIInput
            placeholder="Ask me anything..."
            onSubmit={handleSubmit}
            minHeight={52}
            maxHeight={200}
          />
        </div>
      </div>
    </Container>
  );
}

