import './carfix.css';
import Image from 'next/image';

const Carfix = () => {

    return (
        <section id="huolto">
        <div className="carfix-service-container">
        <div className="carfix-header">
            <h1>Auton huolto 7autossa</h1>
        </div>
        <div className='info-content'>
        <div className="carfix-content">
        <p>7autossa tarjoamme monipuoliset ja luotettavat autohuoltopalvelut, jotka on suunniteltu varmistamaan ajoneuvosi turvallisuus, suorituskyky ja pitkä käyttöikä. Olipa kyseessä määräaikaishuolto, öljynvaihto, jarrujen tarkastus tai jokin muu tekninen toimenpide, voit luottaa siihen, että autosi on osaavissa käsissä.
        <br />
        <br />
        <p className='info-text-desktop'>Panostamme työn laatuun ja asiakastyytyväisyyteen käyttämällä vain laadukkaita varaosia ja nykyaikaisia huoltomenetelmiä. Meiltä saat apua niin arkisiin huoltotarpeisiin kuin yllättäviin korjaustilanteisiin nopeasti, joustavasti ja kilpailukykyiseen hintaan.</p>
        <br className='info-text-desktop' />
        Huollon yhteydessä voimme tarkistaa myös renkaat, valot, nesteet ja muut tärkeät ajoneuvon osa-alueet, jotta voit ajaa huoletta kaikkina vuodenaikoina. Tarjoamme kokonaisvaltaista palvelua saman katon alla.

        Tavoitteenamme on tehdä autohuollosta mahdollisimman sujuvaa ja vaivatonta sinulle, joka arvostat luotettavuutta ja hyvää palvelua.</p>
        </div>
        <Image src="/carfix.png" alt="Auton huolto" className='info-image' width={400} height={300} />
        </div>
        </div>
        </section>
)
}

export default Carfix;