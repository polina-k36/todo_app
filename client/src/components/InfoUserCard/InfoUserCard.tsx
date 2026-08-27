import Button from '@/ui/Button/Button';
import EditIcon from '@/assets/icons/icon-edit.svg?react'


import './info-user-card.scss';
import type { IUser } from '@/types/user.types';

interface InfoUserCardProps {
    user: IUser,
    onEditUser: () => void;
}

const InfoUserCard = ({user, onEditUser}: InfoUserCardProps) => {
    return (
        <div className='info-user-card'>
            <div className="info-user-card__avatar">
                {user.name.slice(0, 2).toLocaleUpperCase()}
            </div>
            <div className="info-user-card__info">
                <p className="info-user-card__info_name">{user.name}</p>
                <p className="info-user-card__info_login">{user.login}</p>
                <p className="info-user-card__info_date">В системе с {user.createdAt}</p>
            </div>
            <Button size='modal-btn' variant='accent' onClick={onEditUser}>
                <EditIcon className="modal-task__footer_icon"/> <p className="modal-task__footer_btn">Редактировать</p> 
            </Button>
            
        </div>
    );
};

export default InfoUserCard;