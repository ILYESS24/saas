"use client";

import React from 'react';
import dynamic from 'next/dynamic';

const LavaLamp = dynamic(() => import('@/components/ui/lava-lamp').then(mod => ({ default: mod.LavaLamp })), {
  ssr: false,
});

interface Props {
    children: React.ReactNode
}

const Background = ({ children }: Props) => {
    return (
        <main id='background' className="flex-none min-h-screen relative">
            <LavaLamp />
            {children}
        </main>
    )
};

export default Background
