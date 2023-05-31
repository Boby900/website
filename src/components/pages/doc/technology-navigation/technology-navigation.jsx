'use client';

import clsx from 'clsx';
import NextLink from 'next/link';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import ArrowRightIcon from 'icons/arrow-right.inline.svg';
import ChevronRight from 'icons/chevron-right-sm.inline.svg';

const TechnologyNavigation = ({ children = null }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  return (
    <>
      <ul className="not-prose !mb-2 !mt-9 grid grid-cols-12 gap-5 !p-0">
        {React.Children.map(children, (child, index) => {
          const {
            children: {
              props: { alt, src, title },
            },
            href,
          } = child.props?.children.props ?? {};
          const isHiddenItem = index > 3 && !isOpen;

          return (
            <li
              className={clsx(
                'col-span-3 before:hidden md:col-span-6',
                isHiddenItem ? 'hidden' : 'block'
              )}
            >
              <NextLink
                key={index}
                href={href}
                className="flex h-full flex-col justify-between rounded-[10px] border !border-gray-7 p-6 !transition-colors !duration-200 hover:bg-gray-9 dark:hover:bg-gray-1 xl:p-5"
              >
                <div>
                  <div className="h-12">
                    <img
                      className="w-auto shrink-0 dark:invert"
                      src={src}
                      width={80}
                      alt={`${alt} logo`}
                      loading={index > 3 ? 'lazy' : 'eager'}
                    />
                  </div>
                  <h4 className="text-xl font-semibold text-black dark:text-white">{alt}</h4>
                  <p className="mt-2 text-sm text-gray-4 dark:text-gray-7">{title}</p>
                </div>
                <span className="mt-auto inline-flex items-center text-base font-medium 2xl:text-sm lg:text-base sm:text-sm">
                  <span>Learn More</span>
                  <ArrowRightIcon className="ml-1" />
                </span>
              </NextLink>
            </li>
          );
        })}
      </ul>
      <button
        className="mx-auto flex items-center rounded-full bg-gray-9 px-5 py-2 text-sm font-medium text-black transition-colors duration-200 hover:bg-gray-8 dark:bg-gray-1 dark:text-white dark:hover:bg-gray-2"
        type="button"
        onClick={handleClick}
      >
        <span>{isOpen ? 'Hide' : 'Show more'}</span>
        <ChevronRight
          className={clsx(
            'ml-2 block shrink-0 text-black transition-[transform,color] duration-200 dark:text-white',
            isOpen ? '-rotate-90' : 'rotate-90'
          )}
        />
      </button>
    </>
  );
};

TechnologyNavigation.propTypes = {
  children: PropTypes.node,
};

export default TechnologyNavigation;
