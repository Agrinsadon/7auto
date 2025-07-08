import './servicebar.css';

const services = [
  { name: "Käsipesu", description: "Isam pesee hyvin", price: "0.00 €", category: "PESUPALVELUT" },
  { name: "Sisäpesu", description: "IISSSAAAAMM pesee hyvin", price: "0.00 €", category: "PESUPALVELUT" },
  { name: "Käsi + sisäpesu", description: "IISSSAAAAMM vahaus hyvin", price: "0.00 €", category: "PESUPALVELUT" },
  { name: "Normaali vahaus", description: "Isam vahaus hyvin", price: "0.00 €", category: "VAHAUS & KIILTO" },
  { name: "Kova vahaus", description: "IISSSAAAAMM vahaus hyvin", price: "0.00 €", category: "VAHAUS & KIILTO" },
  { name: "Keraaminen NANO vahaus", description: "IISSSAAAAMM kiilto hyvin", price: "0.00 €", category: "VAHAUS & KIILTO" },
  { name: "Renkaiden vaihto (henkilöauto)", description: "Isam vaihtaa renkaat hyvin", price: "0.00 €", category: "RENGASPALVELUT" },
  { name: "Renkaiden vaihto (pakettiauto)", description: "IISSSAAAAMM vaihtaa renkaat hyvin", price: "0.00 €", category: "RENGASPALVELUT" },
  { name: "Renkaiden pesu", description: "IISSSAAAAMM vaihtaa renkaat hyvin", price: "0.00 €", category: "RENGASPALVELUT" },
  { name: "Renkaiden tasapainotus", description: "IISSSAAAAMM pesee sisätilat hyvin", price: "0.00 €", category: "RENGASPALVELUT" },
];

interface Props {
  selectedCategory: string;
  onServiceSelect: (service: any) => void;
}

const ServiceBar = ({ selectedCategory, onServiceSelect }: Props) => {
  const filteredServices = services.filter(service => service.category === selectedCategory);

  return (
    <>
      {filteredServices.map((item, index) => (
        <div className="info-bar" key={index} onClick={() => onServiceSelect(item)}>
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

export default ServiceBar;
