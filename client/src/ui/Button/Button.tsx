import type { ButtonHTMLAttributes, ReactNode } from 'react';
import './button.scss'


interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  size: 'big' | 'small' | 'navigate' | 'modal-btn' | 'max';
  variant: 'accent' | 'transparent' | 'dashed' | 'danger' | 'transparent-accent';
  color?: string;
}


const Button = ({children, size, variant, color, ...btnProps}: IButtonProps) => {

    return (
        <button 
            className={`btn ${size} ${variant}`} 
            {...btnProps}
            style={color ? {
                color: color,
                borderColor: color
            } : {}}>
            {children}
        </button>
    )
}

export default Button;
