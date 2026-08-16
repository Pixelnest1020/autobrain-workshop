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
  if (!mainContainerRef?.current) return;

  const ctx = gsap.context(() => {
    const carWrapper = carWrapperRef.current;
    const carImage = carImageRef.current;

    if (!carWrapper || !carImage) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: mainContainerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
    });

    tl.to(carWrapper, { x: '-26vw', y: '8vh', scale: 1.1, rotation: -3, duration: 2 }, 'sec1')
      .to(carImage, { filter: 'drop-shadow(0 20px 30px rgba(229, 35, 33, 0.5))', duration: 2 }, 'sec1')
      .to(carWrapper, { x: '24vw', y: '4vh', scale: 1.2, rotation: 4, duration: 2 }, 'sec2')
      .to(carImage, { filter: 'drop-shadow(0 20px 30px rgba(29, 43, 150, 0.5))', duration: 2 }, 'sec2')
      .to(carWrapper, { x: '-20vw', y: '10vh', scale: 1.05, rotation: -2, duration: 2 }, 'sec3')
      .to(carWrapper, { x: '0vw', y: '16vh', scale: 1.3, rotation: 0, duration: 2.5 }, 'sec4')
      .to(carImage, { filter: 'drop-shadow(0 25px 40px rgba(255, 255, 255, 0.25))', duration: 2.5 }, 'sec4');

  }, mainContainerRef);

  return () => ctx.revert();
}, [mainContainerRef]);

  return (
  /* Keep fixed flex container active on ALL screens */
  <div className="fixed inset-0 pointer-events-none z-10 flex items-center justify-end pr-2 sm:pr-6 md:pr-12 lg:pr-24">
    
    {/* Scaled-down container: Made smaller on mobile (max-w-[220px]) so text remains readable */}
    <div className="w-[40vw] max-w-[150px] xs:max-w-[180px] sm:max-w-[400px] md:max-w-[550px] lg:max-w-[650px] h-auto flex justify-center items-center -translate-y-6 sm:translate-y-0">

     {/* GSAP scroll ref */}
<div ref={carWrapperRef} className="w-full flex justify-center items-center">
  <img
    ref={carImageRef}
    src="/images/hcar.png"
    alt="AutoBrain Car"
    className="w-full h-auto object-contain opacity-90 sm:opacity-100"
  />
</div>

    </div>
  </div>
);
}