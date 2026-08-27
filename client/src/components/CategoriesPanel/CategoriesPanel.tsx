import CategoryButton from "@/ui/CategoryButton/CategoryButton";
import type { ICategory } from "@/types/category.types";
import './categories-panel.scss';
import Button from "@/ui/Button/Button";

interface ICategoriesPanelProps { 
    countAllTasks: number;
    activeCategoryId: number;
    categories: ICategory[];
    changeCategory: (id: number) => void;
    onClickSettings: () => void; 
}


const CategoriesPanel = ({categories, countAllTasks, activeCategoryId, changeCategory, onClickSettings}: ICategoriesPanelProps) => {   

    return (
        <div className="categories-panel">
            <CategoryButton activeId={activeCategoryId} onClickCategory={changeCategory} id={0} title="Все" count={countAllTasks} variant="all" />
            <div className="categories-panel__main">
                {
                    categories.map(category => 
                        <CategoryButton activeId={activeCategoryId} onClickCategory={changeCategory} 
                                        id={category.id} key={category.id} title={category.name} 
                                        icon={category.iconKey} count={category.tasksCount} color={category.color} />
                    )
                }
            </div>
            <Button size="navigate" variant="transparent" onClick={onClickSettings}>+</Button>
            
        </div>
    );
};

export default CategoriesPanel;