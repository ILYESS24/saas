import { Spotlight } from '@/components/ui/spotlight';
import { Canvas } from '@/components/ui/canvas';
import Background from '@/components/global/background';
import Container from '@/components/global/container';
import Wrapper from '@/components/global/wrapper';
import Companies from '@/components/module/companies';
import Hero from '@/components/module/hero';
import Connect from '@/components/module/connect';
import Features from '@/components/module/features';
import Perks from '@/components/module/perks';
import DisplaySection from '@/components/module/display-section';
import Pricing from '@/components/module/pricing';
import Reviews from '@/components/module/reviews';
import PromptSection from '@/components/module/prompt-section';
import CTA from '@/components/module/cta';

const HomePage = () => {
    return (
        <Background>
            <Canvas />
            <Wrapper className="py-20 relative">
                <Container className="relative">
                    <Spotlight
                        className="-top-40 left-0 md:left-60 md:-top-20"
                        fill="rgba(255, 255, 255, 0.5)"
                    />
                    <Hero />
                </Container>
                <Container className="py-8 lg:py-20">
                    <Companies />
                </Container>
                <Connect />
                <Features />
                <Perks />
                <DisplaySection />
                <PromptSection />
                <Pricing />
                <Reviews />
                <CTA />
            </Wrapper>
        </Background>
    )
}

export default HomePage