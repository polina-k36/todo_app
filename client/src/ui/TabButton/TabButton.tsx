

import type { ReactNode } from 'react';
import './tab-button.scss';

interface ITabButtonProps {
    icon?: ReactNode;
    title: ReactNode;
    id?: string;
    activeId?: string;
    transparent?: true; 
    onClickTab: () => void;
}

const TabButton = ({icon, title, activeId, id, transparent, onClickTab}: ITabButtonProps) => {
    return (
        <div className={`tab-btn ${(activeId === id && id) ? 'tab-btn-active' : ''}`} 
             style={{
                backgroundColor: `${transparent ? 'transparent': ''}`
             }}
             onClick={onClickTab}>
            <div className="tab-btn__icon">{icon}</div>
            <div className="tab-btn__title">{title}</div>
        </div>
    );
};

export default TabButton;