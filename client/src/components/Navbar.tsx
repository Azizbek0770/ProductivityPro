import React, { useEffect, useState } from 'react';
import { FaRocket, FaBars } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const sections = [
  { id: 'hero', label: 'Home' },
  { id: 'tools', label: 'Tools' },
  { id: 'pomodoro', label: 'Pomodoro' },
  { id: 'tasks', label: 'Tasks' },
  { id: 'notes', label: 'Notes' },
  { id: 'calendar', label: 'Calendar' },
  { id: 'analytics', label: 'Analytics' },
  { id: 'team', label: 'Team' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'footer', label: 'Contact' }
];

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (id: string) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      initial={false}
      animate={scrolled ? 'scrolled' : 'top'}
      variants={{
        top: {
          background: 'rgba(255,255,255,0.85)',
          boxShadow: '0 2px 12px 0 rgba(0,0,0,0.04)',
          height: 80,
          color: '#222',
        },
        scrolled: {
          background: 'linear-gradient(90deg,#5f6fff 0%,#a259ff 100%)',
          boxShadow: '0 2px 16px 0 rgba(90,60,255,0.10)',
          height: 56,
          color: '#fff',
        }
      }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-16"
      style={{ backdropFilter: 'blur(12px)' }}
    >
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleNav('hero')}>
        <FaRocket className="text-2xl" />
        <span className="font-bold text-lg tracking-wide">ProductivityPro</span>
      </div>
      <div className="hidden md:flex gap-6 items-center">
        {sections.map(s => (
          <button
            key={s.id}
            onClick={() => handleNav(s.id)}
            className="font-medium text-base px-2 py-1 rounded hover:bg-primary/10 transition-colors"
            style={{ color: scrolled ? '#fff' : '#222' }}
          >
            {s.label}
          </button>
        ))}
      </div>
      <div className="md:hidden flex items-center">
        <button onClick={() => setOpen(o => !o)} className="p-2">
          <FaBars className={scrolled ? 'text-white' : 'text-primary'} />
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white dark:bg-gray-900 shadow-lg flex flex-col md:hidden"
          >
            {sections.map(s => (
              <button
                key={s.id}
                onClick={() => handleNav(s.id)}
                className="py-4 px-8 text-lg border-b border-gray-100 dark:border-gray-800 text-left hover:bg-primary/10"
              >
                {s.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
