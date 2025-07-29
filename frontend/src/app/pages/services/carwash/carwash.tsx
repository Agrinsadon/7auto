import './carwash.css';
import { useState } from 'react';
import Image from 'next/image';

const Carwash = () => {
    const [activeTab, setActiveTab] = useState('tiedot');

    return (
        <section id="pesu">

        <div className="carwash-service-container">
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
                <div className={`carwash-content ${activeTab === 'tiedot' ? 'visible' : 'hidden'}`}>
                    <div className="info-content">
                        <div className="info-text">
                            <p>
                                Autonpesu 7autossa tarjoamme kattavan valikoiman autonhoitopalveluita, jotka on suunniteltu helpottamaan arkeasi ja pidentämään ajoneuvosi käyttöikää. Olipa kyseessä ulkoinen puhdistus, sisätilojen siivous tai vaativampi pintojen suojaus, voit luottaa siihen, että työ tehdään huolellisesti ja ammattitaidolla.
                            </p>
                            <br />
                            <p className='info-text-desktop'>
                                Meille tärkeintä on asiakkaan tyytyväisyys, ja siksi käytämme laadukkaita aineita sekä nykyaikaisia menetelmiä jokaisessa työvaiheessa. Palvelumme sopivat niin päivittäiseen ylläpitoon kuin perusteellisempaan auton kunnostukseen. Myös rengastyöt hoituvat meillä helposti ja nopeasti saman katon alla.
                            </p>
                            <br className='info-text-desktop'/>
                            <p>
                                Tavoitteenamme on tarjota asiakkaillemme vaivaton ja miellyttävä asiointikokemus olitpa sitten ensimmäistä kertaa liikkeellä tai pitkäaikainen asiakkaamme. Tervetuloa huolettomaan autonhoitoon!
                            </p>
                        </div>
                            <Image src="/carwash.png" alt="Autonpesu" className='info-image'  width={400} height={300} />
                    </div>
                </div>

                <div className={`carwash-content ${activeTab === 'hinnat' ? 'visible' : 'hidden'}`}>
                <div className="services-grid">
                <div className="row">
                    <div className="cell"><strong>PESUPALVELUT</strong></div>
                    <div className="cell-underline"></div>
                    <div className="cell">Käsipesu - 10.00 €</div>
                    <div className="cell">Sisäpesu - 10.00 €</div>
                    <div className="cell">Käsi + sisäpesu - 10.00 €</div>
                </div>
                <div className="row">
                    <div className="cell"><strong>VAHAUS & KIILTO</strong></div>
                    <div className="cell-underline"></div>
                    <div className="cell">Normaali vahaus - 10.00 €</div>
                    <div className="cell">Kova vahaus - 10.00 €</div>
                    <div className="cell">Keraaminen NANO vahaus - 10.00 €</div>
                </div>
                <div className="row">
                    <div className="cell"><strong>RENGASPALVELUT</strong></div>
                    <div className="cell-underline"></div>
                    <div className="cell">Renkaiden vaihto (henkilöauto) - 10.00 €</div>
                    <div className="cell">Renkaiden vaihto (pakettiauto) - 10.00 €</div>
                    <div className="cell">Renkaiden pesu - 10.00 €</div>
                    <div className="cell">Renkaiden tasapainotus - 10.00 €</div>
                </div>
                </div>
                </div>
            </div>
        </div>
        </section>
    );
};

export default Carwash;
