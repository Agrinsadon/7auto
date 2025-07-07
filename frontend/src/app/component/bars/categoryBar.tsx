import { FaPlusCircle, FaPlusSquare } from 'react-icons/fa';
import './categorybar.css';
import './servicebar.css';
import Image from 'next/image';

const category = [
    {
        name: "Sisäpesu",
        amount: "5 palvelua",
        img: "/isam.png",
    },
    {
        name: "Ulkopesu",
        amount: "5 palvelua",
        img: "/isam.png",
    },
    {
        name: "Sisäpesu",
        amount: "5 palvelua",
        img: "/isam.png",
    },
    {
        name: "Ulkopesu",
        amount: "5 palvelua",
        img: "/isam.png",
    },
    {
        name: "Sisäpesu",
        amount: "5 palvelua",
        img: "/isam.png",
    },
];

const Categorybar = () => {
    return (
        <>
            {category.map((item, index) => (
                <div className="info-bar" key={index}>
                    <div className="seperation-bar">
                    <Image
                        className="img"
                        src={item.img}
                        alt={item.name}
                        width={45}
                        height={45}
                    />
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
