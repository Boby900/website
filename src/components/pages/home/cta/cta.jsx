'use client';

import clsx from 'clsx';
import copyToClipboard from 'copy-to-clipboard';
import { LazyMotion, domAnimation, m, useAnimation } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import BlinkingText from 'components/shared/blinking-text';
import Button from 'components/shared/button';
import Container from 'components/shared/container';
import Heading from 'components/shared/heading';
import Link from 'components/shared/link';
import getHomepageRoute from 'utils/get-homepage-route';

const pVariants = {
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
    transition: {
      duration: 1,
    },
  },
};

const inputWrapperVariants = {
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
    transition: {
      duration: 1,
    },
  },
};

const inputPanelVariants = {
  from: {
    backgroundColor: '#00e699',
  },
  to: {
    backgroundColor: '#f0f075',
    transition: {
      delay: 2,
      duration: 0.4,
      repeat: Infinity,
      repeatDelay: 2,
      repeatType: 'mirror',
    },
  },
};

const CTA = () => {
  const titleRef = useRef(null);
  const [isCopied, setIsCopied] = useState(false);

  const controls = useAnimation();

  const [animationVisibilityRef, isInView] = useInView({ triggerOnce: true, threshold: 0.5 });

  const handleButtonClick = () => {
    if (!isCopied) {
      copyToClipboard('psql -h pg.neon.tech', { onCopy: setIsCopied(true) });
    }
  };

  useEffect(() => {
    if (isCopied) {
      setTimeout(() => {
        setIsCopied(false);
      }, 1500);
    }
  }, [isCopied]);

  useEffect(() => {
    if (isInView) {
      controls.start('to');
    }
  }, [isInView, controls]);

  return (
    <LazyMotion features={domAnimation}>
      <m.section
        className="safe-paddings bg-black pt-[152px] text-center md:pt-40 sm:pt-32"
        initial="from"
        animate={controls}
      >
        <Container className="z-20" size="medium" ref={animationVisibilityRef}>
          <Heading id="cta-title" tag="h2" size="md" theme="white" ref={titleRef}>
            <BlinkingText
              text="Made for developers"
              parentElement={titleRef.current}
              shouldAnimationStart={isInView}
            />
          </Heading>
          <m.p className="t-xl mt-[18px] text-white 2xl:mt-4" variants={pVariants}>
            Launch serverless Postgres with a single command
          </m.p>
          <m.div
            className="relative mx-auto mt-12 max-w-[860px] 3xl:max-w-[738px] 2xl:mt-10 2xl:max-w-[610px] xl:mt-8 xl:max-w-[498px] lg:max-w-[584px]"
            id="cta-input"
            variants={inputWrapperVariants}
          >
            <m.div
              id="cta-input-background"
              className="absolute -bottom-3.5 -left-3.5 h-full w-full rounded-full 2xl:-bottom-2.5 2xl:-left-2.5 xl:-bottom-2 xl:-left-2 md:w-[calc(100%+8px)]"
              variants={inputPanelVariants}
              aria-hidden
            />
            <div className="relative flex items-center justify-between rounded-full border-4 border-black bg-white p-2 pl-9 2xl:p-1.5 2xl:pl-7 xl:p-1 xl:pl-6 md:justify-center md:px-0 md:py-[22px]">
              <span className="whitespace-nowrap font-mono text-[28px] font-bold !leading-none xl:text-2xl lg:text-xl md:text-lg">
                $ psql -h pg.neon.tech
              </span>
              <Button
                className="relative px-10 py-[22px] md:hidden"
                size="sm"
                theme="secondary"
                onClick={handleButtonClick}
              >
                <span className={clsx({ 'opacity-0': isCopied })}>Copy</span>
                <span
                  className={clsx(
                    'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0',
                    { 'opacity-100': isCopied }
                  )}
                >
                  Copied!
                </span>
              </Button>
            </div>
          </m.div>
          {/* remove the invisible and opacity-0 classes to display this block again when it comes in handy */}
          <p
            id="cta-bottom-text"
            className="t-xl invisible mx-auto mt-[56px] hidden max-w-[500px] text-white opacity-0 2xl:mt-[46px] 2xl:max-w-[450px] xl:mt-10 xl:max-w-[400px]"
          >
            Same Postgres command as you used to will get you{' '}
            <Link to={getHomepageRoute()} theme="underline-primary-1">
              a smooth database creation
            </Link>{' '}
            experience.
          </p>
        </Container>
      </m.section>
    </LazyMotion>
  );
};

export default CTA;
