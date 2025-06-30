import '../styles/infobar.css';

const services = [
  {
    name: "Information Bar",
    description: "This is an information bar component.",
    price: "0.00 €",
  },
  {
    name: "Notification Bar",
    description: "This is a notification bar component.",
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
