import type { ReactNode } from 'react';
import './header.scss';


interface IHeaderProps {
    children?: ReactNode
}

const Header = ({ children }: IHeaderProps) => {
    return (
        <header className='header'>
            { children }
        </header>
    );
};

export default Header;