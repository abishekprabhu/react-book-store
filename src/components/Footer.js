import React from 'react';
import '../styles/Navbar.css'

export default function Footer() {
  return (
    <>
      <footer className="text-center text-lg-start text-muted py-2 mt-5 downBar rounded shadow ">
        <section className="d-flex justify-content-center justify-content-lg-between p-3 border-bottom text-dark">
          <div className="me-5 d-none d-lg-block">
            <span>Get connected with us on social networks:</span>
          </div>
          <div>
            <a href="#" className="me-4 text-reset">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="me-4 text-reset">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="me-4 text-reset">
              <i className="fab fa-google"></i>
            </a>
            <a href="#" className="me-4 text-reset">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="me-4 text-reset">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="#" className="me-4 text-reset">
              <i className="fab fa-github"></i>
            </a>
          </div>
        </section>

        <section>
          <div className="container text-center text-md-start mt-3 text-dark">
            <div className="row mt-3">
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-2">
                <h5 className="text-uppercase fw-bold mb-4 michroma-regular">
                  <i className="fas fa-book me-1"></i>E-BOOK STORE
                </h5 >
                <p>
                  Here you can use rows and columns to organize your footer content. Lorem ipsum
                  dolor sit amet, consectetur adipisicing elit.
                </p>
              </div>

              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Products</h6>
                <p><a href="#!" className="text-reset">Angular</a></p>
                <p><a href="#!" className="text-reset">React</a></p>
                <p><a href="#!" className="text-reset">MySql</a></p>
                <p><a href="#!" className="text-reset">Java</a></p>
              </div>

              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                <p><i className="fas fa-home me-3"></i> Chennai, NY 10012, US</p>
                <p><i className="fas fa-envelope me-3"></i> books@example.com</p>
                <p><i className="fas fa-phone me-3"></i> + 01 234 567 88</p>
                <p><i className="fas fa-print me-3"></i> + 01 234 567 89</p>
              </div>
            </div>
          </div>
        </section>

        <div className="text-center p-2 text-dark" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
          © 2025 Copyright:
          http://localhost:3000/
        </div>
      </footer>
    </>
  );
}
