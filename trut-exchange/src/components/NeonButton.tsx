import React from 'react';

interface NeonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  glowIntensity?: 'low' | 'medium' | 'high';
}

const NeonButton: React.FC<NeonButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  glowIntensity = 'medium',
  className = '',
  ...props 
}) => {
  const baseClasses = "relative inline-flex items-center justify-center font-semibold transition-all duration-300 ease-out rounded-lg overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95";
  
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-6 py-2.5 text-base",
    lg: "px-8 py-3 text-lg"
  };
  
  const glowClasses = {
    low: "shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30",
    medium: "shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50",
    high: "shadow-xl shadow-purple-500/40 hover:shadow-purple-500/70"
  };
  
  const variantClasses = {
    primary: `bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 hover:from-purple-700 hover:via-purple-600 hover:to-blue-700 text-white border border-purple-400/50 hover:border-purple-300/70 ${glowClasses[glowIntensity]}`,
    secondary: "bg-gray-800/80 hover:bg-gray-700/90 text-white border border-gray-600/50 hover:border-gray-500/70 backdrop-blur-sm",
    danger: "bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white border border-red-500/50 shadow-lg shadow-red-500/25 hover:shadow-red-500/40"
  };

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-white/20 via-purple-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
      <span className="absolute bottom-0 right-0 block w-32 h-32 mb-16 mr-2 transition-all duration-500 origin-bottom-left transform rotate-45 translate-x-12 bg-gradient-to-r from-purple-400/30 to-blue-400/30 rounded-full opacity-0 group-hover:opacity-100 group-hover:rotate-90"></span>
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export default NeonButton;