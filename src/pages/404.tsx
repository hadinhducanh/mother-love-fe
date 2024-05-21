import { Brand } from "../components/Brand";
import Footer from "../components/Footer";
import Header from "../components/Header";

export const NotFound = () => {
  return (
    <>
      <Header />
      <div>
        <div>
          {/* Page Banner Section Start */}
          <div
            className="page-banner-section section"
            style={{ backgroundImage: "url(./src/assets/images/hero/hero-1.jpg)" }}
          >
            <div className="container">
              <div className="row">
                <div className="page-banner-content col">
                  <h1>404</h1>
                  <ul className="page-breadcrumb">
                    <li>
                      <a href="index.html">Home</a>
                    </li>
                    <li>
                      <a href="404.html">404</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* Page Banner Section End */}
          {/* Page Section Start */}
          <div className="page-section section section-padding">
            <div className="container">
              <div className="row">
                <div className="col-lg-6 col-md-8 col-12 mx-auto">
                  <div className="error-404">
                    <h1>404</h1>
                    <h2>OPPS! PAGE NOT BE FOUND</h2>
                    <p>
                      Sorry but the page you are looking for does not exist,
                      have been removed, name changed or is temporarity
                      unavailable.
                    </p>
                    <form action="#" className="searchform mb-30">
                      <input
                        type="text"
                        name="search"
                        id="error_search"
                        placeholder="Search..."
                      />
                      <button type="submit" className="submit">
                        <i className="fa fa-search" />
                      </button>
                    </form>
                    <a href="index.html" className="back-btn">
                      Back to home page
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Page Section End */}
        </div>
      </div>
      <Brand />
      <Footer />
    </>
  );
};
