import Link from 'next/link'
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { BsBagHeartFill, BsCashCoin, BsClipboardDataFill, BsFillPeopleFill} from 'react-icons/bs'

const Header = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/mercado" style={{fontWeight: 'bold'}}>Mercado Caro <BsBagHeartFill style={{ margin: "0 0 10px 0", cursor: "pointer" }}/></Navbar.Brand>
          <Nav className="me-auto">
            <NavDropdown title="Produtos" id="basic-nav-dropdown">
              <Link className='dropdown-item' href="/mercado/frutas">Frutas</Link>
              <Link className='dropdown-item' href="/mercado/carnes">Carnes</Link>
              <Link className='dropdown-item' href="/mercado/limpeza">Produtos de Limpeza</Link>
            </NavDropdown>
            <Link className='nav-link' href="/cadastro"><BsFillPeopleFill style={{ margin: "0 0 5px 0", cursor: "pointer" }}/> Funcionários </Link>
            <Link className='nav-link' href="/faturamento"><BsClipboardDataFill style={{ margin: "0 0 5px 0", cursor: "pointer" }}/> Faturamento</Link>
            <Link className='nav-link' href="/fornecedor"><BsCashCoin style={{ margin: "0 0 5px 0", cursor: "pointer" }}/> Fornecedor</Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}

export default Header