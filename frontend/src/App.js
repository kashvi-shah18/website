import { useEffect, useRef, useState } from "react";
import "@/App.css";

const LOGO =
  "https://customer-assets.emergentagent.com/job_4cc4d481-9f47-409e-80ad-e212273f383c/artifacts/e0tfvggn_WhatsApp%20Image%202026-05-07%20at%2011.57.29%20PM.jpeg";

/* ------- Downloadable PDF catalogues (sidebar drawer) ------- */
/* ------- Downloadable PDF catalogues (sidebar drawer) ------- */
const CATALOGUES = [
  // Daily Pooja Essentials
  { name: "Generic Pooja Items",              tag: "Daily Pooja", url: "/catalogues/generic-pooja-items.pdf" },
  { name: "Agarbatti Stand & Plates",         tag: "Daily Pooja", url: "/catalogues/agarbatti-stand-plate.pdf" },
  { name: "Brass Pooja Items",                tag: "Brass",       url: "/catalogues/brass-pooja-items.pdf" },
  { name: "Havan Samagri",                    tag: "Essentials",  url: "/catalogues/havan-samagri.pdf" },
  { name: "Ful Vaat",                         tag: "Essentials",  url: "/catalogues/ful-vaat.pdf" },
  { name: "Pooja Powder",                     tag: "Essentials",  url: "/catalogues/pooja-powder.pdf" },
  { name: "Dhup, Dhup Powder, Gugal & Loban", tag: "Essentials",  url: "/catalogues/dhup-gugal-loban.pdf" },
  { name: "Diya & Rangoli (Readymade)",       tag: "Festival",    url: "/catalogues/diya-rangoli-readymade.pdf" },
  { name: "Metal Diya",                       tag: "Brass",       url: "/catalogues/metal-diya.pdf" },
  // Garlands & Malas
  { name: "Artificial Flower Ladi",           tag: "Garlands",    url: "/catalogues/artificial-flower-ladi.pdf" },
  { name: "Fancy Toran 1",                    tag: "Garlands",    url: "/catalogues/fancy-ladi.pdf" },
  { name: "Fancy Toran 2",                    tag: "Garlands",    url: "/catalogues/fancy-ladi-2.pdf" },
  { name: "Wedding Mala",                     tag: "Garlands",    url: "/catalogues/wedding-mala.pdf" },
  { name: "Chandan Haar",                     tag: "Garlands",    url: "/catalogues/chandan-haar.pdf" },
  { name: "Moti Mala (all sizes)",            tag: "Garlands",    url: "/catalogues/moti-mala.pdf" },
  { name: "Sartin Moti Mala (all sizes)",     tag: "Garlands",    url: "/catalogues/sartin-moti-mala.pdf" },
  // Torans
  { name: "Flower Toran",                     tag: "Toran",       url: "/catalogues/flower-toran.pdf" },
  { name: "Flower Toran 2",                   tag: "Toran",       url: "/catalogues/flower-toran-2.pdf" },
  { name: "Moti Toran Fancy",                 tag: "Toran",       url: "/catalogues/moti-toran-fancy.pdf" },
  { name: "Embroidery Toran",                 tag: "Toran",       url: "/catalogues/embroidery-toran.pdf" },
  // Idols & Murti
  { name: "Ganpati Murati",                   tag: "Idols",       url: "/catalogues/ganpati-murati.pdf" },
  { name: "Devi Mukhota",                     tag: "Idols",       url: "/catalogues/devi-mukhota.pdf" },
  // Festival & Decoration
  { name: "Ganesh Patta, Chunri & Vagha",     tag: "Festival",    url: "/catalogues/ganesh-patta-chunri-vagha.pdf" },
  { name: "Ganpati Decoration & Fancy Mala",  tag: "Festival",    url: "/catalogues/ganpati-decoration-fancy-mala.pdf" },
  { name: "Mataji Chunri",                    tag: "Festival",    url: "/catalogues/mataji-chunri.pdf" },
  { name: "Karwa Chauth",                     tag: "Festival",    url: "/catalogues/karwa-chauth.pdf" },
  // Spiritual & Furniture
  { name: "Yantra & Margshish Items",         tag: "Spiritual",   url: "/catalogues/yantra-margshish.pdf" },
  { name: "Paat, Bajot, Jhula, Chowki & Singhasan", tag: "Furniture", url: "/catalogues/paat-bajot-jhula-chowki-singhasan.pdf" },
  { name: "Velvet Aasan",                     tag: "Furniture",   url: "/catalogues/velvet-aasan.pdf" },
];

