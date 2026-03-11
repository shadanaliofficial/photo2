import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Menu from "./components/Menu/Menu";
import WhatsappButton from "./components/WhatsappButton";
import Home from "./pages/Home/Home";
import Work from "./pages/Work/Work";
import About from "./pages/About/About";
import FAQ from "./pages/FAQ/FAQ";
import Contact from "./pages/Contact/Contact";
import Album from "./pages/Album";
/* ✅ NEW */
import LittleWonders from "./pages/Little-Wonders/Littlewonders";
import { AnimatePresence } from "framer-motion";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    setTimeout(() => {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 50);
  }, [pathname]);
  return null;
}

function App() {
  const location = useLocation();
  return (
    <>
      <ScrollToTop />
      <Menu />
      <WhatsappButton />
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/work" element={<Work />} />
          {/* ✅ NEW PAGE */}
          <Route path="/little-wonders" element={<LittleWonders />} />
          {/* ✅ Gallery route */}
          <Route path="/gallery/:category" element={<Album />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;