import React from 'react';

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  variant?: 'text' | 'rectangular' | 'circular';
  animation?: 'pulse' | 'wave' | 'none';
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width,
  height,
  variant = 'rectangular',
  animation = 'pulse',
  className = ''
}) => {
  const baseClasses = 'bg-gray-200';
  
  const variantClasses = {
    text: 'rounded-sm',
    rectangular: 'rounded-md',
    circular: 'rounded-full'
  };
  
  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'animate-wave',
    none: ''
  };
  
  const style: React.CSSProperties = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height
  };
  
  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${animationClasses[animation]} ${className}`}
      style={style}
    />
  );
};

// Pre-built skeleton components for common UI patterns
export const SkeletonText: React.FC<{ lines?: number; className?: string }> = ({
  lines = 1,
  className = ''
}) => (
  <div className={`space-y-2 ${className}`}>
    {Array.from({ length: lines }).map((_, index) => (
      <Skeleton
        key={index}
        variant="text"
        height={16}
        width={index === lines - 1 ? '75%' : '100%'}
      />
    ))}
  </div>
);

export const SkeletonCard: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`p-6 border border-gray-200 rounded-lg ${className}`}>
    <div className="flex items-center space-x-4 mb-4">
      <Skeleton variant="circular" width={40} height={40} />
      <div className="flex-1">
        <Skeleton variant="text" height={20} width="60%" className="mb-2" />
        <Skeleton variant="text" height={16} width="40%" />
      </div>
    </div>
    <SkeletonText lines={3} />
  </div>
);

export const SkeletonTable: React.FC<{ 
  rows?: number; 
  columns?: number; 
  className?: string 
}> = ({ 
  rows = 5, 
  columns = 4, 
  className = '' 
}) => (
  <div className={`w-full ${className}`}>
    {/* Table Header */}
    <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
      <div className="flex space-x-4">
        {Array.from({ length: columns }).map((_, index) => (
          <Skeleton key={index} variant="text" height={16} width="20%" />
        ))}
      </div>
    </div>
    
    {/* Table Rows */}
    {Array.from({ length: rows }).map((_, rowIndex) => (
      <div key={rowIndex} className="px-6 py-4 border-b border-gray-200">
        <div className="flex space-x-4">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton key={colIndex} variant="text" height={16} width="20%" />
          ))}
        </div>
      </div>
    ))}
  </div>
);

export const SkeletonAvatar: React.FC<{ 
  size?: 'sm' | 'md' | 'lg'; 
  className?: string 
}> = ({ 
  size = 'md', 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };
  
  return (
    <Skeleton
      variant="circular"
      className={`${sizeClasses[size]} ${className}`}
    />
  );
};

export const SkeletonButton: React.FC<{ 
  size?: 'sm' | 'md' | 'lg'; 
  variant?: 'rectangular' | 'rounded';
  className?: string 
}> = ({ 
  size = 'md', 
  variant = 'rounded',
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'h-8 w-20',
    md: 'h-10 w-24',
    lg: 'h-12 w-32'
  };
  
  const variantClass = variant === 'rounded' ? 'rounded-lg' : 'rounded-md';
  
  return (
    <Skeleton
      className={`${sizeClasses[size]} ${variantClass} ${className}`}
    />
  );
};
