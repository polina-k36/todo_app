import { useEffect, useRef, type ReactNode } from 'react';
import type { IDueDateRange } from '@/utils/create-date';
import type { IDueDateInfo } from '@/types/filters.types';

interface IOptionInfo {
  nodeOption: ReactNode;
  value: string | null | IDueDateRange;
  activeValue: string | null | IDueDateInfo;
}

interface IDropdownProps {
  header: ReactNode;
  bodyInfo: Record<string, IOptionInfo[]>;
  targetId: string;
  onClickOption: (filter: string, value: string | null | IDueDateInfo) => void;
  onClose: () => void;
}

const Dropdown = ({
  header,
  bodyInfo,
  targetId,
  onClickOption,
  onClose,
}: IDropdownProps) => {
  //TODO состотяния для каждого фильтра - при смене состояния
  // общая функция для передачи массива всех фильтров (состояний)
  // передавать в объекте функцию для нажатия тогда состояние должно быть не здесь
  // какой нужен объект для формирования каждой категории
  //в функции мы передаем выше объект {filter, value} выше и там перезаписываем общее сотсояние со всеми фильтрами
  // {
  //     value: string,
  //     name: string,
  //     onClickOption: string,
  //     activeValue: string
  // }

  // case 'Просроченность':
  //             return 'expired' // вынести отдельно не нравивтся мне в общем фильтре или просто поменять как то

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const targetDropdown = document.getElementById(targetId) as Node;
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        targetDropdown !== event.target &&
        !targetDropdown.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getStatusName = (value: string): string => {
    switch (value) {
      case 'Статус':
        return 'status';
      case 'Приоритет':
        return 'priority';
      case 'Срок выполнения':
        return 'dueDate';
      case 'Просроченность':
        return 'expired';
      default:
        return '';
    }
  };

  return (
    <div
      className="absolute top-[100%] right-[-3px] z-20 mt-2 max-w-[calc(100vw-2rem)] min-w-[12rem] rounded-xl border border-[#E2E0D8] bg-[#FFFFFF]"
      ref={dropdownRef}
    >
      <div className="flex items-center justify-between border-b border-[#E2E0D8] px-4 py-3 text-left text-xs font-bold text-[#7A7669] uppercase">
        {header}
      </div>
      <div className="max-h-80 [scrollbar-width:thin] [scrollbar-color:rgba(226,224,216,0.7)_transparent] overflow-y-auto p-2 pt-[0]">
        {Object.keys(bodyInfo).map((key, index) => {
          return (
            <div className={index > 0 ? 'border-t border-[#E2E0D8]' : ''}>
              {key !== 'sort' ? (
                <div className="[margin:8px_0_8px_2px] text-left text-xs font-semibold text-[#7A7669]">
                  {key}
                </div>
              ) : null}
              <div className="">
                {bodyInfo[key].map(
                  (
                    option,
                    i, //что то придумать с ключом
                  ) => (
                    <div
                      key={i}
                      className={`flex cursor-pointer items-center justify-between rounded-lg px-2.5 py-2 text-left text-sm font-normal text-[#7A7669] ${
                        getStatusName(key) === 'dueDate'
                          ? (option.activeValue as IDueDateInfo).name ===
                            option.nodeOption
                            ? 'bg-[#F5F4F0] font-semibold text-[#1A1917] [&>span]:flex'
                            : ''
                          : option.value === option.activeValue
                            ? 'bg-[#F5F4F0] font-semibold text-[#1A1917] [&>span]:flex'
                            : ''
                      }`}
                      onClick={() => {
                        if (getStatusName(key) === 'dueDate') {
                          onClickOption(getStatusName(key), {
                            name: option.nodeOption as string,
                            range: option.value as null | IDueDateRange,
                          });
                        } else {
                          onClickOption(
                            key !== 'sort' ? getStatusName(key) : 'sort',
                            option.value as string | null,
                          );
                        }
                      }}
                    >
                      {option.nodeOption}
                      <span className="hidden h-5 w-5 items-center justify-center pb-px text-sm text-[#1A1917]">
                        ✔
                      </span>
                    </div>
                  ),
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dropdown;
