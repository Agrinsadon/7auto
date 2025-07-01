import './servicebar.css';

const services = [
  {
    name: "Käsipesu",
    description: "Isam pesee hyvin",
    price: "0.00 €",
  },
  {
    name: "Ulkopesu",
    description: "IISSSAAAAMM pesee hyvin",
    price: "0.00 €",
  }
];

const serviceBar = () => {
  return (
    <>
      {services.map((item, index) => (
        <div className="info-bar" key={index}>
          <div className="middle-bar">
            <p className="service">{item.name}</p>
            <p className="description">{item.description}</p>
          </div>
          <p className="price">{item.price}</p>
        </div>
      ))}
    </>
  );
};

export default serviceBar;
