import './carwash.css';
import { useState } from 'react';
import Image from 'next/image';

const Carwash = () => {
    const [activeTab, setActiveTab] = useState('tiedot');

    return (
        <div className="service-container">
            <div className="carwash-header">
                <h1>Autonpesu 7autossa</h1>
                <div className="tab-menu">
                    <span
                        className={activeTab === 'tiedot' ? 'tab active' : 'tab'}
                        onClick={() => setActiveTab('tiedot')}
                    >
                        Tiedot
                    </span>
                    <span
                        className={activeTab === 'hinnat' ? 'tab active' : 'tab'}
                        onClick={() => setActiveTab('hinnat')}
                    >
                        Palvelut / Hinnat
                    </span>
                </div>
            </div>

            <div className="tab-content">
                <div className={`carfix-content ${activeTab === 'tiedot' ? 'visible' : 'hidden'}`}>
                    <div className="info-content">
                        <div className="info-text">
                            <p>
                                Autonpesu 7autossa tarjoamme kattavan valikoiman autonhoitopalveluita, jotka on suunniteltu helpottamaan arkeasi ja pidentämään ajoneuvosi käyttöikää. Olipa kyseessä ulkoinen puhdistus, sisätilojen siivous tai vaativampi pintojen suojaus, voit luottaa siihen, että työ tehdään huolellisesti ja ammattitaidolla.
                            </p>
                            <br />
                            <p>
                                Meille tärkeintä on asiakkaan tyytyväisyys, ja siksi käytämme laadukkaita aineita sekä nykyaikaisia menetelmiä jokaisessa työvaiheessa. Palvelumme sopivat niin päivittäiseen ylläpitoon kuin perusteellisempaan auton kunnostukseen. Myös rengastyöt hoituvat meillä helposti ja nopeasti saman katon alla.
                            </p>
                            <br />
                            <p>
                                Tavoitteenamme on tarjota asiakkaillemme vaivaton ja miellyttävä asiointikokemus olitpa sitten ensimmäistä kertaa liikkeellä tai pitkäaikainen asiakkaamme. Tervetuloa huolettomaan autonhoitoon!
                            </p>
                        </div>
                            <Image src="/carwash.png" alt="Autonpesu" className='info-image'  width={400} height={300} />
                    </div>
                </div>

                <div className={`carfix-content ${activeTab === 'hinnat' ? 'visible' : 'hidden'}`}>
                    <p>Hinnasto tulossa pian! (Pricing coming soon!)</p>
                </div>
            </div>
        </div>
    );
};

export default Carwash;
