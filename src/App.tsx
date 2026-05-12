import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Instagram, 
  Facebook, 
  Phone, 
  MapPin, 
  Clock, 
  ChevronRight, 
  ChevronLeft, 
  Quote,
  Star,
  MessageCircle,
  Menu,
  X
} from 'lucide-react';

// --- Constants & Data ---
const LOGO_URL = "https://i.postimg.cc/MGrRndZ6/646165324-122112991509239021-1681580634582348732-n-(1).jpg";

const IMAGES = [
  "https://i.postimg.cc/3JKMwBk2/672676338-122120739861239021-6565441072862154126-n.jpg",
  "https://i.postimg.cc/8P18CH7w/673124367-122121448605239021-8587249420695862851-n.jpg",
  "https://i.postimg.cc/SNy0Krnt/676385246-122121601101239021-3164305933488417636-n.jpg",
  "https://i.postimg.cc/ncH8LkXR/673124635-122121449871239021-8524183257542301451-n.jpg",
  "https://i.postimg.cc/zXJmfjyj/677448199-122121354411239021-5762078463505160529-n.jpg",
  "https://i.postimg.cc/Yq85LWFf/677734790-122121601125239021-5344000071633616732-n.jpg",
  "https://i.postimg.cc/sDVF2cMm/678174406-122121448563239021-2361696557528677794-n.jpg",
  "https://i.postimg.cc/tCDKnx6S/679375775-122121862953239021-609258827522179228-n.jpg",
  "https://i.postimg.cc/4NwDH9cW/681423439-122122394679239021-7420348084989757347-n.jpg",
  "https://i.postimg.cc/4NwDH9c8/684082957-122122394553239021-7594824162257982796-n.jpg",
  "https://i.postimg.cc/KvQ63MTp/690640732-122124063867239021-3629127605671015515-n.jpg"
];

const GALLERY_IMAGES = IMAGES.filter((_, i) => i !== 2);

const SOCIALS = {
  facebook: "https://www.facebook.com/Paczkarnia.Zgierz",
  instagram: "https://www.instagram.com/paczkarnia.zgierz?fbclid=IwY2xjawRvmppleHRuA2FlbQIxMABicmlkETFkdEVRRnlSQk55Q280MXpYc3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHuitlZR3A2WKvYe_1bdPvEQ5cQm7Zw4AAheimWm4BVtYZLJ9Kte_aFOrDmNk_aem_q04-hIVqZLRmZb6f_4_VUA",
  tiktok: "https://www.tiktok.com/@paczkarnia.zgierz?fbclid=IwY2xjawRvmqRleHRuA2FlbQIxMABicmlkETFkdEVRRnlSQk55Q280MXpYc3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHmRyABLSdvOWwJ3biPMYwIHDD_weNF29C-Z0mku5Nz3Cz2BnE15v5NHqp2Pj_aem_jI9Kb5tgYID1miu_WUN4tw"
};

const OPENING_HOURS = [
  { day: "Poniedziałek", hours: "ZAMKNIĘTE", closed: true },
  { day: "Wtorek", hours: "09:00 - 18:00" },
  { day: "Środa", hours: "09:00 - 18:00" },
  { day: "Czwartek", hours: "09:00 - 18:00" },
  { day: "Piątek", hours: "09:00 - 18:00" },
  { day: "Sobota", hours: "09:00 - 15:00" },
  { day: "Niedziela", hours: "ZAMKNIĘTE", closed: true },
];

const REVIEWS = [
  {
    name: "Anna Kowalska",
    text: "Najlepsze pączki jakie jadłam! Nadzienia jest naprawdę mnóstwo, a ciasto puszyste i świeże. Polecam każdemu!",
    rating: 5,
    date: "2 tygodnie temu"
  },
  {
    name: "Marek Nowak",
    text: "Tradycyjny smak, który przypomina pączki od babci. Widać, że robione z sercem i na prawdziwym smalcu.",
    rating: 5,
    date: "miesiąc temu"
  },
  {
    name: "Katarzyna Wiśniewska",
    text: "Obsługa bardzo miła, a pączki... po prostu poezja. Mój ulubiony to ten z różą!",
    rating: 5,
    date: "wczoraj"
  }
];

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" />
  </svg>
);

