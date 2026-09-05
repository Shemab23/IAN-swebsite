import React from 'react';
import { UserCheck, Shield, Sparkles, HeartHandshake, Headphones } from 'lucide-react';
import { useData } from '../context/DataContext';

export const TrustSection: React.FC = () => {
  const { content } = useData();

  const trustPoints = [
    {
      icon: UserCheck,
      title: 'Personalized Service',
      description: 'Tailored travel planning for individuals, families, corporate delegations, and customized groups.'
    },
    {
      icon: Shield,
      title: 'Reliable Travel Assistance',
      description: 'Accurate flight connections, verified lodging, document guidance, and honest route recommendations.'
    },
    {
      icon: Sparkles,
      title: 'Competitive Travel Options',
      description: 'Access to favorable airline fares, transparent pricing, and accommodation suited to your exact budget.'
    },
    {
      icon: HeartHandshake,
      title: 'Support Throughout Your Journey',
      description: 'We don’t stop at ticketing. We remain available for flight schedule changes, gate adjustments, and trip logistics.'
    },
    {
      icon: Headphones,
      title: '24/7 Phone Support',
      description: `Direct emergency contact with our dedicated team whenever you travel. Reach us anytime at ${content.phone1}.`
    }
  ];

  return (
    <section className="relative py-16 bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold tracking-widest text-sky-600 dark:text-sky-400 uppercase font-heading">
            Why Travel With IAN'S
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white font-heading mt-2">
            Travel with confidence.
          </h2>
          <p className="text-slate-600 dark:text-slate-300 font-sans mt-3 text-base">
            Human care, verified travel expertise, and dependable guidance from our office in Kigali to destinations around the globe.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {trustPoints.map((point) => {
            const Icon = point.icon;
            return (
              <div
                key={point.title}
                className="p-5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 hover:border-sky-300 dark:hover:border-sky-500 hover:bg-white dark:hover:bg-slate-800 transition-all duration-300 hover:shadow-md flex flex-col items-start"
              >
                <div className="w-11 h-11 rounded-xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading mb-2">
                  {point.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                  {point.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
