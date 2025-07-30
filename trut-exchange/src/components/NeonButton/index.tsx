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
  glowIntensity = 'high',
  className = '',
  disabled = false,
  ...props 
}) => {
  const baseClasses = "relative inline-flex items-center justify-center font-semibold transition-all duration-300 ease-out rounded-lg overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-500/50";
  
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };
  
  const glowClasses = {
    low: "shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30",
    medium: "shadow-xl shadow-purple-500/30 hover:shadow-purple-500/50",
    high: "shadow-2xl shadow-purple-500/40 hover:shadow-purple-500/70 hover:shadow-2xl"
  };
  
  const variantClasses = {
    primary: `
      bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 
      hover:from-purple-700 hover:via-purple-600 hover:to-blue-700 
      text-white border-2 border-purple-400/50 hover:border-purple-300/70
      before:absolute before:inset-0 before:bg-gradient-to-r before:from-purple-400/20 before:to-blue-400/20 
      before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300
      after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]
      after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300
      ${glowClasses[glowIntensity]}
    `,
    secondary: `
      bg-gray-800/80 hover:bg-gray-700/90 backdrop-blur-sm
      text-white border-2 border-gray-600/50 hover:border-gray-500/70
      shadow-lg shadow-gray-900/50 hover:shadow-gray-900/70
    `,
    danger: `
      bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 
      text-white border-2 border-red-500/50 hover:border-red-400/70
      shadow-xl shadow-red-500/25 hover:shadow-red-500/40
    `
  };

  // Starry particle effect for primary buttons
  const StarryEffect = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute w-1 h-1 bg-white/60 rounded-full animate-pulse" style={{ top: '20%', left: '15%', animationDelay: '0s' }}></div>
      <div className="absolute w-0.5 h-0.5 bg-purple-300/80 rounded-full animate-pulse" style={{ top: '60%', left: '80%', animationDelay: '1s' }}></div>
      <div className="absolute w-1 h-1 bg-blue-300/60 rounded-full animate-pulse" style={{ top: '80%', left: '30%', animationDelay: '2s' }}></div>
      <div className="absolute w-0.5 h-0.5 bg-white/40 rounded-full animate-pulse" style={{ top: '40%', left: '70%', animationDelay: '1.5s' }}></div>
    </div>
  );

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {variant === 'primary' && <StarryEffect />}
      
      {/* Animated gradient overlay */}
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></span>
      
      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  );
};

export default NeonButton;