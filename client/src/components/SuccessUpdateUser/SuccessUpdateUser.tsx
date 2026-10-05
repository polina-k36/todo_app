import Button from '@/ui/Button/Button';

interface ISuccessUpdateUserProps {
  title: string;
  subtitle: string;
  btnText: string;
  onBackPrev: () => void;
  onCloseModal: () => void;
}

const SuccessUpdateUser = ({
  title,
  subtitle,
  btnText,
  onBackPrev,
  onCloseModal,
}: ISuccessUpdateUserProps) => {
  return (
    <div className="flex flex-col items-center gap-3 pt-5 pb-5">
      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[color-mix(in_srgb,_#059669_20%,_transparent)]">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[color-mix(in_srgb,_#059669_50%,_transparent)] text-lg font-medium text-[#FFFFFF]">
          ✔
        </div>
      </div>
      <div className="flex flex-col items-center">
        <p className="text-base font-bold text-[#1A1917]">{title}</p>
        <p className="mt-[5px] text-sm text-[#7A7669]">{subtitle}</p>
      </div>
      <Button
        size="modal-btn"
        variant="transparent-accent"
        onClick={onCloseModal}
      >
        Вернуться к профилю
      </Button>
      <Button
        size="max"
        variant="transparent"
        color="#4F46E5"
        onClick={onBackPrev}
      >
        {btnText}
      </Button>
    </div>
  );
};

export default SuccessUpdateUser;
