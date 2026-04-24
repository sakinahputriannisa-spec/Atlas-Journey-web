import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  X, 
  MapPin, 
  Calendar, 
  ChevronRight, 
  Clock, 
  CheckCircle2,
  Navigation,
  Phone,
  Mail
} from 'lucide-react';

// Types
interface Destination {
  id: number;
  name: string;
  country: string;
  description: string;
  image: string;
  region: 'Europe' | 'Asia';
  details: {
    itinerary: string[];
    activities: string[];
    price: string;
  };
}

interface Package {
  id: number;
  name: string;
  price: string;
  duration: string;
  facilities: {
    hotel: string;
    transport: string;
    guide: string;
    meals: string;
    tickets: boolean;
    documentation: boolean;
  };
  image: string;
  region: 'Europe' | 'Asia';
}

// Data
const destinations: Destination[] = [
  // Europe
  {
    id: 1,
    name: 'Paris',
    country: 'Prancis',
    description: 'Kota cahaya yang romantis dengan Menara Eiffel yang ikonik.',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=800',
    region: 'Europe',
    details: {
      itinerary: ['Hari 1: Kedatangan & Check-in', 'Hari 2: Menara Eiffel & Louvre', 'Hari 3: River Seine Cruise'],
      activities: ['City Tour', 'Museum Visit', 'Fine Dining'],
      price: 'Rp 15.500.000 / orang'
    }
  },
  {
    id: 2,
    name: 'Rome',
    country: 'Italia',
    description: 'Jelajahi sejarah kuno di Colosseum dan keindahan Vatikan.',
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&q=80&w=800',
    region: 'Europe',
    details: {
      itinerary: ['Hari 1: Colosseum & Roman Forum', 'Hari 2: Vatican Museum', 'Hari 3: Trevi Fountain'],
      activities: ['Historical Walk', 'Pasta Making', 'Vineyard Tour'],
      price: 'Rp 10.200.000 / orang'
    }
  },
  {
    id: 3,
    name: 'Amsterdam',
    country: 'Belanda',
    description: 'Nikmati kanal bersejarah dan taman bunga Keukenhof yang indah.',
    image: 'https://plus.unsplash.com/premium_photo-1661887237533-b38811c27add?q',
    region: 'Europe',
    details: {
      itinerary: ['Hari 1: Canal Cruise', 'Hari 2: Anne Frank House', 'Hari 3: Windmill Village'],
      activities: ['Cycling Tour', 'Museum Hopping', 'Flower Market'],
      price: 'Rp 12.800.000 / orang'
    }
  },
  {
    id: 4,
    name: 'Barcelona',
    country: 'Spanyol',
    description: 'Arsitektur unik Gaudi dan pantai yang ceria di tepi Mediterania.',
    image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&q=80&w=800',
    region: 'Europe',
    details: {
      itinerary: ['Hari 1: Sagrada Familia', 'Hari 2: Park Guell', 'Hari 3: La Rambla & Beach'],
      activities: ['Architectural Tour', 'Tapas Tasting', 'Beach Volleyball'],
      price: 'Rp 18.100.000 / orang'
    }
  },
  {
    id: 5,
    name: 'Swiss',
    country: 'Swiss',
    description: 'Pemandangan Alpen yang memukau dan danau kristal yang jernih.',
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&q=80&w=800',
    region: 'Europe',
    details: {
      itinerary: ['Hari 1: Zurich Lake', 'Hari 2: Mount Titlis Snow', 'Hari 3: Lucerne City Walk'],
      activities: ['Cable Car Ride', 'Chocolate Factory Visit', 'Mountain Trekking'],
      price: 'Rp 21.500.000 / orang'
    }
  },
  // Asia
  {
    id: 6,
    name: 'Tokyo',
    country: 'Jepang',
    description: 'Perpaduan sempurna antara tradisi kuno dan teknologi futuristik.',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q',
    region: 'Asia',
    details: {
      itinerary: ['Hari 1: Shibuya Crossing', 'Hari 2: Harajuku & Meiji Shrine', 'Hari 3: Akihabara'],
      activities: ['Street Food Tour', 'Cosplay Experience', 'Gadget Shopping'],
      price: 'Rp 15.500.000 / orang'
    }
  },
  {
    id: 7,
    name: 'Seoul',
    country: 'Korea Selatan',
    description: 'Pusat budaya K-Pop dan pesona istana Gyeongbokgung.',
    image: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?auto=format&fit=crop&q=80&w=800',
    region: 'Asia',
    details: {
      itinerary: ['Hari 1: Gyeongbokgung Palace', 'Hari 2: N Seoul Tower', 'Hari 3: Myeongdong Street'],
      activities: ['Hanbok Experience', 'K-Style Makeover', 'Street Food'],
      price: 'Rp 14.200.000 / orang'
    }
  },
  {
    id: 8,
    name: 'Bangkok',
    country: 'Thailand',
    description: 'Eksotisme kuil-kuil emas dan pasar terapung yang ramai.',
    image: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&q=80&w=800',
    region: 'Asia',
    details: {
      itinerary: ['Hari 1: Grand Palace', 'Hari 2: Wat Arun & Wat Pho', 'Hari 3: Floating Market'],
      activities: ['Thai Massage', 'Tuk-tuk Ride', 'Night Market Tour'],
      price: 'Rp 5.500.000 / orang'
    }
  },
  {
    id: 9,
    name: 'Singapore',
    country: 'Singapura',
    description: 'Kota taman modern dengan ikon Merlion dan Garden by the Bay.',
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&q=80&w=800',
    region: 'Asia',
    details: {
      itinerary: ['Hari 1: Merlion Park', 'Hari 2: Universal Studios', 'Hari 3: Marina Bay Sands'],
      activities: ['Sentoza Island', 'Hainanese Food', 'Light Show'],
      price: 'Rp 4.800.000 / orang'
    }
  },
  {
    id: 10,
    name: 'Bali',
    country: 'Indonesia',
    description: 'Pulau Dewata dengan pantai eksotis dan budaya yang kental.',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800',
    region: 'Asia',
    details: {
      itinerary: ['Hari 1: Uluwatu Temple', 'Hari 2: Ubud Rice Terrace', 'Hari 3: Seminyak Beach'],
      activities: ['Surfing', 'Yoga Class', 'Kecak Dance Show'],
      price: 'Rp 3.200.000 / orang'
    }
  },
  {
    id: 11,
    name: 'Shanghai',
    country: 'China',
    description: 'Metropolis masa depan dengan arsitektur memukau di tepi sungai Bund.',
    image: 'https://images.unsplash.com/photo-1474181487882-5abf3f0ba6c2?auto=format&fit=crop&q=80&w=800',
    region: 'Asia',
    details: {
      itinerary: ['Hari 1: The Bund & Nanjing Road', 'Hari 2: Yu Garden & Old City', 'Hari 3: Pudong Skyscrapers'],
      activities: ['River Cruise', 'Dim Sum Tasting', 'Cultural Show'],
      price: 'Rp 9.800.000 / orang'
    }
  },
  {
    id: 12,
    name: 'Kuala Lumpur',
    country: 'Malaysia',
    description: 'Ikon modernitas dengan Menara Kembar Petronas yang megah.',
    image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?q',
    region: 'Asia',
    details: {
      itinerary: ['Hari 1: Petronas Towers', 'Hari 2: Batu Caves & Genting', 'Hari 3: Bukit Bintang'],
      activities: ['Skybridge Walk', 'Shopping Spree', 'Street Food Tour'],
      price: 'Rp 3.500.000 / orang'
    }
  }
];

