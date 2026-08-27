import Modal from '@/components/Modal/Modal';
import UserInfoForm from '../UserInfoForm/UserInfoForm';
import UserSecurityForm from '../UserSecurityForm/UserSecurityForm';
import AvatarIcon from '@/assets/icons/icon-avatar.svg?react';
import LockIcon from '@/assets/icons/icon-lock.svg?react';
import LogoutIcon from '@/assets/icons/icon-logout.svg?react';


import './user-edit-modal.scss';
import TabButton from '@/ui/TabButton/TabButton';
import type { IEditInfoUser, IEditPassword, IUser } from '@/types/user.types';
import { useState } from 'react';
import SuccessUpdateUser from '@/components/SuccessUpdateUser/SuccessUpdateUser';

interface IUserEditModalProps {
    user: IUser;
    submitInfoUser: (data: IEditInfoUser) => Promise<void>;
    submitPassword: (data: IEditPassword) => Promise<void>;
    onCloseModal: () => void; 
    onLogout: () => void;
}

const UserEditModal = ({user, submitInfoUser, submitPassword, onCloseModal, onLogout}: IUserEditModalProps) => {

    const [activeTab, setActiveTab] = useState<'security' | 'info' | 'success-security' | 'success-info'>('info');

    const onSubmitInfoUser = (data: IEditInfoUser) => {
        submitInfoUser(data).then(() => {
            setActiveTab('success-info');  
        })
    }

    const onSubmitPassword = (data: IEditPassword) => {
        submitPassword(data).then(() => {
            setActiveTab('success-security');
        })  
    }


    return (

        <Modal size="very-big" onCloseModal={onCloseModal} bodyPadding='0px'>
            <div className="user-edit-modal">
                <div className="user-edit-modal__sidebar">
                    <div className="user-edit-modal__sidebar_avatar">{user.name.slice(0, 2).toLocaleUpperCase()}</div>
                    <div className="user-edit-modal__sidebar_info">
                        <span>{user.name}</span>
                        <p>{user.login}</p>
                    </div>
                    <div className="user-edit-modal__sidebar_nav">
                        <TabButton id='info' activeId={activeTab} icon={<AvatarIcon/>} title='Личная информация' onClickTab={() => setActiveTab('info')}/>
                        <TabButton id='security' activeId={activeTab} icon={<LockIcon/>} title='Безопасность' onClickTab={() => setActiveTab('security')}/>
                    </div>
                    <TabButton transparent icon={<LogoutIcon/>} title='Выйти из аккаунта' onClickTab={onLogout}/>
                </div>
                <div className="user-edit-modal__content">
                    <div className="user-edit-modal__content_info" style={{display: `${activeTab === 'info' || activeTab === 'success-info' ? 'block' : 'none'}`}}>
                        <div className="user-edit-modal__content_header">

                            <div className="user-edit-modal__content_header_title">
                                <span>Личная информация</span>
                                <p>Обновите информацию вашего аккаунта</p>
                            </div>
                            <div className="user-edit-modal__content_header_cross" onClick={onCloseModal}>&times;</div>
                        </div>
                        {
                            activeTab === 'info' 
                            ? <UserInfoForm user={user} onSubmitData={onSubmitInfoUser}/>
                            : activeTab === 'success-info'
                            ? <SuccessUpdateUser title='Информация успешно изменена!' subtitle='Меняйте имя и логин в любой удобный для вас момент.'
                                                 btnText='Изменить информацию снова' onBackPrev={() => setActiveTab('info')} onCloseModal={onCloseModal}/>
                            : null   
                        }
                        
                        
                    </div>
                    <div className="user-edit-modal__content_security" style={{display: `${activeTab === 'security' || activeTab === 'success-security' ? 'block' : 'none'}`}}> 
                        <div className="user-edit-modal__content_header">

                            <div className="user-edit-modal__content_header_title">
                                <span>Безопасность</span>
                                <p>Управляйте паролем для защиты вашего аккаунта</p>
                            </div>
                            <div className="user-edit-modal__content_header_cross" onClick={onCloseModal}>&times;</div>
                        </div>
                        {
                            activeTab === 'security'
                            ? <UserSecurityForm onSubmitData={onSubmitPassword}/>
                            : activeTab === 'success-security'
                            ? <SuccessUpdateUser title='Пароль успешно изменён!' subtitle='Теперь ваш аккаунт надежно защищён.'
                                                 btnText='Изменить пароль снова' 
                                                 onBackPrev={() => setActiveTab('security')} onCloseModal={onCloseModal}/>
                            : null
                        }
                    </div>
                        
                    
                </div>
            </div>
        </Modal>
    );
};

export default UserEditModal;