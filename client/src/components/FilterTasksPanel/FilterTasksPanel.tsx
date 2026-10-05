import SearchIcon from '@/assets/icons/icon-search.svg?react';
import FilterIcon from '@/assets/icons/icon-filter.svg?react';
import SortIcon from '@/assets/icons/icon-sort.svg?react';
import Dropdown from '@/ui/Dropdown/Dropdown';
import {
  TaskPriorityEnum,
  TaskStatusEnum,
  type TaskPriority,
  type TaskStatus,
} from '@/types/task.types';
import {
  getRUNameByStatus,
  getStatusByRUName,
} from '@/utils/transform-name-status';
import {
  getPriorityByRUName,
  getRUNameByPriority,
} from '@/utils/transform-name-priority';
import {
  getMonth,
  getNextDays,
  getToday,
  type IDueDateRange,
} from '@/utils/create-date';
import { useEffect, useState } from 'react';
import type { IDueDateInfo, IFiltersTask } from '@/types/filters.types';

const FilterTasksPanel = ({
  onFilterTasks,
}: {
  onFilterTasks: (filters: IFiltersTask) => void;
}) => {
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const [isOpenSort, setIsOpenSort] = useState(false);

  const [activeStatus, setActiveStatus] = useState<string | null>(null);
  const [activePriority, setActivePriority] = useState<string | null>(null);
  const [activeDueDate, setActiveDueDate] = useState<{
    name: string;
    range: IDueDateRange | null;
  }>({ name: 'Любой срок', range: null });

  const [activeSort, setActiveSort] = useState('createdAt');

  const [activeSearch, setActiveSearch] = useState('');

  const countFilters = [
    activeStatus,
    activePriority,
    activeDueDate?.range,
  ].filter(Boolean).length;

  const filterOptions = {
    status: [
      null,
      getStatusByRUName(TaskStatusEnum.TODO),
      getStatusByRUName(TaskStatusEnum.CANCELLED),
      getStatusByRUName(TaskStatusEnum.DONE),
      getStatusByRUName(TaskStatusEnum.IN_PROGRESS),
      getStatusByRUName(TaskStatusEnum.ON_HOLD),
    ],
    priority: [
      null,
      getPriorityByRUName(TaskPriorityEnum.HIGH),
      getPriorityByRUName(TaskPriorityEnum.MEDIUM),
      getPriorityByRUName(TaskPriorityEnum.LOW),
      getPriorityByRUName(TaskPriorityEnum.NONE),
    ],
    dueDate: [
      null,
      'До конца сегодня',
      'В ближайшие 7 дней',
      'В ближайшие 14 дней',
      'В этом месяце',
    ],
    //TODO: expired: [null, 'Просроченные']
  };

  const sortOptions = ['title', 'status', 'priority', 'createdAt', 'dueDate'];

  const formStatus = (status: TaskStatus | null | undefined) => {
    let statusInfo = null;

    if (status) {
      statusInfo = getRUNameByStatus(status);
    }

    return {
      nodeOption: (
        <div className="flex cursor-pointer items-center justify-start gap-1.5">
          {statusInfo ? (
            <span
              className="text-2xl leading-none font-semibold"
              style={{ color: `${statusInfo.color}` }}
            >
              &bull;
            </span>
          ) : null}
          {statusInfo ? statusInfo.name : 'Все статусы'}
        </div>
      ),
      value: status as string,
      activeValue: activeStatus,
    };
  };

  const formPriority = (priority: TaskPriority | null | undefined) => {
    const priorityInfo = priority ? getRUNameByPriority(priority) : null;

    return {
      nodeOption: (
        <div className="flex cursor-pointer items-center justify-start gap-1.5">
          {priorityInfo ? (
            <span
              className="text-2xl leading-none font-semibold"
              style={{ color: `${priorityInfo.color}` }}
            >
              &bull;
            </span>
          ) : null}
          {priorityInfo ? priorityInfo.name : 'Все приоритеты'}
        </div>
      ),
      value: priority as string,
      activeValue: activePriority,
    };
  };

  const formDueDate = (dueDateString: string | null) => {
    let range: IDueDateRange | null = null;

    if (dueDateString === 'До конца сегодня') range = getToday();
    else if (dueDateString === 'В ближайшие 7 дней')
      range = getNextDays(new Date(), 7);
    else if (dueDateString === 'В ближайшие 14 дней')
      range = getNextDays(new Date(), 14);
    else if (dueDateString === 'В этом месяце') range = getMonth();

    return {
      nodeOption: dueDateString ?? 'Любой срок',
      value: range,
      activeValue: activeDueDate,
    };
  };

  const formSort = (sort: string) => {
    let name = '';

    switch (sort) {
      case 'createdAt':
        name = 'По дате создания';
        break;
      case 'status':
        name = 'По статусу';
        break;
      case 'priority':
        name = 'По приоритету';
        break;
      case 'title':
        name = 'По названию';
        break;
      case 'dueDate':
        name = 'По сроку';
        break;
    }

    return {
      nodeOption: name,
      value: sort,
      activeValue: activeSort,
    };
  };

  const submitData = () => {
    const filters = {
      status: activeStatus,
      priority: activePriority,
      dueDate: activeDueDate ? activeDueDate.range : null,
      sort: activeSort,
      search: activeSearch,
    };
    onFilterTasks(filters);
  };

  const onClickOption = (
    filter: string,
    value: string | IDueDateInfo | null,
  ) => {
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
  };

  const clearFilters = () => {
    setActiveDueDate({ name: 'Любой срок', range: null });
    setActivePriority(null);
    setActiveStatus(null);
  };

  useEffect(() => {
    submitData();
  }, [activeStatus, activePriority, activeDueDate, activeSort, activeSearch]);

  return (
    <>
      <div className="mt-5 flex w-full flex-wrap items-center gap-2 sm:flex-nowrap sm:gap-3 [&_svg]:h-4 [&_svg]:w-4 [&_svg]:text-[#7A7669]">
        <div className="flex min-w-0 flex-1 items-center justify-between gap-1.5 rounded-lg border border-[#E2E0D8] bg-[#FFFFFF] px-3 py-2 focus-within:[border-color:#4F46E5] focus-within:[box-shadow:0_0_8px_rgba(79,70,229,0.7)] sm:min-w-0 [&_input]:flex-1 [&_input]:text-sm [&_input]:[outline:none] [&_input]:[border:none]">
          <SearchIcon className="mb-[3px]" />
          <input
            type="text"
            placeholder="Поиск задачи..."
            value={activeSearch}
            onChange={(e) => setActiveSearch(e.currentTarget.value)}
          />
          <div
            className="cursor-pointer text-xl font-black text-[#7A7669]"
            onClick={() => setActiveSearch('')}
          >
            &times;
          </div>
        </div>
        <div className="relative">
          <button
            id="filter-btn"
            className={`flex h-10 items-center justify-between gap-1.5 rounded-lg border border-[#E2E0D8] bg-[#FFFFFF] px-3.5 py-2 ${countFilters === 0 ? '' : '[border-color:#4F46E5] bg-[color-mix(in_srgb,_#4F46E5_10%,_transparent)] text-[#4F46E5] [&_path]:text-[#4F46E5]'}`}
            onClick={() => setIsOpenFilter((prev) => !prev)}
          >
            <FilterIcon className="" />
            <span className="">Фильтры</span>
            <span
              className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#4F46E5] text-[0.625rem] leading-none font-bold text-[#FFFFFF]"
              style={{ display: countFilters === 0 ? 'none' : 'flex' }}
            >
              {countFilters}
            </span>
          </button>
          {isOpenFilter ? (
            <Dropdown
              header={
                countFilters === 0 ? (
                  <div>Фильтрация</div>
                ) : (
                  <>
                    <div>Фильтрация</div>
                    <span
                      className="cursor-pointer text-xs font-medium text-[#4F46E5] capitalize"
                      onClick={clearFilters}
                    >
                      Сбросить
                    </span>
                  </>
                )
              }
              bodyInfo={{
                Статус: filterOptions.status.map((value) => formStatus(value)),
                Приоритет: filterOptions.priority.map((value) =>
                  formPriority(value),
                ),
                'Срок выполнения': filterOptions.dueDate.map((value) =>
                  formDueDate(value),
                ),
              }}
              targetId="filter-btn"
              onClickOption={onClickOption}
              onClose={() => setIsOpenFilter(false)}
            />
          ) : null}
        </div>
        <div className="relative">
          <button
            id="sort-btn"
            className="flex h-10 items-center justify-between gap-1.5 rounded-lg border border-[#E2E0D8] bg-[#FFFFFF] px-3.5 py-2"
            onClick={() => setIsOpenSort((prev) => !prev)}
          >
            <SortIcon className="" />
            <span id="sort-field" className="">
              {formSort(activeSort).nodeOption}
            </span>
          </button>
          {isOpenSort ? (
            <Dropdown
              header="Сортировка"
              bodyInfo={{
                sort: sortOptions.map((option) => formSort(option)),
              }}
              targetId="sort-btn"
              onClickOption={onClickOption}
              onClose={() => setIsOpenSort(false)}
            />
          ) : null}
        </div>
      </div>
    </>
  );
};

export default FilterTasksPanel;
