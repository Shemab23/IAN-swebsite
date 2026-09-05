import React, { useState } from 'react';
import { Compass, Sparkles, MessageSquare, CheckCircle, ArrowRight } from 'lucide-react';
import { getTourWhatsAppLink } from '../utils/whatsapp';

export const RwandaExperienceSection: React.FC = () => {
  const experiences = [
    {
      id: 'volcanoes',
      title: 'Volcanoes National Park',
      subtitle: 'Mountain Gorilla Trekking & Virunga Peaks',
      image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80',
      description: 'Hike through misty bamboo forests to stand face-to-face with majestic mountain gorilla families. An awe-inspiring wildlife encounter in the northern Virunga volcanic chain.',
      tag: 'Wildlife Wonder'
    },
    {
      id: 'akagera',
      title: 'Akagera National Park',
      subtitle: 'Savannah Game Drives & Big Five Safari',
      image: 'https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=800&q=80',
      description: 'Lions, rhinos, elephants, buffalos, and leopards roaming rolling acacia woodlands, paired with scenic hippopotamus and crocodile boat cruises on Lake Ihema.',
      tag: 'Big Five Safari'
    },
    {
      id: 'nyungwe',
      title: 'Nyungwe National Park',
      subtitle: 'Aerial Canopy Walkway & Chimpanzee Treks',
      image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80',
      description: 'Walk suspended 70 meters above the ancient montane rainforest floor on the famous canopy suspension bridge, and trek through tea estates to observe chimpanzees.',
      tag: 'Ancient Rainforest'
    },
    {
      id: 'kivu',
      title: 'Lake Kivu Shores',
      subtitle: 'Freshwater Riviera, Kayaking & Relaxing',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      description: 'Unwind along Rubavu (Gisenyi) and Karongi (Kibuye). Sail with the nocturnal singing fishermen, kayak into quiet coves, and soak in natural hot springs.',
      tag: 'Lakeside Escape'
    },
    {
      id: 'kigali',
      title: 'Kigali City Vibrance',
      subtitle: 'Africa’s Cleanest Capital, Art & Heritage',
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80',
      description: 'Experience Kigali’s safe boulevards, the profound Kigali Genocide Memorial, colorful Kimironko Market fabrics, world-class coffee houses, and contemporary art galleries.',
      tag: 'Urban Heritage'
    }
  ];

  const [selectedExperience, setSelectedExperience] = useState(experiences[0]);

  return (
    <section id="rwanda" className="py-24 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-emerald-700/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-sky-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-3 font-heading border border-emerald-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Land of a Thousand Hills</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-heading tracking-tight mb-4">
            Discover Rwanda differently.
          </h2>
          <p className="text-slate-300 font-sans text-base sm:text-lg leading-relaxed">
            From the city to the mountains, forests and lakes, discover experiences designed around you. We craft bespoke journeys that connect you deeply with Rwanda's nature, people, and heritage.
          </p>
        </div>

        {/* Interactive Experience Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Experience List Selector */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {experiences.map((exp) => {
              const isSelected = selectedExperience.id === exp.id;
              return (
                <button
                  key={exp.id}
                  onClick={() => setSelectedExperience(exp)}
                  className={`p-4 rounded-2xl text-left transition-all duration-300 flex items-start justify-between cursor-pointer border ${
                    isSelected
                      ? 'bg-slate-800/90 border-emerald-500/60 shadow-lg shadow-emerald-950/40 translate-x-1'
                      : 'bg-slate-900/50 border-slate-800 hover:bg-slate-800/50 hover:border-slate-700'
                  }`}
                >
                  <div className="pr-4">
                    <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                      {exp.tag}
                    </span>
                    <h3 className="text-lg font-bold font-heading text-white mt-0.5">
                      {exp.title}
                    </h3>
                    <p className="text-xs text-slate-400 font-sans mt-0.5">
                      {exp.subtitle}
                    </p>
                  </div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-2 transition-colors ${
                    isSelected ? 'bg-emerald-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400'
                  }`}>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Large Visual Showcase of Active Selection */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl relative flex flex-col justify-end min-h-[460px]">
            <img
              src={selectedExperience.image}
              alt={selectedExperience.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

            <div className="relative z-10 p-6 sm:p-10">
              <div className="inline-block px-3 py-1 rounded-full bg-emerald-500 text-slate-950 text-xs font-bold uppercase tracking-wider mb-2">
                {selectedExperience.tag}
              </div>
              <h3 className="text-2xl sm:text-4xl font-extrabold font-heading text-white tracking-tight mb-2">
                {selectedExperience.title}
              </h3>
              <p className="text-slate-200 text-sm sm:text-base font-sans leading-relaxed mb-6 max-w-xl">
                {selectedExperience.description}
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <a
                  href={getTourWhatsAppLink(`Rwanda Experience: ${selectedExperience.title}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg shadow-emerald-700/30 flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Customize this Rwanda Experience</span>
                </a>
                <a
                  href="#contact"
                  className="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-semibold text-sm flex items-center justify-center transition-colors"
                >
                  <span>Request Full Itinerary</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
