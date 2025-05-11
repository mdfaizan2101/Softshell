import uploadImg from '../assets/upload.png';
import valuationImg from '../assets/valuation.png';
import paymentImg from '../assets/payment.png';

function HowItWorks() {
  const steps = [
    {
      title: "1. Upload License",
      description: "Submit details of your unused license with just a few clicks.",
      image: uploadImg
    },
    {
      title: "2. Get a Valuation",
      description: "Our system instantly estimates your license's resale value.",
       image: valuationImg
    },
    {
      title: "3. Get Paid",
      description: "Accept the offer and receive money directly to your account.",
      image: paymentImg
    }
  ];

  return (
    <section className="how-it-works">
      <h2>How It Works</h2>
      <div className="how-cards">
        {steps.map((step, index) => (
          <div className="how-card" key={index}>
            <img src={step.image} alt={step.title} />
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HowItWorks;
