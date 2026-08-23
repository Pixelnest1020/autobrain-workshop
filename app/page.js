'use client';

import { useRef, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, Wrench, Sparkles, ShieldCheck, Car, Calendar, ArrowRight, 
  Phone, CheckCircle2, ChevronDown, X, MessageSquare, MapPin, Clock, User, ZoomIn
} from 'lucide-react';

import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ 
  subsets: ['latin'], 
  weight: ['600', '700'],
  style: ['italic']
});

const CarPngCanvas = dynamic(() => import('@/components/CarPngCanvas'), { ssr: false });

export default function Home() {
  const mainContainerRef = useRef(null);
  
  // State for Booking Modal & Web3Forms state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  // State for Live Offer Center Modal
  const [showOfferModal, setShowOfferModal] = useState(true);

  // ADD THIS NEW STATE FOR MOBILE MENU:
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // State for Full-Screen Gallery Image Modal
  const [selectedImage, setSelectedImage] = useState(null);

  // State for FAQ Accordions
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Form Submission Handler (Sends email to your inbox)
const handleBookingSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  // FormData automatically reads all hidden inputs including 'cc'
  const formData = new FormData(e.target);

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();
    console.log("Web3Forms Response:", data);

    if (data.success) {
      setBookingSubmitted(true);
      setTimeout(() => {
        setBookingSubmitted(false);
        setIsModalOpen(false);
      }, 3000);
    } else {
      alert("Web3Forms Error: " + data.message);
    }
  } catch (error) {
    alert("Submission failed. Please try again.");
  } finally {
    setIsSubmitting(false);
  }
};

  const faqs = [
    {
      q: "How does the cashless insurance claim process work?",
      a: "We manage everything directly with your insurance provider. Bring your vehicle to our workshop along with your policy documents, RC, and driving license. Our onsite surveyor inspects the damage, approves the claim, and repairs are carried out with zero out-of-pocket hassle for covered items."
    },
    {
      q: "Do you service all car brands and luxury models?",
      a: "Yes! AutoBrain is a dedicated multi-brand facility. We service everything from standard hatchbacks and sedans to high-end luxury vehicles (BMW, Mercedes, Audi, Jaguar, etc.) using manufacturer-recommended diagnostic software and genuine parts."
    },
    {
      q: "How long does a full body denting and painting job take?",
      a: "Minor scratch and dent repairs take 24–48 hours in our computerized paint booth. Full body paint or major restorative work typically takes 4 to 6 business days to ensure proper primer curing and coat finishing."
    },
    {
      q: "What warranty do you offer on Ceramic Coating and PPF?",
      a: "Our Graphene and Ceramic coatings come with a 2 to 5-year warranty depending on the selected package, including free annual top-up maintenance inspections."
    }
  ];

  const testimonials = [
    {
      name: "Rahul Sharma",
      car: "BMW 3 Series",
      comment: "Got major bumper denting and paint restoration done. The computerized color matching is flawless—you cannot tell it was ever damaged. Highly recommended!",
      rating: 5
    },
    {
      name: "Priya Patel",
      car: "Hyundai Creta",
      comment: "Handled my cashless insurance claim smoothly after an accident. No hidden charges and vehicle was delivered clean inside out ahead of time.",
      rating: 5
    },
    {
      name: "Vikram Mehta",
      car: "Honda City",
      comment: "Done deep interior steam cleaning and graphene coating here. The shine is unreal and hydrophobic effect is amazing during heavy rain.",
      rating: 5
    }
  ];

  return (
    <main ref={mainContainerRef} className="relative bg-neutral-950 text-neutral-100 overflow-x-hidden font-sans">
      {/* Dynamic Motion Car Background */}
      <CarPngCanvas mainContainerRef={mainContainerRef} />

      {/* NAVIGATION BAR */}
<nav className="fixed top-0 left-0 right-0 z-50 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800">
  <div className="flex items-center justify-between max-w-7xl mx-auto px-4 py-2.5">
    
    {/* Logo Wrapper */}
    <div className="relative w-28 h-8 sm:w-36 sm:h-10 md:w-44 md:h-12 bg-white rounded-xl p-1 flex items-center justify-center shrink-0">
      <Image
        src="/images/hlogo.png"
        alt="AutoBrain Car Care Logo"
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-contain p-1"
        priority
      />
    </div>

    {/* Desktop Navigation Links (Hidden on Mobile) */}
    <div className="hidden lg:flex items-center gap-7 text-sm font-semibold tracking-wide text-neutral-200">
      <a href="#about" className="hover:text-red-500 transition-colors">About Us</a>
      <a href="#services" className="hover:text-red-500 transition-colors">A-Z Services</a>
      <a href="#gallery" className="hover:text-red-500 transition-colors">Gallery</a>
      <a href="#detailing" className="hover:text-red-500 transition-colors">Detailing & Polish</a>
      <a href="#claims" className="hover:text-red-500 transition-colors">Insurance Claims</a>
      <a href="#buysell" className="hover:text-red-500 transition-colors">Buy & Sell</a>
      <a href="#faqs" className="hover:text-red-500 transition-colors">FAQs</a>
    </div>

    {/* Right Controls: Desktop Book Button + Mobile MENU Toggle */}
    <div className="flex items-center gap-2 sm:gap-3">
      <button 
        onClick={() => setIsModalOpen(true)}
        className="hidden sm:flex px-4 py-2 bg-[#E52321] hover:bg-red-700 text-white text-xs sm:text-sm font-bold rounded-full items-center gap-1.5 shadow-md transition"
      >
        <Calendar size={14} />
        <span>Book Visit</span>
      </button>

      {/* Modern Pill Toggle Button for Mobile (No 3-lines, No X) */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="lg:hidden flex items-center gap-2 px-3 py-1.5 rounded-full border border-neutral-700 bg-neutral-900 text-xs font-bold tracking-wider text-white hover:border-[#E52321] transition"
      >
        <span className={`h-2 w-2 rounded-full ${isMenuOpen ? 'bg-red-500' : 'bg-emerald-500'}`} />
        <span>{isMenuOpen ? "CLOSE" : "MENU"}</span>
      </button>
    </div>

  </div>

  {/* Mobile Vertical Dropdown List */}
  {isMenuOpen && (
    <div className="lg:hidden bg-neutral-900 border-t border-neutral-800 text-white w-full flex flex-col uppercase font-semibold text-xs sm:text-sm tracking-wider divide-y divide-neutral-800">
      <a href="#about" onClick={() => setIsMenuOpen(false)} className="px-6 py-3.5 text-center hover:bg-neutral-800 transition">About Us</a>
      <a href="#services" onClick={() => setIsMenuOpen(false)} className="px-6 py-3.5 text-center hover:bg-neutral-800 transition">A-Z Services</a>
      <a href="#gallery" onClick={() => setIsMenuOpen(false)} className="px-6 py-3.5 text-center hover:bg-neutral-800 transition">Gallery</a>
      <a href="#detailing" onClick={() => setIsMenuOpen(false)} className="px-6 py-3.5 text-center hover:bg-neutral-800 transition">Detailing & Polish</a>
      <a href="#claims" onClick={() => setIsMenuOpen(false)} className="px-6 py-3.5 text-center hover:bg-neutral-800 transition">Insurance Claims</a>
      <a href="#buysell" onClick={() => setIsMenuOpen(false)} className="px-6 py-3.5 text-center hover:bg-neutral-800 transition">Buy & Sell</a>
      <a href="#faqs" onClick={() => setIsMenuOpen(false)} className="px-6 py-3.5 text-center hover:bg-neutral-800 transition">FAQs</a>
    </div>
  )}
</nav>

{/* RIGHT-SIDE STICKY FLOATING ACTION BAR */}
<div className="fixed right-0 top-1/2 -translate-y-1/2 z-40 flex flex-col shadow-2xl rounded-l-xl overflow-hidden">
  
  {/* Vertical "Contact Us" Tab */}
  <button 
    onClick={() => setIsModalOpen(true)}
    className="bg-[#E52321] hover:bg-red-700 text-white py-4 px-2.5 flex items-center justify-center transition-colors cursor-pointer"
    style={{ writingMode: "vertical-rl" }}
  >
    <span className="rotate-180 font-bold text-xs tracking-wider uppercase">
      Contact Us
    </span>
  </button>

  {/* Phone Call Shortcut */}
<a 
  href="tel:+919157443095"
  className="bg-neutral-800 hover:bg-neutral-700 text-white p-3 flex items-center justify-center border-t border-neutral-700"
  title="Call Us"
>
  <Phone size={16} />
</a>

{/* WhatsApp Shortcut */}
<a 
  href="https://wa.me/918905602022"
  target="_blank"
  rel="noreferrer"
  className="bg-emerald-600 hover:bg-emerald-500 text-white p-3 flex items-center justify-center border-t border-emerald-500"
  title="WhatsApp Us"
>
  <MessageSquare size={16} />
</a>

</div>
      {/* PAGE CONTENT CONTAINER */}
      <div className="relative z-10">

        {/* SECTION 1: HERO */}
        {/* HERO SECTION - ELECTRIC BLUE EDITION */}
<section className="relative min-h-[70vh] lg:min-h-[90vh] flex items-center pt-20 sm:pt-28 pb-8 sm:pb-16 overflow-hidden">
  
  {/* Background Blue Ambient Glow */}
  <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-600/15 rounded-full blur-[120px] pointer-events-none" />

  <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10">
    
    {/* LEFT COLUMN: Text Content */}
    <div className="lg:col-span-7 flex flex-col items-start text-left gap-6 z-10">
      
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-900/90 border border-neutral-700/80 text-xs sm:text-sm font-medium text-neutral-200 shadow-lg backdrop-blur-md">
        <Star size={14} className="text-yellow-400 fill-yellow-400" />
        <span>4.9★ Rated Multi-Brand Workshop on Google</span>
      </div>

{/* Hero Headline */}
<div className="relative inline-block">
  {/* Cyan Background Ambient Glow */}
  <div className="absolute -inset-4 bg-cyan-400/35 blur-3xl rounded-full pointer-events-none"></div>

  {/* Italic, Medium-Bold White Title */}
  <h1 className={`${montserrat.className} relative text-5xl sm:text-7xl md:text-8xl font-semibold italic tracking-wide uppercase mb-1 text-white`}>
    AUTOBRAIN
  </h1>
</div>

<p className={`${montserrat.className} text-lg sm:text-xl md:text-2xl font-semibold italic tracking-wider text-cyan-400 uppercase mt-1`}>
  Multi-Brand Car Workshop
</p>
      

      {/* Supporting Description */}
      <p className="text-neutral-400 text-sm sm:text-base max-w-lg leading-relaxed">
        Surat's premier multi-brand workshop. From high-end computerized denting & painting to graphene detailing and smooth cashless insurance claims.
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-wrap items-center gap-4 pt-2">
        {/* Book Appointment Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-7 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full flex items-center gap-2.5 shadow-[0_4px_20px_rgba(37,99,235,0.4)] hover:shadow-[0_4px_25px_rgba(37,99,235,0.6)] transition-all text-sm sm:text-base cursor-pointer transform hover:-translate-y-0.5"
        >
          <span>Book Appointment</span>
          <ArrowRight size={18} />
        </button>

        {/* WhatsApp Workshop Button */}
        <a
          href="https://wa.me/8905602022"
          target="_blank"
          rel="noreferrer"
          className="px-6 py-3.5 bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-700 text-white font-semibold rounded-full flex items-center gap-2.5 transition-all text-sm sm:text-base backdrop-blur-md"
        >
          <MessageSquare size={18} className="text-emerald-400" />
          <span>WhatsApp Workshop</span>
        </a>
      </div>

      {/* Key Feature Highlights */}
      <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-neutral-800/80 w-full max-w-lg text-xs text-neutral-400 font-medium">
        <div className="flex items-center gap-2">
          <ShieldCheck size={16} className="text-blue-400" />
          <span>Cashless Claims</span>
        </div>
        <div className="flex items-center gap-2">
          <Wrench size={16} className="text-blue-400" />
          <span>Multi-Brand Expert</span>
        </div>
        <div className="flex items-center gap-2">
          <Sparkles size={16} className="text-blue-400" />
          <span>Ceramic & PPF</span>
        </div>
      </div>

    </div>

    {/* RIGHT COLUMN: Car Canvas Spacer */}
    <div className="lg:col-span-5 relative w-full h-[180px] xs:h-[220px] sm:h-[350px] lg:h-[500px] flex items-center justify-center -my-4 sm:my-0">
      {/* 3D Car Canvas */}
    </div>

  </div>
</section>
        {/* STATS BANNER */}
<div className="w-full max-w-7xl mx-auto px-4 mt-0 sm:-mt-10 relative z-20">
  <div className="bg-neutral-900/80 backdrop-blur-xl border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-2xl grid grid-cols-2 md:grid-cols-4 gap-6 divide-y md:divide-y-0 md:divide-x divide-neutral-800">
    
    {/* 30K+ Happy Customers - Pink/Red + */}
    <div className="pt-4 md:pt-0 md:px-4">
      <StatItem target={30} suffix="K+" label="Happy Customers" suffixColor="text-[#E52321]" />
    </div>

    {/* 20+ Years Experience - Cyan/Blue + */}
    <div className="pt-4 md:pt-0 md:px-4">
      <StatItem target={20} suffix="+" label="Years Experience" suffixColor="text-sky-400" />
    </div>

    {/* 15K+ Premium Cars Serviced - Red/Pink + */}
    <div className="pt-4 md:pt-0 md:px-4">
      <StatItem target={15} suffix="K+" label="Premium Cars Serviced" suffixColor="text-red-400" />
    </div>

    {/* 4.9★ Google Rating - Yellow ★ */}
    <div className="pt-4 md:pt-0 md:px-4">
      <StatItem target={4.9} decimals={1} suffix="★" label="Google Rating (500+ Reviews)" suffixColor="text-amber-400" />
    </div>

  </div>
</div>

        {/* ABOUT US SECTION */}
        <section id="about" className="min-h-screen flex items-center justify-start px-6 md:px-20 py-20">
          <div className="max-w-2xl bg-neutral-900/60 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-3xl shadow-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold mb-6">
              <User size={14} /> Who We Are
            </div>

            <h2 className="text-3xl md:text-5xl font-black tracking-tight">
              About Auto<span className="text-[#E52321]">Brain</span> Car Care
            </h2>

            <p className="mt-4 text-neutral-300 text-base md:text-lg leading-relaxed">
              Founded with a passion for automotive perfection, AutoBrain Car Care is a premier multi-brand workshop dedicated to keeping your vehicle in showroom condition. 
            </p>

            <p className="mt-3 text-neutral-400 text-sm leading-relaxed">
              Whether it’s restoring precision paint alignment in our climate-controlled booth, performing advanced diagnostic troubleshooting, or managing end-to-end cashless insurance claims, our certified technicians treat every car with standard OEM care.
            </p>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <h4 className="font-bold text-white text-base">Certified Mechanics</h4>
                <p className="text-xs text-neutral-400 mt-1">Trained on multi-brand luxury & domestic systems</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <h4 className="font-bold text-white text-base">100% Transparency</h4>
                <p className="text-xs text-neutral-400 mt-1">Detailed digital reports & upfront pricing</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: SERVICES GRID */}
        <section id="services" className="py-24 px-6 md:px-20 bg-neutral-950/90 relative z-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold mb-4">
                <Wrench size={14} /> Comprehensive Automotive Solutions
              </div>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white">
                Our A-Z Workshop <span className="text-[#E52321]">Services</span>
              </h2>
              <p className="text-neutral-400 text-sm md:text-base mt-3">
                From high-precision mechanical troubleshooting to showroom-grade restorative detailing.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Service 1 */}
              <div className="group bg-neutral-900/80 border border-white/10 rounded-3xl overflow-hidden hover:border-red-500/50 transition-all duration-300 shadow-xl flex flex-col justify-between">
                <div>
                  <div className="relative w-full h-48 bg-neutral-800 overflow-hidden">
                    <img
                      src="https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg?auto=compress&cs=tinysrgb&w=800"
                      alt="Denting and Painting"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-red-500 transition-colors">
                      Denting & Computerized Painting
                    </h3>
                    <p className="text-neutral-400 text-sm leading-relaxed line-clamp-2">
                      Restore original factory shine and eliminate major collisions or minor scratches with exact computerized paint booth matching.
                    </p>
                  </div>
                </div>
                <div className="px-6 pb-6 pt-2">
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="w-full py-2.5 bg-white/5 hover:bg-[#E52321] text-white text-xs font-bold rounded-xl transition-colors border border-white/10 cursor-pointer"
                  >
                    Book Service
                  </button>
                </div>
              </div>

              {/* Service 2 */}
              <div className="group bg-neutral-900/80 border border-white/10 rounded-3xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 shadow-xl flex flex-col justify-between">
                <div>
                  <div className="relative w-full h-48 bg-neutral-800 overflow-hidden">
                    <img
                      src="https://images.pexels.com/photos/4489749/pexels-photo-4489749.jpeg?auto=compress&cs=tinysrgb&w=800"
                      alt="Periodic Maintenance"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                      Periodic Maintenance & Oil Change
                    </h3>
                    <p className="text-neutral-400 text-sm leading-relaxed line-clamp-2">
                      Keep your engine running at peak efficiency with synthetic grade oil replacements, filter renewals, and multi-point safety checks.
                    </p>
                  </div>
                </div>
                <div className="px-6 pb-6 pt-2">
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="w-full py-2.5 bg-white/5 hover:bg-[#1D2B96] text-white text-xs font-bold rounded-xl transition-colors border border-white/10 cursor-pointer"
                  >
                    Book Service
                  </button>
                </div>
              </div>

              {/* Service 3 */}
              <div className="group bg-neutral-900/80 border border-white/10 rounded-3xl overflow-hidden hover:border-red-500/50 transition-all duration-300 shadow-xl flex flex-col justify-between">
                <div>
                  <div className="relative w-full h-48 bg-neutral-800 overflow-hidden">
                    <img
                      src="https://images.pexels.com/photos/372810/pexels-photo-372810.jpeg?auto=compress&cs=tinysrgb&w=800"
                      alt="Ceramic Coating"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-red-500 transition-colors">
                      Ceramic & Graphene Shield
                    </h3>
                    <p className="text-neutral-400 text-sm leading-relaxed line-clamp-2">
                      Ultra-hydrophobic liquid armor shield protecting paintwork against UV oxidation, road debris, rain stains, and surface scratches.
                    </p>
                  </div>
                </div>
                <div className="px-6 pb-6 pt-2">
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="w-full py-2.5 bg-white/5 hover:bg-[#E52321] text-white text-xs font-bold rounded-xl transition-colors border border-white/10 cursor-pointer"
                  >
                    Book Service
                  </button>
                </div>
              </div>

              {/* Service 4 */}
              <div className="group bg-neutral-900/80 border border-white/10 rounded-3xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 shadow-xl flex flex-col justify-between">
                <div>
                  <div className="relative w-full h-48 bg-neutral-800 overflow-hidden">
                    <img
                      src="https://www.shutterstock.com/image-photo/car-service-checking-concept-hand-600nw-2465864641.jpg"
                      alt="Engine Diagnostics"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                      Computerized Engine Diagnostics
                    </h3>
                    <p className="text-neutral-400 text-sm leading-relaxed line-clamp-2">
                      Advanced scanner troubleshooting for check engine lights, transmission issues, sensor faults, and ECU recalibration.
                    </p>
                  </div>
                </div>
                <div className="px-6 pb-6 pt-2">
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="w-full py-2.5 bg-white/5 hover:bg-[#1D2B96] text-white text-xs font-bold rounded-xl transition-colors border border-white/10 cursor-pointer"
                  >
                    Book Service
                  </button>
                </div>
              </div>

              {/* Service 5 */}
              <div className="group bg-neutral-900/80 border border-white/10 rounded-3xl overflow-hidden hover:border-red-500/50 transition-all duration-300 shadow-xl flex flex-col justify-between">
                <div>
                  <div className="relative w-full h-48 bg-neutral-800 overflow-hidden">
                    <img
                      src="https://zippycupautodetail.com/wp-content/uploads/2026/01/Why-Interior-Steam-Cleaning-Is-a-Better-Option-for-Your-Car-vs.-Basic-Shampoo-scaled.jpg"
                      alt="Interior Steam Spa"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-red-500 transition-colors">
                      Deep Interior Steam Spa
                    </h3>
                    <p className="text-neutral-400 text-sm leading-relaxed line-clamp-2">
                      Complete cabin sanitization, upholstery steam extraction, leather conditioning, and odor removal for sterile freshness.
                    </p>
                  </div>
                </div>
                <div className="px-6 pb-6 pt-2">
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="w-full py-2.5 bg-white/5 hover:bg-[#E52321] text-white text-xs font-bold rounded-xl transition-colors border border-white/10 cursor-pointer"
                  >
                    Book Service
                  </button>
                </div>
              </div>

              {/* Service 6 */}
              <div className="group bg-neutral-900/80 border border-white/10 rounded-3xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 shadow-xl flex flex-col justify-between">
                <div>
                  <div className="relative w-full h-48 bg-neutral-800 overflow-hidden">
                    <img
                      src="https://images.pexels.com/photos/13065690/pexels-photo-13065690.jpeg?auto=compress&cs=tinysrgb&w=800"
                      alt="Wheel Alignment & Suspension"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                      Wheel Alignment & Brakes
                    </h3>
                    <p className="text-neutral-400 text-sm leading-relaxed line-clamp-2">
                      3D laser wheel balancing, steering calibration, brake pad replacements, and suspension damping for a smooth ride.
                    </p>
                  </div>
                </div>
                <div className="px-6 pb-6 pt-2">
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="w-full py-2.5 bg-white/5 hover:bg-[#1D2B96] text-white text-xs font-bold rounded-xl transition-colors border border-white/10 cursor-pointer"
                  >
                    Book Service
                  </button>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* CLICKABLE LIGHTBOX GALLERY FOR ALL 10 PHOTOS */}
        <section id="gallery" className="py-24 px-6 md:px-20 bg-neutral-950 relative z-20 border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-[#E52321] text-xs font-bold mb-4">
                <Sparkles size={14} /> Click Any Photo To Expand
              </div>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white">
                Facility & Work <span className="text-[#E52321]">Gallery</span>
              </h2>
              <p className="text-neutral-400 text-sm md:text-base mt-3">
                Tap any photo below to open high-resolution view.
              </p>
            </div>

            {/* CATEGORY 1: WORKSHOP ENTRANCE & PARKING */}
            <div className="mb-14">
              <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-3">
                <div className="w-3 h-7 bg-red-600 rounded-full" />
                <h3 className="text-xl md:text-2xl font-bold text-white">Workshop Entrance & Customer Parking</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div 
                  onClick={() => setSelectedImage({ src: "/images/entry.jpeg", title: "Main Workshop Entrance" })}
                  className="group relative h-64 rounded-3xl overflow-hidden bg-neutral-900 border border-white/10 shadow-xl cursor-pointer"
                >
                  <img
                    src="/images/entry.jpeg"
                    alt="AutoBrain Workshop Entry"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="p-3 bg-red-600/80 rounded-full text-white shadow-lg"><ZoomIn size={22} /></span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-sm font-semibold text-white bg-black/50 p-2 rounded-xl backdrop-blur-sm">
                    Main Workshop Entrance
                  </div>
                </div>

                <div 
                  onClick={() => setSelectedImage({ src: "/images/customer-parking.jpeg", title: "Secure Customer Parking & Storage Bay" })}
                  className="group relative h-64 rounded-3xl overflow-hidden bg-neutral-900 border border-white/10 shadow-xl cursor-pointer"
                >
                  <img
                    src="/images/customer-parking.jpeg"
                    alt="Inside Workshop Customer Vehicles"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="p-3 bg-red-600/80 rounded-full text-white shadow-lg"><ZoomIn size={22} /></span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-sm font-semibold text-white bg-black/50 p-2 rounded-xl backdrop-blur-sm">
                    Secure Customer Parking & Storage Bay
                  </div>
                </div>
              </div>
            </div>

            {/* CATEGORY 2: PAINT BOOTH & DENTING BAY */}
            <div className="mb-14">
              <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-3">
                <div className="w-3 h-7 bg-amber-500 rounded-full" />
                <h3 className="text-xl md:text-2xl font-bold text-white">Paint Booth & Denting Workstation</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div 
                  onClick={() => setSelectedImage({ src: "/images/paint-booth-1.jpeg", title: "Climate-Controlled Paint Booth" })}
                  className="group relative h-64 rounded-3xl overflow-hidden bg-neutral-900 border border-white/10 shadow-xl cursor-pointer"
                >
                  <img
                    src="/images/paint-booth-1.jpeg"
                    alt="Paint Booth Setup"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="p-3 bg-red-600/80 rounded-full text-white shadow-lg"><ZoomIn size={22} /></span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-sm font-semibold text-white bg-black/50 p-2 rounded-xl backdrop-blur-sm">
                    Climate-Controlled Paint Booth
                  </div>
                </div>

                <div 
                  onClick={() => setSelectedImage({ src: "/images/paint-booth-2.jpeg", title: "Computerized Oven Curing Bay" })}
                  className="group relative h-64 rounded-3xl overflow-hidden bg-neutral-900 border border-white/10 shadow-xl cursor-pointer"
                >
                  <img
                    src="/images/paint-booth-2.jpeg"
                    alt="Oven Curing & Painting Process"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="p-3 bg-red-600/80 rounded-full text-white shadow-lg"><ZoomIn size={22} /></span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-sm font-semibold text-white bg-black/50 p-2 rounded-xl backdrop-blur-sm">
                    Computerized Oven Curing Bay
                  </div>
                </div>

                <div 
                  onClick={() => setSelectedImage({ src: "/images/denting-area.jpeg", title: "Precision Denting & Alignment Bay" })}
                  className="group relative h-64 rounded-3xl overflow-hidden bg-neutral-900 border border-white/10 shadow-xl cursor-pointer"
                >
                  <img
                    src="/images/denting-area.jpeg"
                    alt="Denting and Bodywork Area"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="p-3 bg-red-600/80 rounded-full text-white shadow-lg"><ZoomIn size={22} /></span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-sm font-semibold text-white bg-black/50 p-2 rounded-xl backdrop-blur-sm">
                    Precision Denting & Alignment Bay
                  </div>
                </div>
              </div>
            </div>

            {/* CATEGORY 3: PREMIUM STUDIO & DELIVERIES */}
            <div className="mb-14">
              <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-3">
                <div className="w-3 h-7 bg-blue-600 rounded-full" />
                <h3 className="text-xl md:text-2xl font-bold text-white">Premium Studio & Vehicle Delivery</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div 
                  onClick={() => setSelectedImage({ src: "/images/premium-studio.jpeg", title: "High-End Detailing Studio & Handover Zone" })}
                  className="group relative h-72 rounded-3xl overflow-hidden bg-neutral-900 border border-white/10 shadow-xl cursor-pointer"
                >
                  <img
                    src="/images/premium-studio.jpeg"
                    alt="Premium Delivery Studio"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="p-3 bg-red-600/80 rounded-full text-white shadow-lg"><ZoomIn size={22} /></span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-sm font-semibold text-white bg-black/50 p-2 rounded-xl backdrop-blur-sm">
                    High-End Detailing Studio & Handover Zone
                  </div>
                </div>

                <div 
                  onClick={() => setSelectedImage({ src: "/images/temple.jpeg", title: "Workshop Shrine & Vehicle Blessing Spot" })}
                  className="group relative h-72 rounded-3xl overflow-hidden bg-neutral-900 border border-white/10 shadow-xl cursor-pointer"
                >
                  <img
                    src="/images/temple.jpeg"
                    alt="Workshop Shrine and Blessing Area"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="p-3 bg-red-600/80 rounded-full text-white shadow-lg"><ZoomIn size={22} /></span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-sm font-semibold text-white bg-black/50 p-2 rounded-xl backdrop-blur-sm">
                    Workshop Shrine & Vehicle Blessing Spot
                  </div>
                </div>
              </div>
            </div>

            {/* CATEGORY 4: GENERAL WORKSHOP BAYS */}
            <div>
              <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-3">
                <div className="w-3 h-7 bg-emerald-500 rounded-full" />
                <h3 className="text-xl md:text-2xl font-bold text-white">Operations & Service Bays</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div 
                  onClick={() => setSelectedImage({ src: "/images/workshop-overview-1.jpeg", title: "Multi-Brand Mechanical Lift Area" })}
                  className="group relative h-60 rounded-3xl overflow-hidden bg-neutral-900 border border-white/10 shadow-xl cursor-pointer"
                >
                  <img
                    src="/images/workshop-overview-1.jpeg"
                    alt="Mechanical Service Bay"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="p-3 bg-red-600/80 rounded-full text-white shadow-lg"><ZoomIn size={22} /></span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-sm font-semibold text-white bg-black/50 p-2 rounded-xl backdrop-blur-sm">
                    Multi-Brand Mechanical Lift Area
                  </div>
                </div>

                <div 
                  onClick={() => setSelectedImage({ src: "/images/workshop-overview-2.jpeg", title: "Diagnostic Scanner Setup" })}
                  className="group relative h-60 rounded-3xl overflow-hidden bg-neutral-900 border border-white/10 shadow-xl cursor-pointer"
                >
                  <img
                    src="/images/workshop-overview-2.jpeg"
                    alt="Diagnostic and Electrical Work"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="p-3 bg-red-600/80 rounded-full text-white shadow-lg"><ZoomIn size={22} /></span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-sm font-semibold text-white bg-black/50 p-2 rounded-xl backdrop-blur-sm">
                    Diagnostic Scanner Setup
                  </div>
                </div>

                <div 
                  onClick={() => setSelectedImage({ src: "/images/workshop-overview-3.jpeg", title: "Daily Maintenance & Inspection Area" })}
                  className="group relative h-60 rounded-3xl overflow-hidden bg-neutral-900 border border-white/10 shadow-xl cursor-pointer"
                >
                  <img
                    src="/images/workshop-overview-3.jpeg"
                    alt="Active Maintenance Zone"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="p-3 bg-red-600/80 rounded-full text-white shadow-lg"><ZoomIn size={22} /></span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-sm font-semibold text-white bg-black/50 p-2 rounded-xl backdrop-blur-sm">
                    Daily Maintenance & Inspection Area
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 3: DETAILING */}
        <section id="detailing" className="min-h-screen flex items-center justify-start px-6 md:px-20 py-20">
          <div className="max-w-xl bg-neutral-900/60 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-3xl shadow-2xl">
            <div className="w-12 h-12 bg-red-600/20 rounded-2xl flex items-center justify-center text-[#E52321] mb-6">
              <Sparkles size={24} />
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold">Interior Spa & Exterior Polish</h2>
            <p className="mt-4 text-neutral-300 leading-relaxed">
              Protect your car's coat from UV damage and harsh weather while keeping the interior 100% sanitized.
            </p>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h4 className="font-bold text-white">Ceramic & Graphene Shield</h4>
                <p className="text-xs text-neutral-400 mt-1">Deep mirror shine & hydrophobic protection</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h4 className="font-bold text-white">Interior Foam Spa</h4>
                <p className="text-xs text-neutral-400 mt-1">Steam cleaning, leather care & germ extraction</p>
              </div>
            </div>

            <button 
              onClick={() => setIsModalOpen(true)}
              className="mt-8 px-6 py-3 bg-[#E52321] hover:bg-red-700 text-white font-bold rounded-xl transition text-sm cursor-pointer"
            >
              Book Detailing Package
            </button>
          </div>
        </section>

        {/* SECTION 4: INSURANCE CLAIMS */}
        <section id="claims" className="min-h-screen flex items-center justify-end px-6 md:px-20 py-20">
          <div className="max-w-xl bg-neutral-900/60 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-3xl shadow-2xl">
            <div className="w-12 h-12 bg-emerald-500/20 rounded-2xl flex items-center justify-center text-emerald-400 mb-6">
              <ShieldCheck size={24} />
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold">Hassle-Free Cashless Claims</h2>
            <p className="mt-4 text-neutral-300 leading-relaxed">
              We tie up with all top insurance companies to settle accident repair claims with zero out-of-pocket delays.
            </p>
            
            <div className="mt-6 p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-200 text-sm font-medium">
              ✓ Onsite Surveyor Inspection, Document Filing & Doorstep Delivery
            </div>

            <button 
              onClick={() => setIsModalOpen(true)}
              className="mt-8 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition text-sm cursor-pointer"
            >
              File Claim Assistance
            </button>
          </div>
        </section>

        {/* SECTION 5: BUY & SELL */}
        <section id="buysell" className="min-h-screen flex items-center justify-center px-6 md:px-20 py-20">
          <div className="w-full max-w-4xl bg-neutral-900/70 backdrop-blur-2xl border border-white/10 p-8 md:p-12 rounded-3xl shadow-2xl text-center">
            <div className="inline-flex p-3 bg-red-600/20 text-[#E52321] rounded-2xl mb-4">
              <Car size={28} />
            </div>
            <h2 className="text-3xl md:text-5xl font-black">Buy, Sell & Trade Any Brand</h2>
            <p className="mt-3 text-neutral-300 max-w-xl mx-auto">
              Get maximum market value for your car or choose from our pre-certified multi-brand inventory.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mt-10 text-left">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-red-500/50 transition">
                <h3 className="text-xl font-bold text-white">Sell Your Vehicle</h3>
                <p className="text-sm text-neutral-400 mt-2">Instant evaluation, 200+ checkpoint inspection, and fast payment with RC transfer.</p>
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="mt-6 w-full py-3 bg-[#E52321] hover:bg-red-700 rounded-xl font-bold text-sm transition cursor-pointer"
                >
                  Request Valuation
                </button>
              </div>

              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/50 transition">
                <h3 className="text-xl font-bold text-white">Buy Verified Pre-Owned</h3>
                <p className="text-sm text-neutral-400 mt-2">Certified multi-brand inventory with service history logs and warranty protection.</p>
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="mt-6 w-full py-3 bg-[#1D2B96] hover:bg-blue-800 rounded-xl font-bold text-sm transition cursor-pointer"
                >
                  Inquire Available Stock
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: TESTIMONIALS */}
        <section className="py-20 px-6 md:px-20 bg-neutral-950/80 border-t border-white/5">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold">What Our Clients Say</h2>
              <p className="text-neutral-400 mt-2">Real feedback from satisfied car owners across the city</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((item, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-neutral-900/60 border border-white/10 backdrop-blur-md">
                  <div className="flex gap-1 text-amber-400 mb-3">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} size={16} className="fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-neutral-300 italic mb-4">"{item.comment}"</p>
                  <div className="border-t border-white/10 pt-3">
                    <p className="font-bold text-white text-sm">{item.name}</p>
                    <p className="text-xs text-neutral-400">{item.car}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 7: FREQUENTLY ASKED QUESTIONS */}
        <section id="faq" className="py-20 px-6 md:px-20 bg-neutral-900/40 border-t border-white/5">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold">Frequently Asked Questions</h2>
              <p className="text-neutral-400 mt-2">Everything you need to know about our workshop services</p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div 
                  key={index} 
                  className="rounded-2xl bg-neutral-900/80 border border-white/10 overflow-hidden transition"
                >
                  <button 
                    onClick={() => toggleFaq(index)}
                    className="w-full p-5 text-left font-bold flex items-center justify-between gap-4 text-white hover:text-red-400 transition cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown size={20} className={`transform transition-transform ${openFaq === index ? 'rotate-180 text-red-500' : ''}`} />
                  </button>
                  {openFaq === index && (
                    <div className="px-5 pb-5 text-sm text-neutral-300 leading-relaxed border-t border-white/5 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FOOTER & CONTACT INFO */}
        <footer className="bg-neutral-950 border-t border-white/10 py-12 px-6 text-sm text-neutral-400">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 mb-8 text-left">
            <div>
              <div className="relative w-40 h-10 bg-white rounded-xl p-1 mb-4">
                <Image
                  src="/images/hlogo.png"
                  alt="AutoBrain Car Care"
                  fill
                  className="object-contain p-1"
                />
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                AutoBrain Car Care Division — Your trusted multi-brand partner for bodywork, mechanics, detailing, and sales.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-white mb-3">Workshop Timings</h4>
              <p className="flex items-center gap-2 text-xs text-neutral-300 mb-2"><Clock size={14} className="text-red-500" /> Monday - Saturday: 9:00 AM - 8:00 PM</p>
              <p className="flex items-center gap-2 text-xs text-neutral-300"><Clock size={14} className="text-red-500" /> Sunday: Emergency Claims & Appointments Only</p>
            </div>

            <div>
              <h4 className="font-bold text-white mb-3">Direct Contact</h4>
              <p className="flex items-center gap-2 text-xs text-neutral-300 mb-2"><Phone size={14} className="text-blue-500" /> +91 8905602022</p>
              <p className="flex items-center gap-2 text-xs text-neutral-300"><MapPin size={14} className="text-red-500" /> AutoBrain Workshop, Adajan, Surat-Gujarat</p>
            </div>
          </div>

          <div className="max-w-6xl mx-auto border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center">
            <p>© 2026 AutoBrain Car Care. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-1 text-amber-400 font-bold">
                <Star size={16} className="fill-amber-400" /> 4.9 Google Rated Workshop
              </span>
            </div>
          </div>
        </footer>

      </div>

      {/* FULL-SCREEN GALLERY LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedImage && (
          <div 
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 cursor-pointer"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()} 
              className="relative max-w-4xl max-h-[85vh] w-full bg-neutral-900 border border-white/20 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
            >
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 bg-black/60 hover:bg-red-600 p-2 rounded-full text-white transition cursor-pointer"
              >
                <X size={22} />
              </button>

              <div className="relative w-full h-[65vh] bg-black">
                <img 
                  src={selectedImage.src} 
                  alt={selectedImage.title}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="p-5 bg-neutral-900 border-t border-white/10 flex items-center justify-between">
                <h4 className="text-lg font-bold text-white">{selectedImage.title}</h4>
                <button 
                  onClick={() => setSelectedImage(null)}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 text-xs font-semibold rounded-xl text-white transition"
                >
                  Close Preview
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* BOOKING MODAL POPUP */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg bg-neutral-900 border border-white/10 p-6 md:p-8 rounded-3xl shadow-2xl text-left"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-5 right-5 text-neutral-400 hover:text-white transition cursor-pointer"
              >
                <X size={20} />
              </button>

              {bookingSubmitted ? (
                <div className="py-12 text-center space-y-3">
                  <CheckCircle2 size={56} className="text-emerald-400 mx-auto animate-bounce" />
                  <h3 className="text-2xl font-bold text-white">Booking Received!</h3>
                  <p className="text-sm text-neutral-300">
                    We sent your booking details directly to our email. Our workshop team will call you back shortly!
                  </p>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-bold text-white mb-2">Book Workshop Visit</h3>
                  <p className="text-xs text-neutral-400 mb-6">Fill in your details and our team will prepare for your arrival.</p>

                  <form onSubmit={handleBookingSubmit} className="space-y-4">
                    <input type="hidden" name="access_key" value="27a8b2e1-5c1a-403a-8c54-c83a7be83a03" />

                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">Your Name</label>
                      <input 
                        type="text" 
                        name="name"
                        required 
                        placeholder="John Doe"
                        className="w-full bg-neutral-800 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-neutral-300 mb-1">Phone Number</label>
                        <input 
                          type="tel" 
                          name="phone"
                          required 
                          placeholder="+91 234 567 890"
                          className="w-full bg-neutral-800 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-neutral-300 mb-1">Car Model</label>
                        <input 
                          type="text" 
                          name="car_model"
                          required 
                          placeholder="e.g. BMW / Creta"
                          className="w-full bg-neutral-800 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">Service Needed</label>
                      <select 
                        name="service_needed"
                        className="w-full bg-neutral-800 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-500"
                      >
                        <option>Denting & Painting</option>
                        <option>Ceramic Coating & Detailing</option>
                        <option>Cashless Insurance Claim</option>
                        <option>General Service & Engine Check</option>
                        <option>Buy / Sell Car Inquiry</option>
                      </select>
                    </div>

                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full mt-4 py-3 bg-[#E52321] hover:bg-red-700 text-white font-bold rounded-xl text-sm transition shadow-lg shadow-red-600/30 cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? "Sending Request..." : "Confirm Appointment Request"}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CENTER FLOATING LIVE OFFER MODAL */}
<AnimatePresence>
  {showOfferModal && (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      
      {/* Animated Modal Window */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.85, y: 20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative w-full max-w-md bg-neutral-950 border border-emerald-500/40 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(16,185,129,0.25)] text-white text-center overflow-hidden"
      >
        {/* Background Ambient Glow */}
        <div className="absolute -top-16 -left-16 w-40 h-40 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -right-16 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Custom Circular Close Button */}
        <button
          onClick={() => setShowOfferModal(false)}
          className="absolute top-4 right-4 text-neutral-400 hover:text-white bg-neutral-900 border border-neutral-800 hover:border-emerald-500 p-2 rounded-full transition-all cursor-pointer z-10"
          aria-label="Close offer"
        >
          <X size={18} />
        </button>

        {/* Offer Header Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-bold uppercase tracking-widest text-emerald-400 mb-4">
          <Sparkles size={14} className="animate-pulse text-emerald-400" />
          <span>Exclusive Website Offer</span>
        </div>

        {/* Main Discount Headline */}
        <h3 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white mb-2">
          FLAT <span className="text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]">₹500 OFF</span>
        </h3>

        {/* Offer Condition */}
        <p className="text-sm sm:text-base font-semibold text-neutral-200 mb-4">
          On any car service above <span className="text-white underline decoration-emerald-400 font-bold">₹1500</span>
        </p>

        {/* Valid Till Highlight Box */}
        <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-3 flex items-center justify-center gap-2 text-xs sm:text-sm text-neutral-300 mb-6">
          <Clock size={16} className="text-emerald-400" />
          <span>Valid Till: <strong className="text-white font-bold">End of This Month</strong></span>
        </div>

        {/* Action Button: Opens Google Maps Directly */}
        <div className="flex flex-col gap-3">
          <a
            href="https://share.google/SEy7zdOCOe9db28aJ" 
            target="_blank"
            rel="noreferrer"
            onClick={() => setShowOfferModal(false)}
            className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-neutral-950 font-black rounded-full flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(16,185,129,0.35)] transition-all text-sm uppercase tracking-wider cursor-pointer"
          >
            <MapPin size={18} />
            <span>Visit Now (Open Location)</span>
          </a>
        </div>

      </motion.div>
    </div>
  )}
</AnimatePresence>

    </main>
  );
}

// Animated Counter Helper Component
function StatItem({ target, suffix = "+", decimals = 0, label, suffixColor = "text-white" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const duration = 2000;
          const steps = 60;
          const stepTime = duration / steps;
          const increment = target / steps;

          const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(start);
            }
          }, stepTime);

          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="text-center sm:text-left">
      <div className="text-3xl sm:text-5xl font-extrabold text-white flex items-center justify-center sm:justify-start gap-0.5">
        <span>{decimals > 0 ? count.toFixed(decimals) : Math.floor(count)}</span>
        <span className={suffixColor}>{suffix}</span>
      </div>
      <p className="text-xs sm:text-sm font-semibold tracking-wider text-neutral-400 uppercase mt-1">
        {label}
      </p>
    </div>
  );
}