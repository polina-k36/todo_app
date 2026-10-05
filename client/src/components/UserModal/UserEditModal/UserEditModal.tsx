import Modal from '@/components/Modal/Modal';
import UserInfoForm from '../UserInfoForm/UserInfoForm';
import UserSecurityForm from '../UserSecurityForm/UserSecurityForm';
import AvatarIcon from '@/assets/icons/icon-avatar.svg?react';
import LockIcon from '@/assets/icons/icon-lock.svg?react';
import LogoutIcon from '@/assets/icons/icon-logout.svg?react';
import TabButton from '@/ui/TabButton/TabButton';
import type { IEditInfoUser, IEditPassword, IUser } from '@/types/user.types';
import { useState } from 'react';
import SuccessUpdateUser from '@/components/SuccessUpdateUser/SuccessUpdateUser';

interface IUserEditModalProps {
  user: IUser;
  submitInfoUser: (data: IEditInfoUser) => Promise<void>;
  submitPassword: (data: IEditPassword) => Promise<void>;
  onCloseModal: () => void;
  onLogout: () => void;
}

const UserEditModal = ({
  user,
  submitInfoUser,
  submitPassword,
  onCloseModal,
  onLogout,
}: IUserEditModalProps) => {
  const [activeTab, setActiveTab] = useState<
    'security' | 'info' | 'success-security' | 'success-info'
  >('info');

  const onSubmitInfoUser = (data: IEditInfoUser) => {
    submitInfoUser(data).then(() => {
      setActiveTab('success-info');
    });
  };

  const onSubmitPassword = (data: IEditPassword) => {
    submitPassword(data).then(() => {
      setActiveTab('success-security');
    });
  };

  return (
    <Modal size="very-big" onCloseModal={onCloseModal} bodyPadding="0px">
      <div className="flex w-full flex-col sm:min-h-[32rem] sm:flex-row">
        <div className="flex w-full shrink-0 flex-col gap-4 bg-[rgba(79,70,229,0.7)] p-4 sm:w-1/3 sm:gap-5 sm:rounded-l-xl">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#4F46E5] font-bold text-[#FFFFFF]">
            {user.name.slice(0, 2).toLocaleUpperCase()}
          </div>
          <div className="text-sm text-[#7A7669] [&_span]:mb-3 [&_span]:text-base [&_span]:font-bold [&_span]:text-[#1A1917]">
            <span>{user.name}</span>
            <p>{user.login}</p>
          </div>
          <div className="flex flex-1 flex-col gap-2.5">
            <TabButton
              id="info"
              activeId={activeTab}
              icon={<AvatarIcon />}
              title="Личная информация"
              onClickTab={() => setActiveTab('info')}
            />
            <TabButton
              id="security"
              activeId={activeTab}
              icon={<LockIcon />}
              title="Безопасность"
              onClickTab={() => setActiveTab('security')}
            />
          </div>
          <TabButton
            transparent
            icon={<LogoutIcon />}
            title="Выйти из аккаунта"
            onClickTab={onLogout}
          />
        </div>
        <div className="min-w-0 flex-1 p-4 sm:p-6">
          <div
            className=""
            style={{
              display: `${activeTab === 'info' || activeTab === 'success-info' ? 'block' : 'none'}`,
            }}
          >
            <div className="flex items-start justify-between border-b border-[#E2E0D8] pt-0 pr-1 pb-5 pl-1">
              <div className="flex flex-col gap-1 text-sm text-[#7A7669] [&_span]:text-base [&_span]:font-bold [&_span]:text-[#1A1917]">
                <span>Личная информация</span>
                <p>Обновите информацию вашего аккаунта</p>
              </div>
              <div
                className="mt-[5px] block cursor-pointer text-3xl leading-[0] font-black text-[#A1A1A1] [transition:all_0.5s] hover:[transform:rotate(180deg)] hover:text-[#1A1917]"
                onClick={onCloseModal}
              >
                &times;
              </div>
            </div>
            {activeTab === 'info' ? (
              <UserInfoForm user={user} onSubmitData={onSubmitInfoUser} />
            ) : activeTab === 'success-info' ? (
              <SuccessUpdateUser
                title="Информация успешно изменена!"
                subtitle="Меняйте имя и логин в любой удобный для вас момент."
                btnText="Изменить информацию снова"
                onBackPrev={() => setActiveTab('info')}
                onCloseModal={onCloseModal}
              />
            ) : null}
          </div>
          <div
            className=""
            style={{
              display: `${activeTab === 'security' || activeTab === 'success-security' ? 'block' : 'none'}`,
            }}
          >
            <div className="flex items-start justify-between border-b border-[#E2E0D8] pt-0 pr-1 pb-5 pl-1">
              <div className="flex flex-col gap-1 text-sm text-[#7A7669] [&_span]:text-base [&_span]:font-bold [&_span]:text-[#1A1917]">
                <span>Безопасность</span>
                <p>Управляйте паролем для защиты вашего аккаунта</p>
              </div>
              <div
                className="mt-[5px] block cursor-pointer text-3xl leading-[0] font-black text-[#A1A1A1] [transition:all_0.5s] hover:[transform:rotate(180deg)] hover:text-[#1A1917]"
                onClick={onCloseModal}
              >
                &times;
              </div>
            </div>
            {activeTab === 'security' ? (
              <UserSecurityForm onSubmitData={onSubmitPassword} />
            ) : activeTab === 'success-security' ? (
              <SuccessUpdateUser
                title="Пароль успешно изменён!"
                subtitle="Теперь ваш аккаунт надежно защищён."
                btnText="Изменить пароль снова"
                onBackPrev={() => setActiveTab('security')}
                onCloseModal={onCloseModal}
              />
            ) : null}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default UserEditModal;
