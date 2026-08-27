import EditIcon from '@/assets/icons/icon-edit.svg?react';
import DeleteIcon from '@/assets/icons/icon-delete.svg?react';
import type { ICategory } from '@/types/category.types';
import './category-stats-card.scss';
import ProgressBar from '../ProgressBar/Progressbar';


interface ICategoryStatsCardProps {
    allTasksCount: number;
    border: 'none' | 'bottom';
    category: ICategory;
}


const CategoryStatsCard = ({allTasksCount, category, border}: ICategoryStatsCardProps) => {

    const {name, iconKey, color, tasksCount} = category;

    const count = tasksCount ?? 0;

    const percent = ( typeof Math.round(count / allTasksCount*100) === 'number'
                          && Math.round(count / allTasksCount*100) !== Infinity 
                          && !isNaN(Math.round(count / allTasksCount*100))) 
                        ? Math.round(count / allTasksCount*100) : 0;

    
    const colorCategory = color ?? '#4F46E5';
    const colorBackground =  `color-mix(in srgb, ${colorCategory} 10%, transparent)`;
    return (
        <div className={`category-stats-card border-${border}`}>
            <div className="category-stats-card__icon" style={{background: `${colorBackground}`}}>
                <img src={iconKey} />
            </div>
            <div className="category-stats-card__title" >
                {name}
            </div>
            <div className="category-stats-card__progress"><ProgressBar percent={percent} color={color}/></div>
            <div className="category-stats-card__count" style={{ color: `${colorCategory}` }}>{count}</div>
        </div>
    );
};

export default CategoryStatsCard;