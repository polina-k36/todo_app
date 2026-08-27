import type { InputHTMLAttributes } from 'react';
import '@/styles/modal-fields.scss';


interface IModalInputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label?: string;
}

const ModalInput = ({name, label, ...inputProps}: IModalInputProps) => {
    return (
        <div className='form-group'
             style={{
                width: `${name == 'color' ? '28px' : '100%'}`
             }}>
            {
                label 
                ? <label className='form-group__label' htmlFor={name}>{label}</label> 
                : null
            }
            <input className='form-group__field' name={name}  {...inputProps} />         
        </div>
    );
};

export default ModalInput;