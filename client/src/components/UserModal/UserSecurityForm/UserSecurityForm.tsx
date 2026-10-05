import ModalInput from '@/ui/ModalFields/ModalInput';
import Button from '@/ui/Button/Button';
import { useState } from 'react';
import type { IEditPassword } from '@/types/user.types';

interface IUserSecurityFormProps {
  onSubmitData: (data: IEditPassword) => void;
}

const UserSecurityForm = ({ onSubmitData }: IUserSecurityFormProps) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  //сделать оценку сложности пароля снизу с полосками как бы

  const submitData = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSubmitData({
      currentPassword,
      newPassword,
      confirmPassword,
    });
    console.log({
      currentPassword,
      newPassword,
      confirmPassword,
    });
  };

  return (
    <form
      id="user-security-form"
      className="flex flex-col items-center justify-center gap-3 pt-6 pb-6 sm:gap-4"
      onSubmit={submitData}
    >
      <ModalInput
        name="current-password"
        label="текущий пароль"
        required
        value={currentPassword}
        placeholder="******"
        onChange={(e) => setCurrentPassword(e.currentTarget.value)}
      />
      <div className="h-px w-full bg-[#E2E0D8]"></div>
      <ModalInput
        name="new-password"
        label="новый пароль"
        required
        value={newPassword}
        placeholder="Минимум 8 символов"
        onChange={(e) => setNewPassword(e.currentTarget.value)}
      />
      <ModalInput
        name="confirmed-password"
        label="подтвердите пароль"
        required
        value={confirmPassword}
        placeholder="Повторите новый пароль"
        onChange={(e) => setConfirmPassword(e.currentTarget.value)}
      />
      <Button
        type="submit"
        form="user-security-form"
        size="max"
        variant="accent"
      >
        Изменить пароль
      </Button>
    </form>
  );
};

export default UserSecurityForm;
