import '../styles/infobar.css'

const service = [

    {
        id: 1,
        name: "Information Bar",
        description: "This is an information bar component.",
        price: "$0.00",
    },

    {
        id: 2,
        name: "Notification Bar",
        description: "This is a notification bar component.",
        price: "$0.00",
    },

]

const infoBar = () => {
    return (
        <div className="info-bar">
            <div className="middle-bar">
            <p className="service">Käsipesu</p>
            <p className="description"> This is an information bar component that provides important updates and notifications.</p>
            </div>
            <p className="price">22 €</p>       
            </div>
    );
}

export default infoBar;