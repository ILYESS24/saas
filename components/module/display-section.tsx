import DisplayCards from "@/components/ui/display-cards";
import Container from "@/components/global/container";
import { SectionBadge } from "@/components/ui/section-bade";
import { Sparkles, Zap, Rocket } from "lucide-react";

const DisplaySection = () => {
  const cards = [
    {
      icon: <Sparkles className="size-4 text-blue-300" />,
      title: "AI Powered",
      description: "Advanced AI technology",
      date: "Just now",
      iconClassName: "text-blue-500",
      titleClassName: "text-blue-500",
      className: "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration:700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      icon: <Zap className="size-4 text-yellow-300" />,
      title: "Lightning Fast",
      description: "Instant results",
      date: "2 min ago",
      iconClassName: "text-yellow-500",
      titleClassName: "text-yellow-500",
      className: "[grid-area:stack] translate-x-16 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration:700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      icon: <Rocket className="size-4 text-purple-300" />,
      title: "Launch Ready",
      description: "Ready to scale",
      date: "5 min ago",
      iconClassName: "text-purple-500",
      titleClassName: "text-purple-500",
      className: "[grid-area:stack] translate-x-32 translate-y-20 hover:translate-y-10",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center py-12 md:py-16 lg:py-24 w-full relative">
      <Container>
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
          <SectionBadge title="Features" />
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-heading font-medium !leading-snug mt-6">
            Powerful features at your fingertips
          </h2>
          <p className="text-base md:text-lg text-center text-accent-foreground/80 mt-6">
            Discover what makes our platform unique and powerful.
          </p>
        </div>
      </Container>
      <Container className="mt-12">
        <DisplayCards cards={cards} />
      </Container>
    </div>
  );
};

export default DisplaySection;

