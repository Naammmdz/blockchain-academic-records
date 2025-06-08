import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  padding = 'md',
  hover = false
}) => {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  const baseClasses = `bg-white rounded-xl shadow-sm border border-gray-200 ${paddingClasses[padding]}`;
  const hoverClasses = hover ? 'hover:shadow-md transition-shadow duration-200' : '';

  const CardComponent = hover ? motion.div : 'div';
  const motionProps = hover ? {
    whileHover: { y: -2 },
    transition: { duration: 0.2 }
  } : {};

  return (
    <CardComponent
      className={`${baseClasses} ${hoverClasses} ${className}`}
      {...motionProps}
    >
      {children}
    </CardComponent>
  );
};
