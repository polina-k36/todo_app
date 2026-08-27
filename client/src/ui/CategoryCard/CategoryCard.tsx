import EditIcon from '@/assets/icons/icon-edit.svg?react';
import DeleteIcon from '@/assets/icons/icon-delete.svg?react';

import './category-card.scss';

interface IBaseCategoryCardProps {
    title: string;
    iconPath: string;
    tasksCount: number;
    color: string;
    preview: false;
    onClickEditBtn: () => void;
    onClickDeleteBtn: () => void;
}

interface IPreviewCategoryCardProps {
    title: string;
    iconPath: string;
    tasksCount?: never;
    color: string;
    preview: true;
    onClickEditBtn?: never;
    onClickDeleteBtn?: never;
}


type ICategoryCardProps = IBaseCategoryCardProps | IPreviewCategoryCardProps;

const getFormText = (count: number): string => {
    if (count === 1) return 'задача';
    if (count >= 2 && count <= 4 ) return 'задачи';
    return 'задач';
}

const CategoryCard = ({title, iconPath, tasksCount, color, preview, onClickEditBtn, onClickDeleteBtn}:ICategoryCardProps ) => {

    
    const colorCategory = color;
    const colorBackground =  `color-mix(in srgb, ${colorCategory} 10%, transparent)`;

    
    return (
        <div className={`category-card ${preview ? 'category-card-preview' : 'category-card-base'}`}>
            <div className="category-card__icon" style={{background: `${colorBackground}`}}>
                <img src={iconPath} />
            </div>
            <div className="category-card__info">
                <div className="category-card__info_title"
                     style={{
                        color: `${preview ? color : ''}`
                     }}>{title}</div>
                <div className="category-card__info_subtitle">{preview ? 'Предпросмотр' : `${tasksCount} ${getFormText(tasksCount)}`}</div> {/*поменять задачи на правильное использование*/}
            </div>
            {
                preview 
                ? null
                : <>
                    <div className="category-card__color" style={{background: `${colorCategory}`}}></div>
                    <div className="category-card__navigate">
                        <button className="icon-btn" onClick={onClickEditBtn}>
                            <EditIcon/>
                        </button>
                        <button className="icon-btn icon-btn-red" onClick={onClickDeleteBtn}><DeleteIcon/></button>                
                    </div>
                  </>
            }
            
        </div>
    );
};

export default CategoryCard;