import React, { FC } from "react";
import imagePng from "@/images/hero-golden-smile.png"; // replace with your campaign image
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Image from "next/image";
import HeroSearchForm from "../HeroSearchForm/HeroSearchForm";

export interface SectionHero2Props {
  children?: React.ReactNode;
  className?: string;
}

const SectionHero2: FC<SectionHero2Props> = ({ className = "", children }) => {
  return (
    <div
      className={`nc-SectionHero2 flex flex-col-reverse lg:flex-col relative ${className}`}
    >
      <div className="flex flex-col lg:flex-row lg:items-center">
        {/* LEFT CONTENT */}
        <div className="flex-shrink-0 lg:w-1/2 flex flex-col items-start space-y-8 sm:space-y-10 pb-14 lg:pb-36 xl:pb-60 xl:pr-14 lg:mr-10 xl:mr-0">
          <h2 className="font-semibold text-4xl md:text-5xl xl:text-6xl !leading-[114%] text-yellow-500">
            Let Me Tokenize It ✨
          </h2>

          <span className="text-base md:text-lg text-neutral-500 dark:text-neutral-400">
            Take a selfie. Smile. <br /> Mint your <span className="font-semibold text-yellow-500">Golden NFT</span>.
            <br /> Every smile is worth its weight in gold.
          </span>

          <ButtonPrimary href="/mint">
            <span>Mint My Smile</span>
            <span>
              <svg
                className="w-5 h-5 ml-2.5"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M22 22L20 20"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </ButtonPrimary>

          <span className="text-sm text-neutral-400 dark:text-neutral-500">
            Join the Golden Genesis Collection — 10,000 smiles that change the world.
          </span>
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex-grow">
          <Image
            className="w-full rounded-2xl shadow-xl"
            src={imagePng}
            alt="Smiling NFT Hero"
            priority
          />
        </div>
      </div>

      {/* SEARCH / MINT FORM */}
      <div className="z-10 mb-12 lg:mb-0 lg:-mt-20 xl:-mt-48 w-full">
        <HeroSearchForm placeholder="Upload your smile or selfie..." buttonLabel="Tokenize It" />
      </div>
    </div>
  );
};

export default SectionHero2;
