interface IFeatureCardProps {
  icon: string;
  title: string;
  desc: string;
}

const FeatureCard = ({ icon, title, desc }: IFeatureCardProps) => {
  return (
    <div className="flex w-full flex-col gap-2.5 sm:mx-auto sm:max-w-xs">
      <img src={icon} alt="" className="h-9 w-9" />
      <h3 className="text-lg font-bold text-[#1A1917]">{title}</h3>
      <p className="text-base text-[#7A7669]">{desc}</p>
    </div>
  );
};

export default FeatureCard;
