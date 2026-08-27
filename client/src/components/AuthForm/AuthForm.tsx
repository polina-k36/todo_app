import Modal from '../Modal/Modal';
import ModalInput from '@/ui/ModalFields/ModalInput';
import Button from '@/ui/Button/Button';
import './auth-form.scss';
import { useState } from 'react';
import type { AuthMode, LoginData, RegisterData } from '@/types/auth.types';
import type { ModalState } from '@/types/modal-state.types';


interface IAuthFormProps {
    mode: AuthMode;
    onCloseModal: () => void;
    onChangeModalMode: (modal: ModalState) => void;
    onSubmitForm: (mode: AuthMode, data: LoginData | RegisterData) => void;
}


const AuthForm = ({ mode, onCloseModal, onChangeModalMode, onSubmitForm }: IAuthFormProps) => {
    const [username, setUsername] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const submitData = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (mode === 'login') {
            onSubmitForm(mode, {
                login, password
            });
            return;
        }

        onSubmitForm(mode, {
            name: username, login, password
        });
    }

    return (
        <Modal
            size='small'
            onCloseModal= {onCloseModal}
            header={
                <div className='auth-header'>
                    <div className="auth-header__title">
                        &#8594; { (mode === 'login') ? 'Вход' : 'Регистрация' }
                    </div>
                    <div className="auth-header__subtitle">                        
                        { (mode === 'login') ? 'С возвращением' : 'Создать аккаунт' }
                    </div>
                </div>
            }
        >
            <form className="auth-body" onSubmit={submitData} >
                { 
                    (mode === 'login') 
                    ? null 
                    : <ModalInput 
                        required 
                        value={username} 
                        onChange={e => setUsername(e.currentTarget.value)} 
                        name='username' label='имя' placeholder='Диана Орлова' 
                        type='text'/> 
                }
                <ModalInput 
                    required 
                    value={login} 
                    onChange={e => setLogin(e.currentTarget.value)} 
                    name='login' label='логин' placeholder='alex_login' 
                    type='text'/>
                <ModalInput 
                    required 
                    value={password} 
                    onChange={e => setPassword(e.currentTarget.value)} 
                    name='password' label='пароль' placeholder='********' 
                    type='password' autoComplete='current-password'/>
                <Button type='submit' variant='accent' size='big'>{ (mode === 'login') ? 'Войти' : 'Создать аккаунт' }</Button>
                <div className="auth-footer">
                    { (mode === 'login') ? 'Нет аккаунта? ' : 'Уже есть аккаунт? ' }                    
                    { 
                        (mode === 'login') 
                        ? <span onClick={() => onChangeModalMode({ type: 'register' })}>
                            Зарегистрироваться
                        </span> 
                        : <span onClick={() => onChangeModalMode({ type: 'login' })}>
                            Войти
                        </span> 
                    }
                </div>
            </form>
        </Modal>
    );
};

export default AuthForm;