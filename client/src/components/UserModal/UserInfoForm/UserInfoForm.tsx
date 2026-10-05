import ModalInput from '@/ui/ModalFields/ModalInput';
import { useState } from 'react';
import Button from '@/ui/Button/Button';
import type { IEditInfoUser } from '@/types/user.types';

interface IUserInfoFormProps {
  user: IEditInfoUser;
  onSubmitData: (data: IEditInfoUser) => void;
}

const UserInfoForm = ({ user, onSubmitData }: IUserInfoFormProps) => {
  const [nameValue, setNameValue] = useState(user.name);
  const [loginValue, setLoginValue] = useState(user.login);

  const submitData = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSubmitData({
      name: nameValue,
      login: loginValue,
    });
  };

  return (
    <form
      id="user-info-form"
      className="flex flex-col items-center justify-center gap-3 pt-6 pb-6 sm:gap-4"
      onSubmit={submitData}
    >
      <ModalInput
        name="name"
        label="имя"
        required
        value={nameValue}
        placeholder="Имя пользователя"
        onChange={(e) => setNameValue(e.currentTarget.value)}
      />
      <ModalInput
        name="login"
        label="логин"
        required
        value={loginValue}
        placeholder="Логин"
        onChange={(e) => setLoginValue(e.currentTarget.value)}
      />
      <Button type="submit" form="user-info-form" size="max" variant="accent">
        Сохранить изменения
      </Button>
    </form>
  );
};

export default UserInfoForm;
