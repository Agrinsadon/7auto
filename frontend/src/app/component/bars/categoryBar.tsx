import './categorybar.css';
import Image from 'next/image';
import { FaPlusCircle } from 'react-icons/fa';

const category = [
  {
    name: "PESUPALVELUT",
    amount: "3 palvelua",
    img: "/isam.png",
  },
  {
    name: "VAHAUS & KIILTO",
    amount: "3 palvelua",
    img: "/isam.png",
  },
  {
    name: "RENGASPALVELUT",
    amount: "4 palvelua",
    img: "/isam.png",
  },
];

interface Props {
  onSelectCategory: (categoryName: string) => void;
}

const Categorybar = ({ onSelectCategory }: Props) => {
  return (
    <>
      {category.map((item, index) => (
        <div className="info-bar" key={index} onClick={() => onSelectCategory(item.name)}>
          <div className="seperation-bar">
            <Image className="img" src={item.img} alt={item.name} width={45} height={45} />
            <p className="service">{item.name}</p>
          </div>
          <div className="seperation-bar-second">
            <p className="amount">{item.amount}</p>
            <FaPlusCircle className="plus-icon" />
          </div>
        </div>
      ))}
    </>
  );
};

export default Categorybar;
