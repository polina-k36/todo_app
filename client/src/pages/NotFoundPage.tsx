import { useAuth } from "@/auth/useAuth";
import Header from "@/components/Header/Header";
import Button from "@/ui/Button/Button";
import Logo from "@/ui/Logo/Logo";
import { useNavigate } from "react-router-dom";
import NotFoundIcon from "@/assets/icons/icon-not-found.svg?react";

import '@/styles/not-found-page.scss';

const NotFoundPage = () => {
    const {isAuthorized} = useAuth();
    const navigate = useNavigate();

    return (
        <div>
            <Header>
                <Logo/>
                <div className='container-btns'>
                    {
                        isAuthorized 
                        ? <Button onClick={() => navigate('/account')} variant='transparent' size='small'>Профиль</Button>
                        : null
                    }
                    <Button onClick={() => navigate('/')} variant='accent' size='small'>
                        {
                            isAuthorized ? 'Вернуться к задачам' : 'Вернуться на главную' 
                        }
                    </Button>
                </div>

            </Header>

            <main className="container not-found-page">
                <div className="not-found-page__info">
                    <div className="not-found-page__info_code">404</div>
                    <h2 className="not-found-page__info_title">Страница не найдена</h2>
                    <h3 className="not-found-page__info_subtitle">Похоже, вы забрели не туда. <br/>Давайте вернёмся на правильный путь.</h3>
                    
                    <div className='container-btns'>
                        <Button onClick={() => navigate('/')} variant='accent' size='small'>
                            {
                                isAuthorized ? 'Вернуться к задачам' : 'Вернуться на главную' 
                            }
                        </Button>
                        <Button onClick={() => navigate(-1)} variant='transparent' size='small'>Назад</Button>
                    </div>
                </div>
                <div className="not-found-page__icon">
                    <NotFoundIcon/>
                </div>
                

            </main>
            
        </div>
    );
};

export default NotFoundPage;