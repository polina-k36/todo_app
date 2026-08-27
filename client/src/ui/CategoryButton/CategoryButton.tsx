import './category-button.scss';


interface ICategoryButtonProps {
    id?: number;
    icon?: string | undefined;
    title: string;
    count?: number;
    variant?: 'all';
    color?: string;
    onClickCategory?: (id: number) => void;
    activeId?: number; 
}


const CategoryButton = ({id, icon, title, count, variant, activeId, color, onClickCategory}: ICategoryButtonProps) => {

    const colorCategory = color ?? '#4F46E5';
    const colorBackground =  `color-mix(in srgb, ${colorCategory} 10%, transparent)`;

    return (
        <div data-id={id} 
             className={`category-button`} 
             style={{
                background: (activeId !== undefined && activeId === id) ? colorCategory : colorBackground, 
                color: (activeId !== undefined && activeId === id) ? '#FFFFFF': colorCategory
             }}
             onClick={e => {
                    const id = e.currentTarget.getAttribute('data-id');
                    if (id && onClickCategory) onClickCategory(+id);
                }}>
            {(variant !== 'all') ? <img src={icon} alt="" className="category-button__icon" /> : null}
            <p className="category-button__title">{title}</p>
            {count ? <div className="category-button__count">{count}</div> : null}            
        </div>
    );
};

export default CategoryButton;