"use client";
import { motion } from "framer-motion";
import Image from "next/image";

interface PageHeroProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  children?: React.ReactNode;
  overlay?: boolean;
}

export const PageHero = ({
  title,
  description,
  imageSrc,
  imageAlt,
  children,
  overlay = true,
}: PageHeroProps) => {
  return (
    <section className="relative pt-20 px-4 overflow-hidden min-h-[60vh] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover"
          priority
          quality={90}
        />
        {overlay && (
          <div className="absolute inset-0 bg-blue-900/70 dark:bg-blue-900/80" />
        )}
      </div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {title}
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            {description}
          </p>
          {children}
        </motion.div>
      </div>
    </section>
  );
}; 