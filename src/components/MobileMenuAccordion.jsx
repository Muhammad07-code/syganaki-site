import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const MobileMenuAccordion = ({ item, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!item.children) {
    return (
      <Link
        to={item.path}
        onClick={onNavigate}
        className="block px-4 py-3 text-sm font-bold text-slate-900 hover:text-accent-gold border-b border-slate-100 last:border-b-0"
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div className="border-b border-slate-100 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-3 text-sm font-bold text-slate-900 hover:text-accent-gold"
      >
        {item.label}
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={16} className="text-accent-gold" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden bg-slate-50"
          >
            <div className="py-2 px-4 space-y-1">
              {item.children.map((child) => (
                <Link
                  key={`${child.label}-mobile`}
                  to={child.path}
                  onClick={onNavigate}
                  className="block px-3 py-2 text-xs font-semibold text-slate-600 hover:text-accent-gold rounded"
                >
                  {child.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileMenuAccordion;
