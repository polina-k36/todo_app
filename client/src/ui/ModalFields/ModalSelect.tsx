import type { SelectHTMLAttributes } from 'react';
import '@/styles/modal-fields.scss';

interface IModalSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    name: string;
    label: string;
    options: string[];
}

const ModalSelect = ({name, label, options, ...selectProps}: IModalSelectProps) => {
    return (
        <div className='form-group'>
            <label className='form-group__label' htmlFor={name}>{label}</label>
            <select className='form-group__field select' name={name} {...selectProps}>
                {
                    options.map(option => (
                        <option key={option}>{option}</option>
                    ))
                }
            </select>     
        </div>
    );
};

export default ModalSelect;