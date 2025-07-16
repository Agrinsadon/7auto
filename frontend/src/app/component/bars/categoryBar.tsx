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
  onSelectCategory: (categoryName: string | null) => void;
  selectedCategory: string | null;
}

const Categorybar = ({ onSelectCategory, selectedCategory }: Props) => {
  const handleClick = (categoryName: string) => {
    if (selectedCategory === categoryName) {
      onSelectCategory(null); // Deselect
    } else {
      onSelectCategory(categoryName); // Select new
    }
  };

  return (
    <>
      {category.map((item, index) => (
        <div
          className={`info-bar ${item.name === selectedCategory ? "active" : ""}`}
          key={index}
          onClick={() => handleClick(item.name)}
        >
          <div className="seperation-bar">
            <Image className="img" src={item.img} alt={item.name} width={45} height={45} />
            <p className="middle-bar">{item.name}</p>
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
