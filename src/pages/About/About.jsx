import React from "react";
import "./About.css";

import AnimatedCopy from "../../components/AnimatedCopy/AnimatedCopy";
import ContactForm from "../../components/ContactForm/ContactForm";
import Footer from "../../components/Footer/Footer";

import ReactLenis from "lenis/react";

import Transition from "../../components/Transition/Transition";

const About = () => {
  return (
    <ReactLenis root>
      <div className="page about">
        <section className="about-header">
          <h1>Est</h1>
          <h1>2016</h1>
        </section>

        <section className="about-hero">
          <div className="about-hero-img">
            <img src="/about/studio.jpeg" alt="" />
          </div>
        </section>

        <section className="about-me-copy">
          <div className="about-me-copy-wrapper">
            <AnimatedCopy animateOnScroll={true} tag="h3">
              Crafted. Personal. Exceptional. 

At SOM Creations, we approach every project as a singular creation.
No templates. No fixed formulas. Only thoughtfully crafted solutions.
            </AnimatedCopy>

            <AnimatedCopy animateOnScroll={true} tag="h3">
              Our pricing is discreetly flexible and tailored, shaped around your vision, expectations, and scope. We believe true value lies in understanding your needs deeply and delivering results that feel effortless, refined, and enduring—while remaining mindful of your investment
            </AnimatedCopy>

            <AnimatedCopy animateOnScroll={true} tag="h3">
              From concept to completion, we offer a personalized, hands-on experience, ensuring every detail reflects your intent with precision and elegance.

Our commitment is simple:
to transform your vision into a distinctive, premium outcome—crafted with care, clarity, and purpose.

            </AnimatedCopy>
          </div>
        </section>

        <section className="services">
          <div className="services-col">
            <div className="services-banner">
              <img src="/about/services-banner.jpg" alt="" />
            </div>
            <p className="primary">Crafted with Intention</p>
          </div>
          <div className="services-col">
            <h4>
              Every project is a chance to explore new visual language, push
              creative boundaries, and tell stories that feel real. I approach
              each film with care, precision, and purpose.
            </h4>

            <div className="services-list">
              <div className="service-list-row">
                <div className="service-list-col">
                  <h5>Wedding Photography</h5>
                </div>
                <div className="service-list-col">
                  <p>
                    Capture your timeless love story with our exquisite wedding and pre-wedding photography packages.
                     Let our expert photographers immortalize your precious moments, creating stunning visual memories that will last a lifetime.
                      Book now and cherish your special day forever!
                  </p>
                </div>
              </div>

              <div className="service-list-row">
                <div className="service-list-col">
                  <h5>Rice Ceremony</h5>
                </div>
                <div className="service-list-col">
                  <p>
                    Celebrate your baby’s special milestone with our beautifully captured rice ceremony shoots, held both indoors and outdoors.
Our experienced photographers gently capture every precious moment, highlighting your baby’s innocence, joy, and the warmth of family traditions through timeless photographs.
Cherish this meaningful occasion and book your rice ceremony shoot today for a heartfelt collection of memories you will treasure forever.
                  </p>
                </div>
              </div>

              <div className="service-list-row">
                <div className="service-list-col">
                  <h5>Baby Photoshoot</h5>
                </div>
                <div className="service-list-col">
                  <p>
                    Celebrate the joy of new beginnings with our enchanting baby photoshoots and rice ceremony captures.

Our talented photographers specialize in capturing the innocence and beauty of your little one,
 creating heartwarming memories that will melt your heart!
                  </p>
                </div>
              </div>

              <div className="service-list-row">
                <div className="service-list-col">
                  <h5>Maternity Shoot</h5>
                </div>
                <div className="service-list-col">
                  <p>
                    Celebrate the beauty of motherhood with our enchanting maternity photoshoots,
                     capturing the love, glow, and anticipation of this special journey.
                      Our talented photographers artfully preserve your radiant moments, 
                      creating timeless memories that beautifully honor this magical chapter of your life!
                    </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="about-banner-img">
          <div className="about-banner-img-wrapper">
            <img src="/about/about-banner.jpg" alt="" />
          </div>
        </section>

        <section className="fav-tools">
          <div className="fav-tools-header">
            <AnimatedCopy tag="p" animateOnScroll={true} className="primary sm">
              Daily Stack
            </AnimatedCopy>
            <AnimatedCopy tag="h2" animateOnScroll={true} delay={0.25}>
              Favourite Tools
            </AnimatedCopy>
            <AnimatedCopy
              tag="p"
              animateOnScroll={true}
              className="secondary"
              delay={0.5}
            >
              My favorite stack includes Framer, Figma, and other cutting-edge
              technologies to ensure seamless and dynamic designs.
            </AnimatedCopy>
          </div>

          <div className="fav-tools-list">
            <div className="fav-tools-list-row">
              <div className="fav-tool">
                <div className="fav-tool-img">
                  <img src="/about/tool-1.jpg" alt="" />
                </div>
                <h4>DaVinci Resolve</h4>
                <p className="primary sm">Color Grading</p>
              </div>
              <div className="fav-tool">
                <div className="fav-tool-img">
                  <img src="/about/tool-2.jpg" alt="" />
                </div>
                <h4>Adobe Premiere Pro</h4>
                <p className="primary sm">Video Editing</p>
              </div>
              <div className="fav-tool">
                <div className="fav-tool-img">
                  <img src="/about/tool-3.jpg" alt="" />
                </div>
                <h4>Blackmagic Pocket</h4>
                <p className="primary sm">Cinematic Shooting</p>
              </div>
            </div>
            <div className="fav-tools-list-row">
              <div className="fav-tool">
                <div className="fav-tool-img">
                  <img src="/about/tool-4.jpg" alt="" />
                </div>
                <h4>ShotDeck</h4>
                <p className="primary sm">Visual References</p>
              </div>
              <div className="fav-tool">
                <div className="fav-tool-img">
                  <img src="/about/tool-5.jpg" alt="" />
                </div>
                <h4>Frame.io</h4>
                <p className="primary sm">Remote Collaboration</p>
              </div>
              <div className="fav-tool">
                <div className="fav-tool-img">
                  <img src="/about/tool-6.jpg" alt="" />
                </div>
                <h4>Celtx</h4>
                <p className="primary sm">Scriptwriting Tool</p>
              </div>
            </div>
          </div>
        </section>

        <ContactForm />

        <Footer />
      </div>
    </ReactLenis>
  );
};

export default Transition(About);
