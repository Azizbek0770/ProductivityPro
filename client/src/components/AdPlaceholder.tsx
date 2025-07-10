import React from 'react';
import { FaAd } from 'react-icons/fa';

const AdPlaceholder: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/25 backdrop-blur-[10px] border border-white/18 p-8 rounded-3xl shadow-2xl text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center mx-auto mb-4">
            <FaAd className="text-white text-2xl" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">Advertisement Space</h3>
          <p className="text-muted-foreground">
            Partner with us to reach productivity-focused professionals
          </p>
        </div>
      </div>
    </section>
  );
};

export default AdPlaceholder;
