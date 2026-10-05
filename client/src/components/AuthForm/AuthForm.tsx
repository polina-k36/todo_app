import Modal from '../Modal/Modal';
import ModalInput from '@/ui/ModalFields/ModalInput';
import Button from '@/ui/Button/Button';
import { useState } from 'react';
import type { AuthMode, LoginData, RegisterData } from '@/types/auth.types';
import type { WelcomeModalState } from '@/types/modal-state.types';

interface IAuthFormProps {
  mode: AuthMode;
  onCloseModal: () => void;
  onChangeModalMode: (modal: WelcomeModalState) => void;
  onSubmitForm: (mode: AuthMode, data: LoginData | RegisterData) => void;
}

const AuthForm = ({
  mode,
  onCloseModal,
  onChangeModalMode,
  onSubmitForm,
}: IAuthFormProps) => {
  const [username, setUsername] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const submitData = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (mode === 'login') {
      onSubmitForm(mode, {
        login,
        password,
      });
      return;
    }

    onSubmitForm(mode, {
      name: username,
      login,
      password,
    });
  };

  return (
    <Modal
      size="small"
      onCloseModal={onCloseModal}
      header={
        <div className="">
          <div className="text-xs font-medium text-[#4F46E5] uppercase">
            &#8594; {mode === 'login' ? 'Вход' : 'Регистрация'}
          </div>
          <div className="mt-2 text-2xl font-bold text-[#1A1917]">
            {mode === 'login' ? 'С возвращением' : 'Создать аккаунт'}
          </div>
        </div>
      }
    >
      <form
        className="flex w-full flex-col justify-center gap-5"
        onSubmit={submitData}
      >
        {mode === 'login' ? null : (
          <ModalInput
            required
            value={username}
            onChange={(e) => setUsername(e.currentTarget.value)}
            name="username"
            label="имя"
            placeholder="Диана Орлова"
            type="text"
          />
        )}
        <ModalInput
          required
          value={login}
          onChange={(e) => setLogin(e.currentTarget.value)}
          name="login"
          label="логин"
          placeholder="alex_login"
          type="text"
        />
        <ModalInput
          required
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
          name="password"
          label="пароль"
          placeholder="********"
          type="password"
          autoComplete="current-password"
        />
        <Button type="submit" variant="accent" size="big">
          {mode === 'login' ? 'Войти' : 'Создать аккаунт'}
        </Button>
        <div className="text-center text-sm text-[#7A7669] [&_span]:cursor-pointer [&_span]:font-bold [&_span]:text-[#4F46E5] [&_span]:underline [&_span]:[transition:all_0.2s] [&_span:hover]:[opacity:0.8]">
          {mode === 'login' ? 'Нет аккаунта? ' : 'Уже есть аккаунт? '}
          {mode === 'login' ? (
            <span onClick={() => onChangeModalMode({ type: 'register' })}>
              Зарегистрироваться
            </span>
          ) : (
            <span onClick={() => onChangeModalMode({ type: 'login' })}>
              Войти
            </span>
          )}
        </div>
      </form>
    </Modal>
  );
};

export default AuthForm;
