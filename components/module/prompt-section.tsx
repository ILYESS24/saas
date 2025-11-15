"use client";

import { useState } from "react";
import {
  PromptInput,
  PromptInputTextarea,
} from "@/components/ui/prompt-input";
import Container from "@/components/global/container";
import { SectionBadge } from "@/components/ui/section-bade";

const PromptSection = () => {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    if (!value.trim()) return;
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setValue("");
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 md:py-16 lg:py-24 w-full relative">
      <Container>
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
          <SectionBadge title="Try it now" />
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-heading font-medium !leading-snug mt-6">
            Experience the power of AI
          </h2>
          <p className="text-base md:text-lg text-center text-accent-foreground/80 mt-6">
            Enter your prompt and see how our AI can help you create amazing content in seconds.
          </p>
        </div>
      </Container>
      <Container className="mt-8 w-full max-w-3xl">
        <PromptInput
          value={value}
          onValueChange={setValue}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          className="w-full"
        >
          <PromptInputTextarea
            placeholder="Type your message here... (Press Enter to send, Shift+Enter for new line)"
            disabled={isLoading}
          />
        </PromptInput>
      </Container>
    </div>
  );
};

export default PromptSection;

