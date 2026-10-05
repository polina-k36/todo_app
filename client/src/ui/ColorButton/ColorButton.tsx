interface IColorButtonProps {
  color: string;
  activeColor: string;
  onClickBtn: () => void;
}

const ColorButton = ({ color, activeColor, onClickBtn }: IColorButtonProps) => {
  return (
    <button
      className={`flex h-7 w-7 items-center justify-center rounded-lg text-[#FFFFFF] [border:none] [&_span]:hidden ${activeColor == color ? '[transform:scale(1.15)] [outline:2px_solid] [outline-offset:2px] [&_span]:block' : ''}`}
      style={{ background: color, outlineColor: color }}
      onClick={(e) => {
        e.preventDefault();
        onClickBtn();
      }}
    >
      <span className="hidden">✔</span>
    </button>
  );
};

export default ColorButton;
