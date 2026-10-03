
import { useState } from "react";
import AdminDashboard from "./AdminDashboard";
import "./App.css";

const demoTherapists = [
  {
    id: 1,
    name: "Dr. Diams Mutanda",
    title: "Clinical Psychologist",
    specialty: "Anxiety",
    price: 800,
    experience: 8,
    initials: "DM",
    color: "#dce8d8",
  },
  {
    id: 2,
    name: "Dr. Daniel Carter",
    title: "Counselling Psychologist",
    specialty: "Stress",
    price: 700,
    experience: 6,
    initials: "DC",
    color: "#e9dfd0",
  },
  {
    id: 3,
    name: "Dr. Aisha Patel",
    title: "Mental Health Therapist",
    specialty: "Relationships",
    price: 900,
    experience: 7,
    initials: "AP",
    color: "#e5dfea",
  },
  {
    id: 4,
    name: "Dr. Noah Williams",
    title: "Counselling Psychologist",
    specialty: "Depression",
    price: 750,
    experience: 5,
    initials: "NW",
    color: "#dce6e7",
  },
];

const specialties = [
  "All",
  "Anxiety",
  "Stress",
  "Relationships",
  "Depression",
];

function App() {
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");
  const [selectedTherapist, setSelectedTherapist] = useState(null);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [minExperience, setMinExperience] = useState(0);
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [requestSent, setRequestSent] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);

  const filteredTherapists = demoTherapists.filter((therapist) => {
    const matchesSpecialty =
      selectedSpecialty === "All" ||
      therapist.specialty === selectedSpecialty;

    return (
      matchesSpecialty &&
      therapist.price <= maxPrice &&
      therapist.experience >= minExperience
    );
  });

  const openProfile = (therapist) => {
    setSelectedTherapist(therapist);
    setShowAppointmentForm(false);
    setRequestSent(false);
  };

  const closeProfile = () => {
    setSelectedTherapist(null);
    setShowAppointmentForm(false);
    setRequestSent(false);
  };

  const resetFilters = () => {
    setSelectedSpecialty("All");
    setMaxPrice(1000);
    setMinExperience(0);
  };

  // Show the admin dashboard without replacing the homepage.
  if (showAdmin) {
    return (
      <div>
        <button
          type="button"
          onClick={() => setShowAdmin(false)}
          style={{ margin: "16px", padding: "10px" }}
        >
          Back to Unfazed
        </button>
        <AdminDashboard />
      </div>
    );
  }

  return (
    <div className="app">
      <header className="navbar">
        <a className="logo" href="#home">
          unfazed<span>.</span>
        </a>

        <nav>
          <a href="#services">Services</a>
          <a href="#about">About</a>
          <a href="#directory">Find a therapist</a>
          <a href="#contact">Contact</a>
        </nav>

        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          
<div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
  <a className="nav-button" href="#directory">
    Get started
  </a>

  <button
    type="button"
    className="nav-button"
    onClick={() => setShowAdmin(true)}
  >
    Admin Dashboard
  </button>
</div>
          <button
            type="button"
            className="nav-button"
            onClick={() => setShowAdmin(true)}
          >
            Admin Dashboard
          </button>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <p className="eyebrow">YOUR MENTAL WELLBEING MATTERS</p>
            <h1>
              A safe space to
              <br />
              <span>feel like yourself.</span>
            </h1>
            <p className="hero-description">
              Take a step towards a healthier mind. Explore mental
              wellness resources and discover support that fits your needs.
            </p>
            <a href="#directory" className="primary-button">
              Find a therapist <span>↗</span>
            </a>
            <p className="hero-note">
              Take your time. Your journey starts with one step.
            </p>
          </div>

          <div className="hero-visual">
            <div className="hero-circle">
              <div className="hero-card">
                <span className="hero-leaf">✳</span>
                <p>Make space for</p>
                <h2>yourself.</h2>
                <span className="hero-card-line" />
                <small>One day at a time.</small>
              </div>
            </div>
            <span className="decorative-star star-one">✳</span>
            <span className="decorative-star star-two">✦</span>
          </div>
        </section>

        <section className="services section" id="services">
          <div className="section-heading">
            <p className="eyebrow">HOW WE CAN HELP</p>
            <h2>Support for your journey.</h2>
            <p>A little support can make a meaningful difference.</p>
          </div>

          <div className="service-grid">
            <article className="service-card">
              <span className="service-icon">♡</span>
              <h3>Find support</h3>
              <p>
                Explore our fictional demo profiles and learn how
                therapist discovery can work.
              </p>
            </article>

            <article className="service-card">
              <span className="service-icon">✳</span>
              <h3>Understand yourself</h3>
              <p>
                Make time to reflect on your feelings, habits, and
                personal wellbeing.
              </p>
            </article>

            <article className="service-card">
              <span className="service-icon">☼</span>
              <h3>Grow at your pace</h3>
              <p>
                Everyone's journey is different. Take small steps
                towards the changes you want to make.
              </p>
            </article>
          </div>
        </section>

        <section className="about section" id="about">
          <p className="eyebrow">ABOUT UNFAZED</p>
          <h2>Your wellbeing deserves attention.</h2>
          <p>
            Unfazed is a student project exploring how a mental
            wellness platform can help people discover support.
            We aim to make the experience welcoming, clear, and easy
            to navigate.
          </p>
        </section>

        <section className="directory section" id="directory">
          <div className="section-heading">
            <p className="eyebrow">THERAPIST DIRECTORY</p>
            <h2>Find support that fits you.</h2>
            <p>
              Explore the demo profiles and adjust the filters to
              discover options.
            </p>
            <p className="demo-notice">
              All profiles are fictional examples, not real or verified
              professionals.
            </p>
          </div>

          <div className="specialty-filters">
            {specialties.map((specialty) => (
              <button
                type="button"
                key={specialty}
                className={`filter-button ${
                  selectedSpecialty === specialty ? "active" : ""
                }`}
                onClick={() => setSelectedSpecialty(specialty)}
              >
                {specialty}
              </button>
            ))}
          </div>

          <div className="filter-controls">
            <div className="filter-control">
              <label htmlFor="maxPrice">
                Maximum fee: ₹{maxPrice} per session
              </label>
              <input
                id="maxPrice"
                type="range"
                min="500"
                max="1500"
                step="50"
                value={maxPrice}
                onChange={(event) =>
                  setMaxPrice(Number(event.target.value))
                }
              />
            </div>

            <div className="filter-control">
              <label htmlFor="minExperience">
                Minimum experience: {minExperience} years
              </label>
              <input
                id="minExperience"
                type="range"
                min="0"
                max="15"
                value={minExperience}
                onChange={(event) =>
                  setMinExperience(Number(event.target.value))
                }
              />
            </div>

            <button
              type="button"
              className="reset-filters"
              onClick={resetFilters}
            >
              Reset filters
            </button>
          </div>

          <p className="results-count">
            {filteredTherapists.length} demo profile
            {filteredTherapists.length !== 1 ? "s" : ""} found
          </p>

          {filteredTherapists.length > 0 ? (
            <div className="therapist-grid">
              {filteredTherapists.map((therapist) => (
                <article className="therapist-card" key={therapist.id}>
                  <div
                    className="therapist-avatar"
                    style={{ backgroundColor: therapist.color }}
                  >
                    {therapist.initials}
                  </div>

                  <span className="demo-tag">DEMO PROFILE</span>
                  <h3>{therapist.name}</h3>
                  <p className="therapist-title">{therapist.title}</p>

                  <span className="therapist-specialty">
                    {therapist.specialty}
                  </span>

                  <div className="therapist-card-bottom">
                    <div>
                      <strong>₹{therapist.price}</strong>
                      <small>per session</small>
                    </div>
                    <span>{therapist.experience} years' experience</span>
                  </div>

                  <button
                    type="button"
                    className="profile-button"
                    onClick={() => openProfile(therapist)}
                  >
                    View profile
                  </button>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-results">
              <h3>No profiles match these filters.</h3>
              <p>Try increasing the maximum fee or reducing experience.</p>
              <button
                type="button"
                className="profile-button"
                onClick={resetFilters}
              >
                Clear filters
              </button>
            </div>
          )}
        </section>

        <section className="therapists section">
          <p className="eyebrow">FOR THERAPISTS</p>
          <h2>A platform built around people.</h2>
          <p>
            In a future version, professionals will be able to create
            profiles and manage appointment requests. This feature is
            not connected yet.
          </p>
          <a href="#contact" className="secondary-button">
            Learn more
          </a>
        </section>
      </main>

      <footer id="contact">
        <div>
          <a className="logo" href="#home">
            unfazed<span>.</span>
          </a>
          <p>A student project focused on mental wellbeing.</p>
        </div>
        <p className="footer-note">
          Demo platform only. No real therapist or booking service
          is currently connected.
        </p>
      </footer>

      {selectedTherapist && (
        <div
          className="modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeProfile();
          }}
        >
          <div
            className="therapist-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="profile-title"
          >
            <button
              type="button"
              className="modal-x"
              onClick={closeProfile}
              aria-label="Close profile"
            >
              ×
            </button>

            <p className="eyebrow">DEMO PROFILE</p>
            <h2 id="profile-title">{selectedTherapist.name}</h2>
            <p className="modal-title">{selectedTherapist.title}</p>
            <p>Specialty: {selectedTherapist.specialty}</p>
            <p>{selectedTherapist.experience} years of experience</p>
            <p>Example fee: ₹{selectedTherapist.price} per session</p>

            <p className="demo-notice">
              This fictional profile is for demonstration only.
              No real therapist is connected.
            </p>

            {!showAppointmentForm && (
              <button
                type="button"
                className="profile-button modal-action"
                onClick={() => setShowAppointmentForm(true)}
              >
                Request an appointment
              </button>
            )}

            {showAppointmentForm && (
              <form
                className="appointment-form"
                onSubmit={async (event) => {
                  event.preventDefault();

                  const formData = new FormData(event.currentTarget);

                  const appointmentData = {
                    patientName: formData.get("visitorName"),
                    patientEmail: formData.get("visitorEmail"),
                    preferredDate: formData.get("appointmentDate"),
                    message: formData.get("appointmentMessage") || "",
                  };

                  try {
                    const response = await fetch(
                      "https://unfazed-backend-qjc7.onrender.com/api/appointments",
                      {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify(appointmentData),
                      }
                    );

                    const result = await response.json();

                    if (!response.ok) {
                      throw new Error(
                        result.message || "Failed to submit request."
                      );
                    }

                    setRequestSent(true);
                  } catch (error) {
                    console.error("Appointment request failed:", error);
                    alert(
                      error.message || "Could not connect to the server."
                    );
                  }
                }}
              >
                <h3>Request an appointment</h3>

                {requestSent ? (
                  <p className="demo-notice">
                    Appointment request submitted successfully! We will
                    review your request. No appointment is confirmed yet.
                  </p>
                ) : (
                  <>
                    <label htmlFor="visitorName">Your name</label>
                    <input
                      id="visitorName"
                      name="visitorName"
                      type="text"
                      autoComplete="name"
                      required
                      placeholder="Enter your name"
                    />

                    <label htmlFor="visitorEmail">Your email</label>
                    <input
                      id="visitorEmail"
                      name="visitorEmail"
                      type="email"
                      autoComplete="email"
                      required
                      placeholder="Enter your email"
                    />

                    <label htmlFor="appointmentDate">Preferred date</label>
                    <input
                      id="appointmentDate"
                      name="appointmentDate"
                      type="date"
                      min={new Date().toISOString().split("T")[0]}
                      required
                    />

                    <label htmlFor="appointmentMessage">
                      Message (optional)
                    </label>
                    <textarea
                      id="appointmentMessage"
                      name="appointmentMessage"
                      rows="3"
                      placeholder="Share your preferred time or any questions."
                    />

                    <button type="submit" className="profile-button">
                      Submit demo request
                    </button>
                  </>
                )}
              </form>
            )}

            <button
              type="button"
              className="modal-close-button"
              onClick={closeProfile}
            >
              Close profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;