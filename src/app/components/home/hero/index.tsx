'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import { Icon } from '@iconify/react/dist/iconify.js'

const Banner = () => {
  const [isOpen, setOpen] = useState(false)

  const openModal = () => setOpen(true)
  const closeModal = () => setOpen(false)

  return (
    <section className="relative pb-0" id="home-section">
      {/* Background aura */}
      <div className="bg-banner-image absolute w-full h-full top-0 blur-390"></div>

      <div className="overflow-hidden">
        <div className="container lg:pt-20 pt-10 relative">
          <div className="relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 my-16 items-center">
              {/* LEFT */}
              <div className="lg:col-span-7 mb-16">
                <h1 className="mb-5 lg:text-start text-center sm:leading-snug leading-tight capitalize">
                  Let Me Tokenize It ✨ <br /> Take a selfie. Smile. Mint your Golden NFT.
                </h1>

                <p className="text-white font-normal mb-10 max-w-[70%] lg:text-start text-center lg:mx-0 mx-auto">
                  Turn your joy into a digital collectible. Upload a smiling selfie and
                  mint a <span className="font-semibold text-yellow-300">Golden NFT</span> that
                  lives on-chain. Join the Golden Genesis Collection—10,000 smiles powering
                  the Odzi rollout and Africa’s RWA future.
                </p>

                <div className="flex align-middle justify-center lg:justify-start">
                  <a
                    href="/mint"
                    className="text-xl font-semibold text-black py-4 px-6 lg:px-12 bg-gradient-to-r from-yellow-300 to-yellow-500 hover:from-yellow-400 hover:to-yellow-300 rounded-xl mr-6 cursor-pointer"
                  >
                    Mint My Smile
                  </a>

                  <button
                    onClick={openModal}
                    className="bg-transparent flex justify-center items-center text-white cursor-pointer"
                  >
                    <Image
                      src={'/images/banner/playbutton.svg'}
                      alt="play how-it-works"
                      className="mr-3"
                      width={47}
                      height={47}
                    />
                    <span className="hover:text-primary">How It Works</span>
                  </button>
                </div>
              </div>

              {/* RIGHT VISUAL */}
              <div className='lg:col-span-5 lg:-m-48 -m-20 overflow-hidden'>
                <Image
                  src="/images/banner/banner.png" // <-- place your generated hero here
                  alt="Golden NFT smile hero"
                  width={1013}
                  height={760}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* HOW IT WORKS MODAL */}
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-primary to-secondary rounded-lg sm:m-0 m-4">
            <div className="overlay flex items-center justify-between border-b border-solid border-border p-5 z-50 backdrop-blur-sm">
              <h3 className="text-white">How It Works</h3>
              <button onClick={closeModal} className="inline-block dark:invert">
                <Icon
                  icon="tabler:circle-x"
                  className="text-2xl text-white hover:cursor-pointer hover:text-primary"
                />
              </button>
            </div>

            {/* Replace src with your explainer video for the selfie → mint flow */}
            <iframe
              height="400"
              className="p-4 md:w-[50rem] w-full"
              src="https://www.youtube.com/embed/VIDEO_ID?rel=0&modestbranding=1"
              title="Let Me Tokenize It — How It Works"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  )
}

export default Banner
