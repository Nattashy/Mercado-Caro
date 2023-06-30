import React from 'react';
import Pagina from '../../components/Pagina';
import 'bootstrap/dist/css/bootstrap.min.css';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';

const Index = () => {

  const frutas = () => {
    window.location.href = '/mercado/frutas';
  };

  const carnes = () => {
    window.location.href = '/mercado/carnes';
  };

  const limpeza = () => {
    window.location.href = '/mercado/limpeza';
  };

  return (
    <>
      <Pagina titulo={"Mercado Caro - Funcionários"}>
        <Container style={{ margin: "100px 0 0 0" }}>
          <Row>
            <Col xs={4} md={4}>
              <Image
                style={{ width: '100%', maxWidth: '300px', height: 'auto', cursor: 'pointer' }}
                src="https://cdn-icons-png.flaticon.com/512/3081/3081883.png"
                rounded
                onClick={frutas}
              />
              <h1 style={{ textAlign: "center", margin: '10px 0 0 0', cursor: 'pointer' }} onClick={frutas}>Frutas</h1>
            </Col>
            <Col xs={4} md={4}>
              <Image
                style={{ width: '100%', maxWidth: '300px', height: 'auto', cursor: 'pointer' }}
                src="https://cdn-icons-png.flaticon.com/512/1582/1582244.png"
                rounded
                onClick={carnes}
              />
              <h1 style={{ textAlign: "center", margin: '10px 0 0 0', cursor: 'pointer' }} onClick={carnes}>Carnes</h1>
            </Col>
            <Col xs={4} md={4}>
              <Image
                style={{ width: '100%', maxWidth: '300px', height: 'auto', cursor: 'pointer' }}
                src="https://cdn-icons-png.flaticon.com/512/3238/3238600.png"
                rounded
                onClick={limpeza}
              />
              <h1 style={{ textAlign: "center", margin: '10px 0 0 0', cursor: 'pointer' }} onClick={limpeza}>Produtos de Limpeza</h1>
            </Col>
          </Row>
        </Container>
      </Pagina>
    </>
  )
}

export default Index;
