import workList from "../../data/workList";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

import AnimatedCopy from "../../components/AnimatedCopy/AnimatedCopy";
import Reviews from "../../components/Reviews/Reviews";
import ContactForm from "../../components/ContactForm/ContactForm";
import Footer from "../../components/Footer/Footer";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ReactLenis from "lenis/react";

gsap.registerPlugin(ScrollTrigger);

import Transition from "../../components/Transition/Transition";

const Home = () => {
  const workItems = Array.isArray(workList) ? workList : [];
  const stickyTitlesRef = useRef(null);
  const titlesRef = useRef([]);
  const stickyWorkHeaderRef = useRef(null);
  const homeWorkRef = useRef(null);

  // HERO SLIDESHOW
  const heroImages = [
    "/home/1.avif",
    "/home/2.avif",
    "/home/3.JPG.avif",
    "/home/5.avif",
    "/home/6.avif",
    "/home/7.avif",
  ];

  const [activeHeroImage, setActiveHeroImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveHeroImage((prev) => (prev + 1) % heroImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  // FIRST WORK ITEM SLIDESHOW
  const firstWorkImages = [
    "/work/work1.jpeg",
    "/work/logo.jpeg", // ← replace with your second image path
  ];

  const [activeWorkImage, setActiveWorkImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveWorkImage((prev) => (prev + 1) % firstWorkImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [firstWorkImages.length]);

  useEffect(() => {
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    const stickySection = stickyTitlesRef.current;
    const titles = titlesRef.current.filter(Boolean);

    if (!stickySection || titles.length !== 3) {
      window.removeEventListener("resize", handleResize);
      return;
    }

    gsap.set(titles[0], { opacity: 1, scale: 1 });
    gsap.set(titles[1], { opacity: 0, scale: 0.75 });
    gsap.set(titles[2], { opacity: 0, scale: 0.75 });

    const pinTrigger = ScrollTrigger.create({
      trigger: stickySection,
      start: "top top",
      end: `+=${window.innerHeight * 5}`,
      pin: true,
      pinSpacing: true,
    });

    const masterTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: stickySection,
        start: "top top",
        end: `+=${window.innerHeight * 4}`,
        scrub: 0.5,
      },
    });

    masterTimeline
      .to(
        titles[0],
        {
          opacity: 0,
          scale: 0.75,
          duration: 0.3,
          ease: "power2.out",
        },
        1
      )
      .to(
        titles[1],
        {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: "power2.in",
        },
        1.25
      );

    masterTimeline
      .to(
        titles[1],
        {
          opacity: 0,
          scale: 0.75,
          duration: 0.3,
          ease: "power2.out",
        },
        2.5
      )
      .to(
        titles[2],
        {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: "power2.in",
        },
        2.75
      );

    const workHeaderSection = stickyWorkHeaderRef.current;
    const homeWorkSection = homeWorkRef.current;

    let workHeaderPinTrigger;
    if (workHeaderSection && homeWorkSection) {
      workHeaderPinTrigger = ScrollTrigger.create({
        trigger: workHeaderSection,
        start: "top top",
        endTrigger: homeWorkSection,
        end: "bottom bottom",
        pin: true,
        pinSpacing: false,
      });
    }

    return () => {
      pinTrigger.kill();
      if (workHeaderPinTrigger) {
        workHeaderPinTrigger.kill();
      }
      if (masterTimeline.scrollTrigger) {
        masterTimeline.scrollTrigger.kill();
      }
      masterTimeline.kill();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <ReactLenis root>
      <div className="page home">
        <section className="hero">
          <div className="hero-img">
            {heroImages.map((src, index) => (
              <img
                key={src}
                src={src}
                alt=""
                className={`hero-slide ${index === activeHeroImage ? "active" : ""}`}
              />
            ))}
          </div>

          <div className="hero-header">
            <AnimatedCopy tag="h1" animateOnScroll={false} delay={0.7}>
              SOM CREATIONS
            </AnimatedCopy>
            <AnimatedCopy tag="h1" animateOnScroll={false} delay={0.8}>
            </AnimatedCopy>
          </div>
        </section>

        <section ref={stickyTitlesRef} className="sticky-titles">
          <div className="sticky-titles-nav">
            <p className="primary sm"></p>
            <p className="primary sm">Let's Connect</p>
          </div>
          <div className="sticky-titles-footer">
            <p className="primary sm">Storytelling Through Film</p>
            <p className="primary sm"></p>
          </div>
          <h2 ref={(el) => (titlesRef.current[0] = el)}>
            At SOM Creations, every project is treated as a unique creation.
            No templates. No fixed formulas—only thoughtfully crafted solutions designed around your vision.
          </h2>
          <h2 ref={(el) => (titlesRef.current[1] = el)}>
            Our goal is to deliver exceptional value with services tailored to your needs, while remaining mindful of on budget. With a personalized approach and attention to detail, we ensure every experience feels seamless and distinctive.
          </h2>
          <h2 ref={(el) => (titlesRef.current[2] = el)}>
            At SOM Creations, we simply bring your vision to life—beautifully and thoughtfully.
          </h2>
        </section>

        <section ref={stickyWorkHeaderRef} className="sticky-work-header">
          <AnimatedCopy tag="h1" animateOnScroll="true">
            SOM Creations
          </AnimatedCopy>
        </section>

        <section ref={homeWorkRef} className="home-work">
          <div className="home-work-list">
            {workItems.map((work, index) => (
              <Link
                to={work.link}
                key={work.id}
                className="home-work-item"
              >
                <p className="primary sm">{`${String(index + 1).padStart(2, "0")} - ${String(workItems.length).padStart(2, "0")}`}</p>
                <h3>{work.title}</h3>

                {/* SLIDESHOW only for first item */}
                {index === 0 ? (
                  <div className="work-item-img work-item-slideshow">
                    {firstWorkImages.map((src, i) => (
                      <img
                        key={src}
                        src={src}
                        alt={work.title}
                        className={`work-slide ${i === activeWorkImage ? "active" : ""}`}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="work-item-img">
                    <img src={work.image} alt={work.title} />
                  </div>
                )}

                <h4>{work.category}</h4>
              </Link>
            ))}
          </div>
        </section>

        <Reviews />

        <section className="hobbies">
          <div className="hobby">
            <AnimatedCopy tag="h4" animateOnScroll={true}>
              Camera
            </AnimatedCopy>
          </div>
          <div className="hobby">
            <AnimatedCopy tag="h4" animateOnScroll={true}>
              Editing
            </AnimatedCopy>
          </div>
          <div className="hobby">
            <AnimatedCopy tag="h4" animateOnScroll={true}>
              Story
            </AnimatedCopy>
          </div>
          <div className="hobby">
            <AnimatedCopy tag="h4" animateOnScroll={true}>
              Sound
            </AnimatedCopy>
          </div>
        </section>

        <ContactForm />
        <Footer />
      </div>
    </ReactLenis>
  );
};

export default Transition(Home);