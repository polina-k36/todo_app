import Button from '@/ui/Button/Button';
import type { WelcomeModalState } from '@/types/modal-state.types';

interface IMainWelcomeBlockProps {
  onOpenModal: (modal: WelcomeModalState) => void;
}

const MainWelcomeBlock = ({ onOpenModal }: IMainWelcomeBlockProps) => {
  return (
    <div className="flex flex-col items-center border-b border-[#E2E0D8] px-4 py-14 text-center sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <h1 className="rounded-full border border-[#C7D2FE] bg-[#EEF2FF] px-3 py-1.5 text-sm text-[#4F46E5] sm:text-base">
        Простой и мощный таск-менеджер
      </h1>
      <h2 className="mt-7 text-4xl leading-tight font-semibold sm:mt-8 sm:text-6xl lg:text-7xl [&_span]:text-[#4F46E5]">
        Ваши задачи — <br />
        <span>под контролем</span>
      </h2>
      <p className="mt-5 max-w-2xl text-center text-base leading-7 text-[#7A7669] sm:mt-6 sm:text-lg lg:text-xl">
        Организуйте задачи по категориям, отслеживайте прогресс и ничего не
        упускайте из виду. Просто и без лишнего.
      </p>
      <div className="mt-8 flex w-full flex-col gap-3 sm:mt-10 sm:w-auto sm:flex-row sm:gap-4">
        <Button
          onClick={() => onOpenModal({ type: 'register' })}
          variant="accent"
          size="big"
        >
          Создать аккаунт
        </Button>
        <Button
          onClick={() => onOpenModal({ type: 'login' })}
          variant="transparent"
          size="big"
        >
          Войти в систему
        </Button>
      </div>
    </div>
  );
};

export default MainWelcomeBlock;
