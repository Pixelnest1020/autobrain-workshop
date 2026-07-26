'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CarPngCanvas({ mainContainerRef }) {
  const carWrapperRef = useRef(null);
  const carImageRef = useRef(null);

  useEffect(() => {
    if (!carWrapperRef.current || !mainContainerRef.current) return;

    const carWrapper = carWrapperRef.current;
    const carImage = carImageRef.current;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: mainContainerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.2,
        },
      });

      tl.to(carWrapper, { x: '-26vw', y: '8vh', scale: 1.1, rotation: -3, duration: 2 }, 'sec1')
        .to(carImage, { filter: 'drop-shadow(0 20px 30px rgba(229, 35, 33, 0.5))', duration: 2 }, 'sec1')
        .to(carWrapper, { x: '24vw', y: '4vh', scale: 1.2, rotation: 4, duration: 2 }, 'sec2')
        .to(carImage, { filter: 'drop-shadow(0 20px 30px rgba(29, 43, 150, 0.5))', duration: 2 }, 'sec2')
        .to(carWrapper, { x: '-20vw', y: '10vh', scale: 1.05, rotation: -2, duration: 2 }, 'sec3')
        .to(carWrapper, { x: '0vw', y: '16vh', scale: 1.3, rotation: 0, duration: 2.5 }, 'sec4')
        .to(carImage, { filter: 'drop-shadow(0 25px 40px rgba(255, 255, 255, 0.25))', duration: 2.5 }, 'sec4');
    });

    return () => ctx.revert();
  }, [mainContainerRef]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden">
      <div className="absolute w-[550px] h-[550px] bg-gradient-to-tr from-[#1D2B96]/30 to-[#E52321]/30 rounded-full blur-3xl opacity-60 pointer-events-none" />
      <div ref={carWrapperRef} className="relative w-[300px] sm:w-[450px] md:w-[600px] lg:w-[750px] transition-transform duration-75">
        <Image
          ref={carImageRef}
          src="/images/hcar.png"
          alt="AutoBrain Car Care"
          width={1000}
          height={600}
          priority
          className="w-full h-auto object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)]"
        />
      </div>
    </div>
  );
}