import './servicebar.css';

const services = [
  { name: "Käsipesu", description: "Auton huolellinen käsinpesu ulkopinnoille", price: "10.00 €", category: "PESUPALVELUT" },
  { name: "Sisäpesu", description: "Imurointi ja pintojen puhdistus sisätiloissa", price: "10.00 €", category: "PESUPALVELUT" },
  { name: "Käsi + sisäpesu", description: "Ulkopesu ja sisätilojen siivous samassa paketissa", price: "10.00 €", category: "PESUPALVELUT" },
  { name: "Normaali vahaus", description: "Perusvaha joka antaa suojaa ja kiiltoa", price: "10.00 €", category: "VAHAUS & KIILTO" },
  { name: "Kova vahaus", description: "Kestävä vahaus paremman suojan takaamiseksi", price: "10.00 €", category: "VAHAUS & KIILTO" },
  { name: "Keraaminen NANO vahaus", description: "Pitkäkestoinen NANOvaha syvällä kiillolla", price: "10.00 €", category: "VAHAUS & KIILTO" },
  { name: "Renkaiden vaihto (henkilöauto)", description: "Renkaiden vaihto henkilöautoon nopeasti ja varmasti", price: "10.00 €", category: "RENGASPALVELUT" },
  { name: "Renkaiden vaihto (pakettiauto)", description: "Pakettiauton renkaiden vaihto tehokkaasti", price: "10.00 €", category: "RENGASPALVELUT" },
  { name: "Renkaiden pesu", description: "Renkaiden ja vanteiden pesu puhtaaksi", price: "10.00 €", category: "RENGASPALVELUT" },
  { name: "Renkaiden tasapainotus", description: "Tasapainotus sujuvaan ja tärinättömään ajoon", price: "10.00 €", category: "RENGASPALVELUT" },
];

interface Props {
  selectedCategory: string;
  onServiceSelect: (service: any) => void;
  activeService: string | null;
}

const ServiceBar = ({ selectedCategory, onServiceSelect, activeService }: Props) => {
  const filteredServices = services.filter(service => service.category === selectedCategory);

  return (
    <>
      {filteredServices.map((item, index) => (
        <div
          className={`info-bar ${activeService === item.name ? "active" : ""}`}
          key={index}
          onClick={() => onServiceSelect(item)}
        >
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
