import { Brand } from "../components/Brand";
import Footer from "../components/Footer";
import Header from "../components/Header";

export const Contact = () => {
  return (
    <>
      <Header />
      <div>
        <div>
          {/* Page Banner Section Start */}
          <div
            className="page-banner-section section"
            style={{
              backgroundImage: "url(./src/assets/images/hero/hero-1.jpg)",
            }}
          >
            <div className="container">
              <div className="row">
                <div className="page-banner-content col">
                  <h1>Contact us</h1>
                  <ul className="page-breadcrumb">
                    <li>
                      <a href="index.html">Home</a>
                    </li>
                    <li>
                      <a href="contact.html">Contact us</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* Page Banner Section End */}
          {/* Contact Section Start */}
          <div className="page-section section section-padding">
            <div className="container">
              <div className="row row-30 mbn-40">
                <div className="contact-info-wrap col-md-6 col-12 mb-40">
                  <h3>Get in Touch</h3>
                  <p>
                    Jadusona is the best theme for elit, sed do eiusmod tempor
                    dolor sit ame tse ctetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et lorna aliquatd minim veniam,
                  </p>
                  <ul className="contact-info">
                    <li>
                      <i className="fa fa-map-marker" />
                      <p>
                        256, 1st AVE, You address <br />
                        will be here
                      </p>
                    </li>
                    <li>
                      <i className="fa fa-phone" />
                      <p>
                        <a href="#">+01 235 567 89</a>
                        <a href="#">+01 235 286 65</a>
                      </p>
                    </li>
                    <li>
                      <i className="fa fa-globe" />
                      <p>
                        <a href="#">info@example.com</a>
                        <a href="#">www.example.com</a>
                      </p>
                    </li>
                  </ul>
                </div>
                <div className="contact-form-wrap col-md-6 col-12 mb-40">
                  <h3>Leave a Message</h3>
                  <form id="contact-form" action="assets/php/mail.php">
                    <div className="contact-form">
                      <div className="row">
                        <div className="col-lg-6 col-12 mb-30">
                          <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                          />
                        </div>
                        <div className="col-lg-6 col-12 mb-30">
                          <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                          />
                        </div>
                        <div className="col-12 mb-30">
                          <textarea
                            name="message"
                            placeholder="Message"
                            defaultValue={""}
                          />
                        </div>
                        <div className="col-12">
                          <input type="submit" defaultValue="send" />
                        </div>
                      </div>
                    </div>
                  </form>
                  <p className="form-messege" />
                </div>
              </div>
            </div>
          </div>
          {/* Contact Section End */}
        </div>
      </div>
      <Brand />
      <Footer />
    </>
  );
};
