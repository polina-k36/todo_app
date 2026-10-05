import { useAuth } from '@/auth/useAuth';
import Header from '@/components/Header/Header';
import Button from '@/ui/Button/Button';
import Logo from '@/ui/Logo/Logo';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const { isAuthorized } = useAuth();
  const navigate = useNavigate();
  const homeLabel = isAuthorized
    ? 'Вернуться к задачам'
    : 'Вернуться на главную';

  return (
    <div className="flex min-h-screen flex-col bg-[#F5F4F0]">
      <Header>
        <Logo />
        <div className="flex items-center gap-2 sm:gap-3">
          {isAuthorized ? (
            <Button
              onClick={() => navigate('/account')}
              variant="transparent"
              size="small"
            >
              Профиль
            </Button>
          ) : null}
          <Button onClick={() => navigate('/')} variant="accent" size="small">
            <span className="hidden sm:inline">{homeLabel}</span>
            <span className="sm:hidden">На главную</span>
          </Button>
        </div>
      </Header>

      <main className="flex flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <section className="flex w-full max-w-3xl flex-col items-center text-center">
          <div className="relative mb-6 sm:mb-8">
            <span className="absolute inset-x-0 bottom-2 text-8xl font-black text-[#E2E0D8] blur-[1px] sm:text-9xl">
              404
            </span>
            <div className="relative text-8xl leading-none font-black tracking-tight text-[#4F46E5] sm:text-9xl">
              404
            </div>
          </div>

          <span className="rounded-full border border-[#C7D2FE] bg-[#EEF2FF] px-3 py-1 text-xs font-semibold tracking-wide text-[#4F46E5] uppercase sm:text-sm">
            Похоже, потерялись
          </span>
          <h1 className="mt-4 text-2xl font-bold text-[#1A1917] sm:text-3xl lg:text-4xl">
            Страница не найдена
          </h1>
          <p className="mt-3 max-w-lg text-sm leading-6 text-[#7A7669] sm:text-base">
            Похоже, вы забрели не туда. Давайте вернёмся на правильный путь —
            задачи уже ждут.
          </p>

          <div className="mt-7 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button onClick={() => navigate('/')} variant="accent" size="big">
              {homeLabel}
            </Button>
            <Button
              onClick={() => navigate(-1)}
              variant="transparent"
              size="big"
            >
              Назад
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default NotFoundPage;
