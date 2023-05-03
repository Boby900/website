'use client';

// import useScrollPosition from '@react-hook/window-scroll';
import { Alignment, Fit, Layout, useRive, useStateMachineInput } from '@rive-app/react-canvas';
// import Image from 'next/image';
import React, { useRef, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import Container from 'components/shared/container';
import Heading from 'components/shared/heading';
import Link from 'components/shared/link';
import LINKS from 'constants/links';
// import useWindowSize from 'hooks/use-window-size';

const items = [
  {
    image: '/images/pages/pricing/metrics-1-mobile.jpg',
    name: 'Compute time',
    priceFrom: 'From $0.102 /hour',
    details: 'Compute time is the amount of computing capacity used per hour.',
    prices: [
      {
        name: 'US East (Ohio)',
        price: '0.102',
        unit: 'Compute-hour',
      },
      {
        name: 'US West (Oregon)',
        price: '0.102',
        unit: 'Compute-hour',
      },
      {
        name: 'Europe (Frankfurt)',
        price: '0.118',
        unit: 'Compute-hour',
      },
      {
        name: 'Asia Pacific (Singapore)',
        price: '0.121',
        unit: 'Compute-hour',
      },
    ],
  },
  {
    image: '/images/pages/pricing/metrics-2-mobile.jpg',
    name: 'Project storage',
    priceFrom: 'From $0.000164 /Gigabyte-hour',
    details: 'Project storage is the amount of data and history in your Neon projects.',
    prices: [
      {
        name: 'US East (Ohio)',
        price: '0.000164',
        unit: 'GiB-hour',
      },
      {
        name: 'US West (Oregon)',
        price: '0.000164',
        unit: 'GiB-hour',
      },
      {
        name: 'Europe (Frankfurt)',
        price: '0.00018',
        unit: 'GiB-hour',
      },
      {
        name: 'Asia Pacific (Singapore)',
        price: '0.00018',
        unit: 'GiB-hour',
      },
    ],
  },
  {
    image: '/images/pages/pricing/metrics-3-mobile.jpg',
    name: 'Written data',
    priceFrom: 'From $0.096 /Gigabyte',
    details: 'Written data is the amount of data written from Neon compute to storage.',
    prices: [
      {
        name: 'US East (Ohio)',
        price: '0.096',
        unit: 'GiB',
      },
      {
        name: 'US West (Oregon)',
        price: '0.096',
        unit: 'GiB',
      },
      {
        name: 'Europe (Frankfurt)',
        price: '0.096',
        unit: 'GiB',
      },
      {
        name: 'Asia Pacific (Singapore)',
        price: '0.096',
        unit: 'GiB',
      },
    ],
  },
  {
    image: '/images/pages/pricing/metrics-4-mobile.jpg',
    name: 'Data transfer',
    priceFrom: 'From $0.09 /Gigabyte',
    details: 'Data transfer is the amount of data transferred out of Neon.',
    prices: [
      {
        name: 'US East (Ohio)',
        price: '0.09',
        unit: 'GiB',
      },
      {
        name: 'US West (Oregon)',
        price: '0.09',
        unit: 'GiB',
      },
      {
        name: 'Europe (Frankfurt)',
        price: '0.09',
        unit: 'GiB',
      },
      {
        name: 'Asia Pacific (Singapore)',
        price: '0.09',
        unit: 'GiB',
      },
    ],
  },
];

const Metrics = () => {
  const topRef = useRef(null);
  const riveRef = useRef(null);
  const animationRef = useRef(null);
  // const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  // const { height: pageHeight } = useWindowSize();
  // const scrollY = useScrollPosition();
  const [contentRef, isContentInView] = useInView({ triggerOnce: true });
  const { RiveComponent, rive } = useRive({
    src: '/animations/pages/pricing/pricing.riv',
    autoplay: false,
    stateMachines: 'SM',
    layout: new Layout({
      fit: Fit.FitWidth,
      alignment: Alignment.Center,
    }),
  });
  const animationStageInput = useStateMachineInput(rive, 'SM', 'Stage (0-6)', 0);

  useEffect(() => {
    if (rive && isContentInView) {
      rive.play();
    }
  }, [rive, isContentInView]);

  useEffect(() => {
    // TODO: detect scroll direction
    if (animationStageInput && topRef.current !== null) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > topRef.current * 1 && animationStageInput.value === 0) {
          animationStageInput.value = 1;
        } else if (window.scrollY > topRef.current * 2 && animationStageInput.value === 1) {
          animationStageInput.value = 2;
          // TODO: connect with scroll ???
          riveRef.current.style.transform = 'translateY(-300px)';
        } else if (window.scrollY > topRef.current * 3 && animationStageInput.value === 2) {
          animationStageInput.value = 3;
        }
      });
    }
  }, [animationStageInput]);

  // useEffect(() => {
  //   if (!animationStageInput) return;

  //   // change animation input on scroll UP
  //   if (
  //     (currentSectionIndex === 0 && animationStageInput.value === 1) ||
  //     (currentSectionIndex === 0 && animationStageInput.value === 5)
  //   ) {
  //     animationStageInput.value = 6;
  //   } else if (
  //     (currentSectionIndex === 1 && animationStageInput.value === 2) ||
  //     (currentSectionIndex === 1 && animationStageInput.value === 4)
  //   ) {
  //     animationStageInput.value = 5;
  //   } else if (
  //     (currentSectionIndex === 2 && animationStageInput.value === 3) ||
  //     (currentSectionIndex === 2 && animationStageInput.value === 3)
  //   ) {
  //     animationStageInput.value = 4;
  //   }
  //   // ... and on scroll DOWN
  //   else {
  //     animationStageInput.value = currentSectionIndex;
  //   }
  // }, [currentSectionIndex, animationStageInput]);

  // useEffect(() => {
  //   const currentScrollTop = scrollY;
  //   const switchPoints = [...Array(items.length + 1)].map(
  //     (_, index) => sectionRef.current.offsetTop + pageHeight * index - pageHeight + 350
  //   );

  //   switchPoints.forEach((_, index) => {
  //     if (currentScrollTop > switchPoints[index] && currentScrollTop < switchPoints[index + 1]) {
  //       setCurrentSectionIndex(index);
  //     }
  //   });
  // }, [pageHeight, scrollY]);

  //  mt-60 xl:mt-40 lg:mt-28 md:mt-20

  useEffect(() => {
    const content = document.querySelector('#pricing-content');
    const sticky = document.querySelector('#pricing-sticky');

    const shift =
      window.scrollY +
      (animationRef.current?.getBoundingClientRect().y || 0) -
      // top bar compensation:
      ((content?.getBoundingClientRect().y || 0) + window.scrollY) -
      // if content is smaller than window height, center it:
      (window.innerHeight - (animationRef.current?.clientHeight || 0)) / 2;

    topRef.current = shift;

    content.style.height = `${(content?.clientHeight || 0) + shift * 3}px`;
    sticky.style.position = 'sticky';
    sticky.style.top = `${shift * -1}px`;
  }, []);

  return (
    <section className="safe-paddings pt-60" ref={contentRef}>
      <div className="flex flex-col">
        <Container className="flex flex-col items-center" size="mdDoc">
          <Heading className="text-center" badge="Metrics" tag="h2" size="2sm">
            Neon charges on <span className="text-pricing-primary-1">4 metrics</span>
          </Heading>
          <p className="mt-4 text-lg font-light leading-snug xl:text-base lg:mt-2 lg:text-center">
            Refer to our{' '}
            <Link
              className="!border-b !border-pricing-primary-3 font-normal hover:!border-pricing-primary-1"
              theme="underline-primary-1"
              to={`${LINKS.docs}introduction/billing`}
            >
              billing documentation
            </Link>{' '}
            for rates per region.
          </p>
        </Container>
        <Container className="py-40" size="mdDoc">
          <div className="" ref={animationRef}>
            <div className="grid grid-cols-12">
              <div className="col-span-7">
                <div
                  className="h-[566px] -translate-y-[100px] transition-transform duration-1000"
                  ref={riveRef}
                >
                  <div className="aspect-[0.6086956522] w-[590px]">
                    {isContentInView ? <RiveComponent /> : null}
                  </div>
                </div>
              </div>
              <div className="col-span-5">
                <div className="pt-10 text-white">
                  <h2 className="text-4xl font-medium leading-tight tracking-tighter text-white xl:text-[28px]">
                    {items[0].name}
                    <span className="block font-light text-pricing-primary-1">
                      {items[0].priceFrom}
                    </span>
                  </h2>
                  <p className="mt-2 text-lg leading-tight tracking-tight xl:text-base">
                    {items[0].details}
                  </p>
                  <div className="mt-8 max-w-[464px] xl:mt-5">
                    <div className="grid grid-cols-2 gap-x-20 border-b border-[rgba(255,255,255,0.06)] py-2.5 text-[12px] uppercase leading-none text-pricing-gray-4 xl:gap-x-[20%] lg:gap-x-1">
                      <span>Region</span>
                      <span>Price</span>
                    </div>
                    {items[0].prices.map(({ name, price, unit }, index) => (
                      <div
                        className="text-gray-94 grid grid-cols-2 gap-x-20 border-b border-[rgba(255,255,255,0.06)] py-[15px] text-[15px] leading-none xl:gap-x-[20%] xl:py-3.5 lg:gap-x-1"
                        key={index}
                      >
                        <span>{name}</span>
                        <span>
                          ${price} /{' '}
                          <span className="font-light tracking-tight text-pricing-gray-7">
                            {unit}
                          </span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
};

export default Metrics;
