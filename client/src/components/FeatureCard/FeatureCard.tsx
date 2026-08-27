import './feature-card.scss';

interface IFeatureCardProps {
    icon: string,
    title: string,
    desc: string
}

const FeatureCard = ({icon, title, desc}: IFeatureCardProps) => {
    return (
        <div className='feature-card'>
            <img src={icon} alt="" className="feature-card__icon"/>
            <h3 className="feature-card__title">{title}</h3>
            <p className="feature-card__desc">{desc}</p>
        </div>
    );
};

export default FeatureCard;