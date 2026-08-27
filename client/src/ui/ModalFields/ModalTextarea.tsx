import type { TextareaHTMLAttributes } from 'react';
import '@/styles/modal-fields.scss';


interface IModalTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    name: string;
    label: string;
}

const ModalTextarea = ({name, label, ...textareaProps}: IModalTextareaProps) => {
    return (
        <div className='form-group'>
            <label className='form-group__label' htmlFor={name}>{label}</label>
            <textarea className='form-group__field' style={{height: '85px', resize: 'vertical', maxHeight: '200px', minHeight: '40px'}} name={name}  {...textareaProps} />         
        </div>
    );
};

export default ModalTextarea;