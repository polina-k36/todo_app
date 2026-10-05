import Header from '@/components/Header/Header';
import Button from '@/ui/Button/Button';
import Logo from '@/ui/Logo/Logo';
import LogoutIcon from '@/assets/icons/icon-logout.svg?react';
import CategoriesPanel from '@/components/CategoriesPanel/CategoriesPanel';
import InfoPanel from '@/components/InfoPanel/InfoPanel';
import TaskCard from '@/components/TaskCard/TaskCard';
import TaskViewModal from '@/components/TaskModal/TaskViewModal/TaskViewModal';

import { useEffect, useState } from 'react';
import type { MainModalState } from '@/types/modal-state.types';
import TaskFormModal from '@/components/TaskModal/TaskFormModal/TaskFormModal';
import type {
  ICreateTask,
  IEditTask,
  IStatsTask,
  ITask,
} from '@/types/task.types';
import {
  completeTask,
  createTask,
  deleteTask,
  getAllTasks,
  getStatsTasks,
  incompleteTask,
  updateTask,
} from '@/api/tasks';
import Modal from '@/components/Modal/Modal';
import FilterTasksPanel from '@/components/FilterTasksPanel/FilterTasksPanel';
import type { IApiFiltersTasks, IFiltersTask } from '@/types/filters.types';
import CategoriesViewModal from '@/components/CategoryModal/CategoriesViewModal/CategoriesViewModal';
import CategoryFormModal from '@/components/CategoryModal/CategoryFormModal/CategoryFormModal';
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
} from '@/api/categories';
import type { ICategory } from '@/types/category.types';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/auth/useAuth';

const getFormText = (count: number): string => {
  if (count === 1) return 'задача';
  if (count >= 2 && count <= 4) return 'задачи';
  return 'задач';
};

