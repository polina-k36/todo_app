import Header from "@/components/Header/Header";
import Logo from "@/ui/Logo/Logo";
import Button from "@/ui/Button/Button";
import LogoutIcon from '@/assets/icons/icon-logout.svg?react';
import BackIcon from '@/assets/icons/icon-back.svg?react'
import { Link, useNavigate } from "react-router-dom";

import '@/styles/account-page.scss';
import InfoUserCard from "@/components/InfoUserCard/InfoUserCard";
import UserStatsPanel from "@/components/UserStatsPanel/UserStatsPanel";
import ProgressPanel from "@/components/ProgressPanel/ProgressPanel";

import CategoriesList from "@/components/CategoriesList/CategoriesList";
import { useEffect, useState } from "react";
import type { ICategory } from "@/types/category.types";
import { getAllCategories } from "@/api/categories";

import UserEditModal from "@/components/UserModal/UserEditModal/UserEditModal";
import { updatePassword } from "@/api/auth";
import type { IEditPassword } from "@/types/user.types";
import type { AccountModalState } from "@/types/modal-state.types";
import type { IStatsTask } from "@/types/task.types";
import { getStatsTasks } from "@/api/tasks";
import { useAuth } from "@/auth/useAuth";


function createStatObject(statKey: string, count: number ): {id: number, name: string, count: number, color: string} | undefined {
    switch(statKey) {
        case 'total':
            return {
                id: 1,
                name: 'всего задач',
                count,
                color: '#1A1917'
            }
        case 'completed':
            return {
                id: 2,
                name: 'выполнено',
                count,
                color: '#059669'
            }
        case 'overdue':
            return {
                id: 3,
                name: 'просрочено',
                count,
                color: '#DC2626'
            }
        case 'inProgress':
            return {
                id: 4,
                name: 'в процессе',
                count,
                color: '#4F46E5'
            }
    }
}

const AccountPage = () => {
    const [categories, setCategories] = useState<ICategory[]>([]);
    // const [user, setUser] = useState<IUser>();
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState<AccountModalState>();
    const [taskStats, setTaskStats] = useState<IStatsTask>();

    const {user, logout, updateCurrentUser} = useAuth();
    const navigate = useNavigate();
    
    useEffect(() => {
        getAllCategories()
            .then(data => {
                setCategories(data.data);
                setLoading(false);
            })
        getStatsTasks()
            .then(data => {
                setTaskStats(data.data);
            })
    }, []);


    const onUpdateUserPassword = async (data: IEditPassword) => {
        await updatePassword(data);
    }
    
    const onLogout = () => {
        logout();
        navigate('/welcome');
    }

    return (
        <>
            <Header>
                <Button size="small" variant="transparent">
                    <div className="account-btns__content">
                        <BackIcon/>
                        <Link to='/'>К задачам</Link>
                    </div>
                </Button>
                <Logo/>
                <div className='container-btns'>
                    <Button size='small' variant='danger' onClick={onLogout}>
                        <div className="account-btns__content">
                            <LogoutIcon/>
                            <p>Выйти</p>
                        </div>
                    </Button>
                </div>
            </Header>


            <main className='container account-page' >
                {
                    loading 
                    ? 'Загрузка'
                    : 
                    <>
                        {
                            user ? <InfoUserCard user={user} onEditUser={() => setModal({type: 'user-edit', userId: user?.id ?? -1})}/> : null
                        }

                        {
                            
                            taskStats 
                            ? <UserStatsPanel stats={(Object.keys(taskStats) as Array<keyof typeof taskStats>).map(key => (
                                    createStatObject(key, taskStats[key] )
                                ))}/>
                            : null
                        }
                        

                        <ProgressPanel all={taskStats?.total ?? 0} completed={taskStats?.completed ?? 0}/>

                        <CategoriesList allTasksCount={taskStats?.total ?? 0} categories={categories}/>
                        {
                            (modal && modal.type === 'user-edit' && user)
                            ? <UserEditModal user={user} submitInfoUser={updateCurrentUser} submitPassword={onUpdateUserPassword} onCloseModal={() => setModal(null)} onLogout={onLogout}/>
                            : null
                        }
                    </>
                }
            </main>
            
        </>
    );
};

export default AccountPage;