const WA_NUMBER = "918369718757";
const WA_DISPLAY = "+91 83697 18757";
// Official WhatsApp short link — works on every network that allows whatsapp.com.
// If a user's network blocks WhatsApp entirely (Edge Family Safety, school/office
// firewall, certain ISP blocks), they'll see the visible phone number fallback.
const waLink = (msg) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;

// Copy-to-clipboard fallback for blocked networks
const copyNumber = async () => {
  try {
    await navigator.clipboard.writeText(WA_DISPLAY);
    const toast = document.createElement("div");
    toast.textContent = `Copied ${WA_DISPLAY} — paste it in WhatsApp`;
    toast.style.cssText =
      "position:fixed;bottom:160px;right:30px;background:#3d0810;color:#d8b56a;padding:14px 22px;font-family:Inter,sans-serif;font-size:13px;letter-spacing:.18em;text-transform:uppercase;border:1px solid #c9a55a;z-index:10000;box-shadow:0 16px 40px rgba(0,0,0,.4);";
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3200);
  } catch {
    window.prompt("Copy this WhatsApp number:", WA_DISPLAY);
  }
};

/* ------- Imagery (verified Pexels pooja stock) ------- */
const px = (id, w = 1200) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

const IMG = {
  hero: px(18849427, 2000),       // Diwali clay diyas on dark background
  story: px(8818755, 1200),       // Hand on traditional Hindu altar with brassware
  // Catalogue (8)
  daily: px(8887203, 900),        // Indian candlelight ceremony with flowers
  garlands: px(32170218, 900),    // Marigold flowers around ghee lamp
  brass: px(14834183, 900),       // Hand lighting brass lamp
  idols: px(33796381, 900),       // Vibrant Ganesh idol with red hibiscus flowers
  festival: px(8818668, 900),     // Diwali altar with golden plate
  vastu: px(6634244, 900),        // Rudraksha beads close-up
  holi: px(2041707, 900),         // Multicolored holi powder bowls
  hampers: px(37116937, 900),     // Colorful pooja setup with fruits & flowers
  // Featured (5)
  feat_camphor: px(8818748, 900),    // Brass oil lamp w/ Ganesha
  feat_rudraksha: px(6634244, 900),  // Rudraksha beads close-up
  feat_diya: px(18849427, 900),      // Diwali diyas
  feat_incense: px(8887195, 900),    // Decorated platter w/ candles
  feat_holi: px(2041707, 900),       // Multicolored holi powder bowls
};

/* Fallback image if a URL 404s */
const FALLBACK = (label) =>
  `https://placehold.co/900x900/3d0810/c9a55a?font=playfair&text=${encodeURIComponent(
    label
  )}`;

const onImgError = (label) => (e) => {
  e.currentTarget.onerror = null;
  e.currentTarget.src = FALLBACK(label);
};

