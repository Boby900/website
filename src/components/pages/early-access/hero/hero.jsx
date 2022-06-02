import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { StaticImage } from 'gatsby-plugin-image';
import React, { useState } from 'react';

import Button from 'components/shared/button';
import Link from 'components/shared/link';
import LINKS from 'constants/links';
import logoBlack from 'images/logo-black.svg';
import logoWhite from 'images/logo-white.svg';

import CheckIcon from './images/check.inline.svg';

const emailRegexp =
  // eslint-disable-next-line no-control-regex, no-useless-escape
  /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;

const appearAndExitAnimationVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

function doNowOrAfterSomeTime(callback, loadingAnimationStartedTime) {
  const LOADING_ANIMATION_FULL_DURATION = 2200; // 2000 (loading animation duration) + 200 (loading animation delay) = 2200

  if (Date.now() - loadingAnimationStartedTime > LOADING_ANIMATION_FULL_DURATION) {
    callback();
  } else {
    setTimeout(
      callback,
      LOADING_ANIMATION_FULL_DURATION - (Date.now() - loadingAnimationStartedTime)
    );
  }
}

const Hero = () => {
  const [email, setEmail] = useState('');
  const [formState, setFormState] = useState('default');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (event) => setEmail(event.currentTarget.value.trim());

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email) {
      setErrorMessage('Please enter your email');
    } else if (!emailRegexp.test(email)) {
      setErrorMessage('Please enter a valid email');
    } else {
      setErrorMessage('');
      setFormState('loading');

      const loadingAnimationStartedTime = Date.now();

      fetch('https://submit-form.com/6ERkQV60', {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({ email }),
      })
        .then((response) => {
          if (response.ok) {
            doNowOrAfterSomeTime(() => {
              setFormState('success');

              setTimeout(() => {
                setFormState('default');
                setEmail('');
              }, 2000);
            }, loadingAnimationStartedTime);
          } else {
            doNowOrAfterSomeTime(() => {
              setFormState('default');
              setErrorMessage('Something went wrong. Please reload the page and try again');
            }, loadingAnimationStartedTime);
          }
        })
        .catch(() => {
          doNowOrAfterSomeTime(() => {
            setFormState('default');
            setErrorMessage('Something went wrong. Please reload the page and try again');
          }, loadingAnimationStartedTime);
        });
    }
  };

  return (
    <section className="safe-paddings flex h-screen min-h-[760px] lg:h-auto lg:min-h-screen lg:flex-col">
      <div className="relative min-w-[768px] bg-black p-8 text-white 2xl:min-w-0 lg:order-last lg:max-w-none lg:py-7 md:px-4">
        <div className="m-auto max-w-[520px]">
          <Link className="inline-block align-top lg:hidden" to="/">
            <img src={logoWhite} alt="Neon" />
          </Link>
          <h2 className="mt-28 text-[28px]  font-bold 2xl:mt-12 lg:mt-0 lg:max-w-[450px] md:text-[26px]">
            Neon limited beta release
          </h2>
          <p className="mt-5 border-t border-t-[#2E3338] pt-5 font-semibold">Free Tier includes:</p>
          <ul className="mt-5 space-y-4">
            {['compute up to 1 vCPU / 256 MB', 'up to 10 GB storage', '3 projects per user'].map(
              (item, index) => (
                <li className="flex items-center space-x-2 font-bold" key={index}>
                  <CheckIcon />
                  <span>{item}</span>
                </li>
              )
            )}
          </ul>
        </div>
        <StaticImage
          className="!absolute bottom-0 right-0 lg:!hidden"
          src="./images/illustration.png"
          alt=""
          aria-hidden
        />
      </div>
      <div className="flex grow items-center justify-center">
        <div className="max-w-[470px] lg:pb-10 lg:pt-3.5 md:w-full md:max-w-none md:px-4">
          <Link className="lg:alight-top hidden lg:inline-block" to="/">
            <img src={logoBlack} alt="Neon" />
          </Link>
          <h1 className="text-[28px] font-bold lg:mt-10 lg:text-center md:text-[26px]">
            Get serverless, fault-tolerant, branchable Postgresql
          </h1>
          <p className="mt-2.5 lg:text-center">
            Start with free tier. Setup takes under 5 seconds.
          </p>
          <form className="mt-7 lg:mt-5" noValidate onSubmit={handleSubmit}>
            <div className="relative">
              <input
                className={clsx(
                  'remove-autocomplete-styles h-11 w-full rounded border border-[#c7ccd1] px-3.5 transition-colors duration-200',
                  errorMessage && 'border-[#FF4C79]'
                )}
                name="email"
                type="email"
                value={email}
                placeholder="Enter your email"
                autoComplete="email"
                style={{ boxShadow: '0px 1px 2px rgba(23, 26, 28, 0.06)' }}
                readOnly={formState !== 'default'}
                onChange={handleInputChange}
              />
              <AnimatePresence>
                {errorMessage && (
                  <motion.span
                    className="absolute left-0 -bottom-1 w-full translate-y-full text-[12px] font-semibold text-[#FF4C79]"
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={appearAndExitAnimationVariants}
                  >
                    {errorMessage}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
            <div className="mt-7 flex items-center justify-between lg:mt-6 lg:flex-col lg:items-center lg:justify-center lg:space-y-6">
              <Button
                className="relative"
                size="xs"
                theme="primary"
                disabled={formState !== 'default'}
              >
                <span
                  className={clsx(
                    'transition-opacity duration-200',
                    (formState === 'loading' || formState === 'success') && 'opacity-0'
                  )}
                >
                  Request Early Access
                </span>
                <span
                  className={clsx(
                    'absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 transition-opacity duration-200',
                    formState !== 'success' && 'opacity-0'
                  )}
                >
                  Success!
                </span>
                {formState === 'loading' && (
                  <AnimatePresence>
                    <motion.svg
                      className="absolute top-1/2 left-1/2 h-[28px] w-[28px]"
                      width="58"
                      height="58"
                      viewBox="0 0 58 58"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ transform: 'scale(1, -1) rotate(-90deg) translate(-50%, -50%)' }}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      variants={appearAndExitAnimationVariants}
                    >
                      <motion.path
                        d="M3 29C3 43.3594 14.6406 55 29 55C43.3594 55 55 43.3594 55 29C55 14.6406 43.3594 3 29 3C14.6406 3 3 14.6406 3 29Z"
                        strokeLinecap="round"
                        stroke="#1a1a1a"
                        strokeWidth="6"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1, transition: { duration: 2, delay: 0.2 } }}
                      />
                    </motion.svg>
                  </AnimatePresence>
                )}
              </Button>
              <p className="text-[14px]">
                Have an invite code?{' '}
                <Link className="font-semibold text-[#0D80F2] hover:underline" to={LINKS.dashboard}>
                  Log In
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Hero;
