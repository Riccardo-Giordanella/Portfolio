import "./Services.css";
import SERVICES_DATA from "../assets/services_data";
// import white_arrow from "../assets/white_arrow.png";

export default function Services() {
  return (
    <section id="services" className="services">
      <div className="services-title">
        <h1>My Services</h1>
      </div>
      <div className="services-container">
        {SERVICES_DATA.map((service, index) => {
          return (
            <div key={index} className="services-format">
              <h2>{service.title}</h2>
              <p>{service.description}</p>
              {/* <div className="services-readmore">
                <p>Read More</p>
                <img src={white_arrow} alt="White arrow" />
              </div> */}
            </div>
          );
        })}
      </div>
    </section>
  );
}
