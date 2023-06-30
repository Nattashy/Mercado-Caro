import React, { useEffect, useState } from 'react'
import Pagina from '../../components/Pagina'
import { Button, Card, Col, Row } from 'react-bootstrap'
import { format } from 'date-fns'
import InputMask from 'react-input-mask'

const carnes = () => {

  const cardsIniciais = [
    /*{ nome: 'Picanha', preco: '250,69', estoque: '57', validade: new Date('01/05/2024'), foto: 'https://assets.vtex.app/unsafe/fit-in/720x720/center/middle/https%3A%2F%2Fsuperpao.vtexassets.com%2Farquivos%2Fids%2F308475%2FCarne-Bovina-Picanha-Fatiada-Vacuo-kg.jpg%3Fv%3D1771878086' },
      { nome: 'Filé Mignon', preco: '379,40', estoque: '20', validade: new Date('06/04/2024'), foto: 'https://cdn.shopify.com/s/files/1/0379/5173/3899/products/FileMignon-fatiado_innaturaV3.jpg?v=1589062409' },
      { nome: 'Contra Filé', preco: '150,39', estoque: '60', validade: new Date('09/02/2024'), foto: 'https://cdn.shopify.com/s/files/1/0379/5173/3899/products/Wessel_BifesdeContraFile_innatura.jpg?v=1588001037' },
      { nome: 'Alcatra', preco: '79,99', estoque: '40', validade: new Date('09/07/2024'), foto: 'https://us-southeast-1.linodeobjects.com/storage/comercial-big-oferta/media/uploads/produto/alcatra_bovina_kg_048f2d96-326a-4768-a0dc-b9482ebc298d.png' },
      { nome: 'Bisteca Suína', preco: '35,79', estoque: '148', validade: new Date('02/03/2024'), foto: 'https://io.convertiez.com.br/m/superpaguemenos/shop/products/images/14642/medium/bisteca-suina-resfriada-kg_55991.png' },
      { nome: 'Coxão Mole', preco: '103,90', estoque: '50', validade: new Date('06/12/2024'), foto: 'https://supermercadojequie.com/image/cache/catalog/produtos/carnes/607-550x550w.png' },
      { nome: 'Cupim', preco: '64,40', estoque: '35', validade: new Date('09/05/2024'), foto: 'https://io.convertiez.com.br/m/superpaguemenos/shop/products/images/14368/medium/cupim-bovino-resfriado-kg_10757.png' },
      { nome: 'Coxa e Sobrecoxa de Frango', preco: '52,19', validade: new Date('04/01/2024'), estoque: '203', foto: 'https://bompreco.vtexassets.com/arquivos/ids/176798/coxaesobrecoxadefrangocongeladoaprox500g203008000007.jpg?v=637659566215600000' },
      { nome: 'Fraldinha', preco: '87,60', estoque: '75', validade: new Date('02/09/2024'), foto: 'https://naturaldaterra.com.br/media/catalog/product/i/m/imagem3_1_1.png?auto=webp&format=png&width=640&height=800&fit=cover' },
      { nome: 'Costela', preco: '49,99', estoque: '56', validade: new Date('01/10/2024'), foto: 'https://io.convertiez.com.br/m/superpaguemenos/shop/products/images/14346/medium/costela-bovina-resfriada-kg_55921.png' },
      { nome: 'Coxinha da Asa', preco: '43,70', estoque: '250', validade: new Date('05/07/2024'), foto: 'https://redemachado.com.br/arquivos/galeria/20220711_142955_102977734.jpg' },
      { nome: 'Peito de Frango', preco: '31,80', estoque: '59', validade: new Date('02/08/2024'), foto: 'https://coopsp.vtexassets.com/arquivos/ids/216053-800-auto?v=637919531258900000&width=800&height=auto&aspect=true' }
    */
  ]

  const [cards, setCards] = useState(cardsIniciais)
  const [editIndex, setEditIndex] = useState(-1)
  const [editNome, setEditNome] = useState('')
  const [editPreco, setEditPreco] = useState('')
  const [editEstoque, setEditEstoque] = useState('')
  const [editValidade, setEditValidade] = useState(format(new Date(), 'yyyy-MM-dd'))
  const [nome, setNome] = useState('')
  const [preco, setPreco] = useState('')
  const [estoque, setEstoque] = useState('')
  const [validade, setValidade] = useState('')
  const [foto, setFoto] = useState('')
  const [exibirFormulario, setExibirFormulario] = useState(false)

  const cadastrarItem = () => {
    const novoItem = {
      nome,
      preco,
      estoque,
      validade: new Date(validade),
      foto
    }

    setCards([...cards, novoItem])
    setNome('')
    setPreco('')
    setEstoque('')
    setValidade('')
    setFoto('')
  }

  useEffect(() => {
    const storedCards = localStorage.getItem('carnesCards');
    if (storedCards) {
      const parsedCards = JSON.parse(storedCards).map(card => ({ ...card, validade: new Date(card.validade) }))
      setCards(parsedCards)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('carnesCards', JSON.stringify(cards.map(card => ({ ...card, validade: card.validade.toISOString() }))))
  }, [cards])

  const editar = (index) => {
    const card = cards[index]
    setEditIndex(index)
    setEditNome(card.nome)
    setEditPreco(card.preco)
    setEditEstoque(card.estoque)
    setEditValidade(card.validade.toISOString().substring(0, 10))
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target
    switch (name) {
      case 'nome':
        setEditNome(value)
        break
      case 'preco':
        const formattedValue = value.replace(/[^0-9.,]/g, '')
        setEditPreco(formattedValue)
        break
      case 'estoque':
        setEditEstoque(value.replace(/\D/g, ''))
        break
      case 'validade':
        setEditValidade(value)
        break
      default:
        break
    }
  };

  const salvar = () => {
    const updatedCard = {
      nome: editNome,
      preco: editPreco,
      estoque: editEstoque,
      validade: new Date(editValidade + 'T00:00:00'),
      foto: cards[editIndex].foto
    }

    const atualizaCards = [...cards]
    atualizaCards[editIndex] = updatedCard

    setCards(atualizaCards)
    setEditIndex(-1)
    setEditNome('')
    setEditPreco('')
    setEditEstoque('')
    setEditValidade('')
  };

  const deletar = (index) => {
    const atualizaCards = [...cards]
    atualizaCards.splice(index, 1)
    setCards(atualizaCards)
    localStorage.setItem('carnesCards', JSON.stringify(atualizaCards))
  }

  return (
    <>
      <Pagina titulo={"Carnes"}>

        <Button onClick={() => setExibirFormulario(!exibirFormulario)} style={{ margin: "5px" }}>Cadastrar nova carne</Button>
        {exibirFormulario && (
          <div>
            <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} style={{ margin: "5px", borderRadius: '5px', padding: '4px' }} placeholder="Nome" />
            <InputMask
              mask="99,99"
              maskChar=""
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
              placeholder="Preço"
              style={{ margin: "5px", borderRadius: '5px', padding: '4px' }}
            />
            <InputMask
              mask="9999"
              maskChar=""
              value={estoque}
              onChange={(e) => setEstoque(e.target.value)}
              placeholder="Estoque"
              style={{ margin: "5px", borderRadius: '5px', padding: '4px' }}

            />

            <input type="date"
              value={validade}
              onChange={(e) => setValidade(e.target.value)}
              style={{ margin: "5px", borderRadius: '5px', padding: '4px' }}
              placeholder="Data de Validade"
            />

            <InputMask
              value={foto}
              onChange={(e) => setFoto(e.target.value)}
              placeholder="URL da Foto"
              style={{ margin: "5px", borderRadius: '5px', padding: '4px' }}
              prefix='https://'
            />

            <Button variant="success" style={{ margin: "0 0 7px 5px" }} onClick={cadastrarItem}>Cadastrar</Button>
          </div>
        )}

        <Row md={3} >
          {cards.map((item, index) => (
            <Col md={3} key={index}>
              <Card style={{ margin: "10px 0 10px 0" }}>
                <Card.Img variant="top" src={item.foto} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                <Card.Body>
                  {index === editIndex ? (
                    <>
                      <input type="text" name="preco" value={editPreco} onChange={handleInputChange} style={{ margin: "4px" }} placeholder="Preço" />
                      <input type="text" name="estoque" value={editEstoque} onChange={handleInputChange} style={{ margin: "4px" }} placeholder="Estoque" />
                      <input type="date" name="validade" value={editValidade} onChange={handleInputChange} style={{ margin: "4px" }} placeholder="Data de Validade" />
                      <br />
                      <Button variant="success" onClick={salvar}>Salvar</Button>
                    </>
                  ) : (
                    <>
                      <Card.Title>{item.nome}</Card.Title>
                      <p>Preço: <strong> R$ {item.preco} kg</strong></p>
                      <p>Estoque: {item.estoque}</p>
                      <p>Data de Validade: {item.validade.toLocaleDateString('pt-BR')}</p>
                      <Button variant="success" onClick={() => editar(index)}>Editar</Button>
                      <Button variant="danger" style={{ margin: "5px" }} onClick={() => deletar(index)}>Deletar</Button>
                    </>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>


      </Pagina>
    </>
  )
}

export default carnes