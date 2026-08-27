import { useEffect, useRef, type ReactNode } from "react";

import './dropdown.scss'
import type { IDueDateRange } from "@/utils/create-date";
import type { IDueDateInfo } from "@/types/filters.types";

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


const Dropdown = ({ header, bodyInfo, targetId, onClickOption, onClose }: IDropdownProps) => {
    // состотяния для каждого фильтра - при смене состояния  
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
            if ( dropdownRef.current && !dropdownRef.current.contains(event.target as Node) && targetDropdown !== event.target && !targetDropdown.contains(event.target as Node)) {
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
    }


    return (
        <div className="dropdown" ref={dropdownRef}>
            <div className="dropdown__header">{header}</div>
            <div className="dropdown__body">
                {
                    Object.keys(bodyInfo).map((key, index) => {
                        return (
                            <div className={`dropdown__body_block ${index > 0 ? 'dropdown__body_block-top' : ''}`}>
                                {( key !== 'sort' ) ? <div className="dropdown__body_title">{key}</div> : null}
                                <div className="dropdown__body_options">
                                    {bodyInfo[key].map((option, i) => ( //что то придумать с ключом
                                        <div key={i} className={`dropdown__body_option ${
                                            ( getStatusName(key) === 'dueDate' )
                                            ? (option.activeValue as IDueDateInfo).name === option.nodeOption ? 'dropdown__body_option-active' : ''
                                            : option.value === option.activeValue ? 'dropdown__body_option-active' : '' 
                                        }`}
                                             onClick={() => {
                                                if (getStatusName(key) === 'dueDate') {
                                                    onClickOption(getStatusName(key), {name: option.nodeOption as string, range: option.value as null | IDueDateRange})
                                                } else {
                                                    onClickOption(key !== 'sort' ? getStatusName(key) : 'sort', option.value as string | null)
                                                }
                                             }}>
                                            {option.nodeOption} 
                                            <span className="dropdown__body_option-check">✔</span>
                                        </div>
                                    ))}
                                </div>                      
                            </div>
                        )
                    })
                }
            </div>
            
        </div>
    );
};

export default Dropdown;