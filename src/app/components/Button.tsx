// components/Button.tsx
import React from 'react';
import classNames from 'classnames';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className, ...props }) => {
  const baseStyles = 'p-4 py-2 rounded-full font-semibold focus:outline-none';
  const variantStyles = variant === 'primary' ? 'bg-[#9378FF] text-white' : 'bg-gray-300 text-gray-700';
  const paddingStyles = 'p-12 py-4'; 
  
  return (
    <button className={classNames(baseStyles, variantStyles, paddingStyles, className)} {...props}>
      {children}
    </button>
  );
};

export default Button;
