import React from 'react';
import Image from 'next/image';

import AppStoreButton from './AppStoreButton';
import PlayStoreButton from './PlayStoreButton';

import { heroDetails } from '@/data/hero';

import Link from 'next/link';

const Hero: React.FC = () => {
    return (
        <section
            id="hero"
            className="relative flex items-center justify-center pb-0 pt-32 md:pt-40 px-5"
        >
            <div className="absolute left-0 top-0 bottom-0 -z-10 w-full">
                <div className="absolute inset-0 h-full w-full bg-hero-background bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]">
                </div>
            </div>

            <div className="absolute left-0 right-0 bottom-0 backdrop-blur-[2px] h-40 bg-gradient-to-b from-transparent via-[rgba(233,238,255,0.5)] to-[rgba(202,208,230,0.5)]">
            </div>

            <div className="text-center">
                <h1 className="text-4xl md:text-6xl md:leading-tight font-bold text-foreground max-w-lg md:max-w-2xl mx-auto text-center">
                    Smart, Secure, Simple <span className="font-mono text-primary px-2 bg-red-200/40 rounded-md">.env</span> Management
                </h1>
                <p className="mt-4 text-foreground max-w-lg mx-auto">{heroDetails.subheading}</p>
                <div className="mt-6 flex flex-col sm:flex-row items-center sm:gap-4 w-fit mx-auto">
                    <Link href="/auth?type=signup" className="text-white bg-primary hover:bg-primary/90 px-8 py-3 rounded-full font-semibold transition-colors">
                        Get started for free
                    </Link>
                </div>
                <div className='mt-6 text-sm text-muted-foreground relative min-h-[40vh] overflow-hidden rounded-t-2xl border border-neutral-200'>
                    <Image
                        src={heroDetails.centerImageSrc}
                        fill
                        quality={100}
                        priority={true}
                        unoptimized={true}
                        alt="app mockup"
                        style={{ objectFit: 'cover', objectPosition: 'top' }}
                    />
                </div>
                
            </div>
        </section>
    );
};

export default Hero;
