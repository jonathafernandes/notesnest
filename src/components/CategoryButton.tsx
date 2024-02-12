interface CategoryButtonProps {
    category: string;
    toggleCategory: (category: string) => void;
    active: boolean;
}

export function CategoryButton({ category, toggleCategory, active }: CategoryButtonProps) {
    return (
        <button
            onClick={() => toggleCategory(category)}
            className={`text-xm text-slate-500 ${active ? 'text-yellow-400' : ''}`}
        >
            {category}
        </button>
    );
}