const MainPage = () => {
  const [modal, setModal] = useState<MainModalState>(null);
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [statsTask, setStatsTask] = useState<IStatsTask>();
  const [activeCategoryId, setActiveCategoryId] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [filterList, setFilterList] = useState<IApiFiltersTasks | null>(null);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    getAllCategories().then((data) => {
      setCategories(data.data);
    });
  }, []);

  const updateCategories = () => {
    getAllCategories().then((data) => {
      setCategories(data.data);
    });
  };

  const changeCategory = (id: number) => {
    setActiveCategoryId(id);
  };

  const updateTasks = () => {
    getAllTasks(filterList ?? undefined, activeCategoryId)
      .then((data) => {
        setTasks(data.data);
        // if (activeCategoryId === 0) setCountAllTasks(data.data.length);
        setLoading(false);
      })
      .catch(() => setError(false));
  };

  useEffect(() => {
    updateTasks();
  }, [activeCategoryId, filterList]);

  const onCreateTask = (task: ICreateTask) => {
    createTask(task).then(() => {
      updateTasks();
      updateCategories();
      setModal({
        type: 'message',
        message: 'Задача успешно создана!',
        title: 'Успешное создание',
      });
    });
  };

  const onDeleteTask = (id: number) => {
    deleteTask(id).then(() => {
      updateTasks();
      updateCategories();
      setModal({
        type: 'message',
        message: 'Задача успешно удалена!',
        title: 'Успешное удаление',
      });
    });
  };

  const onUpdateTask = (id: number, task: IEditTask) => {
    if (id !== undefined) {
      updateTask(id, task).then(() => {
        updateTasks();
        updateCategories();
        setModal({
          type: 'message',
          message: 'Задача успешно обновлена!',
          title: 'Успешное редактирование',
        });
      });
    }
  };

  const onFilterTasks = (filters: IFiltersTask) => {
    const finalFilterList = {
      status: filters.status,
      priority: filters.priority,
      dueDateFrom: filters.dueDate ? filters.dueDate.from.toISOString() : null,
      dueDateTo: filters.dueDate ? filters.dueDate.to.toISOString() : null,
      sort: filters.sort,
      search: filters.search,
    };

    setFilterList(finalFilterList);
  };

  const toggleStatusTask = (id: number, checked: boolean) => {
    if (checked) {
      completeTask(id).then((data) => {
        setTasks((prev) =>
          prev.map((task) => (task.id === id ? data.data : task)),
        );
      });
    } else {
      incompleteTask(id).then((data) => {
        setTasks((prev) =>
          prev.map((task) => (task.id === id ? data.data : task)),
        );
      });
    }
  };

  const onCreateCategory = (data: FormData) => {
    createCategory(data).then(() => {
      setModal({ type: 'categories' });
      updateCategories();
    });
  };

  const onUpdateCategory = (id: number, data: FormData) => {
    updateCategory(id, data).then(() => {
      setModal({ type: 'categories' });
      updateCategories();
    });
  };

  const onDeleteCategory = (id: number) => {
    deleteCategory(id).then(() => {
      setModal({ type: 'categories' });
      updateCategories();
    });
  };

  const onLogout = () => {
    logout();
    navigate('/welcome');
  };

  useEffect(() => {
    getStatsTasks().then((data) => setStatsTask(data.data));
  }, [tasks]);

  return (
    <>
      <Header>
        <Logo />
        <div className="flex items-center gap-2 sm:gap-3">
          <Button size="small" variant="transparent">
            <Link to="/account">Профиль</Link>
          </Button>
          <Button size="navigate" variant="transparent">
            <LogoutIcon className="h-5 w-4 text-[#7A7669]" onClick={onLogout} />
          </Button>
        </div>
      </Header>

      <main className="mx-auto flex w-full max-w-6xl flex-col items-center px-4 pb-8 sm:px-6 lg:px-8">
        <InfoPanel
          all={statsTask?.total ?? 0}
          overdue={statsTask?.overdue ?? 0}
          done={statsTask?.completed ?? 0}
        />
        <CategoriesPanel
          categories={categories}
          countAllTasks={statsTask?.total ?? 0}
          activeCategoryId={activeCategoryId}
          changeCategory={changeCategory}
          onClickSettings={() => setModal({ type: 'categories' })}
        />
        <FilterTasksPanel onFilterTasks={onFilterTasks} />
        <div className="mt-6 flex w-full flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-medium text-[#7A7669]">
            {tasks.length} {getFormText(tasks.length)}
          </p>
          <Button
            size="modal-btn"
            variant="accent"
            onClick={() => setModal({ type: 'task-create' })}
          >
            + Добавить задачу
          </Button>
        </div>
        <div className="mt-5 flex w-full flex-col gap-3 sm:gap-4">
          {loading ? (
            <div>Загрузка....</div>
          ) : error ? (
            <div>Ошибка получения данных о задачах!!!!</div>
          ) : (
            tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onClickCard={(id) => setModal({ type: 'task', taskId: id })}
                onClickEditBtn={(id) =>
                  setModal({ type: 'task-edit', taskId: id, prevModal: null })
                }
                onClickDeleteBtn={onDeleteTask}
                toggleStatusTask={toggleStatusTask}
              />
            ))
          )}
        </div>
      </main>

      {modal && modal.type === 'task' ? (
        <TaskViewModal
          task={tasks.find((task) => task.id === modal.taskId) as ITask}
          onCloseModal={() => setModal(null)}
          onClickEditBtn={(id) =>
            setModal({
              type: 'task-edit',
              taskId: id,
              prevModal: { type: 'task', taskId: modal.taskId },
            })
          }
          onClickDeleteBtn={onDeleteTask}
          toggleStatusTask={toggleStatusTask}
        />
      ) : null}

      {modal && modal.type === 'task-create' ? (
        <TaskFormModal
          mode="create"
          onCloseModal={() => setModal(null)}
          submitForm={onCreateTask}
        />
      ) : null}

      {modal && modal.type === 'task-edit' ? (
        <TaskFormModal
          mode="edit"
          taskId={modal.taskId}
          onCloseModal={() => setModal(null)}
          onClickCancelBtn={() => {
            setModal(modal.prevModal);
          }}
          onClickDeleteBtn={onDeleteTask}
          submitForm={onUpdateTask}
        />
      ) : null}

      {modal && modal.type === 'message' ? (
        <Modal
          size="small"
          header={<div>{modal.title}</div>}
          onCloseModal={() => setModal(null)}
        >
          {modal.message}
        </Modal>
      ) : null}

      {modal && modal.type === 'categories' ? (
        <CategoriesViewModal
          categories={categories}
          onCloseModal={() => setModal(null)}
          onClickAddBtn={() => setModal({ type: 'category-create' })}
          onClickEditBtn={(categoryId: number) =>
            setModal({ type: 'category-edit', categoryId })
          }
          onClickDeleteBtn={(categoryId: number) =>
            onDeleteCategory(categoryId)
          }
          onCategoryChanged={updateCategories}
        />
      ) : null}

      {modal && modal.type === 'category-create' ? (
        <CategoryFormModal
          mode="create"
          onClickCancelBtn={() => setModal(null)}
          onCloseModal={() => setModal(null)}
          submitForm={onCreateCategory}
        />
      ) : null}

      {modal && modal.type === 'category-edit' ? (
        <CategoryFormModal
          mode="edit"
          categoryId={modal.categoryId}
          onClickCancelBtn={() => setModal(null)}
          onCloseModal={() => setModal(null)}
          submitForm={(id: number, data: FormData) =>
            onUpdateCategory(id, data)
          }
        />
      ) : null}
    </>
  );
};

export default MainPage;
