import Button from '@/ui/Button/Button';
import './main-welcome-block.scss';
import type { ModalState } from '@/types/modal-state.types';

interface IMainWelcomeBlockProps {
    onOpenModal: (modal: ModalState) => void;
}

const MainWelcomeBlock = ({ onOpenModal }: IMainWelcomeBlockProps) => {
    return (
        <div className="container main">
            <h1 className="main__title">Простой и мощный таск-менеджер</h1>
            <h2 className="main__subtitle">Ваши задачи — <br/><span>под контролем</span></h2>
            <p className="main__desc">Организуйте задачи по категориям, отслеживайте прогресс и ничего не упускайте из виду. Просто и без лишнего.</p>
            <div className="main__btns">
                <Button onClick={() => onOpenModal({ type: 'register' })} variant='accent' size='big'>Создать аккаунт</Button>
                <Button onClick={() => onOpenModal({ type: 'login' })} variant='transparent' size='big'>Войти в систему</Button>
            </div>
        </div>
    );
};

export default MainWelcomeBlock;