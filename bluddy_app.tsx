import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronLeft,
  Heart,
  Info,
  MapPin,
  MessageCircle,
  RotateCcw,
  Send,
  ShieldCheck,
  SlidersHorizontal,
  User,
  X,
} from "lucide-react";

type Profile = {
  id: number;
  name: string;
  age: number;
  bloodType: string;
  location: string;
  distance: number;
  bio: string;
  tags: string[];
  avatar: string;
};
const PROFILES: Profile[] = [
  {
    id: 1,
    name: "Maya",
    age: 26,
    bloodType: "A+",
    location: "Brooklyn, NY",
    distance: 4,
    bio: "Brooklyn-based design researcher and weekend runner. Usually starting the day with a lap of Prospect Park. Here to meet people with a different perspective.",
    tags: ["Design", "Running", "Good conversation"],
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    name: "Julian",
    age: 28,
    bloodType: "O−",
    location: "Manhattan, NY",
    distance: 7,
    bio: "Architecture grad living on the Upper West Side, with an interest in the future of well-being. Usually in a bookstore or walking along the Hudson.",
    tags: ["Architecture", "Books", "Walking"],
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    name: "Sebastian",
    age: 24,
    bloodType: "A+",
    location: "Queens, NY",
    distance: 9,
    bio: "Queens-based music lover. Live shows, neighborhood food spots, and conversations that go somewhere unexpected. Exploring new connections at my own pace.",
    tags: ["Music", "Languages", "Travel"],
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 4,
    name: "Tristan",
    age: 31,
    bloodType: "B+",
    location: "Jersey City, NJ",
    distance: 12,
    bio: "Working in sustainability in Jersey City. Into waterfront bike rides, good food, and meeting thoughtful people across the New York area.",
    tags: ["Sustainability", "Cycling", "Food"],
    avatar:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&auto=format&fit=crop&q=80",
  },
];
const ADRIAN =
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80";
function Logo() {
  return (
    <span className="brand">
      <img src="/bluddy-logo.png" alt="Bluddy" />
    </span>
  );
}
function ProfilePreview() {
  return (
    <div className="preview-card">
      <div className="preview-top">
        <Logo />
        <span className="tag">Discover</span>
      </div>
      <h3>Your next connection</h3>
      <img
        className="preview-photo"
        src={PROFILES[0].avatar}
        alt="Maya, an illustrative Bluddy profile"
      />
      <div className="preview-details">
        <h3>
          Maya, 26 <ShieldCheck size={16} />
        </h3>
        <p>Plasma donor · {PROFILES[0].location}</p>
        <div className="preview-tags">
          <span className="tag">Verified profile</span>
          <span className="tag neutral">Match intent</span>
        </div>
      </div>
    </div>
  );
}
type OfferTerms = { amount: number; travel: number; note: string };
type DemoOffer = OfferTerms & {
  id: number;
  profile: Profile;
  status: "Pending" | "Withdrawn";
};
function OfferBuilder({
  name = "Maya",
  onSend,
}: {
  name?: string;
  onSend?: (terms: OfferTerms) => void;
}) {
  const [amount, setAmount] = useState("125");
  const [travel, setTravel] = useState("25");
  const [note, setNote] = useState("");
  const [preview, setPreview] = useState(false);
  const total = Number(amount) + Number(travel);
  const money = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    }).format(value);
  return (
    <div className="offer-builder">
      <div className="offer-heading">
        <div>
          <span className="eyebrow">Start a conversation</span>
          <h3>
            {preview ? "An offer to consider." : `Make ${name} an offer.`}
          </h3>
        </div>
        <span className="tag">Interactive example</span>
      </div>
      {preview ? (
        <div className="offer-review" aria-live="polite">
          <p className="offer-summary">
            Adrian would like to offer {name} <strong>{money(total)}</strong>.
          </p>
          <dl>
            <div>
              <dt>Participation</dt>
              <dd>{money(Number(amount))}</dd>
            </div>
            <div>
              <dt>Travel</dt>
              <dd>{money(Number(travel))}</dd>
            </div>
            <div>
              <dt>Platform deduction</dt>
              <dd>$0</dd>
            </div>
          </dl>
          {note.trim() && <blockquote>{note}</blockquote>}
          <p>
            {name} can accept, decline, or suggest a different amount. Neither
            person is committed until terms are mutually agreed.
          </p>
          <button
            type="button"
            className="button secondary"
            onClick={() => setPreview(false)}
          >
            Edit offer
          </button>
          {onSend && (
            <button
              type="button"
              className="button send-offer"
              onClick={() =>
                onSend({
                  amount: Number(amount),
                  travel: Number(travel),
                  note: note.trim(),
                })
              }
            >
              Send offer <Send size={16} />
            </button>
          )}
          <p className="offer-footnote">
            {onSend
              ? "Demo only. Sending adds this offer to your app activity; no real person is contacted or payment taken."
              : "Preview only. This offer has not been sent."}
          </p>
        </div>
      ) : (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            if (
              !Number.isFinite(total) ||
              Number(amount) <= 0 ||
              Number(travel) < 0
            )
              return;
            setPreview(true);
          }}
        >
          <p className="offer-description">
            Use the suggested amounts, or propose your own. The donor has the
            final say.
          </p>
          <div className="offer-fields">
            <label>
              Participation offer (USD)
              <input
                type="number"
                min="1"
                max="100000"
                step="0.01"
                required
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
              />
              <small>Suggested: $125</small>
            </label>
            <label>
              Travel allowance (USD)
              <input
                type="number"
                min="0"
                max="10000"
                step="0.01"
                required
                value={travel}
                onChange={(event) => setTravel(event.target.value)}
              />
              <small>Suggested: $25</small>
            </label>
          </div>
          <label>
            A note for {name} <span>(optional)</span>
            <textarea
              value={note}
              maxLength={500}
              rows={2}
              onChange={(event) => setNote(event.target.value)}
              placeholder="Introduce yourself and outline what you have in mind."
            />
          </label>
          <div className="offer-total">
            <span>
              Total proposed to the donor
              <strong>{money(Number.isFinite(total) ? total : 0)}</strong>
            </span>
            <button type="submit" className="button">
              Preview offer <ArrowRight size={16} />
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

function Landing({ launch }: { launch: () => void }) {
  return (
    <div className="landing">
      <header className="site-header">
        <a href="#" aria-label="Bluddy home">
          <Logo />
        </a>
        <nav aria-label="Main navigation">
          <a href="#idea">The idea</a>
          <a href="#how-it-works">How it works</a>
          <a href="#donors">For donors</a>
          <a href="#membership">Membership</a>
        </nav>
        <button className="button small" onClick={launch}>
          Explore the demo <ArrowUpRight size={16} />
        </button>
      </header>
      <main>
        <section className="hero section-width">
          <div className="hero-copy">
            <span className="eyebrow">
              <span className="red-dot" /> A new kind of connection
            </span>
            <h1>
              A better way to
              <br />
              <span>find your type.</span>
            </h1>
            <p className="lead">
              The peer-to-peer plasma matching platform for a new generation of
              longevity seekers.
            </p>
            <div className="hero-actions">
              <button className="button" onClick={launch}>
                Find your connection <ArrowRight size={18} />
              </button>
              <a className="text-link" href="#how-it-works">
                Get to know Bluddy <ArrowUpRight size={16} />
              </a>
            </div>
            <div className="hero-note">
              <ShieldCheck size={18} />
              <span>Built around people. Connected by possibility.</span>
            </div>
          </div>
          <div className="hero-art">
            <div className="art-label">
              <span>People, with potential.</span>
              <span>01 / DISCOVER</span>
            </div>
            <div className="orb orb-one" />
            <div className="orb orb-two" />
            <ProfilePreview />
            <div className="connection-pill">
              <span className="heart-disc">
                <Heart size={16} fill="currentColor" />
              </span>
              <div>
                <strong>A little more in common.</strong>
                <span>Start with a conversation.</span>
              </div>
            </div>
            <span className="art-foot">
              A NEW SOCIAL GRAPH. A NEW BIOLOGICAL CONNECTION.
            </span>
          </div>
        </section>
        <div className="principles">
          <span>Different generations.</span>
          <span>Shared possibilities.</span>
          <span>Mutual intent.</span>
          <span>One connection at a time.</span>
        </div>
        <section id="idea" className="section-width idea-section">
          <div>
            <span className="eyebrow">01 / The opportunity</span>
            <h2>
              Where longevity
              <br />
              meets liquidity.
            </h2>
            <p className="section-description">
              Two distinct motivations.
              <br />
              One shared place to connect.
            </p>
          </div>
          <div className="idea-content">
            <p className="large-copy">
              Some people are investing in their future.
              <br />
              Others have something to contribute.
            </p>
            <p>
              Bluddy brings plasma-curious adults and longevity-minded seekers
              into the same conversation. A familiar way to discover people,
              explore shared interests, and see where a connection could lead.
            </p>
            <div className="audiences">
              <div>
                <span className="audience-icon">18–35</span>
                <div>
                  <span className="eyebrow">The donor community</span>
                  <h3>A new way to participate.</h3>
                  <p>Curiosity. Connection. Opportunity.</p>
                </div>
              </div>
              <div>
                <span className="audience-icon dark">55+</span>
                <div>
                  <span className="eyebrow">The seeker community</span>
                  <h3>A longer view of the future.</h3>
                  <p>Discovery with a different perspective.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="how-it-works" className="how-section">
          <div className="section-width">
            <div className="section-heading">
              <div>
                <span className="eyebrow">02 / The experience</span>
                <h2>Make chemistry searchable.</h2>
              </div>
              <p>
                A familiar interface.
                <br />
                An entirely new kind of introduction.
              </p>
            </div>
            <div className="steps">
              {[
                {
                  title: "Create a profile",
                  text: "Share your age, location, interests, and what brings you here.",
                },
                {
                  title: "Find your type",
                  text: "Explore profiles and preferences that make a connection feel relevant.",
                },
                {
                  title: "Make it mutual",
                  text: "Express interest. When the feeling is shared, a conversation begins.",
                },
                {
                  title: "Take it from there",
                  text: "Get to know each other privately, at a pace that works for you.",
                },
              ].map((step, i) => (
                <div className="step" key={step.title}>
                  <span className="step-number">0{i + 1}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              ))}
            </div>
            <div className="experience">
              <div className="match-illustration">
                <div className="match-avatars">
                  <img src={PROFILES[0].avatar} alt="Maya" />
                  <span>
                    <Heart size={21} fill="currentColor" />
                  </span>
                  <img src={ADRIAN} alt="Adrian" />
                </div>
                <h3>It’s a match.</h3>
                <p>Maya and Adrian want to connect.</p>
                <button className="button small" onClick={launch}>
                  Say hello <ArrowRight size={15} />
                </button>
              </div>
              <div className="experience-copy">
                <span className="eyebrow">Built to feel familiar</span>
                <h2>
                  A connection first.
                  <br />
                  Everything else follows.
                </h2>
                <p>
                  No complicated introductions. Just profiles, mutual interest,
                  and a place to start talking.
                </p>
                <button className="text-link" onClick={launch}>
                  Try the experience <ArrowUpRight size={17} />
                </button>
              </div>
            </div>
          </div>
        </section>
        <section id="donors" className="section-width donor-section">
          <div className="section-heading">
            <div>
              <span className="eyebrow">03 / The donor side</span>
              <h2>Your contribution. Your terms.</h2>
            </div>
            <p>
              Suggested rates. Personal offers.
              <br />
              Room to make your own decision.
            </p>
          </div>
          <div className="donor-intro">
            <p>
              A connection should work for both people. For donors, that means
              free discovery, suggested rates to start from, and the freedom to
              accept, decline, or counter an offer.
            </p>
            <span className="tag">Suggested donor rates · USD</span>
          </div>
          <div className="donor-rates">
            <article>
              <span className="eyebrow">Participation</span>
              <p className="donor-amount">
                $125<span> suggested participation offer</span>
              </p>
              <h3>Time recognized.</h3>
              <p>
                A starting point for an offer, not a fixed price. Seekers can
                propose an amount; donors can suggest their own terms.
              </p>
            </article>
            <article>
              <span className="eyebrow">Travel allowance</span>
              <p className="donor-amount">
                $25<span> suggested travel allowance</span>
              </p>
              <h3>Getting there, covered.</h3>
              <p>
                A suggested allowance for the journey. Adjust it to the proposed
                location and include it in the offer upfront.
              </p>
            </article>
            <article>
              <span className="eyebrow">Platform fees</span>
              <p className="donor-amount">
                $0<span> to join or connect</span>
              </p>
              <h3>Keep your compensation.</h3>
              <p>
                No donor subscription and no platform deduction from the
                displayed participation payment.
              </p>
            </article>
          </div>
          <OfferBuilder />
          <div className="donor-details">
            <div>
              <h3>Accept, decline, or counter.</h3>
              <p>
                Review the person and proposed terms, then decide. A
                counter-offer keeps the conversation open; matching creates no
                obligation.
              </p>
            </div>
            <div>
              <h3>No volume commitments.</h3>
              <p>
                No minimum number of appointments, streaks, or
                repeat-participation bonuses. You decide whether to continue.
              </p>
            </div>
            <div>
              <h3>Discovery comes first.</h3>
              <p>
                Bluddy introduces people. A profile or match does not establish
                medical eligibility or arrange a procedure.
              </p>
            </div>
          </div>
          <p className="concept-note">
            Invented rates for this satire, not real offers or market rates. No
            donations, appointments, or payouts take place through this demo.
          </p>
        </section>
        <section id="membership" className="section-width membership-section">
          <div className="section-heading">
            <div>
              <span className="eyebrow">04 / Seeker membership</span>
              <h2>More ways to connect.</h2>
            </div>
            <p>
              Start with discovery.
              <br />
              Choose how far you want to go.
            </p>
          </div>
          <div className="plans">
            {[
              {
                name: "Free",
                price: "$0",
                description: "A place to start.",
                features: [
                  "Browse the community",
                  "Create your profile",
                  "Connect through mutual interest",
                ],
                cta: "Explore discovery",
              },
              {
                name: "Plus",
                price: "$49",
                description: "A more considered search.",
                features: [
                  "Everything in Free",
                  "Advanced discovery preferences",
                  "Priority profile visibility",
                ],
                cta: "Explore Plus",
              },
              {
                name: "Concierge",
                price: "$299",
                description: "A personal approach.",
                features: [
                  "Everything in Plus",
                  "Curated introductions",
                  "Dedicated member support",
                ],
                cta: "Explore Concierge",
              },
            ].map((plan, i) => (
              <article
                className={`plan ${i === 1 ? "featured" : ""}`}
                key={plan.name}
              >
                <div className="plan-top">
                  <span className="eyebrow">{plan.name}</span>
                  {i === 1 && <span className="tag">A closer connection</span>}
                </div>
                <p className="price">
                  {plan.price}
                  {i > 0 && <span> / month</span>}
                </p>
                <p>{plan.description}</p>
                <ul>
                  {plan.features.map((feature) => (
                    <li key={feature}>
                      <Check size={15} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  className={`button ${i !== 1 ? "secondary" : ""}`}
                  onClick={launch}
                >
                  {plan.cta}
                  <ArrowRight size={16} />
                </button>
              </article>
            ))}
          </div>
          <p className="concept-note">
            Illustrative memberships for this fictional concept. No
            subscriptions or payments.
          </p>
        </section>
        <section className="closing section-width">
          <span className="eyebrow">The next chapter is a connection.</span>
          <h2>Your type is out there.</h2>
          <button className="button" onClick={launch}>
            Meet Bluddy <ArrowRight size={18} />
          </button>
        </section>
      </main>
      <footer className="site-footer section-width">
        <div>
          <Logo />
          <p>
            A new social graph.
            <br />A new biological connection.
          </p>
        </div>
        <div className="footer-note">
          <span>Fictional concept / 2026</span>
          <p>
            Bluddy is a satire of the longevity economy.
            <br />
            This is an interactive demonstration, not a clinical service.
          </p>
        </div>
      </footer>
    </div>
  );
}

type Message = { sender: "me" | "them"; text: string };
const WELCOME: Message[] = [
  { sender: "them", text: "Hi Adrian — great to connect." },
  {
    sender: "me",
    text: "Likewise! Nice to meet someone with a shared interest.",
  },
];
export default function App() {
  const [inDemo, setInDemo] = useState(false);
  const [tab, setTab] = useState("discover");
  const [seen, setSeen] = useState<number[]>([]);
  const [matches, setMatches] = useState<Profile[]>([]);
  const [match, setMatch] = useState<Profile | null>(null);
  const [detail, setDetail] = useState<Profile | null>(null);
  const [chat, setChat] = useState<Profile | null>(null);
  const [messages, setMessages] = useState<Record<number, Message[]>>({});
  const [input, setInput] = useState("");
  const [offerTo, setOfferTo] = useState<Profile | null>(null);
  const [offers, setOffers] = useState<DemoOffer[]>([]);
  const [offerNotice, setOfferNotice] = useState("");
  const nextOfferId = useRef(1);
  const [type, setType] = useState("Any");
  const [radius, setRadius] = useState(25);
  const [dragX, setDragX] = useState(0);
  const dragStart = useRef<number | null>(null);
  const modalClose = useRef<HTMLButtonElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const hasModal = Boolean(match || detail || chat || offerTo);
  useEffect(() => {
    if (!hasModal) return;
    previousFocus.current = document.activeElement as HTMLElement;
    modalClose.current?.focus();
    return () => previousFocus.current?.focus();
  }, [hasModal]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [inDemo]);
  const current = PROFILES.find(
    (p) =>
      !seen.includes(p.id) &&
      (type === "Any" || p.bloodType === type) &&
      p.distance <= radius,
  );
  const openChat = (profile: Profile) => {
    setChat(profile);
    setMatch(null);
    setInput("");
    setMessages((prev) => ({
      ...prev,
      [profile.id]: prev[profile.id] || WELCOME,
    }));
  };
  const startOffer = (profile: Profile) => {
    setChat(null);
    setMatch(null);
    setDetail(null);
    if (
      offers.some(
        (offer) =>
          offer.profile.id === profile.id && offer.status === "Pending",
      )
    ) {
      setTab("offers");
      setOfferNotice(`You already have a pending offer for ${profile.name}.`);
      return;
    }
    setOfferTo(profile);
  };
  const sendOffer = (terms: OfferTerms) => {
    if (!offerTo) return;
    const recipient = offerTo;
    const id = nextOfferId.current++;
    setOffers((prev) => [
      { ...terms, id, profile: recipient, status: "Pending" },
      ...prev,
    ]);
    setMessages((prev) => ({
      ...prev,
      [recipient.id]: [
        ...(prev[recipient.id] || []),
        {
          sender: "me",
          text: `Demo offer sent: $${(terms.amount + terms.travel).toFixed(2)} total ($${terms.amount.toFixed(2)} participation + $${terms.travel.toFixed(2)} travel).${terms.note ? ` ${terms.note}` : ""}`,
        },
      ],
    }));
    setOfferTo(null);
    setTab("offers");
    setOfferNotice(
      `Offer sent to ${recipient.name} in this demo. Awaiting a response.`,
    );
  };
  const swipe = (like: boolean) => {
    if (!current) return;
    setSeen((prev) => [...prev, current.id]);
    setDragX(0);
    setDetail(null);
    if (like) {
      setMatches((prev) =>
        prev.some((p) => p.id === current.id) ? prev : [...prev, current],
      );
      setMatch(current);
    }
  };
  const closeModal = () => {
    setMatch(null);
    setDetail(null);
    setChat(null);
    setOfferTo(null);
  };
  const modalKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") closeModal();
    if (event.key === "Tab") {
      const nodes = event.currentTarget.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input, textarea, select, summary, [tabindex="0"]',
      );
      const first = nodes[0],
        last = nodes[nodes.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    }
  };
  if (!inDemo) return <Landing launch={() => setInDemo(true)} />;
  return (
    <div className="demo-page">
      <div className="demo-toolbar">
        <button className="text-link" onClick={() => setInDemo(false)}>
          <ChevronLeft size={16} />
          Back to Bluddy
        </button>
        <span>Interactive concept</span>
      </div>
      <main className="demo-device">
        <div className="demo-underlay" inert={hasModal}>
          <header className="demo-header">
            <button onClick={() => setInDemo(false)} aria-label="Bluddy home">
              <Logo />
            </button>
            <span className="tag">Discover a connection</span>
          </header>
          <div className="demo-body">
            {tab === "discover" && (
              <>
                <div className="demo-title">
                  <div>
                    <span className="eyebrow">Your next connection</span>
                    <h1>Find your type.</h1>
                  </div>
                  <button
                    className="icon-button"
                    aria-label="Discovery preferences"
                    onClick={() => setTab("preferences")}
                  >
                    <SlidersHorizontal size={19} />
                  </button>
                </div>
                <div className="location-row">
                  <span>
                    <MapPin size={13} /> New York City · within {radius} miles
                  </span>
                  <span>{type === "Any" ? "All types" : `Type ${type}`}</span>
                </div>
                {current ? (
                  <>
                    <article
                      className="discovery-card"
                      style={{
                        transform: `translateX(${dragX}px) rotate(${dragX / 25}deg)`,
                        transition:
                          dragStart.current === null ? "transform .2s" : "none",
                      }}
                      onPointerDown={(e) => {
                        if ((e.target as HTMLElement).closest("button")) return;
                        dragStart.current = e.clientX;
                        e.currentTarget.setPointerCapture(e.pointerId);
                      }}
                      onPointerMove={(e) => {
                        if (dragStart.current !== null)
                          setDragX(e.clientX - dragStart.current);
                      }}
                      onPointerCancel={() => {
                        dragStart.current = null;
                        setDragX(0);
                      }}
                      onPointerUp={() => {
                        if (dragX > 80) swipe(true);
                        else if (dragX < -80) swipe(false);
                        dragStart.current = null;
                        setDragX(0);
                      }}
                    >
                      <div className="discovery-photo">
                        <img
                          draggable={false}
                          src={current.avatar}
                          alt={current.name}
                        />
                        <span className="photo-type">
                          {current.bloodType}
                          <small>Self-reported</small>
                        </span>
                        {Math.abs(dragX) > 40 && (
                          <span className="swipe-label">
                            {dragX > 0 ? "CONNECT" : "PASS"}
                          </span>
                        )}
                      </div>
                      <div className="discovery-info">
                        <div className="profile-heading">
                          <h2>
                            {current.name}, {current.age}
                          </h2>
                          <button
                            className="icon-button"
                            aria-label={`View ${current.name}'s profile`}
                            onClick={() => setDetail(current)}
                          >
                            <Info size={19} />
                          </button>
                        </div>
                        <p>Plasma donor · {current.location}</p>
                        <div className="interests">
                          {current.tags.map((tag) => (
                            <span className="tag neutral" key={tag}>
                              {tag}
                            </span>
                          ))}
                        </div>
                        <p className="profile-bio">{current.bio}</p>
                      </div>
                    </article>
                    <button
                      className="button profile-offer"
                      onClick={() => startOffer(current)}
                    >
                      Make an offer <Send size={16} />
                    </button>
                    <div className="swipe-actions">
                      <button
                        className="icon-button"
                        disabled={!seen.length}
                        onClick={() => setSeen((prev) => prev.slice(0, -1))}
                        aria-label="Undo last swipe"
                      >
                        <RotateCcw size={20} />
                      </button>
                      <button
                        className="icon-button pass"
                        onClick={() => swipe(false)}
                        aria-label="Pass profile"
                      >
                        <X size={25} />
                      </button>
                      <button
                        className="icon-button like"
                        onClick={() => swipe(true)}
                        aria-label="Like profile"
                      >
                        <Heart size={26} fill="currentColor" />
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="empty-state">
                    <Heart size={34} />
                    <h2>You’re all caught up.</h2>
                    <p>
                      Adjust your preferences or take another look at the demo
                      profiles.
                    </p>
                    <button
                      className="button"
                      onClick={() => {
                        setSeen([]);
                        setType("Any");
                        setRadius(25);
                      }}
                    >
                      Explore again <RotateCcw size={16} />
                    </button>
                  </div>
                )}
                <p className="demo-caption">
                  Demo profiles. Likes simulate mutual interest.
                </p>
              </>
            )}
            {tab === "connections" && (
              <>
                <div className="demo-title">
                  <div>
                    <span className="eyebrow">A place to say hello</span>
                    <h1>Your connections.</h1>
                  </div>
                </div>
                {matches.length ? (
                  <div className="connection-list">
                    {matches.map((p) => (
                      <button key={p.id} onClick={() => openChat(p)}>
                        <img src={p.avatar} alt="" />
                        <div>
                          <strong>
                            {p.name}, {p.age}
                          </strong>
                          <span>
                            {messages[p.id]?.at(-1)?.text ||
                              "You matched. Start a conversation."}
                          </span>
                        </div>
                        <ArrowRight size={17} />
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="empty-state">
                    <MessageCircle size={35} />
                    <h2>Start with a little interest.</h2>
                    <p>Your mutual connections will appear here.</p>
                    <button
                      className="button"
                      onClick={() => setTab("discover")}
                    >
                      Discover people <ArrowRight size={16} />
                    </button>
                  </div>
                )}
              </>
            )}
            {tab === "offers" && (
              <>
                <div className="demo-title">
                  <div>
                    <span className="eyebrow">
                      Your proposals, in one place
                    </span>
                    <h1>Your offers.</h1>
                  </div>
                  <Send size={22} color="var(--red)" />
                </div>
                {offerNotice && (
                  <p className="offer-notice" role="status">
                    {offerNotice}
                  </p>
                )}
                {offers.length ? (
                  <div className="app-offers">
                    {offers.map((offer) => (
                      <article className="app-offer-card" key={offer.id}>
                        <div className="app-offer-person">
                          <img src={offer.profile.avatar} alt="" />
                          <div>
                            <h2>
                              {offer.profile.name}, {offer.profile.age}
                            </h2>
                            <p>{offer.profile.location}</p>
                          </div>
                          <span
                            className={`tag ${offer.status === "Withdrawn" ? "neutral" : ""}`}
                          >
                            {offer.status}
                          </span>
                        </div>
                        <p className="app-offer-value">
                          ${(offer.amount + offer.travel).toFixed(2)}{" "}
                          <span>total offered · USD</span>
                        </p>
                        <dl>
                          <div>
                            <dt>Participation</dt>
                            <dd>${offer.amount.toFixed(2)}</dd>
                          </div>
                          <div>
                            <dt>Travel allowance</dt>
                            <dd>${offer.travel.toFixed(2)}</dd>
                          </div>
                          <div>
                            <dt>Platform deduction</dt>
                            <dd>$0.00</dd>
                          </div>
                        </dl>
                        {offer.note && (
                          <p className="app-offer-note">{offer.note}</p>
                        )}
                        <div className="app-offer-actions">
                          <button
                            className="button small secondary"
                            onClick={() => openChat(offer.profile)}
                          >
                            Open conversation <MessageCircle size={14} />
                          </button>
                          {offer.status === "Pending" && (
                            <button
                              className="text-link"
                              onClick={() => {
                                setOffers((prev) =>
                                  prev.map((item) =>
                                    item.id === offer.id
                                      ? { ...item, status: "Withdrawn" }
                                      : item,
                                  ),
                                );
                                setOfferNotice(
                                  `Your offer to ${offer.profile.name} was withdrawn.`,
                                );
                                setMessages((prev) => ({
                                  ...prev,
                                  [offer.profile.id]: [
                                    ...(prev[offer.profile.id] || []),
                                    {
                                      sender: "me",
                                      text: `Demo offer #${offer.id} withdrawn.`,
                                    },
                                  ],
                                }));
                              }}
                            >
                              Withdraw offer
                            </button>
                          )}
                        </div>
                      </article>
                    ))}
                  </div>
                ) : (
                  <div className="empty-state">
                    <Send size={34} />
                    <h2>Start with an offer.</h2>
                    <p>
                      Choose a profile, adjust the suggested rate, and send a
                      proposal. You can review or withdraw it here.
                    </p>
                    <button
                      className="button"
                      onClick={() => setTab("discover")}
                    >
                      Explore profiles <ArrowRight size={16} />
                    </button>
                  </div>
                )}
                <p className="demo-caption offers-caption">
                  Demo activity only. No real offers, payments, or appointments.
                  Offers last for this page session.
                </p>
              </>
            )}
            {tab === "preferences" && (
              <>
                <div className="demo-title">
                  <div>
                    <span className="eyebrow">Make discovery yours</span>
                    <h1>Your preferences.</h1>
                  </div>
                </div>
                <div className="settings-panel">
                  <label htmlFor="radius">
                    Distance <strong>{radius} miles</strong>
                  </label>
                  <input
                    id="radius"
                    type="range"
                    min="5"
                    max="50"
                    value={radius}
                    onChange={(e) => setRadius(Number(e.target.value))}
                  />
                  <label htmlFor="blood-type">Self-reported blood type</label>
                  <select
                    id="blood-type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    {["Any", "A+", "O−", "B+"].map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                  <p>
                    Preferences shape who you see. Blood type is a profile
                    detail, not a clinical compatibility assessment.
                  </p>
                  <button className="button" onClick={() => setTab("discover")}>
                    See profiles <ArrowRight size={16} />
                  </button>
                </div>
              </>
            )}
            {tab === "profile" && (
              <>
                <div className="demo-title">
                  <div>
                    <span className="eyebrow">Your profile</span>
                    <h1>A little about you.</h1>
                  </div>
                </div>
                <div className="account-card">
                  <img src={ADRIAN} alt="Adrian" />
                  <h2>Adrian, 58</h2>
                  <p>Longevity seeker · Manhattan, NY</p>
                  <span className="tag">Plus member · demo</span>
                </div>
                <div className="settings-panel">
                  <h3>Looking ahead.</h3>
                  <p>
                    Interested in the future of well-being and meeting people
                    who see things differently.
                  </p>
                  <div className="interests">
                    <span className="tag neutral">Travel</span>
                    <span className="tag neutral">Architecture</span>
                    <span className="tag neutral">Wellbeing</span>
                  </div>
                </div>
                <p className="demo-caption">
                  An illustrative account. Nothing is submitted or saved beyond
                  this session.
                </p>
              </>
            )}
          </div>
          <nav className="demo-nav" aria-label="App navigation">
            {[
              { id: "discover", label: "Discover", icon: Heart },
              { id: "connections", label: "Connections", icon: MessageCircle },
              { id: "offers", label: "Offers", icon: Send },
              {
                id: "preferences",
                label: "Preferences",
                icon: SlidersHorizontal,
              },
              { id: "profile", label: "Profile", icon: User },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={tab === id ? "active" : ""}
                aria-current={tab === id ? "page" : undefined}
              >
                <Icon size={20} />
                <span>
                  {label}
                  {id === "connections" && matches.length > 0
                    ? ` (${matches.length})`
                    : ""}
                </span>
              </button>
            ))}
          </nav>
        </div>
        {hasModal && (
          <div
            className="modal-backdrop"
            role="dialog"
            aria-modal="true"
            aria-label={
              offerTo
                ? `Make an offer to ${offerTo.name}`
                : chat
                  ? `Conversation with ${chat.name}`
                  : detail
                    ? `${detail.name}'s profile`
                    : "It's a match"
            }
            onKeyDown={modalKeyDown}
          >
            <div className={`modal ${chat ? "chat-modal" : ""}`}>
              <button
                ref={modalClose}
                className="icon-button modal-close"
                aria-label="Close dialog"
                onClick={closeModal}
              >
                <X size={20} />
              </button>
              {offerTo && (
                <div className="app-offer-composer">
                  <OfferBuilder
                    key={offerTo.id}
                    name={offerTo.name}
                    onSend={sendOffer}
                  />
                </div>
              )}
              {match && (
                <div className="match-content">
                  <span className="eyebrow">Mutual interest</span>
                  <div className="match-avatars">
                    <img src={match.avatar} alt={match.name} />
                    <span>
                      <Heart size={21} fill="currentColor" />
                    </span>
                    <img src={ADRIAN} alt="Adrian" />
                  </div>
                  <h2>It’s a match.</h2>
                  <p>You and {match.name} want to connect.</p>
                  <button className="button" onClick={() => openChat(match)}>
                    Send a message <Send size={16} />
                  </button>
                  <button className="text-link" onClick={closeModal}>
                    Keep discovering
                  </button>
                </div>
              )}
              {detail && (
                <div className="detail-content">
                  <img src={detail.avatar} alt={detail.name} />
                  <h2>
                    {detail.name}, {detail.age}
                  </h2>
                  <p>
                    {detail.location} · {detail.distance} miles away
                  </p>
                  <p>{detail.bio}</p>
                  <div className="interests">
                    {detail.tags.map((t) => (
                      <span className="tag" key={t}>
                        {t}
                      </span>
                    ))}
                  </div>
                  <button className="button" onClick={() => swipe(true)}>
                    Express interest <Heart size={16} />
                  </button>
                  <button
                    className="button secondary"
                    onClick={() => startOffer(detail)}
                  >
                    Make an offer <Send size={16} />
                  </button>
                </div>
              )}
              {chat && (
                <>
                  <header className="chat-header">
                    <img src={chat.avatar} alt="" />
                    <div>
                      <h2>{chat.name}</h2>
                      <span>Demo conversation</span>
                    </div>
                  </header>
                  <div className="chat-messages" aria-live="polite">
                    <button
                      className="button small chat-offer-button"
                      onClick={() => startOffer(chat)}
                    >
                      Make {chat.name} an offer <Send size={15} />
                    </button>
                    <p className="demo-caption">
                      A connection begins with a conversation.
                    </p>
                    {(messages[chat.id] || []).map((m, i) => (
                      <div className={`message ${m.sender}`} key={i}>
                        {m.text}
                      </div>
                    ))}
                  </div>
                  <form
                    className="chat-form"
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (!input.trim()) return;
                      setMessages((prev) => ({
                        ...prev,
                        [chat.id]: [
                          ...(prev[chat.id] || []),
                          { sender: "me", text: input.trim() },
                          {
                            sender: "them",
                            text: "Thanks for reaching out. What brought you to Bluddy?",
                          },
                        ],
                      }));
                      setInput("");
                    }}
                  >
                    <input
                      aria-label="Message"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Say hello…"
                    />
                    <button
                      className="icon-button like"
                      type="submit"
                      aria-label="Send message"
                      disabled={!input.trim()}
                    >
                      <Send size={18} />
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        )}
      </main>
      <p className="demo-disclaimer">
        Bluddy is a fictional concept. Not a clinical service.
      </p>
    </div>
  );
}