const packages: Package[] = [
  // Europe
  {
    id: 1,
    name: 'Europe Grand Tour 7D6N',
    price: 'Rp 25.500.000',
    duration: '7 Hari 6 Malam',
    facilities: {
      hotel: 'Hotel ⭐5 Central Paris',
      transport: 'Private Bus AC & Airport Transfer',
      guide: 'Pemandu Lokal Berbahasa Indonesia',
      meals: 'Sarapan & Makan Malam Menu Buffet',
      tickets: true,
      documentation: true
    },
    image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&q=80&w=800',
    region: 'Europe'
  },
  {
    id: 2,
    name: 'Swiss Alpine Adventure',
    price: 'Rp 32.000.000',
    duration: '6 Hari 5 Malam',
    facilities: {
      hotel: 'Luxury Mountain Resort',
      transport: 'First Class Swiss Travel Pass',
      guide: 'Sertifikasi International Guide',
      meals: 'Full Board (Sarapan, Makan Siang, Malam)',
      tickets: true,
      documentation: true
    },
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&q=80&w=800',
    region: 'Europe'
  },
  {
    id: 3,
    name: 'Italy Renaissance Trip',
    price: 'Rp 28.500.000',
    duration: '5 Hari 4 Malam',
    facilities: {
      hotel: 'Butik Hotel di Florence & Rome',
      transport: 'High Speed Train VIP Class',
      guide: 'Sejarawan & Profesional Guide',
      meals: 'Authentic Italian Lunch & Dinner',
      tickets: true,
      documentation: false
    },
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&q=80&w=800',
    region: 'Europe'
  },
  {
    id: 4,
    name: 'Spain & Portugal Discovery',
    price: 'Rp 24.800.000',
    duration: '8 Hari 7 Malam',
    facilities: {
      hotel: 'Hotel ⭐4 Plus Heritage',
      transport: 'Modern Coach with WiFi',
      guide: 'Multi-lingual Guide',
      meals: 'Continental Breakfast & Local Tapas',
      tickets: true,
      documentation: true
    },
    image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&q=80&w=800',
    region: 'Europe'
  },
  // Asia
  {
    id: 1,
    name: 'Japan Sakura Luxury',
    price: 'Rp 22.200.000',
    duration: '6 Hari 5 Malam',
    facilities: {
      hotel: 'Ryokan Premium with Onsen',
      transport: 'JR Pass Green Class & Private Van',
      guide: 'Professional Local Guide',
      meals: 'Traditional Kaiseki Dinner',
      tickets: true,
      documentation: true
    },
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=800',
    region: 'Asia'
  },
  {
    id: 2,
    name: 'Korea Modern Culture',
    price: 'Rp 19.500.000',
    duration: '5 Hari 4 Malam',
    facilities: {
      hotel: 'Lotte Signature Hotel Seoul',
      transport: 'Luxury Bus & Airport Pick-up',
      guide: 'K-Culture Expert Guide',
      meals: 'Korean BBQ & Traditional Cuisine',
      tickets: true,
      documentation: true
    },
    image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&q=80&w=800',
    region: 'Asia'
  },
  {
    id: 3,
    name: 'Shanghai Modern Escape',
    price: 'Rp 24.000.000',
    duration: '5 Hari 4 Malam',
    facilities: {
      hotel: 'Waldorf Astoria on The Bund',
      transport: 'Maglev VIP & Private Car',
      guide: 'Expert City Guide',
      meals: 'Michelin Star Dining Experience',
      tickets: true,
      documentation: true
    },
    image: 'https://images.unsplash.com/photo-1474181487882-5abf3f0ba6c2?auto=format&fit=crop&q=80&w=800',
    region: 'Asia'
  },
  {
    id: 4,
    name: 'Malaysia Luxury Gateway',
    price: 'Rp 16.500.000',
    duration: '4 Hari 3 Malam',
    facilities: {
      hotel: 'St. Regis Kuala Lumpur',
      transport: 'Luxury Alphard Transfer',
      guide: 'Dedicated Personal Assistant',
      meals: 'High Tea & Fine Dining Dinner',
      tickets: true,
      documentation: false
    },
    image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?q',
    region: 'Asia'
  },
  {
    id: 5,
    name: 'Scandinavia Northern Lights',
    price: 'Rp 45.000.000',
    duration: '10 Hari 9 Malam',
    facilities: {
      hotel: 'Igloo Glass & Ice Hotel',
      transport: 'Private Sled & Arctic Bus',
      guide: 'Aurora Specialist Guide',
      meals: 'Arctic Cuisine Experience',
      tickets: true,
      documentation: true
    },
    image: 'https://images.unsplash.com/photo-1531366930499-41f667534bc6?auto=format&fit=crop&q=80&w=800',
    region: 'Europe'
  },
  {
    id: 6,
    name: 'Greece Mythology & Islands',
    price: 'Rp 29.500.000',
    duration: '7 Hari 6 Malam',
    facilities: {
      hotel: 'Santorini Caldera View Suite',
      transport: 'Luxury Boat & Private Car',
      guide: 'Archeologist Guide',
      meals: 'Mediterranean Mediterranean Buffet',
      tickets: true,
      documentation: false
    },
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=800',
    region: 'Europe'
  },
  {
    id: 5,
    name: 'Vietnam Heritage Journey',
    price: 'Rp 14.800.000',
    duration: '6 Hari 5 Malam',
    facilities: {
      hotel: 'Colonial Style 5-Star Hotel',
      transport: 'Private Cruise Halong Bay',
      guide: 'History Expert Guide',
      meals: 'Fusion Vietnamese Fine Dining',
      tickets: true,
      documentation: true
    },
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&q=80&w=800',
    region: 'Asia'
  },
  {
    id: 6,
    name: 'Bali & Beyond Luxury',
    price: 'Rp 12.500.000',
    duration: '5 Hari 4 Malam',
    facilities: {
      hotel: 'Private Pool Villa Ubud',
      transport: 'VIP Airport Express',
      guide: 'Private Butler & Driver',
      meals: 'Floating Breakfast & Seafood Dinner',
      tickets: true,
      documentation: true
    },
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800',
    region: 'Asia'
  }
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [activeRegion, setActiveRegion] = useState<'Europe' | 'Asia'>('Europe');
  const [selectedDest, setSelectedDest] = useState<Destination | null>(null);
  const bookingFormRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
    setSelectedDest(null);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirmation(true);
    setTimeout(() => setShowConfirmation(false), 5000);
    const form = e.target as HTMLFormElement;
    form.reset();
  };

  const filteredDestinations = destinations.filter(d => d.region === activeRegion);
  const filteredPackages = packages.filter(p => p.region === activeRegion);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 overflow-x-hidden flex flex-col">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[60] h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection('home')}>
          <div className="w-8 h-8 bg-blue-700 rounded-lg flex items-center justify-center text-white">
            <Navigation size={18} className="rotate-45" />
          </div>
          <span className="text-xl font-bold text-blue-900 tracking-tight">Atlas <span className="text-blue-600">Journey</span></span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {['home', 'destinasi', 'paket-wisata', 'booking', 'tentang-kami'].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item)}
              className="text-xs font-semibold text-slate-500 hover:text-blue-700 transition-colors capitalize px-1"
            >
              {item.replace('-', ' ')}
            </button>
          ))}
          <button 
            onClick={() => scrollToSection('booking')}
            className="bg-blue-700 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-blue-800 transition-all shadow-sm"
          >
            Pesan Sekarang
          </button>
        </div>

        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-slate-600">
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden fixed top-16 left-0 w-full z-50 bg-white border-b border-slate-200 p-4 space-y-2 shadow-lg"
          >
            {['home', 'destinasi', 'paket-wisata', 'booking', 'tentang-kami'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="block w-full text-left px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50 rounded-lg transition-colors capitalize"
              >
                {item.replace('-', ' ')}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1 mt-16 p-4 lg:p-6 flex flex-col gap-12 max-w-5xl mx-auto w-full">
        {/* Hero Section */}
        <section id="home" className="relative w-screen left-1/2 -translate-x-1/2 rounded-none overflow-hidden min-h-[400px] flex flex-col justify-center bg-blue-900 shadow-2xl">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=2000" 
              alt="Luxury travel scenery" 
              className="w-full h-full object-cover opacity-60"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-blue-900/40 to-transparent"></div>
          </div>

          <div className="relative z-10 p-6 lg:p-10 max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-white border border-white/20 mb-6">
                Premium Travel Experience
              </span>
              <h1 className="text-6xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8">
                Your Next <br/><span className="text-blue-300">Adventure</span>
              </h1>
              <p className="text-white text-lg lg:text-xl font-medium leading-relaxed max-w-xl mb-12 opacity-90">
                Discover the world's most breathtaking locations in Europe and Asia. Luxury, comfort, and culture combined for your perfect getaway.
              </p>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => scrollToSection('destinasi')} 
                  className="bg-blue-700 text-white px-10 py-5 rounded-2xl font-black text-sm shadow-2xl flex items-center gap-3 hover:bg-blue-800 transition-all group"
                >
                  Start Exploring <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Region Tabs */}
        <div className="flex justify-center">
          <div className="flex gap-4 p-2 bg-white border border-slate-100 rounded-[2rem] shadow-xl">
            {(['Europe', 'Asia'] as const).map((region) => (
              <button
                key={region}
                onClick={() => setActiveRegion(region)}
                className={`px-12 py-4 rounded-[1.5rem] text-sm font-black transition-all ${
                  activeRegion === region 
                    ? 'bg-blue-700 text-white shadow-xl shadow-blue-200 scale-105' 
                    : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                }`}
              >
                {region === 'Europe' ? '🌍 Europe' : '🌏 Asia'}
              </button>
            ))}
          </div>
        </div>

        {/* Destinations */}
        <section id="destinasi" className="flex flex-col gap-8">
          <div className="text-center mb-4">
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">Iconic Destinations</h2>
            <p className="text-slate-500 font-bold mt-2">The most visited spots in {activeRegion === 'Europe' ? 'Europe' : 'Asia'}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDestinations.map((dest) => (
              <div key={dest.id} className="bg-white group rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-sm hover:shadow-2xl transition-all flex flex-col">
                <div className="h-64 overflow-hidden relative">
                  <img src={dest.image} alt={dest.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-6 left-6 bg-blue-900/60 backdrop-blur-md px-4 py-2 rounded-xl text-[10px] font-black text-white border border-white/20 uppercase tracking-widest">
                    {dest.country}
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <h3 className="text-2xl font-black text-slate-800 mb-2">{dest.name}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 mb-8">{dest.description}</p>
                  <button 
                    onClick={() => setSelectedDest(dest)}
                    className="mt-auto w-full bg-blue-50 text-blue-700 rounded-2xl py-4 text-xs font-black hover:bg-blue-700 hover:text-white transition-all border border-blue-100/30"
                  >
                    View Experience Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Packages */}
        <section id="paket-wisata" className="flex flex-col gap-8">
          <div className="text-center mb-4">
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">Luxury Travel Packages</h2>
            <p className="text-slate-500 font-bold mt-2">All-inclusive plans for your comfort</p>
          </div>
          <div className="grid grid-cols-1 gap-6">
            {filteredPackages.length > 0 ? filteredPackages.map((pkg) => (
              <div key={pkg.id} className="bg-white p-8 lg:p-10 rounded-[3rem] border border-slate-100 flex flex-col lg:flex-row items-center gap-10 shadow-sm hover:shadow-xl transition-all group">
                <div className="w-24 h-24 bg-blue-600 text-white rounded-3xl flex items-center justify-center font-black text-4xl shadow-lg shadow-blue-100">
                  {pkg.id}
                </div>
                <div className="flex-1 w-full text-center lg:text-left">
                  <div className="flex flex-col lg:flex-row justify-between lg:items-center mb-6 gap-4">
                      <h3 className="text-2xl font-black text-slate-800">{pkg.name}</h3>
                      <span className="inline-block mx-auto lg:mx-0 w-fit text-xs font-black text-blue-700 bg-blue-50 px-4 py-2 rounded-full border border-blue-100">{pkg.duration}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 text-xs text-slate-600 font-bold justify-center lg:justify-start">
                      <CheckCircle2 size={16} className="text-emerald-500" /> {pkg.facilities.hotel}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-600 font-bold justify-center lg:justify-start">
                      <CheckCircle2 size={16} className="text-emerald-500" /> {pkg.facilities.transport}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-600 font-bold justify-center lg:justify-start">
                      <CheckCircle2 size={16} className="text-emerald-500" /> {pkg.facilities.meals}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-600 font-bold justify-center lg:justify-start">
                      <CheckCircle2 size={16} className="text-emerald-500" /> Professional Tour Guide
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center lg:items-end w-full lg:w-auto pt-8 lg:pt-0 border-t lg:border-t-0 border-slate-100 mt-4 lg:mt-0">
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mb-1">Final Price</p>
                  <p className="text-3xl font-black text-blue-700 tracking-tighter mb-6">{pkg.price}</p>
                  <button onClick={() => scrollToSection('booking')} className="w-full lg:w-auto bg-blue-700 text-white px-12 py-5 rounded-[1.8rem] text-sm font-black shadow-2xl hover:bg-blue-800 transition-all hover:scale-105 active:scale-95">
                    Book Trip
                  </button>
                </div>
              </div>
            )) : (
              <div className="bg-slate-100/50 p-20 rounded-[3rem] text-center border-2 border-dashed border-slate-200">
                <p className="text-slate-400 text-sm font-bold">No packages currently available for this region.</p>
              </div>
            )}
          </div>
        </section>

        {/* Booking Form (Full Width Flow) */}
        <section id="booking" ref={bookingFormRef} className="bg-white rounded-[3.5rem] p-10 lg:p-20 border border-slate-100 shadow-sm scroll-mt-24">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <div className="w-16 h-16 bg-blue-50 text-blue-700 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Calendar size={32} />
              </div>
              <h2 className="text-4xl font-black text-slate-900 tracking-tight">Reserve Your Luxury Trip</h2>
              <p className="text-slate-500 font-bold mt-2">Fill out the details below to start your adventure</p>
            </div>
            
            <form onSubmit={handleBookingSubmit} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Traveler Full Name</label>
                  <input required type="text" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-5 outline-none focus:border-blue-500 focus:bg-white transition-all text-sm font-bold" placeholder="E.g. John Doe" />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Email Address</label>
                  <input required type="email" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-5 outline-none focus:border-blue-500 focus:bg-white transition-all text-sm font-bold" placeholder="john@example.com" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Choose Adventure</label>
                  <select required className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-5 outline-none focus:border-blue-500 focus:bg-white transition-all text-sm font-bold appearance-none">
                    <option value="">-- Click to select --</option>
                    {packages.map(pkg => <option key={pkg.id} value={pkg.name}>{pkg.name}</option>)}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Date</label>
                    <input required type="date" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-5 outline-none focus:border-blue-500 focus:bg-white text-sm font-bold" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Guests</label>
                    <input required type="number" min="1" defaultValue="1" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-5 outline-none focus:border-blue-500 focus:bg-white text-sm font-bold" />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 block">Select Secure Payment</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {['Bank Transfer', 'E-Wallet', 'Credit Card'].map(method => (
                    <label key={method} className="flex flex-col items-center gap-3 p-6 border-2 border-slate-50 rounded-3xl cursor-pointer hover:border-blue-200 hover:bg-blue-50/30 transition-all">
                      <input type="radio" name="payment" value={method} className="text-blue-600 w-4 h-4" defaultChecked={method === 'Bank Transfer'} />
                      <span className="text-xs font-black text-slate-700">{method}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button type="submit" className="mt-6 bg-blue-700 text-white font-black py-6 rounded-3xl hover:bg-blue-800 transition-all shadow-2xl hover:scale-[1.02] active:scale-[0.98] text-lg uppercase tracking-widest">
                Confirm Reservation
              </button>
              
              <AnimatePresence>
                {showConfirmation && (
                  <motion.div initial={{ opacity: 0, scale: 0.9, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 10 }} className="p-10 bg-emerald-50 border border-emerald-100 rounded-[3rem] text-center shadow-xl mt-4">
                    <div className="w-16 h-16 bg-emerald-500 text-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                        <CheckCircle2 size={32} />
                    </div>
                    <p className="font-black text-2xl text-emerald-900 mb-2 tracking-tight">Booking Confirmed!</p>
                    <p className="text-sm font-bold text-emerald-700 opacity-80 leading-relaxed max-w-md mx-auto">Thank you for choosing Atlas Journey. Our concierge representative will contact you via email shortly to finalize your luxury travel itinerary.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </section>

        {/* Tentang Kami (Full Width Flow) */}
       <section id="tentang-kami" className="relative w-screen left-1/2 -translate-x-1/2 bg-slate-900 text-white rounded-none p-6 lg:p-12 overflow-hidden flex flex-col md:flex-row items-center gap-8 shadow-2xl">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-500/5 blur-[120px] rounded-full"></div>
          <div className="flex-1 z-10">
            <h2 className="text-3xl lg:text-5xl font-black mb-8 italic tracking-tighter">About Atlas Journey</h2>
            <p className="text-lg lg:text-xl leading-relaxed text-slate-400 font-medium mb-10 max-w-2xl">
              Since 2014, we have been crafting bespoke luxury travel experiences for discerning explorers. Our mission is to connect you with the soul of a destination through curated itineraries and professional local insights.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm font-bold">
              <div className="flex items-center gap-5 group">
                <div className="w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center text-blue-400 group-hover:bg-blue-700 group-hover:text-white transition-all"><MapPin size={24} /></div>
                <div>
                  <p className="text-slate-500 text-[10px] uppercase tracking-widest mb-1">Global Office</p>
                  <span>Jakarta Selatan, Indonesia</span>
                </div>
              </div>
              <div className="flex items-center gap-5 group">
                <div className="w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center text-blue-400 group-hover:bg-blue-700 group-hover:text-white transition-all"><Phone size={24} /></div>
                <div>
                  <p className="text-slate-500 text-[10px] uppercase tracking-widest mb-1">Direct Line</p>
                  <span>+62 812 3456 7890</span>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/3 h-64 bg-slate-800 rounded-[3rem] border border-white/5 relative flex items-center justify-center group overflow-hidden">
             <div className="absolute inset-0 bg-blue-500/10 group-hover:bg-blue-500/20 transition-all"></div>
             <Navigation size={120} className="text-blue-500/20 group-hover:text-blue-500/40 transition-all rotate-45" />
             <div className="absolute bottom-8 text-center px-6">
                <p className="font-black text-xl text-white mb-1">100+ Premium Partners</p>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Across 2 Continents</p>
             </div>
          </div>
        </section>
      </main>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedDest && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
              onClick={() => setSelectedDest(null)}
              className="absolute inset-0 bg-slate-900/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 40 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }} 
              exit={{ scale: 0.9, opacity: 0, y: 40 }}
              className="relative bg-white w-full max-w-3xl rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row h-full max-h-[600px]"
            >
              <button 
                onClick={() => setSelectedDest(null)}
                className="absolute top-6 right-6 z-[110] p-3 bg-white/10 hover:bg-white text-slate-900 rounded-full backdrop-blur-xl transition-all shadow-lg"
              >
                <X size={24} />
              </button>
              
              <div className="md:w-1/2 relative min-h-[300px] md:min-h-0">
                <img src={selectedDest.image} alt={selectedDest.name} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-10 left-10 right-10">
                  <span className="text-blue-400 font-extrabold text-xs uppercase tracking-widest">{selectedDest.country}</span>
                  <h3 className="text-5xl font-black text-white mt-1">{selectedDest.name}</h3>
                </div>
              </div>
              
              <div className="md:w-1/2 p-10 flex flex-col overflow-y-auto">
                <div className="flex-1">
                  <h4 className="text-xs font-black text-slate-300 uppercase tracking-[0.2em] mb-4">Rencana Perjalanan</h4>
                  <div className="space-y-4 mb-8">
                    {selectedDest.details.itinerary.map((item, i) => (
                      <div key={i} className="flex items-start gap-4">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 flex-shrink-0" />
                        <p className="text-sm font-bold text-slate-700 leading-tight">{item}</p>
                      </div>
                    ))}
                  </div>

                  <h4 className="text-xs font-black text-slate-300 uppercase tracking-[0.2em] mb-4">Highlights</h4>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {selectedDest.details.activities.map((act, i) => (
                      <span key={i} className="px-4 py-2 bg-slate-50 text-slate-900 text-[11px] font-black rounded-xl border border-slate-100">{act}</span>
                    ))}
                  </div>
                </div>
                
                <div className="pt-8 border-t border-slate-50 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase">Estimated Price</p>
                    <p className="text-2xl font-black text-blue-700">{selectedDest.details.price}</p>
                  </div>
                  <button 
                    onClick={() => scrollToSection('booking')}
                    className="bg-blue-700 text-white px-8 py-4 rounded-[1.5rem] font-black text-sm shadow-xl shadow-blue-100 hover:bg-blue-800 transition-all active:scale-95"
                  >
                    Pesan
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <footer className="bg-white border-t border-slate-100 py-12 px-8 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white"><Navigation size={20} className="rotate-45" /></div>
            <span className="text-xl font-black text-slate-900">Atlas Journey</span>
          </div>
          <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">&copy; {new Date().getFullYear()} Travel Excellence. All rights reserved.</p>
          <div className="flex gap-8">
            {['Privacy', 'Terms', 'FAQ'].map(item => (
              <button key={item} className="text-[10px] font-black text-slate-300 hover:text-blue-700 transition-all uppercase tracking-[0.2em]">{item}</button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
