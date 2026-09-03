import React, { useState, useRef } from "react";
import {
  Heart,
  Droplet,
  ShieldCheck,
  MapPin,
  AlertCircle,
  MessageCircle,
  User,
  Info,
  RotateCcw,
  X,
  Sparkles,
  Send,
  PhoneCall,
  Calendar,
  Filter,
  CheckCircle2,
  Activity,
  Smartphone,
  Award,
  ArrowRight,
  Clock,
  Coffee,
  Bell,
  Sun,
  BookOpen,
  Dna,
  Zap,
  TrendingDown,
  Eye,
  ArrowUpRight,
  Check,
  ChevronLeft
} from "lucide-react";

// Blood compatibility matrix: Can recipient [key] receive from donor [val]?
const COMPATIBILITY_RULES = {
  "O-": ["O-"],
  "O+": ["O-", "O+"],
  "A-": ["O-", "A-"],
  "A+": ["O-", "O+", "A-", "A+"],
  "B-": ["O-", "B-"],
  "B+": ["O-", "O+", "B-", "B+"],
  "AB-": ["O-", "A-", "B-", "AB-"],
  "AB+": ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"],
};

// Available young pale "Biological Conduits" (The Blood Boys)
const CONDUIT_PROFILES = [
  {
    id: 1,
    name: "Julian 'The Conduit' Finch",
    age: 20,
    bloodType: "O-",
    role: "Tier-1 Certified Blood Boy",
    universalDonor: true,
    distanceKm: 1.2,
    location: "Mayfair Private Recovery Suite 4",
    cqcRegistered: true,
    donationsCount: 16,
    pallorIndex: "98% Alabaster (Naturally Pale)",
    lastDonated: "450ml drawn yesterday (Resting nicely)",
    bio: "Architecture undergraduate, strictly zero seed oils, avoids direct ultraviolet rays since 2022. Slightly cold to the touch, translucent veins, and soft-spoken. Loves warm cable-knit cardigans, chamomile broth, and long, quiet infusion hugs with senior managing partners.",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&auto=format&fit=crop&q=80",
    tags: ["Translucent Skin", "Universal O-", "Zero Seed Oils", "Compliant Hugger", "Bespoke Tubing"]
  },
  {
    id: 2,
    name: "Tristan 'Alabaster' Vance",
    age: 21,
    bloodType: "A+",
    role: "Dedicated Plasma Youth",
    universalDonor: false,
    distanceKm: 2.5,
    location: "Cotswolds Sunroom Annex",
    cqcRegistered: true,
    donationsCount: 9,
    pallorIndex: "94% Porcelain",
    lastDonated: "Fully replenished & fasted",
    bio: "Ex-rowing coxswain who now lives entirely on stone-ground oat water and liquid iron drops. Highly cooperative disposition with verified low cortisol. Will happily sit by your chesterfield armchair for 90 minutes while gravity feeds his vibrant young cells into your bloodstream.",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&auto=format&fit=crop&q=80",
    tags: ["A+ Compatible", "Quiet Demeanour", "Warm Hand-Holder", "Zero Microplastics"]
  },
  {
    id: 3,
    name: "Sebastian Lin",
    age: 19,
    bloodType: "O-",
    role: "Junior Epigenetic Conduit",
    universalDonor: true,
    distanceKm: 3.8,
    location: "Kensington Regenerative Clinic",
    cqcRegistered: true,
    donationsCount: 22,
    pallorIndex: "99% Victorian Ghost",
    lastDonated: "300ml ready on tap",
    bio: "Reads classical French sonnets aloud during cannulation. Pristine albumin profile, zero alcohol, resting heart rate of 48 bpm. Slight cyanotic hue around the lips gives him that authentic high-turnover parabiosis glow.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=80",
    tags: ["Universal O-", "French Poetry", "Cold Fingertips", "High Platelet Yield"]
  },
  {
    id: 4,
    name: "Aiden 'The Dewdrop' Cross",
    age: 22,
    bloodType: "A+",
    role: "Senior Companion Conduit",
    universalDonor: false,
    distanceKm: 4.6,
    location: "Belgravia Walled Garden Suites",
    cqcRegistered: true,
    donationsCount: 14,
    pallorIndex: "92% Ethereal Ivory",
    lastDonated: "2 days ago (Ready for rotation)",
    bio: "Dedicated biological associate to FTSE-100 alumni. Enjoys listening to your stories about deregulation in 1986 while gently draining into your peripheral line. Certified hypoallergenic and pre-scented with organic lavender.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80",
    tags: ["FTSE-100 Cleared", "Silent Footsteps", "Lavender Sanitized", "A+ Peak Synergy"]
  }
];

