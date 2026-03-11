import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./littleWonders.css";
import ContactForm from "../../components/ContactForm/ContactForm";
import Footer from "../../components/Footer/Footer";

const FULL_TEXT = `At Little Wonders Studio, we believe the smallest moments hold the biggest emotions. From the glow of motherhood to your baby’s first smiles and growing milestones, we capture real, heartfelt memories with warmth, care, and simplicity.

Our approach is gentle, safe, and timeless — focused on authentic expressions, natural beauty, and meaningful storytelling. Every session is thoughtfully designed so you can relax, feel comfortable, and enjoy the experience while we preserve moments you’ll cherish for a lifetime.`;

export default function LittleWondersIntro() {

  /* HERO SLIDER */
  const images = [
    "/project/little/baby/1.avif",
    "/project/little/maternity/9.avif",
    "/project/little/baby/24.avif",
    "/project/little/maternity/33.avif",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === images.length - 1 ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);


  /* ABOUT TYPING */

  const [displayedText, setDisplayedText] = useState("");
  const [started, setStarted] = useState(false);
  const sectionRef = useRef(null);
  const indexRef = useRef(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;

    const interval = setInterval(() => {
      if (indexRef.current < FULL_TEXT.length) {
        setDisplayedText(FULL_TEXT.slice(0, indexRef.current + 1));
        indexRef.current += 1;
      } else {
        clearInterval(interval);
      }
    }, 18);

    return () => clearInterval(interval);
  }, [started]);

  const parts = displayedText.split("\n\n");
  const para1 = parts[0] || "";
  const para2 = parts[1] || "";

  const fullPara1 = FULL_TEXT.split("\n\n")[0];
  const showCursorInPara2 = displayedText.length > fullPara1.length + 2;
  const typingDone = displayedText.length >= FULL_TEXT.length;


  return (
    <>

      {/* HERO */}
      <section className="lw-hero">

        {images.map((img, index) => (
          <div
            key={index}
            className={`hero-image ${index === currentIndex ? "active" : ""}`}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}

        <div className="hero-overlay">
          <h1>Little Wonders Studio</h1>
          <p>Maternity & Baby Photography</p>
        </div>

      </section>


      {/* ABOUT */}
      <section className="who-section" ref={sectionRef}>

        <div className="who-left">

          <h2 className="who-heading">ABOUT LITTLE WONDERS</h2>

          <div className="who-text">

            <p>
              {para1}
              {!showCursorInPara2 && !typingDone && (
                <span className="cursor">|</span>
              )}
            </p>

            {displayedText.includes("\n\n") && (
              <p>
                {para2}
                {showCursorInPara2 && !typingDone && (
                  <span className="cursor">|</span>
                )}
              </p>
            )}

          </div>

        </div>


        <div className="who-right">

          <div className="images-stack">

            <img
              className="img-back"
              src="/project/little/maternity/5.avif"
              alt="Maternity"
            />

            <img
              className="img-front"
              src="/project/little/baby/15.avif"
              alt="Baby"
            />

          </div>

        </div>

      </section>


      {/* CINEMATIC CATEGORY SECTION */}

<section className="lw-categories">

  <Link to="/gallery/maternity" className="category-card">

    <img
      src="/project/little/maternity/15.avif"
      alt="Maternity Photography"
      className="category-image"
    />

    <div className="category-overlay">
      <h2>Maternity</h2>
    </div>

  </Link>


  <Link to="/gallery/baby" className="category-card">

    <img
      src="/project/little/baby/22.avif"
      alt="Baby Photography"
      className="category-image"
    />

    <div className="category-overlay">
      <h2>Baby Shoot</h2>
    </div>

  </Link>

</section>

<ContactForm />
<Footer />

    </>
  );
}