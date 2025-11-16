"use client";

import { CpuArchitecture } from "@/components/ui/cpu-architecture";
import Container from "@/components/global/container";

export default function CpuSection() {
  return (
    <Container className="py-20">
      <div className="flex flex-col items-center justify-center gap-8">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            Powerful CPU Architecture
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Experience lightning-fast performance with our optimized CPU architecture
            designed for modern applications.
          </p>
        </div>
        <div className="w-full max-w-4xl mx-auto">
          <CpuArchitecture
            width="100%"
            height="400"
            text="CPU"
            showCpuConnections={true}
            animateText={true}
            animateLines={true}
            animateMarkers={true}
          />
        </div>
      </div>
    </Container>
  );
}