/* ---------- Fade-in observer hook ---------- */
const useFadeIn = () => {
  useEffect(() => {
    const els = document.querySelectorAll(".fade-up");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
};

/* =====================================================
   HERO
===================================================== */
const Hero = () => (
  <section
    className="hero"
    data-testid="hero-section"
    style={{}}
  >
    <div
      className="hero__bg"
      style={{ backgroundImage: `url(${IMG.hero})` }}
    />
    <div className="hero__veil" />
    <div className="hero__nav">
      <div className="hero__logo" data-testid="hero-logo">
        <img src={LOGO} alt="Miral Novelty" />
      </div>
      <div className="hero__nav-meta">
        <span>Bhuleshwar · Mumbai</span>
        <div style={{ marginTop: 6 }}>Established 1980 · Wholesale Only</div>
      </div>
    </div>

    <div className="hero__content">
      <span className="hero__eyebrow">USA · UK · Canada · Australia · NZ · Africa &amp; more</span>
      <h1 className="hero__title">
        India's Finest <em>Religious &amp; Pooja</em> Articles
      </h1>
      <p className="hero__sub">
        Trusted by importers, wholesalers and retailers across the world —
        sourced directly from Mumbai's most celebrated spiritual marketplace,
        since 1980.
      </p>
      <a
        href={waLink(
          "Hello Miral Novelty, I'd like to request your wholesale catalogue. Please share product list, MOQ and export details."
        )}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary"
        data-testid="hero-cta-catalogue"
      >
        Request a Wholesale Catalogue
        <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
          <path
            d="M1 7H17M17 7L11 1M17 7L11 13"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="square"
          />
        </svg>
      </a>
      <div className="hero__altcontact" data-testid="hero-alt-contact">
        <span>Or message us directly:</span>
        <button
          type="button"
          onClick={copyNumber}
          className="hero__phone"
          data-testid="hero-copy-number"
          aria-label="Copy WhatsApp number"
        >
          {WA_DISPLAY}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <rect x="9" y="9" width="13" height="13" rx="1" stroke="currentColor" strokeWidth="1.6"/>
            <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" stroke="currentColor" strokeWidth="1.6"/>
          </svg>
        </button>
      </div>
    </div>

    <div className="hero__decor">
      <div className="hero__decor-num">1980</div>
      <div>Forty-four years of devotion</div>
    </div>
  </section>
);

/* =====================================================
   BRAND STORY
===================================================== */
const Story = () => (
  <section className="section" data-testid="story-section">
    <div className="story">
      <div className="story__media fade-up">
        <img
          src={IMG.story}
          alt="Miral Novelty — Bhuleshwar Mumbai"
          onError={onImgError("Bhuleshwar Mumbai")}
        />
        <div className="story__media-tag">Bhuleshwar · Est. 1980</div>
      </div>
      <div className="story__copy fade-up">
        <span className="gold-rule">Our Heritage</span>
        <h2 className="section__title" style={{ marginTop: 24 }}>
          Forty-four years of <em>devotion</em>, sourced with care.
        </h2>
        <p className="story__lead">
          "For over 44 years, Miral Novelty has been at the heart of India's
          religious articles trade."
        </p>
        <p className="story__body">
          Operating from Bhuleshwar — Mumbai's most celebrated spiritual
          marketplace — we have grown alongside the families, temples and
          traders who keep India's devotional traditions alive.
        </p>
        <p className="story__body">
          We supply premium pooja articles, havan samagri, idols, festival items
          and spiritual products to wholesalers and retailers across India and
          internationally. Every product we carry is sourced with care,
          authenticity and devotion.
        </p>
        <div className="story__markets" data-testid="story-markets">
          <span className="story__markets-label">Markets we serve</span>
          <div className="story__markets-list">
            <span>USA</span>
            <span>·</span>
            <span>United Kingdom</span>
            <span>·</span>
            <span>Canada</span>
            <span>·</span>
            <span>Australia</span>
            <span>·</span>
            <span>New Zealand</span>
            <span>·</span>
            <span>Africa</span>
            <span>·</span>
            <span>UAE</span>
            <span>·</span>
            <span>Singapore</span>
            <span className="story__markets-more">&amp; many more</span>
          </div>
        </div>
        <div className="story__signature">
          <div>
            <div className="story__stat-num">44+</div>
            <div className="story__stat-label">Years of Heritage</div>
          </div>
          <div>
            <div className="story__stat-num">600+</div>
            <div className="story__stat-label">Curated Articles</div>
          </div>
          <div>
            <div className="story__stat-num">25+</div>
            <div className="story__stat-label">Countries Served</div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* =====================================================
   CATALOGUE
===================================================== */
const CATEGORIES = [
  {
    n: "I",
    title: "Daily Pooja Essentials",
    img: IMG.daily,
    items: [
      "Agarbatti & Dhoop Sticks",
      "Bhimsen Kapoor (Original)",
      "Kumkum, Haldi, Sindoor",
      "Hand-rolled Cotton Wicks",
      "Brass & Clay Diyas",
    ],
  },
  {
    n: "II",
    title: "Garlands & Decorative",
    img: IMG.garlands,
    items: [
      "Wedding Malas & Haar",
      "Toran & Bandhanwaar",
      "Artificial Flower Ladi",
      "Pearl & Beaded Malas",
      "Fancy Latkan & Tassels",
    ],
  },
  {
    n: "III",
    title: "Brass & Silver Pooja Items",
    img: IMG.brass,
    items: [
      "Brass Pooja Thali Sets",
      "Pancharti & Aarti Diya",
      "Kalash & Kumbh",
      "Panchpatra & Achmani",
      "Temple Bells & Ghanta",
    ],
  },
  {
    n: "IV",
    title: "Religious Idols & Murti",
    img: IMG.idols,
    items: [
      "Ganesh & Lakshmi",
      "Shiva Parivar & Lingam",
      "Krishna & Radha",
      "Ram Darbar Sets",
      "Sai Baba & Hanuman",
    ],
  },
  {
    n: "V",
    title: "Festival Collections",
    img: IMG.festival,
    items: [
      "Diwali Lakshmi Pujan Sets",
      "Navratri Shringar",
      "Ganesh Chaturthi Decor",
      "Rakhi & Bhai Dooj Sets",
      "Karwa Chauth Thali",
    ],
  },
  {
    n: "VI",
    title: "Spiritual & Vastu",
    img: IMG.vastu,
    items: [
      "Original Rudraksha Beads",
      "Wearable Rudraksha Items",
      "Gomti Chakra & Parad",
      "Crystal Pyramids",
      "Vastu Yantra Plates",
    ],
  },
  {
    n: "VII",
    title: "Holi & Organic Colors",
    img: IMG.holi,
    items: [
      "Eco-friendly Gulal",
      "Herbal Holi Colors",
      "Bulk Export Packs",
      "Skin-safe for Children",
      "Vibrant Festival Tones",
    ],
  },
  {
    n: "VIII",
    title: "Premium Export Hampers",
    img: IMG.hampers,
    items: [
      "Luxury Pooja Kits",
      "Handmade Brass Diyas",
      "Incense Gift Boxes",
      "Wedding Return Gifts",
      "Custom USA-market Sets",
    ],
  },
];

const Catalogue = () => (
  <section className="section catalogue" data-testid="catalogue-section">
    <div className="catalogue__head fade-up">
      <div>
        <span className="gold-rule">The Collection</span>
        <h2 className="section__title" style={{ marginTop: 24 }}>
          Eight curated chapters of <em>devotion</em>.
        </h2>
      </div>
      <p>
        From everyday agarbatti to museum-grade brass — every category in our
        catalogue is sourced directly from manufacturers and master artisans
        across India.
      </p>
    </div>

    <div className="cat-grid">
      {CATEGORIES.map((c, i) => (
        <a
          key={c.title}
          href={waLink(
            `Hello Miral Novelty, I'm interested in your "${c.title}" range. Please share catalogue, MOQ and pricing.`
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="cat-card fade-up"
          data-testid={`category-card-${i}`}
          style={{ animationDelay: `${i * 60}ms` }}
        >
          <div className="cat-card__img">
            <span className="cat-card__num">{c.n}</span>
            <img src={c.img} alt={c.title} onError={onImgError(c.title)} />
          </div>
          <div className="cat-card__body">
            <h3 className="cat-card__title">{c.title}</h3>
            <ul className="cat-card__items">
              {c.items.map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ul>
          </div>
        </a>
      ))}
    </div>
  </section>
);

/* =====================================================
   WHY IMPORT FROM US
===================================================== */
const WHY = [
  {
    n: "01",
    title: "Since 1980",
    copy: "Forty-four years of trust, heritage and unbroken family-run service from Bhuleshwar.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M3 21h18M5 21V10l7-5 7 5v11M9 21v-7h6v7" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    ),
  },
  {
    n: "02",
    title: "Bulk Ready",
    copy: "Vast inventory and same-week dispatch from Mumbai — we move when you move.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M3 7h13v10H3zM16 11h4l1 2v3h-5M6 17a2 2 0 104 0M16 17a2 2 0 104 0" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    ),
  },
  {
    n: "03",
    title: "Export Experience",
    copy: "Regularly supplying USA, UK and global markets — documentation, compliance and care handled.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" />
        <path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    ),
  },
  {
    n: "04",
    title: "Authentic Sourcing",
    copy: "Direct from manufacturers, temple suppliers and master artisans — no middlemen, no compromise.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M5 12l4 4L19 6" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    ),
  },
];

const Why = () => (
  <section className="why" data-testid="why-section">
    <div className="why__head fade-up">
      <span className="gold-rule" style={{ color: "#d8b56a" }}>
        Why Import From Us
      </span>
      <h2 className="why__title">
        A partner you can trust — for <em>generations</em>.
      </h2>
    </div>
    <div className="why-grid">
      {WHY.map((w) => (
        <div key={w.n} className="why-cell fade-up" data-testid={`why-cell-${w.n}`}>
          <div className="why-cell__icon">{w.icon}</div>
          <div className="why-cell__num">{w.n} —</div>
          <h3 className="why-cell__title">{w.title}</h3>
          <p className="why-cell__copy">{w.copy}</p>
        </div>
      ))}
    </div>
  </section>
);

/* =====================================================
   FEATURED
===================================================== */
const FEATURED = [
  {
    img: IMG.feat_camphor,
    tag: "Bestseller",
    title: "Bhimsen Kapoor — Original",
    copy: "The most trusted camphor brand in India — pure, fragrant, devotional-grade.",
  },
  {
    img: IMG.feat_rudraksha,
    tag: "Certified",
    title: "Rudraksha Malas",
    copy: "Original, wearable, certified — sourced directly from Nepal & Indonesia.",
  },
  {
    img: IMG.feat_diya,
    tag: "Handmade",
    title: "Handmade Brass Diyas",
    copy: "Perfect for gifting and home décor — finished by master artisans.",
  },
  {
    img: IMG.feat_incense,
    tag: "Curated",
    title: "Premium Incense Gift Boxes",
    copy: "Curated for global markets — refined fragrances, elegant packaging.",
  },
  {
    img: IMG.feat_holi,
    tag: "Export Grade",
    title: "Holi Organic Colors",
    copy: "Safe for children, vibrant in tone, certified export-grade — bulk ready.",
  },
];

const Featured = () => (
  <section className="featured" data-testid="featured-section">
    <div className="featured__head fade-up">
      <span className="gold-rule">Spotlight · Global Bestsellers</span>
      <h2 className="section__title" style={{ marginTop: 24 }}>
        Bestsellers travelling <em>far from home</em>.
      </h2>
    </div>
    <div className="featured__strip no-scrollbar" data-testid="featured-strip">
      {FEATURED.map((f, i) => (
        <div key={f.title} className="feat-card fade-up" data-testid={`featured-card-${i}`}>
          <div className="feat-card__img">
            <img src={f.img} alt={f.title} onError={onImgError(f.title)} />
          </div>
          <div className="feat-card__body">
            <div className="feat-card__tag">{f.tag}</div>
            <h3 className="feat-card__title">{f.title}</h3>
            <p className="feat-card__copy">{f.copy}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

/* =====================================================
   ENQUIRY FORM
===================================================== */
const CATEGORY_OPTIONS = [
  "Daily Pooja Essentials",
  "Garlands & Decorative",
  "Brass & Silver Pooja Items",
  "Religious Idols & Murti",
  "Festival Collections",
  "Spiritual & Vastu",
  "Holi & Organic Colors",
  "Premium Export Hampers",
];

const Enquiry = () => {
  const [form, setForm] = useState({
    name: "",
    company: "",
    cityState: "",
    message: "",
  });
  const [cats, setCats] = useState([]);

  const onChange = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const toggleCat = (c) =>
    setCats((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
    );

  const onSubmit = (e) => {
    e.preventDefault();
    const lines = [
      "Hello Miral Novelty — wholesale enquiry.",
      "",
      `Name: ${form.name || "—"}`,
      `Company: ${form.company || "—"}`,
      `City & Country: ${form.cityState || "—"}`,
      `Categories of Interest: ${cats.length ? cats.join(", ") : "—"}`,
      "",
      "Requirements:",
      form.message || "—",
    ];
    window.open(waLink(lines.join("\n")), "_blank", "noopener,noreferrer");
  };

  return (
    <section
      id="enquiry"
      className="enquiry"
      data-testid="enquiry-section"
    >
      <div className="enquiry__inner">
        <span className="gold-rule">Begin a Conversation</span>
        <h2
          className="section__title"
          style={{ marginTop: 24, fontSize: 56 }}
        >
          Start your import journey with <em>Miral Novelty</em>.
        </h2>
        <p
          style={{
            fontSize: 16,
            lineHeight: 1.8,
            color: "rgba(43,17,21,0.7)",
            marginTop: 18,
            maxWidth: 680,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          We welcome enquiries from importers, distributors, gift stores and
          retailers worldwide. Minimum order quantities apply. Samples
          available on request.
        </p>

        <form
          className="enquiry__form"
          onSubmit={onSubmit}
          data-testid="enquiry-form"
        >
          <div className="enquiry__row">
            <div className="enquiry__field">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                type="text"
                value={form.name}
                onChange={onChange("name")}
                required
                data-testid="input-name"
                placeholder="Your name"
              />
            </div>
            <div className="enquiry__field">
              <label htmlFor="company">Company Name</label>
              <input
                id="company"
                type="text"
                value={form.company}
                onChange={onChange("company")}
                data-testid="input-company"
                placeholder="Your company"
              />
            </div>
          </div>

          <div className="enquiry__row">
            <div className="enquiry__field" style={{ gridColumn: "1 / -1" }}>
              <label htmlFor="cityState">City &amp; Country</label>
              <input
                id="cityState"
                type="text"
                value={form.cityState}
                onChange={onChange("cityState")}
                data-testid="input-citystate"
                placeholder="e.g. Edison, NJ, USA · London, UK · Toronto, Canada"
              />
            </div>
          </div>

          <div className="enquiry__field">
            <label>Product Categories Interested In</label>
            <div className="enquiry__cats">
              {CATEGORY_OPTIONS.map((c) => (
                <label
                  key={c}
                  className="enquiry__cat"
                  data-testid={`category-checkbox-${c.split(" ")[0].toLowerCase()}`}
                >
                  <input
                    type="checkbox"
                    checked={cats.includes(c)}
                    onChange={() => toggleCat(c)}
                  />
                  <span>{c}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="enquiry__field" style={{ marginTop: 28 }}>
            <label htmlFor="message">Message / Specific Requirements</label>
            <textarea
              id="message"
              value={form.message}
              onChange={onChange("message")}
              rows={4}
              data-testid="input-message"
              placeholder="Tell us about your store, target volumes, timelines…"
            />
          </div>

          <div className="enquiry__actions">
            <button
              type="submit"
              className="btn-maroon"
              data-testid="enquiry-submit-btn"
            >
              Send via WhatsApp
              <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
                <path
                  d="M1 7H17M17 7L11 1M17 7L11 13"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="square"
                />
              </svg>
            </button>
          </div>
          <div className="enquiry__altcontact" data-testid="enquiry-alt-contact">
            WhatsApp blocked on your network? Message us directly at{" "}
            <button type="button" onClick={copyNumber} className="enquiry__phone-link">
              {WA_DISPLAY}
            </button>
            {" "}— tap to copy.
          </div>
        </form>
      </div>
    </section>
  );
};

/* =====================================================
   FOOTER
===================================================== */
const Footer = () => (
  <footer className="footer" data-testid="footer">
    <div className="footer__top">
      <div>
        <div className="footer__logo">
          <img src={LOGO} alt="Miral Novelty" />
        </div>
        <p className="footer__tag">
          One Stop Destination for All Religious Pooja Items.
        </p>
      </div>

      <div>
        <div className="footer__col-title">Visit Us</div>
        <p className="footer__addr">
          Shop No. 10, Miral Novelty,
          <br />
          Bhuleshwar, Panjrapole,
          <br />
          Charni Road, Mumbai – 400004
          <br />
          Maharashtra, India
        </p>
      </div>

      <div>
        <div className="footer__col-title">Connect</div>
        <div className="footer__contact-row">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path
              d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z"
              stroke="currentColor"
              strokeWidth="1.4"
            />
          </svg>
          +91 8369718757
        </div>
        <a
          href={waLink("Hello Miral Novelty, I'd like to enquire about your wholesale catalogue.")}
          target="_blank"
          rel="noopener noreferrer"
          className="footer__wa"
          data-testid="footer-whatsapp-link"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.52 3.48A11.85 11.85 0 0012 0C5.37 0 0 5.37 0 12a11.94 11.94 0 001.64 6.04L0 24l6.18-1.62A11.94 11.94 0 0012 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.21-3.48-8.52zM12 22a9.94 9.94 0 01-5.07-1.39l-.36-.21-3.67.96.98-3.58-.24-.37A9.94 9.94 0 012 12C2 6.48 6.48 2 12 2s10 4.48 10 10-4.48 10-10 10zm5.45-7.55c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.78-1.68-2.08-.17-.3-.02-.46.13-.6.13-.13.3-.34.45-.5.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.8.37-.27.3-1.05 1.02-1.05 2.5 0 1.47 1.07 2.9 1.22 3.1.15.2 2.1 3.2 5.1 4.49.71.3 1.27.49 1.7.62.71.22 1.36.19 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35z" />
          </svg>
          WhatsApp Chat
        </a>
      </div>
    </div>

    <div className="footer__bottom">
      <span>© 1980–2026 Miral Novelty · All Rights Reserved</span>
      <span>Proudly serving importers worldwide &amp; the Indian diaspora</span>
    </div>
  </footer>
);

/* =====================================================
   CATALOGUES DRAWER (left edge, collapsible)
===================================================== */
const CataloguesDrawer = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`cat-tab ${open ? "cat-tab--hidden" : ""}`}
        data-testid="catalogues-tab"
        aria-label="Open catalogues"
      >
        <span className="cat-tab__badge">{CATALOGUES.length}</span>
        <span className="cat-tab__body">
          <span className="cat-tab__eyebrow">Wholesale</span>
          <span className="cat-tab__title">View Catalogues</span>
          <span className="cat-tab__sub">Browse {CATALOGUES.length} product PDFs</span>
        </span>
        <span className="cat-tab__arrow" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
          </svg>
        </span>
      </button>

      <div
        className={`cat-overlay ${open ? "is-open" : ""}`}
        onClick={() => setOpen(false)}
        data-testid="catalogues-overlay"
      />

      <aside
        className={`cat-drawer ${open ? "is-open" : ""}`}
        data-testid="catalogues-drawer"
        aria-hidden={!open}
      >
        <div className="cat-drawer__head">
          <div>
            <span className="cat-drawer__eyebrow">Wholesale</span>
            <h3 className="cat-drawer__title">
              Product <em>Catalogues</em>
            </h3>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="cat-drawer__close"
            data-testid="catalogues-close"
            aria-label="Close catalogues"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
            </svg>
          </button>
        </div>

        <p className="cat-drawer__sub">
          Tap any catalogue to open the PDF. For pricing, MOQ &amp; export details,
          message us on WhatsApp at{" "}
          <button type="button" onClick={copyNumber} className="enquiry__phone-link">
            {WA_DISPLAY}
          </button>.
        </p>

        <ul className="cat-drawer__list">
          {CATALOGUES.map((c, i) => (
            <li key={c.name}>
              <a
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="cat-drawer__item"
                data-testid={`catalogue-item-${i}`}
              >
                <span className="cat-drawer__num">{String(i + 1).padStart(2, "0")}</span>
                <span className="cat-drawer__body">
                  <span className="cat-drawer__name">{c.name}</span>
                  <span className="cat-drawer__tag">{c.tag} · PDF</span>
                </span>
                <span className="cat-drawer__icon" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M14 3h7v7M21 3l-9 9M5 7v12a2 2 0 002 2h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
                  </svg>
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="cat-drawer__foot">
          <span>Miral Novelty · Bhuleshwar, Mumbai · Est. 1980</span>
        </div>
      </aside>
    </>
  );
};

/* =====================================================
   FLOATING WHATSAPP
===================================================== */
const FloatingWA = () => (
  <a
    href={waLink(
      "Hello Miral Novelty, I'd like to know more about your wholesale catalogue."
    )}
    target="_blank"
    rel="noopener noreferrer"
    onContextMenu={(e) => {
      e.preventDefault();
      copyNumber();
    }}
    className="fab-wa"
    data-testid="floating-whatsapp"
    aria-label="Chat on WhatsApp (right-click to copy number)"
    title={`Click to chat · Right-click to copy ${WA_DISPLAY}`}
  >
    <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.52 3.48A11.85 11.85 0 0012 0C5.37 0 0 5.37 0 12a11.94 11.94 0 001.64 6.04L0 24l6.18-1.62A11.94 11.94 0 0012 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.21-3.48-8.52zM12 22a9.94 9.94 0 01-5.07-1.39l-.36-.21-3.67.96.98-3.58-.24-.37A9.94 9.94 0 012 12C2 6.48 6.48 2 12 2s10 4.48 10 10-4.48 10-10 10zm5.45-7.55c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.78-1.68-2.08-.17-.3-.02-.46.13-.6.13-.13.3-.34.45-.5.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.8.37-.27.3-1.05 1.02-1.05 2.5 0 1.47 1.07 2.9 1.22 3.1.15.2 2.1 3.2 5.1 4.49.71.3 1.27.49 1.7.62.71.22 1.36.19 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35z" />
    </svg>
  </a>
);

/* =====================================================
   APP
===================================================== */
function App() {
  useFadeIn();

  // Smooth scroll for anchor links
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  return (
    <div className="miral-page" data-testid="miral-landing">
      <Hero />
      <Story />
      <Catalogue />
      <Why />
      <Featured />
      <Enquiry />
      <Footer />
      <FloatingWA />
      <CataloguesDrawer />
    </div>
  );
}

export default App;
