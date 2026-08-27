import './info-card.scss';

interface IInfoCardProps {
    title: string;
    value: number;
    colorValue: string;
    subValue?: string;
}


const InfoCard = ({title, value, subValue, colorValue}: IInfoCardProps) => {
    return (
        <div className="info-card">
            <p className="info-card__title">{title}</p>
            <div className={`info-card__content`} style={{color: colorValue}}>
                {value}  
                {(subValue) ? <span>{" " + subValue}</span>: null }               
            </div>
            
        </div>
    );
};

export default InfoCard;