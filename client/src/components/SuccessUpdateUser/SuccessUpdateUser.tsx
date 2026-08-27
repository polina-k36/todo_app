import './success-update-user.scss';
import Button from '@/ui/Button/Button';

interface ISuccessUpdateUserProps {
    title: string;
    subtitle: string;
    btnText: string;
    onBackPrev: () => void;
    onCloseModal: () => void;
}

const SuccessUpdateUser = ({title, subtitle, btnText, onBackPrev, onCloseModal}: ISuccessUpdateUserProps) => {
    return (
        <div className='success-block'>
            <div className="success-block__icon">
                <div className="success-block__icon_circle">
                    ✔
                </div>
            </div>
            <div className="success-block__text">
                <p className="success-block__text_title">{title}</p>
                <p className="success-block__text_subtitle">{subtitle}</p>
            </div>
            <Button size='modal-btn' variant='transparent-accent' onClick={onCloseModal}>Вернуться к профилю</Button>
            <Button size='max' variant='transparent' color='#4F46E5' onClick={onBackPrev}>{btnText}</Button>
        </div>
    );
};

export default SuccessUpdateUser;