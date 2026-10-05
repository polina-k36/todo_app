import Button from '@/ui/Button/Button';
import EditIcon from '@/assets/icons/icon-edit.svg?react';
import type { IUser } from '@/types/user.types';

interface InfoUserCardProps {
  user: IUser;
  onEditUser: () => void;
}

const InfoUserCard = ({ user, onEditUser }: InfoUserCardProps) => {
  return (
    <div className="flex w-full items-start justify-between gap-6 rounded-2xl border border-[#E2E0D8] bg-[#FFFFFF] p-6">
      <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[#4F46E5] text-2xl text-[#FFFFFF]">
        {user.name.slice(0, 2).toLocaleUpperCase()}
      </div>
      <div className="flex flex-1 flex-col justify-between gap-2.5 text-[#7A7669]">
        <p className="text-2xl font-bold text-[#1A1917]">{user.name}</p>
        <p className="text-sm font-normal">{user.login}</p>
        <p className="text-xs font-medium">В системе с {user.createdAt}</p>
      </div>
      <Button size="modal-btn" variant="accent" onClick={onEditUser}>
        <EditIcon className="h-5 w-5" /> <p className="ml-2.5">Редактировать</p>
      </Button>
    </div>
  );
};

export default InfoUserCard;
