
import './color-button.scss';

interface IColorButtonProps {
    color: string;
    activeColor: string;
    onClickBtn: () => void;
}

const ColorButton = ({color, activeColor, onClickBtn}: IColorButtonProps) => {
    
    return (
        <button className={`color-btn ${activeColor == color ? 'color-btn-active' : ''}`}
                style={{background: color, outlineColor: color}}
                onClick={e => { e.preventDefault(); onClickBtn()}}>
            <span className="color-btn_check">✔</span>            
        </button>
    );
};

export default ColorButton;