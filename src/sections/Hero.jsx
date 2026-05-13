import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax-like effect */}
      <div className="absolute inset-0 z-0">
        <img
          src="/institute/hero-institute.jpeg"
          alt="Institute"
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/90 via-primary-dark/70 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-transparent to-transparent"></div>
      </div>

      {/* Islamic Pattern Overlay */}
      <div className="absolute inset-0 z-10 opacity-[0.03] pointer-events-none mix-blend-overlay">
        <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/islamic-art.png')] bg-repeat"></div>
      </div>

      <div className="container-custom relative z-20 pt-20">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <span className="w-12 h-[1px] bg-accent-gold"></span>
              <span className="text-accent-gold font-bold tracking-[0.3em] uppercase text-xs">
                {t('hero.badge')}
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl text-white font-serif font-bold leading-[1.05] mb-8">
              {t('hero.title_part1')} <br />
              <span className="text-accent-gold inline-block mt-2">{t('hero.title_part2')}</span>
            </h1>

            <p className="text-xl md:text-2xl text-white/70 font-light leading-relaxed mb-12 max-w-2xl border-l-2 border-accent-gold/30 pl-8">
              {t('hero.subtitle')}
            </p>

            <div className="flex flex-wrap items-center gap-6">
              <Link to="/programs" className="btn-gold">
                {t('nav.programs')}
                <ArrowRight size={20} />
              </Link>
              <Link to="/admission" className="btn-outline">
                {t('hero.cta_admission')}
              </Link>

              <button className="flex items-center gap-4 group ml-4 text-white hover:text-accent-gold transition-colors">
                <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-accent-gold group-hover:border-accent-gold transition-all duration-500 shadow-xl">
                  <Play size={20} fill="currentColor" />
                </div>
                <span className="font-bold tracking-wider text-sm uppercase">Видео таныстырылым</span>
              </button>
            </div>
          </motion.div>
        </div>

        {/* Floating Stats / Info */}
        <div className="absolute bottom-12 left-0 right-0 hidden lg:block">
          <div className="grid grid-cols-4 gap-8">
            {[
              { label: 'Студенттер саны', value: '500+', icon: '👥' },
              { label: 'Оқу бағдарламалары', value: '5', icon: '📖' },
              { label: 'Білікті ұстаздар', value: '25+', icon: '🎓' },
              { label: 'Жұмысқа орналасу', value: '95%', icon: '💼' }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + (i * 0.1) }}
                className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-all group"
              >
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold text-white mb-1 group-hover:text-accent-gold transition-colors">{stat.value}</div>
                <div className="text-white/50 text-xs font-bold uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Location Badge */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 }}
          className="absolute right-0 bottom-40 hidden xl:flex items-center gap-4 bg-primary-dark/40 backdrop-blur-md border border-white/10 p-4 rounded-l-3xl"
        >
          <div className="w-10 h-10 rounded-full bg-accent-gold flex items-center justify-center text-white">
            <MapPin size={18} />
          </div>
          <div>
            <div className="text-white font-bold text-sm">Астана қаласы</div>
            <div className="text-white/50 text-xs">Қабанбай батыр даңғылы, 36/4</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
