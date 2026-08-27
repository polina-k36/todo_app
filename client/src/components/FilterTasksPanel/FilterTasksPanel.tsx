import SearchIcon from '@/assets/icons/icon-search.svg?react';
import FilterIcon from '@/assets/icons/icon-filter.svg?react';
import SortIcon from '@/assets/icons/icon-sort.svg?react';

import './filter-tasks-panel.scss';
import Dropdown from '@/ui/Dropdown/Dropdown';
import { TaskPriorityEnum, TaskStatusEnum, type TaskPriority, type TaskStatus } from '@/types/task.types';
import { getRUNameByStatus, getStatusByRUName } from '@/utils/transform-name-status';
import { getPriorityByRUName, getRUNameByPriority } from '@/utils/transform-name-priority';
import { getMonth, getNextDays, getToday, type IDueDateRange } from '@/utils/create-date';
import { useEffect, useState } from 'react';
import type { IDueDateInfo, IFiltersTask } from '@/types/filters.types';


const FilterTasksPanel = ({onFilterTasks}: {onFilterTasks: (filters: IFiltersTask) => void}) => {

    const [isOpenFilter, setIsOpenFilter] = useState(false);
    const [isOpenSort, setIsOpenSort] = useState(false);

    const [activeStatus, setActiveStatus] = useState<string | null>(null);
    const [activePriority, setActivePriority] = useState<string | null>(null);
    const [activeDueDate, setActiveDueDate] = useState<{name: string, range: IDueDateRange | null}>({name: 'Любой срок', range: null});

    const [activeSort, setActiveSort] = useState('createdAt');

    const [activeSearch, setActiveSearch] = useState('');

    const countFilters = [ activeStatus, activePriority, activeDueDate?.range ].filter(Boolean).length;

    const filterOptions = {
        status: [null, getStatusByRUName(TaskStatusEnum.TODO), getStatusByRUName(TaskStatusEnum.CANCELLED), getStatusByRUName(TaskStatusEnum.DONE), getStatusByRUName(TaskStatusEnum.IN_PROGRESS), getStatusByRUName(TaskStatusEnum.ON_HOLD)],
        priority: [null, getPriorityByRUName(TaskPriorityEnum.HIGH), getPriorityByRUName(TaskPriorityEnum.MEDIUM), getPriorityByRUName(TaskPriorityEnum.LOW), getPriorityByRUName(TaskPriorityEnum.NONE)],
        dueDate: [null, 'До конца сегодня', 'В ближайшие 7 дней', 'В ближайшие 14 дней', 'В этом месяце'],
        // expired: [null, 'Просроченные']
    }

    const sortOptions = ['title', 'status', 'priority', 'createdAt', 'dueDate']

    const formStatus = (status: TaskStatus | null | undefined) => {

        let statusInfo = null;

        if (status) {
            statusInfo = getRUNameByStatus(status);
        }

        return {
            nodeOption: <div className='filter-option'> 
                            {statusInfo ? <span className='filter-option_mark' style={{color: `${statusInfo.color}`}}>&bull;</span> : null}
                            {statusInfo ? statusInfo.name : 'Все статусы'}
                        </div>,
            value: status as string,
            activeValue: activeStatus
        }
    }

    const formPriority = (priority: TaskPriority | null | undefined) => {

        const priorityInfo = priority ? getRUNameByPriority(priority) : null;

        return {
            nodeOption: <div className='filter-option'> 
                            {priorityInfo ? <span className='filter-option_mark' style={{color: `${priorityInfo.color}`}}>&bull;</span> : null}
                            {priorityInfo ? priorityInfo.name : 'Все приоритеты'}
                        </div>,
            value: priority as string,
            activeValue: activePriority
        }
    }

    const formDueDate = (dueDateString:  string | null) => {
        
        let range: IDueDateRange | null = null;
        
        if (dueDateString === 'До конца сегодня') range = getToday();
        else if ( dueDateString === 'В ближайшие 7 дней') range = getNextDays(new Date(), 7);
        else if (dueDateString === 'В ближайшие 14 дней') range = getNextDays(new Date(), 14);
        else if (dueDateString === 'В этом месяце') range = getMonth();

        
        return {
            nodeOption: dueDateString ?? 'Любой срок',
            value: range,
            activeValue: activeDueDate
        }
    }

    const formSort = (sort: string) => {
        
        let name = ''

        switch (sort) {
            case 'createdAt':
                name = 'По дате создания'                
                break;
            case 'status':
                name = 'По статусу'                
                break;
            case 'priority':
                name = 'По приоритету'                
                break;
            case 'title':
                name = 'По названию'                
                break;
            case 'dueDate':
                name = 'По сроку'                
                break;
        }

        return {
            nodeOption: name,
            value: sort,
            activeValue: activeSort
        }
    }

    const submitData = () => {
        const filters = {
            status: activeStatus,
            priority: activePriority,
            dueDate: activeDueDate ? activeDueDate.range : null,
            sort: activeSort,
            search: activeSearch
        }
        onFilterTasks(filters);
    }

    const onClickOption = (filter: string, value: string | IDueDateInfo | null) => {
        switch (filter) {
            case 'status':
                setActiveStatus(value as string | null);
                break;
            case 'priority':
                setActivePriority(value as string | null);
                break;
            case 'dueDate':
                setActiveDueDate(value as IDueDateInfo);
                break;   
            case 'sort':
                setActiveSort(value as string);
                break;      
            default:
                break;
        }
    }

    const clearFilters = () => {
        setActiveDueDate({name: 'Любой срок', range: null});
        setActivePriority(null);
        setActiveStatus(null);
    }


    useEffect(() => {
        submitData();
    }, [activeStatus, activePriority, activeDueDate, activeSort, activeSearch]);


    return (
        <>
            <div className="filter-panel">
            
                <div className="filter-panel__search">
                    <SearchIcon className="filter-panel__search_icon"/>
                    <input type="text" placeholder="Поиск задачи..." value={activeSearch} onChange={e => setActiveSearch(e.currentTarget.value)}/>
                    <div className="filter-panel__search_cross" onClick={() => setActiveSearch('')}>&times;</div>
                    
                </div>
                <div className="filter-panel__btn_container">
                    <button id='filter-btn' className={`filter-panel__btn ${(countFilters === 0 ? '' : 'filter-panel__btn-active')}`} onClick={() => setIsOpenFilter(prev => !prev)}>
                        <FilterIcon className="filter-panel__btn_icon"/>
                        <span className="filter-panel__btn_text">Фильтры</span>
                        <span className="filter-panel__btn_count" style={{display: (countFilters === 0) ? 'none' : 'flex' }}>{countFilters}</span> 
                        
                    </button>
                    {
                            isOpenFilter 
                            ? <Dropdown header={
                                (countFilters === 0) 
                                ? <div>Фильтрация</div> 
                                : <>
                                     <div>Фильтрация</div> 
                                     <span className='dropdown__header_subtitle' onClick={clearFilters}>Сбросить</span>
                                  </>  
                            } 
                                  bodyInfo={{
                                      'Статус': filterOptions.status.map(value => formStatus(value)),
                                      'Приоритет': filterOptions.priority.map(value => formPriority(value)),
                                      'Срок выполнения': filterOptions.dueDate.map(value => formDueDate(value)),
                                  }} 
                                  targetId='filter-btn'
                                  onClickOption={onClickOption} 
                                  onClose={() => setIsOpenFilter(false)}/>
                            : null
                        }
                </div>
                <div className="filter-panel__btn_container">
                    <button id='sort-btn' className="filter-panel__btn" onClick={() => setIsOpenSort(prev => !prev)}>
                        <SortIcon className="filter-panel__btn_icon"/>
                        <span id="sort-field" className="filter-panel__btn_text">{formSort(activeSort).nodeOption}</span>                          
                    </button>
                    {
                        isOpenSort 
                        ? <Dropdown header='Сортировка' 
                            bodyInfo={{
                                'sort': sortOptions.map(option => formSort(option)),
                            }}
                            targetId='sort-btn'
                            onClickOption={onClickOption} 
                            onClose={() => setIsOpenSort(false)}/>
                        : null
                    }
                </div>
                
            </div>
        </>
    );
};

export default FilterTasksPanel;