import React, { useMemo, useState } from "react";
import "./ContactForm.css";

const ContactForm = () => {
  // ✅ IMPORTANT: Put your client's WhatsApp number here (WITH country code, no + sign)
  // Example India: "919876543210"
  const WHATSAPP_NUMBER = "916291098044";

  const services = useMemo(
    () => [
      {
        id: "wedding",
        title: "Wedding Photography",
        img: "/services/1.avif",
      },
      {
        id: "baby",
        title: "Just  Born - Baby  Photography",
        img: "/services/2.avif",
      },
      {
        id: "portrait",
        title: "Rice Ceremony",
        img: "/services/3.avif",
      },
      {
        id: "maternity",
        title: "Maternity Shoot",
        img: "/services/4.avif",
      },
    ],
    []
  );

  const [selectedService, setSelectedService] = useState(services[0]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const cleanPhone = (value) => value.replace(/[^\d+]/g, "").trim();

  const handleSendWhatsApp = () => {
    const trimmedName = name.trim();
    const trimmedPhone = cleanPhone(phone);

    if (!trimmedName) {
      alert("Please enter your name.");
      return;
    }

    if (!trimmedPhone || trimmedPhone.length < 8) {
      alert("Please enter a valid phone number.");
      return;
    }

    const message = `Hello SOM Creations 👋

I’m interested in: ${selectedService.title}

Name: ${trimmedName}
Phone: ${trimmedPhone}`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message
    )}`;

    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="contact-form">
      {/* TOP ROW (same as your current design) */}
      <div className="contact-form-row">
        <div className="contact-form-row-copy-item">
          <p className="primary sm">Let’s create together</p>
        </div>
        <div className="contact-form-row-copy-item">
          <p className="primary sm"></p>
        </div>
        <div className="contact-form-row-copy-item">
          <p className="primary sm"></p>
        </div>
      </div>

      {/* MAIN ROW */}
      <div className="contact-form-row">
        {/* LEFT COLUMN */}
        <div className="contact-form-col">
          <div className="contact-form-header">
            <h3>Choose a Service</h3>
            <p>
              Select the service you’re interested in. Fill your name + number
              and we’ll open WhatsApp with a ready message.
            </p>
          </div>

          {/* SERVICES GRID */}
          <div className="contact-services">
            {services.map((service) => (
              <button
                type="button"
                key={service.id}
                className={`service-card ${
                  selectedService?.id === service.id ? "active" : ""
                }`}
                onClick={() => setSelectedService(service)}
              >
                <div className="service-card-img">
                  <img src={service.img} alt={service.title} />
                </div>
                <div className="service-card-copy">
                  <p className="primary sm">{service.title}</p>
                  <span className="service-card-chip">Select</span>
                </div>
              </button>
            ))}
          </div>

          <div className="contact-form-availability">
            <p className="primary sm"></p>
            <p className="primary sm"></p>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="contact-form-col">
          <div className="whatsapp-panel">
            <p className="primary sm whatsapp-panel-label">Selected Service</p>
            <h4 className="whatsapp-selected">{selectedService?.title}</h4>

            <div className="form-item">
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-item">
              <input
                type="text"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="form-item">
              <button
                className="btn whatsapp-btn"
                onClick={handleSendWhatsApp}
              >
                Send on WhatsApp
              </button>
            </div>

            <p className="primary sm whatsapp-note">
              * This will open WhatsApp with a pre-filled message.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
