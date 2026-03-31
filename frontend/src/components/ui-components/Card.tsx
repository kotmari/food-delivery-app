import { type HTMLAttributes, forwardRef } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'bordered';
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', variant = 'default', children, ...props }, ref) => {
    const variants = {
      default: 'bg-card',
      bordered: 'bg-bg border border-border/50 hover:border-accent/30 transition-colors',
      accent: 'bg-accent-bg border border-accent/20',
      elevated: 'bg-bg shadow-main border border-border/10',
    };

    return (
      <div
        ref={ref}
        className={`rounded-2xl p-4 ${variants[variant]} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';