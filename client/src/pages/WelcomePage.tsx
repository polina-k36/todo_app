import Button from '@/ui/Button/Button';
import FeatureCard from '@/components/FeatureCard/FeatureCard';
import Logo from '@/ui/Logo/Logo';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { welcomeFeatures } from '@/data/welcome-page';
import MainWelcomeBlock from '@/components/MainWelcomeBlock/MainWelcomeBlock';
import AuthForm from '@/components/AuthForm/AuthForm';
import { useState } from 'react';
import type { AuthMode, LoginData, RegisterData } from '@/types/auth.types';
import type { WelcomeModalState } from '@/types/modal-state.types';
import { ApiError } from '@/api/errors/api-error';
import Modal from '@/components/Modal/Modal';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/auth/useAuth';

const WelcomePage = () => {
  const [modal, setModal] = useState<WelcomeModalState>(null);
  const { user, login, register } = useAuth();
  const navigate = useNavigate();

  const setModalState = (state: WelcomeModalState) => {
    setModal(state);
  };

  const handleAuth = async (mode: AuthMode, body: RegisterData | LoginData) => {
    try {
      if (mode === 'login') {
        await login(body);
        setModal({
          type: 'message',
          message: `Рады видеть вас снова, ${user?.name}!`,
          title: `Авторизация`,
        });
        navigate('/');
      } else if (mode == 'register' && 'name' in body) {
        await register(body);
        setModal({
          type: 'message',
          message: `Добро пожаловать, ${user?.name}\nРегистрация прошла успешно!`,
          title: `Регистрация`,
        });
        navigate('/');
      }
    } catch (error) {
      if (error instanceof ApiError) {
        setModal({
          type: 'message',
          message: error.message,
          title: error.title,
        });
      } else {
        setModal({
          type: 'message',
          message:
            'Возникла непредвиденная ошибка. Проблема уже решается, пожалуйста обновите страницу. ',
          title: 'Непредвиденная ошибка',
        });
      }
    }
  };

  return (
    <>
      <Header>
        <Logo />
        <div className="flex items-center gap-2 sm:gap-3">
          <Button
            onClick={() => setModal({ type: 'login' })}
            variant="transparent"
            size="small"
          >
            Войти
          </Button>
          <Button
            onClick={() => setModal({ type: 'register' })}
            variant="accent"
            size="small"
          >
            Начать бесплатно
          </Button>
        </div>
      </Header>

      <main>
        <MainWelcomeBlock onOpenModal={setModal} />

        <div className="grid grid-cols-1 gap-10 bg-[#FFFFFF] px-4 py-12 sm:grid-cols-2 sm:gap-8 sm:px-6 lg:grid-cols-3 lg:gap-12 lg:px-8 lg:py-16">
          {welcomeFeatures.map((feature) => (
            <FeatureCard
              key={feature.id}
              icon={feature.icon}
              title={feature.title}
              desc={feature.desc}
            />
          ))}
        </div>
      </main>

      <Footer />

      {modal !== null &&
      (modal.type === 'login' || modal.type === 'register') ? (
        <AuthForm
          mode={modal.type}
          onCloseModal={() => setModal(null)}
          onChangeModalMode={setModalState}
          onSubmitForm={handleAuth}
        />
      ) : null}

      {modal !== null && modal.type === 'message' ? (
        <Modal
          size="small"
          header={modal.title}
          onCloseModal={() => setModal(null)}
        >
          <div
            style={{
              textAlign: 'center',
            }}
          >
            {modal.message}
          </div>
        </Modal>
      ) : null}
    </>
  );
};

export default WelcomePage;
