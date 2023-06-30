import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Pagina = (props) => {
    return (
        <>

            <Header />
            <div className='text-white py-3 text-center mb-2' style={{ backgroundColor:'#c9061a'}}>
                <h1>{props.titulo}</h1>
            </div>
            <Container className='mb-5'>
                {props.children}
            </Container>
            <br/>
            <br/>
            <Footer />

        </>
    )
}

export default Pagina