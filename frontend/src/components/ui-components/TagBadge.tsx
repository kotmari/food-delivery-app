interface TagProps {
  name: string;
  isSelected?: boolean;
  onClick?: () => void; 
}

export const TagBadge = ({ name, isSelected, onClick }: TagProps) => {
  return (
    <button
      onClick={onClick}
      title={name}
      className={`
        inline-flex items-center justify-center whitespace-nowrap
        px-2 py-1 rounded-xl border text-xs font-bold transition-all duration-200
        hover:scale-105 active:scale-95
        ${isSelected 
          ? "bg-accent border-accent text-white shadow-md shadow-accent/20" 
          : "bg-card border-border/50 text-text/60 hover:border-accent/40 hover:text-text-h"
        }
        ${onClick ? "cursor-pointer" : "cursor-default"}
      `}
    >
      {name}
    </button>
  );
};