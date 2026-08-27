import { useEffect, useState, type ReactNode } from "react";
import './modal.scss';


interface IModalProps {
    header?: ReactNode;
    footer?: ReactNode;
    children: ReactNode;
    size: 'big' | 'small' | 'medium' | 'very-big';
    bodyPadding?: string; 
    onCloseModal: () => void;
}


const Modal = ({header, footer, size, bodyPadding ,children, onCloseModal}: IModalProps) => {

    const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflowY = 'hidden'; 
            
        } else {
            document.body.style.overflowY = 'scroll';
        }

        return () => {
            document.body.style.overflowY = 'scroll';
        }
    }, [isOpen]);

    return (
        <div className="overlay" onClick={e => {
                if (e.target === e.currentTarget) { onCloseModal(); setIsOpen(false);}
            }}>
            <div className={`modal ${size === 'big' ? 'modal-bg' : size === 'small' ? 'modal-sm' : size === 'medium' ? 'modal-md' : 'modal-vb'}`}>
                {
                    header ?
                    <div className="modal__header">
                        { header }
                        <div className="modal__header-cross" onClick={() => { onCloseModal(); setIsOpen(false);}}>&times;</div>
                    </div> :
                    null
                }
                <div className="modal__body" style={{padding: bodyPadding}}>
                    { children }
                </div>
                {
                    footer 
                    ? 
                    <div className="modal__footer">
                        { footer }
                    </div>
                    : null
                }
            </div>            
        </div>
    );
};

export default Modal;