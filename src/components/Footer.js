import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {
  return (
    <footer style={{ width: '100%', height: '58px', padding:'4px'}} className='bg-dark text-white text-center position-fixed bottom-0'>
      <Container>

        <Row style={{ padding: '0 0 2px 0'}}>
          <Col>
            <div className="social-icons">
              <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className='text-white' style={{ padding: '5px'}}>
                <FaFacebook />
              </a>
              <a href="https://www.twitter.com/" target="_blank" rel="noopener noreferrer" className='text-white' style={{ padding: '5px'}}>
                <FaTwitter />
              </a>
              <a href="https://www.instagram.com/_natashy_/" target="_blank" rel="noopener noreferrer" className='text-white' style={{ padding: '5px'}}>
                <FaInstagram />
              </a>
            </div>
          </Col>
        </Row>

        <Row>
          <Col >
            <p>&copy; 2023 Mercado Caro</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