export default function App() {
  // Navigation: 'landing' (full normal website) vs 'app' (mobile demo simulator)
  const [viewState, setViewState] = useState("landing");
  const [currentTab, setCurrentTab] = useState("discover"); // 'discover', 'parlor', 'matrix', 'patronFile'
  const [deviceFrame, setDeviceFrame] = useState(true);

  // DEMO USER ACCOUNT: Old Billionaire Patron
  const [patronUser] = useState({
    name: "Lord Rupert Vance-Montgomery, Bt.",
    chronologicalAge: 74,
    epigeneticAge: 38.4,
    bloodType: "A+",
    netWorth: "£480,000,000",
    role: "Executive Longevity Optimizer & Patron",
    suite: "The Royal Oak Pavilion, Mayfair",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&auto=format&fit=crop&q=80",
    infusionSchedule: "Bi-Weekly (Next due: Today, 3:30 PM)",
    preferredDripRate: "20 ml / minute with Earl Grey tea"
  });

  // Card deck state
  const [profiles, setProfiles] = useState(CONDUIT_PROFILES);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [history, setHistory] = useState([]);
  const [matches, setMatches] = useState([
    {
      id: 101,
      name: "Julian 'The Conduit' Finch",
      bloodType: "O-",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&auto=format&fit=crop&q=80",
      location: "Mayfair Private Recovery Suite 4",
      matchedAt: "12 mins ago",
      lastMsg: "Matron has applied the warm compress. My veins are plumped and ready for your 3:30 PM intake sitting, my Lord.",
      phone: "+44 20 7946 0881"
    }
  ]);

  // Modal dialog states
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [matchModalData, setMatchModalData] = useState(null);
  const [activeChat, setActiveChat] = useState(null);
  const [chatMessages, setChatMessages] = useState([
    { sender: "them", text: "Good afternoon, Lord Rupert. I have fasted on pure mineral spring water for 18 hours as requested." },
    { sender: "me", text: "Splendid, my boy. Matron has the vintage bone china tea set warmed. Prepare the butterfly needles." }
  ]);
  const [inputText, setInputText] = useState("");
  const [filterCompatibleOnly, setFilterCompatibleOnly] = useState(true);

  // Drag interaction state
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const cardRef = useRef(null);
  const dragStartRef = useRef({ x: 0, y: 0 });

  const currentCandidate = profiles[currentIndex];

  const isCompatibleWithPatron = (conduitBloodType) => {
    const allowed = COMPATIBILITY_RULES[patronUser.bloodType] || [];
    return allowed.includes(conduitBloodType);
  };

  const handleDragStart = (e) => {
    setIsDragging(true);
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    dragStartRef.current = { x: clientX, y: clientY };
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const deltaX = clientX - dragStartRef.current.x;
    const deltaY = clientY - dragStartRef.current.y;
    setDragOffset({ x: deltaX, y: deltaY });
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const threshold = 100;
    if (dragOffset.x > threshold) {
      triggerSwipe("right");
    } else if (dragOffset.x < -threshold) {
      triggerSwipe("left");
    } else {
      setDragOffset({ x: 0, y: 0 });
    }
  };

  const triggerSwipe = (direction) => {
    if (!currentCandidate) return;

    if (direction === "right") {
      const compatible = isCompatibleWithPatron(currentCandidate.bloodType);
      const newMatch = {
        id: Date.now(),
        name: currentCandidate.name,
        bloodType: currentCandidate.bloodType,
        avatar: currentCandidate.avatar,
        location: currentCandidate.location,
        matchedAt: "Just now",
        lastMsg: "Tether agreement executed! IV connection bay reserved.",
        phone: "+44 20 7946 0999"
      };

      setMatches((prev) => [newMatch, ...prev]);
      setMatchModalData({
        profile: currentCandidate,
        compatible: compatible
      });
    }

    setHistory((prev) => [...prev, { index: currentIndex, direction }]);
    setCurrentIndex((prev) => prev + 1);
    setDragOffset({ x: 0, y: 0 });
  };

  const undoSwipe = () => {
    if (history.length === 0) return;
    const lastAction = history[history.length - 1];
    setHistory((prev) => prev.slice(0, -1));
    setCurrentIndex(lastAction.index);
    setDragOffset({ x: 0, y: 0 });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    const msg = { sender: "me", text: inputText.trim() };
    setChatMessages((prev) => [...prev, msg]);
    setInputText("");

    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: "them",
          text: "Understood, Lord Rupert. My blood-sugar is stable and the medical team has calibrated the 16-gauge line. Looking forward to our cuddle."
        }
      ]);
    }, 1100);
  };

  // =========================================================================
  // VIEW 1: NORMAL FULL-WIDTH LUXURY MARKETING WEBSITE
  // =========================================================================
  if (viewState === "landing") {
    return (
      <div className="min-h-screen w-full bg-[#fdfbf7] text-stone-900 font-serif selection:bg-rose-200">
        {/* Top Announcement Bar */}
        <div className="bg-emerald-900 text-amber-100 px-4 py-2 text-center text-xs font-sans tracking-wide flex items-center justify-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Care Quality Commission (CQC) Rated <strong>Outstanding</strong> in Intergenerational Cellular Rejuvenation</span>
          <span className="hidden md:inline">• London & The Cotswolds Estates</span>
        </div>

        {/* Global Website Header / Navigation */}
        <header className="sticky top-0 z-30 bg-[#fdfbf7]/95 backdrop-blur-md border-b border-stone-200">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-700 via-red-600 to-amber-600 text-white flex items-center justify-center shadow-md shadow-rose-900/10">
                <Droplet className="fill-white text-white" size={22} />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-2xl font-bold tracking-tight text-stone-900 font-serif">
                    Bluddy
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 bg-rose-100 text-rose-800 border border-rose-200 rounded font-sans">
                    PaaS™
                  </span>
                </div>
                <p className="text-[10px] text-stone-500 font-sans tracking-widest uppercase -mt-0.5">
                  Parabiosis-as-a-Service
                </p>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-8 text-xs font-sans font-semibold text-stone-600">
              <a href="#about" className="hover:text-emerald-900 transition">Our Philosophy</a>
              <a href="#photoshoot" className="hover:text-emerald-900 transition">2026 Photoshoot</a>
              <a href="#standards" className="hover:text-emerald-900 transition">Conduit Standards</a>
              <a href="#patron" className="hover:text-emerald-900 transition">Patron Tier</a>
            </nav>

            {/* CTA Button to Launch Demo */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setViewState("app")}
                className="px-5 py-2.5 bg-emerald-900 hover:bg-emerald-950 text-amber-50 rounded-xl text-xs font-sans font-bold shadow-md shadow-emerald-950/20 flex items-center gap-2 transition transform active:scale-95"
              >
                <Smartphone size={15} />
                <span>Launch Mobile App Demo</span>
              </button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section id="about" className="max-w-7xl mx-auto px-6 pt-16 pb-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-900 text-xs font-sans font-semibold">
              <Heart size={13} className="text-rose-600 fill-rose-600" />
              <span>The Premier Intergenerational Cellular Exchange</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-stone-950 leading-[1.15]">
              Why simply grow old, when fresh, pale youth is only a swipe away?
            </h1>

            <p className="text-base sm:text-lg text-stone-600 font-serif leading-relaxed max-w-2xl">
              Welcome to <strong className="text-stone-900 font-semibold">Bluddy PaaS™</strong>. We thoughtfully introduce distinguished high-net-worth patrons to wholesome, seed-oil-free young conduits. Savor warm Earl Grey tea, quiet fireside conversation, and the dignified restorative benefits of therapeutic whole-body parabiosis.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 font-sans">
              <button
                onClick={() => setViewState("app")}
                className="px-8 py-4 bg-gradient-to-r from-emerald-800 to-emerald-950 hover:opacity-95 text-white rounded-2xl text-sm font-bold shadow-xl shadow-emerald-950/25 flex items-center justify-center gap-3 transition transform active:scale-95 group"
              >
                <span>Enter as Lord Rupert (Age 74)</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition text-amber-200" />
              </button>

              <div className="flex items-center gap-2 px-4 py-3 bg-stone-100/80 border border-stone-200 rounded-2xl text-xs text-stone-600">
                <ShieldCheck size={16} className="text-emerald-700 shrink-0" />
                <span>Zero seed oils • 100% CQC registered suites</span>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-stone-200">
              <div>
                <span className="block text-2xl sm:text-3xl font-bold font-serif text-emerald-900">−1.8 yrs</span>
                <span className="text-xs font-sans text-stone-500">Biological age per cycle</span>
              </div>
              <div>
                <span className="block text-2xl sm:text-3xl font-bold font-serif text-emerald-900">98.4%</span>
                <span className="text-xs font-sans text-stone-500">Average conduit pallor rating</span>
              </div>
              <div>
                <span className="block text-2xl sm:text-3xl font-bold font-serif text-emerald-900">£480M</span>
                <span className="text-xs font-sans text-stone-500">Average patron liquidity</span>
              </div>
            </div>
          </div>

          {/* Hero Featured Card / Stock Teaser */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border-4 border-white shadow-2xl bg-white">
              <div className="relative h-96 w-full overflow-hidden bg-stone-200">
                <img
                  src="/fireside-embrace.jpg"
                  alt="Patron Rupert with conduit Julian during a supervised transfusion sitting"
                  className="w-full h-full object-cover object-[center_20%]"
                />
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md border border-stone-300 rounded-xl px-3 py-1.5 flex items-center gap-2 shadow-md">
                  <div className="w-2 h-2 rounded-full bg-rose-600 animate-ping"></div>
                  <Droplet size={13} className="text-rose-600 fill-rose-600" />
                  <span className="text-xs font-sans font-bold text-stone-800">450ml Youth Plasma: Active Flow</span>
                </div>
                <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-[10px] px-2.5 py-1 rounded font-mono">
                  © BLUDDY_STOCK_0049.JPG [ROYALTY FREE]
                </div>
              </div>

              <div className="p-6 bg-[#fcfaf7] border-t border-stone-200">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-serif font-bold text-lg text-stone-900">
                    "The Fireside Transfusion Embrace"
                  </h3>
                  <span className="text-xs font-sans font-bold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded">
                    Universal O- Match
                  </span>
                </div>
                <p className="text-stone-600 text-xs font-serif italic leading-relaxed">
                  Managing Partner Rupert (74, glowing) softly hugging verified conduit Julian (20, slightly pale/blue, resting heart rate 48 bpm) while connected via surgical PTFE catheter.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stock Photoshoot Gallery Section */}
        <section id="photoshoot" className="w-full bg-[#f6f2ea] border-y border-stone-200 py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
              <div>
                <span className="text-xs uppercase font-sans font-extrabold tracking-widest text-emerald-800 flex items-center gap-1.5">
                  <Eye size={14} className="text-emerald-800" />
                  Official 2026 Promotional Campaign
                </span>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-950 mt-1">
                  The Warmth of Youthful Conduits
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-stone-600 font-serif max-w-md italic">
                Captured on location at the Mayfair Longevity Pavilion and Cotswold Country Annex under direct phlebotomy supervision.
              </p>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Photo 1 */}
              <div className="bg-white rounded-3xl overflow-hidden border border-stone-300/80 shadow-md hover:shadow-xl transition group">
                <div className="relative h-64 overflow-hidden bg-stone-100">
                  <img
                    src="/fireside-embrace.jpg"
                    alt="Patron and conduit sharing a warm transfusion sitting"
                    className="w-full h-full object-cover object-[center_25%] group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute bottom-2 right-2 bg-black/60 text-white text-[9px] px-2 py-0.5 rounded font-mono">
                    STOCK #0049
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-serif font-bold text-stone-900 text-base">Fireside Venipuncture</h3>
                  <p className="text-xs text-stone-600 mt-1 font-serif italic">
                    "Julian reads French poetry softly while our peripheral lines equalize. Dignified, warm, and zero seed oils."
                  </p>
                </div>
              </div>

              {/* Photo 2 */}
              <div className="bg-white rounded-3xl overflow-hidden border border-stone-300/80 shadow-md hover:shadow-xl transition group">
                <div className="relative h-64 overflow-hidden bg-stone-100">
                  <img
                    src="https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=800&auto=format&fit=crop&q=80"
                    alt="Elderly gentleman having afternoon tea"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-amber-100 text-amber-900 text-[10px] font-sans font-bold px-2 py-1 rounded-lg border border-amber-300 flex items-center gap-1">
                    <Coffee size={12} /> Tea & Scones Served
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/60 text-white text-[9px] px-2 py-0.5 rounded font-mono">
                    STOCK #0078
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-serif font-bold text-stone-900 text-base">The Veranda Croquet Sitting</h3>
                  <p className="text-xs text-stone-600 mt-1 font-serif italic">
                    "He feels like the grandson I never had, and my osteoarthritis has cleared up completely!"
                  </p>
                </div>
              </div>

              {/* Photo 3 */}
              <div className="bg-white rounded-3xl overflow-hidden border border-stone-300/80 shadow-md hover:shadow-xl transition group md:col-span-2 lg:col-span-1">
                <div className="relative h-64 overflow-hidden bg-stone-100">
                  <img
                    src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&auto=format&fit=crop&q=80"
                    alt="Pale conduit portrait"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500 filter contrast-95"
                  />
                  <div className="absolute top-3 left-3 bg-rose-950/80 text-white text-[10px] font-sans font-bold px-2 py-1 rounded-lg border border-rose-500/30">
                    98% Alabaster Pallor
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/60 text-white text-[9px] px-2 py-0.5 rounded font-mono">
                    CONDUIT #0112
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-serif font-bold text-stone-900 text-base">Julian (Age 20)</h3>
                  <p className="text-xs text-stone-600 mt-1 font-serif italic">
                    Universal O- Negative donor. Sleeps in hyperbaric chambers, drinks zero coffee, and possesses immaculate albumin scores.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pillars / Standards Section */}
        <section id="standards" className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs uppercase font-sans font-bold text-emerald-800 tracking-widest">
              The Dignity in Rejuvenation Charter
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-950 mt-1">
              Rigorous Standards for Both Patron & Youth
            </h2>
            <p className="text-sm text-stone-600 mt-2 font-serif">
              Every prospective pairing is overseen by certified phlebotomy matrons and clinical hematologists.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 font-sans">
            <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <Dna size={22} />
              </div>
              <h3 className="text-base font-bold text-stone-900 font-serif">Algorithmic Antigen Pairing</h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                We cross-reference ABO, Rh factor, and HLA antibody profiles in real time. Your recipient line will only pull from 100% compliant donors.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
                <Coffee size={22} />
              </div>
              <h3 className="text-base font-bold text-stone-900 font-serif">Luxury Parlor Protocol</h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                Cannulation takes place in private suites with heated lavender blankets, classical harp music, and warm English tea with lemon shortbread.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-800 flex items-center justify-center">
                <ShieldCheck size={22} />
              </div>
              <h3 className="text-base font-bold text-stone-900 font-serif">Fair Exchange & Honorarium</h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                Conduits receive 20 minutes of reassuring post-draw companionship, iron replenishment broths, and generous educational bursaries.
              </p>
            </div>
          </div>
        </section>

        {/* Demo App Launch Callout */}
        <section id="patron" className="max-w-7xl mx-auto px-6 pb-20">
          <div className="bg-gradient-to-r from-emerald-900 via-stone-900 to-emerald-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 text-center lg:text-left">
              <span className="px-3 py-1 rounded-full text-xs font-sans font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                Interactive Demonstration
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-amber-50">
                Test the Bluddy Matching Engine
              </h2>
              <p className="text-xs sm:text-sm text-stone-300 max-w-xl font-serif">
                Experience the app from the perspective of our premier patron, <strong>Lord Rupert Vance-Montgomery, Bt. (Age 74)</strong>. Swipe through vetted pale conduits, review medical dossiers, and schedule an afternoon infusion session.
              </p>
            </div>

            <button
              onClick={() => setViewState("app")}
              className="px-8 py-4 bg-amber-400 hover:bg-amber-300 text-stone-950 rounded-2xl font-sans font-extrabold text-sm shadow-xl shadow-amber-400/20 flex items-center gap-2.5 transition transform active:scale-95 shrink-0"
            >
              <Smartphone size={18} />
              <span>Launch Lord Rupert's Console</span>
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-stone-200 bg-[#f7f3ea] py-10 font-sans text-xs text-stone-500">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Droplet size={16} className="text-rose-700 fill-rose-700" />
              <span className="font-bold text-stone-800">Bluddy PaaS™ (Parabiosis-as-a-Service)</span>
            </div>
            <p className="text-center md:text-right">
              Regulated under the Cotswold Intergenerational Rejuvenation Accord. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    );
  }

  // =========================================================================
  // VIEW 2: THE TINDER-STYLE DEMO APPLICATION (Logged in as Lord Rupert)
  // =========================================================================
  return (
    <div className="min-h-screen bg-[#f1ede6] text-stone-900 flex flex-col items-center justify-center p-0 md:p-6 font-serif">
      {/* Top Demo Toolbar: Return to Website */}
      <aside aria-label="Demo Bar" className="w-full max-w-md mb-3 px-4 py-2 bg-white/95 border border-stone-300 rounded-full text-xs text-stone-600 shadow-sm font-sans flex items-center justify-between">
        <button
          onClick={() => setViewState("landing")}
          className="flex items-center gap-1 text-emerald-900 hover:text-emerald-700 font-bold"
        >
          <ChevronLeft size={16} />
          <span>Back to Main Website</span>
        </button>

        <span className="text-[11px] uppercase tracking-wider font-extrabold text-stone-500">
          Lord Rupert (Age 74)
        </span>
      </aside>

      {/* Phone Chassis */}
      <main
        className={`w-full bg-[#faf8f5] border-stone-300 flex flex-col relative overflow-hidden transition-all duration-300 shadow-2xl ${
          deviceFrame
            ? "max-w-md h-[890px] md:rounded-[44px] md:border-[8px] md:border-stone-300/90 shadow-stone-400/40"
            : "max-w-xl min-h-screen rounded-none border-0"
        }`}
      >
        {/* Status Header */}
        <header className="pt-3.5 px-5 pb-2.5 flex items-center justify-between border-b border-stone-200 bg-[#fbf9f5]/95 backdrop-blur-sm sticky top-0 z-40 font-sans">
          <div
            onClick={() => setViewState("landing")}
            className="flex items-center gap-2 cursor-pointer group"
            title="Return to Marketing Website"
          >
            <div className="w-8 h-8 rounded-full bg-emerald-800 text-amber-100 flex items-center justify-center shadow-sm group-hover:scale-105 transition">
              <Droplet className="text-white fill-white" size={15} />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="font-bold text-sm tracking-tight text-stone-900 font-serif">
                  Bluddy PaaS™
                </h1>
                <span className="text-[8px] font-bold px-1.5 py-0.2 bg-emerald-100 text-emerald-900 border border-emerald-200 rounded">
                  VIP PATRON
                </span>
              </div>
              <p className="text-[9px] text-stone-500 -mt-0.5">Lord Rupert's Console</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewState("landing")}
              className="text-stone-500 hover:text-stone-900 p-1 rounded-full transition"
              title="Return to Website"
            >
              <BookOpen size={16} />
            </button>
            <div className="flex items-center gap-2 bg-white border border-stone-300 px-2.5 py-1 rounded-full shadow-sm">
              <img
                src={patronUser.avatar}
                alt="Lord Rupert"
                className="w-5 h-5 rounded-full object-cover border border-emerald-800"
              />
              <div className="flex items-center gap-1">
                <span className="text-[9px] font-bold text-stone-400">TYPE</span>
                <span className="text-xs font-bold text-rose-800 font-serif">{patronUser.bloodType}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Transfusion Alert Banner */}
        <div className="bg-amber-100/90 border-b border-amber-200 px-4 py-1.5 flex items-center justify-between text-amber-900 text-xs font-sans">
          <div className="flex items-center gap-1.5 truncate">
            <Clock size={12} className="text-amber-700 animate-spin" />
            <span className="font-semibold text-[11px] truncate">
              Afternoon Infusion: 3:30 PM in Mayfair Salon. 2 Conduits standing by.
            </span>
          </div>
          <span className="text-[10px] bg-amber-200 text-amber-900 font-bold px-1.5 rounded">
            Drip Ready
          </span>
        </div>

        {/* Viewport Content */}
        <div className="flex-1 overflow-y-auto relative flex flex-col font-sans">
          {/* TAB 1: SWIPER (DISCOVER CONDUITS) */}
          {currentTab === "discover" && (
            <div className="flex-1 flex flex-col p-4 relative justify-between select-none overflow-hidden">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-1 text-xs text-stone-600">
                  <MapPin size={12} className="text-emerald-700" />
                  <span className="font-medium truncate max-w-[190px]">Radius: Mayfair & St. James's</span>
                </div>

                <button
                  onClick={() => setFilterCompatibleOnly(!filterCompatibleOnly)}
                  className={`flex items-center gap-1 text-[10px] px-2.5 py-1 rounded-full font-medium transition ${
                    filterCompatibleOnly
                      ? "bg-emerald-100 text-emerald-900 border border-emerald-300"
                      : "bg-stone-200 text-stone-600 border border-stone-300"
                  }`}
                >
                  <Filter size={10} />
                  {filterCompatibleOnly ? "100% Compatible with A+" : "All Conduits"}
                </button>
              </div>

              {/* Swipe Deck Container */}
              <div className="relative flex-1 w-full my-1 flex items-center justify-center min-h-[460px]">
                {currentCandidate ? (
                  <div
                    ref={cardRef}
                    onMouseDown={handleDragStart}
                    onMouseMove={handleDragMove}
                    onMouseUp={handleDragEnd}
                    onMouseLeave={handleDragEnd}
                    onTouchStart={handleDragStart}
                    onTouchMove={handleDragMove}
                    onTouchEnd={handleDragEnd}
                    style={{
                      transform: `translate3d(${dragOffset.x}px, ${dragOffset.y * 0.4}px, 0) rotate(${
                        dragOffset.x * 0.05
                      }deg)`,
                      transition: isDragging ? "none" : "transform 0.35s ease, opacity 0.25s ease",
                      cursor: isDragging ? "grabbing" : "grab"
                    }}
                    className="absolute inset-0 rounded-[30px] overflow-hidden bg-white border-2 border-stone-300 shadow-xl flex flex-col touch-none select-none"
                  >
                    {/* Conduit Photo Frame */}
                    <div className="relative w-full h-[58%] overflow-hidden bg-stone-200">
                      <img
                        src={currentCandidate.avatar}
                        alt={currentCandidate.name}
                        className="w-full h-full object-cover pointer-events-none filter contrast-95 brightness-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent"></div>

                      {/* SWIPE STAMP BADGES */}
                      {dragOffset.x > 40 && (
                        <div
                          style={{ opacity: Math.min(1, (dragOffset.x - 30) / 70) }}
                          className="absolute top-5 left-5 border-4 border-emerald-600 text-emerald-800 font-serif font-bold px-3 py-1 rounded-xl uppercase tracking-wider text-sm rotate-[-12deg] shadow-lg backdrop-blur-md bg-white/95"
                        >
                          TETHER ASSET ♥
                        </div>
                      )}
                      {dragOffset.x < -40 && (
                        <div
                          style={{ opacity: Math.min(1, (-dragOffset.x - 30) / 70) }}
                          className="absolute top-5 right-5 border-4 border-rose-500 text-rose-700 font-serif font-bold px-3 py-1 rounded-xl uppercase tracking-wider text-sm rotate-[12deg] shadow-lg backdrop-blur-md bg-white/95"
                        >
                          DISCHARGE
                        </div>
                      )}

                      {/* Blood Group Plaque */}
                      <div className="absolute top-3.5 right-3.5 bg-white/95 backdrop-blur-md border border-stone-300 px-3 py-1.5 rounded-2xl flex flex-col items-center shadow-md">
                        <span className="text-[8px] font-bold text-stone-500 tracking-wider">GROUP</span>
                        <span className="text-xl font-bold font-serif text-rose-800 leading-tight">
                          {currentCandidate.bloodType}
                        </span>
                        {currentCandidate.universalDonor && (
                          <span className="text-[7px] bg-emerald-800 text-white font-bold px-1.5 py-0.2 rounded-full mt-0.5">
                            UNIVERSAL
                          </span>
                        )}
                      </div>

                      {/* Pallor & Location Ribbon */}
                      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur-md text-stone-900 px-2.5 py-0.5 rounded-full border border-stone-300 text-[11px]">
                          <Sparkles size={11} className="text-sky-600" />
                          <span className="font-semibold">{currentCandidate.pallorIndex}</span>
                        </div>
                        <div className="bg-emerald-900 text-amber-100 font-medium text-[10px] px-2.5 py-0.5 rounded-full shadow-sm">
                          {currentCandidate.donationsCount} Cycles Given
                        </div>
                      </div>
                    </div>

                    {/* Conduit Dossier Brief */}
                    <div className="p-4 flex-1 flex flex-col justify-between bg-[#fefdfb]">
                      <div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <h2 className="text-lg font-bold text-stone-900 font-serif">
                              {currentCandidate.name}
                            </h2>
                            {currentCandidate.cqcRegistered && (
                              <ShieldCheck size={16} className="text-emerald-700 fill-emerald-100" />
                            )}
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedProfile(currentCandidate);
                            }}
                            className="text-stone-400 hover:text-stone-800 p-1 rounded-full hover:bg-stone-100"
                            title="View Medical Dossier"
                          >
                            <Info size={18} />
                          </button>
                        </div>

                        <p className="text-[11px] text-stone-500 font-serif italic mt-0.5">
                          📍 Quarters: {currentCandidate.location}
                        </p>

                        {/* Medical Compatibility Box */}
                        <div
                          className={`mt-2 p-2 rounded-xl border flex items-center gap-2 text-xs ${
                            isCompatibleWithPatron(currentCandidate.bloodType)
                              ? "bg-emerald-50 border-emerald-300/80 text-emerald-900"
                              : "bg-amber-50 border-amber-300/80 text-amber-900"
                          }`}
                        >
                          <CheckCircle2 size={14} className="shrink-0 text-emerald-700" />
                          <div className="leading-tight">
                            <span className="font-semibold text-[11px]">
                              {isCompatibleWithPatron(currentCandidate.bloodType)
                                ? `100% Medically Approved for Lord Rupert (${patronUser.bloodType})`
                                : `Requires Antigen Balancing for Lord Rupert (${patronUser.bloodType})`}
                            </span>
                          </div>
                        </div>

                        {/* Conduit Tags */}
                        <div className="flex flex-wrap gap-1 mt-2">
                          {currentCandidate.tags.map((tag, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] font-medium bg-stone-100 text-stone-700 px-2 py-0.5 rounded-md border border-stone-200"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <p className="text-[11px] text-stone-600 line-clamp-2 mt-1.5 italic font-serif leading-relaxed">
                        "{currentCandidate.bio}"
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center p-7 bg-white border border-stone-300 rounded-3xl flex flex-col items-center shadow-sm">
                    <div className="w-14 h-14 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-700 mb-2">
                      <Droplet size={28} />
                    </div>
                    <h3 className="text-base font-bold text-stone-900 font-serif">
                      All Local Conduits Drained or Resting
                    </h3>
                    <p className="text-xs text-stone-500 mt-1 max-w-xs font-serif leading-normal">
                      All available young associates in Mayfair are currently on iron broth recovery.
                    </p>
                    <button
                      onClick={() => {
                        setProfiles(CONDUIT_PROFILES);
                        setCurrentIndex(0);
                        setHistory([]);
                      }}
                      className="mt-4 px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-semibold shadow-sm transition flex items-center gap-1.5"
                    >
                      <RotateCcw size={13} /> Refresh Conduit Radar
                    </button>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-center gap-3.5 py-1 mt-1">
                <button
                  onClick={undoSwipe}
                  disabled={history.length === 0}
                  className={`w-11 h-11 rounded-full border flex items-center justify-center transition shadow-sm ${
                    history.length > 0
                      ? "bg-white border-stone-300 text-amber-700 hover:bg-amber-50 hover:scale-105"
                      : "bg-stone-100 border-stone-200 text-stone-400 cursor-not-allowed"
                  }`}
                  title="Undo"
                >
                  <RotateCcw size={15} />
                </button>

                <button
                  onClick={() => triggerSwipe("left")}
                  disabled={!currentCandidate}
                  className="w-13 h-13 p-3 rounded-full bg-white border border-stone-300 text-stone-500 hover:bg-stone-100 hover:text-stone-800 hover:scale-105 active:scale-95 transition flex items-center justify-center shadow-md"
                  title="Discharge Candidate"
                >
                  <X size={22} strokeWidth={2} />
                </button>

                <button
                  onClick={() => triggerSwipe("right")}
                  disabled={!currentCandidate}
                  className="w-15 h-15 p-3.5 rounded-full bg-emerald-800 hover:bg-emerald-900 text-white hover:scale-105 active:scale-95 transition flex items-center justify-center shadow-lg shadow-emerald-900/20"
                  title="Tether Young Conduit"
                >
                  <Heart size={26} className="fill-white" />
                </button>

                <button
                  onClick={() => {
                    alert(
                      `Lord Rupert's emergency beacon activated: 2 on-call A+ conduits dispatched immediately to Mayfair Pavilion.`
                    );
                  }}
                  className="w-11 h-11 rounded-full bg-white border border-amber-300 text-amber-700 hover:bg-amber-50 hover:scale-105 active:scale-95 transition flex items-center justify-center shadow-sm"
                  title="Emergency Transfusion Call"
                >
                  <Bell size={16} />
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: SCHEDULED TETHERS & CHAT */}
          {currentTab === "parlor" && (
            <div className="flex-1 flex flex-col p-4">
              <div className="flex items-center justify-between mb-2.5">
                <div>
                  <h2 className="font-bold text-base text-stone-900 font-serif">Scheduled Infusions</h2>
                  <p className="text-[11px] text-stone-500">Active conduits tethered to your account</p>
                </div>
                <span className="text-xs bg-emerald-100 text-emerald-900 px-2.5 py-0.5 rounded-full font-semibold border border-emerald-200">
                  {matches.length} Assigned
                </span>
              </div>

              <div className="bg-white border border-stone-200 rounded-2xl p-3 mb-3.5 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center">
                    <Coffee size={15} />
                  </div>
                  <div>
                    <h3 className="font-bold text-xs text-stone-900 font-serif">Mayfair Rejuvenation Suite</h3>
                    <p className="text-[10px] text-stone-500">Dual leather recliners & silver tea service</p>
                  </div>
                </div>
                <button
                  onClick={() => alert("Concierge notified: Suite 4 warmed and prepped with Earl Grey tea.")}
                  className="px-2.5 py-1 bg-amber-800 hover:bg-amber-900 text-white text-[11px] font-medium rounded-lg transition"
                >
                  Prep Suite
                </button>
              </div>

              <div className="space-y-2 overflow-y-auto flex-1">
                {matches.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setActiveChat(item)}
                    className="p-3 bg-white hover:bg-stone-50 border border-stone-200 rounded-2xl flex items-center gap-3 cursor-pointer transition shadow-sm"
                  >
                    <div className="relative">
                      <img
                        src={item.avatar}
                        alt={item.name}
                        className="w-11 h-11 rounded-full object-cover border-2 border-emerald-700"
                      />
                      <span className="absolute -bottom-1 -right-1 bg-rose-700 text-white font-bold text-[8px] px-1.5 py-0.2 rounded-full border border-white">
                        {item.bloodType}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-xs text-stone-900 truncate font-serif">{item.name}</h4>
                        <span className="text-[10px] text-stone-400">{item.matchedAt}</span>
                      </div>
                      <p className="text-[11px] text-stone-600 truncate mt-0.5">{item.lastMsg}</p>
                      <span className="text-[10px] text-emerald-800 font-medium">📍 {item.location}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: TRANSFUSION MATRIX */}
          {currentTab === "matrix" && (
            <div className="flex-1 p-4 overflow-y-auto">
              <h2 className="font-bold text-base text-stone-900 font-serif">Antigen Tolerance Table</h2>
              <p className="text-xs text-stone-500 mb-3.5 leading-normal">
                Medical protocols governing Lord Rupert's quarterly cellular intake.
              </p>

              <div className="bg-white border border-stone-200 rounded-2xl p-4 mb-3.5 shadow-sm space-y-3">
                <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                  <span className="text-xs font-bold text-stone-800 font-serif">Lord Rupert's Blood Group:</span>
                  <span className="text-sm font-bold text-rose-800 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
                    Type {patronUser.bloodType}
                  </span>
                </div>

                <div>
                  <div className="flex items-center gap-1.5 mb-2">
                    <Droplet className="text-rose-700 fill-rose-100" size={15} />
                    <h3 className="font-bold text-xs text-stone-900 font-serif">
                      Approved Conduit Groups for Lord Rupert:
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {COMPATIBILITY_RULES[patronUser.bloodType].map((donorType) => (
                      <div
                        key={donorType}
                        className="px-2.5 py-1 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-900 font-bold text-xs flex items-center gap-1"
                      >
                        <span>Type {donorType}</span>
                        {donorType === "O-" && (
                          <span className="text-[8px] bg-emerald-800 text-white px-1 rounded font-normal">
                            Universal Gold
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-stone-100 border border-stone-200 rounded-2xl p-3 text-xs text-stone-600 space-y-1.5 font-serif">
                <h4 className="font-bold text-emerald-900 flex items-center gap-1">
                  <ShieldCheck size={14} /> The Billionaire Parabiosis Standard
                </h4>
                <p className="text-[11px] leading-relaxed">
                  • Conduits must be fasted for 12 hours prior to draw.
                </p>
                <p className="text-[11px] leading-relaxed">
                  • Post-infusion protocol requires 20 minutes of reassuring conversation and a £2,000 Harrods voucher presented to the conduit.
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: LORD RUPERT'S DOSSIER */}
          {currentTab === "patronFile" && (
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="flex flex-col items-center text-center p-4 bg-white border border-stone-200 rounded-3xl mb-3.5 shadow-sm">
                <div className="relative">
                  <img
                    src={patronUser.avatar}
                    alt={patronUser.name}
                    className="w-20 h-20 rounded-full object-cover border-2 border-emerald-800 shadow"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-rose-700 text-white font-bold text-[9px] px-2 py-0.5 rounded-full shadow">
                    {patronUser.bloodType}
                  </div>
                </div>
                <h3 className="font-bold text-base text-stone-900 font-serif mt-2">{patronUser.name}</h3>
                <p className="text-[11px] text-stone-500 font-serif">{patronUser.suite}</p>

                <div className="grid grid-cols-2 gap-2 w-full mt-3 text-left">
                  <div className="bg-stone-50 border border-stone-200 p-2 rounded-xl">
                    <span className="text-[9px] text-stone-400 uppercase font-bold block">Actual Age</span>
                    <span className="text-xs font-bold text-stone-800 font-serif">
                      {patronUser.chronologicalAge} Years Old
                    </span>
                  </div>
                  <div className="bg-emerald-50 border border-emerald-200 p-2 rounded-xl">
                    <span className="text-[9px] text-emerald-700 uppercase font-bold block">Epigenetic Age</span>
                    <span className="text-xs font-bold text-emerald-900 font-serif">
                      {patronUser.epigeneticAge} Years Old
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-stone-200 rounded-2xl p-3 mb-3 shadow-sm space-y-2 text-xs">
                <span className="font-bold text-stone-800 block font-serif">Executive Infusion Preferences</span>
                <div className="flex items-center justify-between text-[11px] text-stone-600 border-b border-stone-100 pb-1.5">
                  <span>Drip Delivery Rate</span>
                  <span className="font-semibold text-stone-900">{patronUser.preferredDripRate}</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-stone-600 border-b border-stone-100 pb-1.5">
                  <span>Next Due Sitting</span>
                  <span className="font-semibold text-emerald-800">{patronUser.infusionSchedule}</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-stone-600">
                  <span>Liquid Net Worth</span>
                  <span className="font-semibold text-stone-900">{patronUser.netWorth}</span>
                </div>
              </div>

              <button
                onClick={() => setViewState("landing")}
                className="w-full py-2.5 bg-white hover:bg-stone-50 text-stone-800 rounded-2xl text-xs font-medium border border-stone-300 flex items-center justify-center gap-1.5 shadow-sm"
              >
                <BookOpen size={14} /> Back to Marketing Website
              </button>
            </div>
          )}
        </div>

        {/* Bottom App Navigation */}
        <nav aria-label="Bottom Navigation" className="border-t border-stone-200 bg-[#fbf9f5]/95 backdrop-blur-md px-4 py-2 flex items-center justify-around z-30 font-sans">
          <button
            onClick={() => setCurrentTab("discover")}
            className={`flex flex-col items-center gap-0.5 transition ${
              currentTab === "discover" ? "text-emerald-900" : "text-stone-400 hover:text-stone-600"
            }`}
          >
            <Sun size={18} className={currentTab === "discover" ? "text-emerald-800" : ""} />
            <span className="text-[9px] font-bold">Conduits</span>
          </button>

          <button
            onClick={() => setCurrentTab("parlor")}
            className={`flex flex-col items-center gap-0.5 relative transition ${
              currentTab === "parlor" ? "text-emerald-900" : "text-stone-400 hover:text-stone-600"
            }`}
          >
            <MessageCircle size={18} />
            {matches.length > 0 && (
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-800 text-white font-bold text-[8px] rounded-full flex items-center justify-center">
                {matches.length}
              </span>
            )}
            <span className="text-[9px] font-bold">Tethers</span>
          </button>

          <button
            onClick={() => setCurrentTab("matrix")}
            className={`flex flex-col items-center gap-0.5 transition ${
              currentTab === "matrix" ? "text-emerald-900" : "text-stone-400 hover:text-stone-600"
            }`}
          >
            <Activity size={18} />
            <span className="text-[9px] font-bold">Tolerance</span>
          </button>

          <button
            onClick={() => setCurrentTab("patronFile")}
            className={`flex flex-col items-center gap-0.5 transition ${
              currentTab === "patronFile" ? "text-emerald-900" : "text-stone-400 hover:text-stone-600"
            }`}
          >
            <User size={18} />
            <span className="text-[9px] font-bold">Lord Rupert</span>
          </button>
        </nav>

        {/* MODAL: "CONDUIT TETHERED!" */}
        {matchModalData && (
          <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm z-50 flex flex-col items-center justify-center p-6 text-center animate-in fade-in zoom-in duration-300 font-sans">
            <div className="bg-[#fcfaf7] border-2 border-stone-300 rounded-3xl p-6 shadow-2xl max-w-xs w-full flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mb-2 shadow-inner">
                <Droplet size={28} className="text-rose-600 fill-rose-600" />
              </div>

              <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-800">
                Epigenetic Synergy Confirmed
              </span>
              <h2 className="text-xl font-bold font-serif text-stone-900 mt-1">
                Conduit Tethered!
              </h2>

              <p className="text-xs text-stone-600 mt-2 leading-relaxed font-serif">
                Lord Rupert, your infusion line has paired with{" "}
                <strong className="text-emerald-950">{matchModalData.profile.name}</strong> (
                {matchModalData.profile.bloodType}). Intravenous transfer prepped.
              </p>

              <div className="flex items-center gap-3 my-4">
                <div className="text-center">
                  <img
                    src={patronUser.avatar}
                    alt="Lord Rupert"
                    className="w-12 h-12 rounded-full object-cover border-2 border-emerald-700 shadow"
                  />
                  <span className="text-[10px] font-bold text-stone-700 mt-1 block font-serif">
                    Rupert (74)
                  </span>
                </div>

                <div className="flex flex-col items-center">
                  <span className="text-rose-600 text-xs font-black">━━ IV ━━</span>
                  <span className="text-[9px] text-stone-400">Flow</span>
                </div>

                <div className="text-center">
                  <img
                    src={matchModalData.profile.avatar}
                    alt={matchModalData.profile.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-emerald-700 shadow"
                  />
                  <span className="text-[10px] font-bold text-stone-700 mt-1 block font-serif">
                    {matchModalData.profile.name.split(" ")[0]} ({matchModalData.profile.bloodType})
                  </span>
                </div>
              </div>

              <div className="w-full space-y-2">
                <button
                  onClick={() => {
                    const target = matchModalData.profile;
                    setMatchModalData(null);
                    setActiveChat({
                      id: Date.now(),
                      name: target.name,
                      bloodType: target.bloodType,
                      avatar: target.avatar,
                      location: target.location,
                      matchedAt: "Just now",
                      phone: "+44 20 7946 0881"
                    });
                  }}
                  className="w-full py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow"
                >
                  <Coffee size={14} /> Open Transfusion Chat
                </button>

                <button
                  onClick={() => setMatchModalData(null)}
                  className="w-full py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium rounded-xl text-xs"
                >
                  Screen Next Pale Boy
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL: CONDUIT DOSSIER INSPECTION */}
        {selectedProfile && (
          <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm z-50 flex flex-col p-4 overflow-y-auto font-sans">
            <div className="bg-[#fdfcf9] border border-stone-300 rounded-3xl p-5 shadow-2xl my-auto">
              <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                <h3 className="font-bold text-stone-900 text-sm font-serif">
                  Biological Conduit Record
                </h3>
                <button
                  onClick={() => setSelectedProfile(null)}
                  className="p-1 rounded-full bg-stone-100 text-stone-500 hover:text-stone-900"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="my-3 text-center">
                <img
                  src={selectedProfile.avatar}
                  alt={selectedProfile.name}
                  className="w-20 h-20 rounded-full mx-auto object-cover border-2 border-emerald-800 shadow"
                />
                <h4 className="text-base font-bold text-stone-900 font-serif mt-2">
                  {selectedProfile.name}, {selectedProfile.age}
                </h4>
                <p className="text-[11px] text-stone-500 font-serif">{selectedProfile.location}</p>
                <div className="inline-block mt-1 px-2.5 py-0.5 bg-rose-50 border border-rose-300 rounded-full text-rose-800 font-bold text-[11px] font-serif">
                  Blood Group: {selectedProfile.bloodType}
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="bg-stone-50 border border-stone-200 p-3 rounded-2xl">
                  <span className="font-bold text-stone-500 uppercase text-[9px] block mb-1">
                    Regimen & Temperament
                  </span>
                  <p className="text-stone-700 leading-relaxed font-serif text-xs">
                    {selectedProfile.bio}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-stone-50 border border-stone-200 p-2.5 rounded-2xl">
                    <span className="text-[9px] uppercase text-stone-400 block font-bold">
                      Pallor Rating
                    </span>
                    <span className="text-sm font-bold text-emerald-800 font-serif">
                      {selectedProfile.pallorIndex}
                    </span>
                  </div>
                  <div className="bg-stone-50 border border-stone-200 p-2.5 rounded-2xl">
                    <span className="text-[9px] uppercase text-stone-400 block font-bold">
                      Vein Access
                    </span>
                    <span className="text-xs font-bold text-stone-700 font-serif">
                      Prime Cephalic Port
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedProfile(null);
                  triggerSwipe("right");
                }}
                className="mt-4 w-full py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow"
              >
                <Heart size={14} className="fill-white" /> Tether Conduit to Lord Rupert
              </button>
            </div>
          </div>
        )}

        {/* MODAL: CHAT WINDOW */}
        {activeChat && (
          <div className="absolute inset-0 bg-[#fdfbf7] z-50 flex flex-col font-sans">
            <div className="p-3 bg-white border-b border-stone-200 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveChat(null)}
                  className="p-1 text-stone-500 hover:text-stone-800"
                >
                  <X size={18} />
                </button>
                <div className="relative">
                  <img
                    src={activeChat.avatar}
                    alt={activeChat.name}
                    className="w-8 h-8 rounded-full object-cover border border-emerald-700"
                  />
                  <span className="absolute -bottom-1 -right-1 bg-rose-700 text-white font-bold text-[7px] px-1 rounded-full">
                    {activeChat.bloodType}
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-xs text-stone-900 leading-tight font-serif">
                    {activeChat.name}
                  </h4>
                  <p className="text-[9px] text-emerald-800 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span> Fasted & Hydrated
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => alert(`Calling Mayfair Concierge Suite for ${activeChat.name}`)}
                  className="p-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-full"
                >
                  <PhoneCall size={13} />
                </button>
                <button
                  onClick={() => alert(`Intake confirmed for 3:30 PM with ${activeChat.name}`)}
                  className="p-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 rounded-full"
                >
                  <Calendar size={13} />
                </button>
              </div>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#fcf9f2]">
              <div className="bg-amber-50 border border-amber-200 text-amber-900 text-[10px] p-2 rounded-xl text-center font-serif italic">
                ☕ Transfusion Protocol: Warm shortbread and electrolyte tea will be served throughout the draw.
              </div>

              {chatMessages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex ${m.sender === "me" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[78%] rounded-2xl px-3.5 py-2 text-xs leading-relaxed font-serif ${
                      m.sender === "me"
                        ? "bg-emerald-800 text-white rounded-br-none shadow-sm"
                        : "bg-white text-stone-800 rounded-bl-none border border-stone-200 shadow-sm"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-stone-200 flex items-center gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Instruct conduit on tea or catheter prep..."
                className="flex-1 bg-stone-50 border border-stone-300 rounded-full px-4 py-2 text-xs text-stone-800 focus:outline-none focus:border-emerald-700 font-serif"
              />
              <button
                type="submit"
                className="p-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-full transition shadow-sm"
              >
                <Send size={14} />
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}