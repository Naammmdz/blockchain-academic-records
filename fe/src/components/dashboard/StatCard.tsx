import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../common';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'increase' | 'decrease' | 'neutral';
  icon: React.ReactNode;
  color?: 'primary' | 'secondary' | 'accent' | 'gray';
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  changeType = 'neutral',
  icon,
  color = 'primary'
}) => {
  const colorClasses = {
    primary: 'bg-primary-50 text-primary-600',
    secondary: 'bg-secondary-50 text-secondary-600',
    accent: 'bg-accent-50 text-accent-600',
    gray: 'bg-gray-50 text-gray-600'
  };

  const changeColorClasses = {
    increase: 'text-secondary-600',
    decrease: 'text-red-600',
    neutral: 'text-gray-600'
  };

  return (
    <Card hover className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
          {change && (
            <p className={`text-sm mt-2 ${changeColorClasses[changeType]}`}>
              {change}
            </p>
          )}
        </div>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses[color]}`}>
          {icon}
        </div>
      </div>
    </Card>
  );
};
