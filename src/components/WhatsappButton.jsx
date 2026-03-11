import "./whatsappButton.css";
import whatsappIcon from "../assets/images/whatsapp.avif";

export default function WhatsappButton() {
  const phoneNumber = "919999999999";
  const message = encodeURIComponent("Hi, I'm interested in your photography services!");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer"
      className="whatsappBtn"
      aria-label="Chat on WhatsApp"
    >
      <img src={whatsappIcon} alt="WhatsApp" className="whatsappBtn__icon" />
    </a>
  );
}