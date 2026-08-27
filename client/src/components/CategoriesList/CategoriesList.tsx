import type { ICategory } from '@/types/category.types';
import CategoryStatsCard from '@/ui/CategoryStatsCard/CategoryStatsCard';

import './categories-list.scss';

interface ICategoriesListProps {
    allTasksCount: number;
    categories: ICategory[]
}

const CategoriesList = ({allTasksCount, categories}: ICategoriesListProps) => {
    return (
        <div className="categories-list">
            <p className="form-group__label">по категориям</p>
            <div className="categories-list__panel">
                {
                    categories.map((category, i) => (
                        <CategoryStatsCard 
                            key={category.id}  
                            allTasksCount={allTasksCount} 
                            category={category}
                            border={(i !== categories.length - 1) ? 'bottom' : 'none'}/>
                    ))
                }
            </div>
            
        </div>
    );
};

export default CategoriesList;