// --- Components ---

function SocialCTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-donut-dough/20 to-donut-crust/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white rounded-[40px] p-8 md:p-16 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center gap-12"
        >
          {/* Decorative floating donuts/shapes */}
          <motion.div 
            animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-10 -right-10 w-40 h-40 bg-donut-dough/20 rounded-full blur-3xl"
          />
          
          <div className="flex-1 text-center md:text-left z-10">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">Bądźmy w kontakcie! 🍩</h2>
            <p className="text-xl text-donut-dark/70 mb-10 leading-relaxed">
              Śledź nas na mediach społecznościowych, aby nie przegapić nowych smaków, promocji i kulinarnych inspiracji prosto z naszej pracowni.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <motion.a 
                whileHover={{ y: -5, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={SOCIALS.facebook} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-3 px-8 py-4 bg-[#1877F2] text-white rounded-2xl font-bold shadow-lg shadow-blue-500/20"
              >
                <Facebook size={24} />
                <span>Facebook</span>
              </motion.a>
              <motion.a 
                whileHover={{ y: -5, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={SOCIALS.instagram} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-3 px-8 py-4 bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white rounded-2xl font-bold shadow-lg shadow-pink-500/20"
              >
                <Instagram size={24} />
                <span>Instagram</span>
              </motion.a>
              <motion.a 
                whileHover={{ y: -5, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={SOCIALS.tiktok} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-3 px-8 py-4 bg-black text-white rounded-2xl font-bold shadow-lg shadow-black/20"
              >
                <TikTokIcon className="w-6 h-6" />
                <span>TikTok</span>
              </motion.a>
            </div>
          </div>

          <div className="flex-1 relative group">
             <motion.div
               animate={{ rotate: [0, 2, 0] }}
               transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
               className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-4 border-white"
             >
               <img src={IMAGES[5]} alt="Social look" className="w-full h-auto" />
             </motion.div>
             <div className="absolute -inset-4 bg-donut-dough/30 rounded-[40px] -z-0 blur-xl group-hover:scale-110 transition-transform"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.scrollY / totalScroll) * 100;
      setScrollProgress(currentProgress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-donut-warm/80 backdrop-blur-lg shadow-sm py-2' : 'bg-transparent py-4'}`}>
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 h-[3px] bg-donut-crust transition-all duration-100 ease-out" style={{ width: `${scrollProgress}%` }} />
      
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img src={LOGO_URL} alt="Logo" className="w-10 h-10 rounded-full border-2 border-donut-dough" />
          <span className="font-display font-bold text-xl tracking-tight text-donut-dark">Paczkarnia.Zgierz</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 font-medium">
          <a href="#o-nas" className="hover:text-donut-crust transition-colors">O nas</a>
          <a href="#galeria" className="hover:text-donut-crust transition-colors">Galeria</a>
          <a href="#opinie" className="hover:text-donut-crust transition-colors">Opinie</a>
          <a href="#kontakt" className="px-5 py-2 bg-donut-dark text-white rounded-full hover:bg-donut-crust transition-all">Znajdź nas</a>
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-donut-dark">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-donut-warm border-b border-donut-dough absolute top-full left-0 right-0 p-6 flex flex-col gap-4 shadow-xl"
          >
            <a href="#o-nas" onClick={() => setIsOpen(false)} className="text-xl font-medium">O nas</a>
            <a href="#galeria" onClick={() => setIsOpen(false)} className="text-xl font-medium">Galeria</a>
            <a href="#opinie" onClick={() => setIsOpen(false)} className="text-xl font-medium">Opinie</a>
            <a href="#kontakt" onClick={() => setIsOpen(false)} className="text-xl font-medium text-donut-crust">Kontakt</a>
            <div className="flex gap-4 pt-4">
              <a href={SOCIALS.facebook} target="_blank" rel="noreferrer"><Facebook /></a>
              <a href={SOCIALS.instagram} target="_blank" rel="noreferrer"><Instagram /></a>
              <a href={SOCIALS.tiktok} target="_blank" rel="noreferrer"><TikTokIcon className="w-6 h-6" /></a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src={IMAGES[0]} 
          alt="Tło" 
          className="w-full h-full object-cover opacity-20 scale-110 blur-sm"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-donut-warm/50 via-donut-warm to-donut-warm"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 z-10 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-1 rounded-full bg-donut-dough/30 text-donut-dark font-semibold text-sm mb-6 uppercase tracking-wider">
            Tradycyjna receptura
          </span>
          <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight mb-6">
            Pączki, które <span className="text-donut-crust italic">rozpływają się</span> w ustach
          </h1>
          <p className="text-xl text-donut-dark/80 mb-8 max-w-lg leading-relaxed">
            Masz ochotę na coś naprawdę dobrego? Przyjdź i poczuj smak prawdziwej tradycji opartej na czystej recepturze.
          </p>
          <div className="flex flex-wrap gap-4">
            <a 
              href="#kontakt" 
              className="px-8 py-4 bg-donut-dark text-white rounded-full font-bold text-lg hover:bg-donut-crust transition-all flex items-center gap-2 group shadow-lg shadow-donut-dark/20"
            >
              Sprawdź lokalizację
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <div className="flex items-center gap-4 px-4">
              <a href={SOCIALS.facebook} target="_blank" rel="noreferrer" className="p-3 bg-white rounded-full shadow-sm hover:text-donut-crust transition-colors"><Facebook size={20} /></a>
              <a href={SOCIALS.instagram} target="_blank" rel="noreferrer" className="p-3 bg-white rounded-full shadow-sm hover:text-donut-crust transition-colors"><Instagram size={20} /></a>
              <a href={SOCIALS.tiktok} target="_blank" rel="noreferrer" className="p-3 bg-white rounded-full shadow-sm hover:text-donut-crust transition-colors"><TikTokIcon className="w-5 h-5 text-current" /></a>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative"
        >
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="aspect-square rounded-full overflow-hidden border-[12px] border-white shadow-2xl relative"
          >
            <img 
              src={IMAGES[2]} 
              alt="Świeży pączek" 
              className="w-full h-full object-cover scale-110 hover:scale-100 transition-transform duration-1000"
            />
          </motion.div>
          {/* Decorative badges */}
          <motion.div 
            initial={{ rotate: -20, opacity: 0 }}
            whileInView={{ rotate: 12, opacity: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="absolute -top-4 -right-4 bg-donut-dough text-donut-dark px-6 py-4 rounded-2xl font-display font-bold text-lg shadow-xl border-4 border-white"
          >
            Prawdziwy Smalec
          </motion.div>
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="absolute -bottom-4 -left-4 bg-white p-6 rounded-2xl shadow-xl border border-donut-dough/20 max-w-[180px]"
          >
            <p className="text-sm font-bold leading-tight">Więcej nadzienia niż w markecie!</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Features() {
  const features = [
    {
      title: "Tradycyjny smalec",
      desc: "Używamy naturalnego i stabilnego tłuszczu, który gwarantuje doskonały smak.",
      icon: "✨"
    },
    {
      title: "Czysta receptura",
      desc: "Bez szkodliwych tłuszczów utwardzonych. Tylko to, co najlepsze.",
      icon: "🌿"
    },
    {
      title: "Bogate wnętrze",
      desc: "U nas nie znajdziesz pustych pączków. Nadzienia dajemy od serca!",
      icon: "🍓"
    }
  ];

  return (
    <section id="o-nas" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">Co nas wyróżnia?</h2>
          <div className="w-24 h-1 bg-donut-crust mx-auto rounded-full"></div>
        </div>
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.2 }
            }
          }}
          className="grid md:grid-cols-3 gap-8"
        >
          {features.map((f, i) => (
            <motion.div 
              key={i}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 }
              }}
              whileHover={{ y: -10, boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.15)" }}
              className="p-10 rounded-[2.5rem] bg-white/60 backdrop-blur-sm border border-white/50 transition-all group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <span className="text-8xl select-none">{f.icon}</span>
              </div>
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform origin-left">{f.icon}</div>
              <h3 className="font-display text-2xl font-bold mb-4">{f.title}</h3>
              <p className="text-donut-dark/70 leading-relaxed text-lg">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Gallery() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % GALLERY_IMAGES.length);
  const prev = () => setIndex((prev) => (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);

  return (
    <section id="galeria" className="py-24 bg-donut-warm/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">Nasze Wypieki</h2>
            <p className="text-lg text-donut-dark/70">Zobacz jak powstaje magia w Paczkarnia.Zgierz</p>
          </div>
          <div className="flex gap-4">
            <button onClick={prev} className="p-4 bg-white rounded-full shadow-md hover:bg-donut-dark hover:text-white transition-all">
              <ChevronLeft size={24} />
            </button>
            <button onClick={next} className="p-4 bg-white rounded-full shadow-md hover:bg-donut-dark hover:text-white transition-all">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        <div className="relative h-[500px] md:h-[600px] rounded-[40px] overflow-hidden shadow-2xl group">
          <AnimatePresence mode="wait">
            <motion.img
              key={index}
              src={GALLERY_IMAGES[index]}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="w-full h-full object-cover"
            />
          </AnimatePresence>
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-12">
             <span className="text-white font-display text-3xl font-bold italic">Sztuka pączkarstwa</span>
          </div>
        </div>

        {/* Thumbnail grid for mobile or quick selection */}
        <div className="mt-8 flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {GALLERY_IMAGES.map((img, i) => (
            <button 
              key={i} 
              onClick={() => setIndex(i)}
              className={`flex-shrink-0 w-24 h-24 rounded-2xl overflow-hidden border-4 transition-all ${index === i ? 'border-donut-crust scale-110 shadow-lg' : 'border-transparent opacity-50 hover:opacity-100'}`}
            >
              <img src={img} className="w-full h-full object-cover" alt={`Miniatura ${i}`} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section id="opinie" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => <Star key={i} className="fill-donut-dough text-donut-dough" size={24} />)}
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">Opinie naszych Gości</h2>
          <p className="text-lg text-donut-dark/70 max-w-2xl mx-auto">Tysiące zadowolonych klientów nie może się mylić. Dołącz do miłośników tradycyjnych pączków!</p>
        </div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15 }
            }
          }}
          className="grid md:grid-cols-3 gap-8"
        >
          {REVIEWS.map((rev, i) => (
            <motion.div 
              key={i}
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                visible: { opacity: 1, scale: 1 }
              }}
              whileHover={{ y: -5 }}
              className="bg-donut-warm/20 p-8 rounded-[32px] border border-donut-dough/10 relative shadow-sm hover:shadow-md transition-shadow"
            >
              <Quote className="absolute top-6 right-6 text-donut-dough/20" size={48} />
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-donut-dough/40 rounded-full flex items-center justify-center font-bold text-donut-dark uppercase">
                  {rev.name[0]}
                </div>
                <div>
                  <h4 className="font-bold">{rev.name}</h4>
                  <p className="text-xs text-donut-dark/50">{rev.date}</p>
                </div>
              </div>
              <p className="italic text-donut-dark/80 leading-relaxed mb-6">"{rev.text}"</p>
              <div className="flex gap-1">
                {[...Array(rev.rating)].map((_, j) => <Star key={j} size={14} className="fill-donut-dough text-donut-dough" />)}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-16 text-center">
          <a 
            href={SOCIALS.facebook} 
            target="_blank" 
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-donut-crust font-bold hover:underline"
          >
            Zobacz więcej na naszym Facebooku
            <ChevronRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}

function ContactInfo() {
  return (
    <section id="kontakt" className="py-24 bg-donut-dark text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-12">Zapraszamy do nas</h2>
            
            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="p-4 bg-white/10 rounded-2xl">
                  <MapPin size={24} className="text-donut-dough" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Adres</h4>
                  <p className="text-white/70">Konstantego Ildefonsa Gałczyńskiego 40</p>
                  <p className="text-white/70">95-100 Zgierz</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="p-4 bg-white/10 rounded-2xl">
                  <Phone size={24} className="text-donut-dough" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Telefon</h4>
                  <a href="tel:+48694537216" className="text-white/70 hover:text-white transition-colors">+48 694 537 216</a>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="p-4 bg-white/10 rounded-2xl">
                  <Clock size={24} className="text-donut-dough" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-lg mb-4">Godziny Otwarcia</h4>
                  <div className="grid grid-cols-2 gap-y-2 text-sm text-white/70">
                    {OPENING_HOURS.map((oh, i) => (
                      <div key={i} className="contents">
                        <span>{oh.day}</span>
                        <span className={oh.closed ? "text-red-400 font-medium" : "text-white"}>{oh.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-8 flex gap-6">
                 <motion.a 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={SOCIALS.facebook} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="flex items-center gap-2 px-6 py-3 bg-white/10 rounded-xl hover:bg-white/20 transition-all font-medium"
                 >
                    <Facebook size={18} />
                    <span>Facebook</span>
                 </motion.a>
                 <motion.a 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={SOCIALS.instagram} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="flex items-center gap-2 px-6 py-3 bg-white/10 rounded-xl hover:bg-white/20 transition-all font-medium"
                 >
                    <Instagram size={18} />
                    <span>Instagram</span>
                 </motion.a>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="h-[500px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 bg-white/5 flex items-center justify-center"
          >
            {/* Google Maps Iframe */}
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2463.909752278899!2d19.39424537709042!3d51.86260418469219!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471bb5d579398d6d%3A0x2ee7c830436b5e43!2sKonstantego%20Ildefonsa%20Ga%C5%82czy%C5%84skiego%2040%2C%2095-100%20Zgierz!5e0!3m2!1spl!2spl!4v1778563949477!5m2!1spl!2spl" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa Paczkarnia Zgierz"
              className="grayscale brightness-90 hover:grayscale-0 transition-all duration-700"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-12 bg-black text-white/50 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start gap-4">
          <div className="flex items-center gap-3">
             <img src={LOGO_URL} alt="Logo" className="w-8 h-8 rounded-full opacity-70 grayscale" />
             <span className="font-display font-bold text-white text-lg">Paczkarnia.Zgierz</span>
          </div>
          <p className="text-sm">© {new Date().getFullYear()} Paczkarnia.Zgierz. Wszystkie prawa zastrzeżone.</p>
        </div>
        
        <div className="flex items-center gap-6">
          <a href={SOCIALS.facebook} target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><Facebook size={20} /></a>
          <a href={SOCIALS.instagram} target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><Instagram size={20} /></a>
          <a href={SOCIALS.tiktok} target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><TikTokIcon className="w-5 h-5" /></a>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="min-h-screen selection:bg-donut-dough selection:text-donut-dark relative overflow-hidden">
      {/* Subtle Background Blobs */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <motion.div 
          animate={{ 
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 -left-20 w-96 h-96 bg-donut-dough/10 rounded-full blur-[100px]"
        />
        <motion.div 
          animate={{ 
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-donut-crust/5 rounded-full blur-[120px]"
        />
      </div>

      <Navbar />
      <main>
        <Hero />
        <Features />
        <Gallery />
        <Reviews />
        <SocialCTA />
        <ContactInfo />
      </main>
      <Footer />
      
      {/* Floating CTA for Mobile */}
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 1, type: "spring" }}
        className="md:hidden fixed bottom-6 left-6 right-6 z-40"
      >
        <a 
          href="tel:+48694537216"
          className="flex items-center justify-center gap-2 bg-donut-crust text-white py-4 rounded-full font-bold shadow-2xl active:scale-95 transition-transform"
        >
          <Phone size={20} />
          Zadzwoń i zamów
        </a>
      </motion.div>
    </div>
  );
}

