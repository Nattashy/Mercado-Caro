import React, { useEffect, useState } from 'react'
import Pagina from '../../components/Pagina'
import { Button, Card, Col, Row } from 'react-bootstrap'
import { format } from 'date-fns'
import InputMask from 'react-input-mask'

const limpeza = () => {

  const cardsIniciais = [
    /*{ nome: 'Amaciante', preco: '80,88', estoque: '100', validade: new Date('01/05/2024'), foto: 'https://www.quimisulms.com.br/wp-content/uploads/2019/03/AMACIANTE-YPE-CONC-500ML.jpg' },
      { nome: 'Sabão em pó', preco: '150,99', estoque: '150', validade: new Date('02/06/2024'), foto: 'https://d20yuiaop8roon.cloudfront.net/Custom/Content/Products/67/00/67009_sabao-em-po-tixan-ype-primavera-800g_m7_638222263331683998.jpg' },
      { nome: 'Sabão líquido', preco: '79,98', estoque: '200', validade: new Date('01/09/2024'), foto: 'https://a-static.mlcdn.com.br/450x450/kit-sabao-liquido-ariel-com-toque-de-downy-concentrado-2l-3-unidades/magazineluiza/229073600/df6a792d7b47366a7a0819e5f70c35b5.jpg' },
      { nome: 'Detergente', preco: '55,79', estoque: '230', validade: new Date('08/07/2024'), foto: 'https://beagaembalagem.com.br/wp-content/uploads/2014/09/detergente-yp%C3%AA.png' },
      { nome: 'Sabão de barra', preco: '68,79', estoque: '400', validade: new Date('08/06/2024'), foto: 'https://www.atacadaodalimpeza.com.br/163-thickbox_default/sabao-em-barra-ype-glicerinado-5x200g.jpg' },
      { nome: 'Esponja de aço', preco: '54,95', estoque: '90', validade: new Date('05/02/2024'), foto: 'https://d2r9epyceweg5n.cloudfront.net/stores/001/136/636/products/35163_11-4fcd06e227b24f015c16726904590026-640-0.webp' },
      { nome: 'Limpador multiuso', preco: '78,98', estoque: '95', validade: new Date('09/03/2024'), foto: 'https://www.vejalimpeza.com.br/produtos/_jcr_content/root/lowerContentArea/container_copy/teaser.coreimg.png/1632160074529/banner-head-products-%287%29.png' },
      { nome: 'Desinfetante', preco: '105,49', estoque: '79', validade: new Date('05/01/2024'), foto: 'https://static.wixstatic.com/media/2ed8e3_93d23cad0f764ae2b518dea0bcfa6060~mv2.png/v1/fit/w_500,h_500,q_90/file.png' },
      { nome: 'Esponja', preco: '35,99', estoque: '299', validade: new Date('08/05/2024'), foto: 'https://media.gazetadopovo.com.br/haus/2017/02/outras-esponjas002g-1024x683-a0a21350.jpg' },
      { nome: 'Água sanitária', preco: '85,50', estoque: '120', validade: new Date('03/04/2024'), foto: 'https://images.tcdn.com.br/img/img_prod/867778/agua_sanitaria_girando_sol_1l_2l_5l_4113_1_00d42b5eedb0c71b3f7c753c98afcc9d.jpg' },
      { nome: 'Aromatizante', preco: '47,39', estoque: '136', validade: new Date('04/04/2024'), foto: 'https://www.bomarfragrancias.com.br/produtos/_jcr_content/root/lowerContentArea/container_892645418/container/teaser.coreimg.90.1500.png/1605875182809/packshot-para-banner-principal.png' },
      { nome: 'Luvas de Limpeza', preco: '39,19', estoque: '198', validade: new Date('07/03/2024'), foto: 'https://protelimp.com.br/wp-content/uploads/luva-latex-multiuso-amarela-m.png' }
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
    const storedCards = localStorage.getItem('limpezaCards')
    if (storedCards) {
      const parsedCards = JSON.parse(storedCards).map(card => ({ ...card, validade: new Date(card.validade) }))
      setCards(parsedCards)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('limpezaCards', JSON.stringify(cards.map(card => ({ ...card, validade: card.validade.toISOString() }))))
  }, [cards])

  const editar = (index) => {
    const card = cards[index]
    setEditIndex(index)
    setEditNome(card.nome)
    setEditPreco(card.preco)
    setEditEstoque(card.estoque)
    setEditValidade(card.validade.toISOString().substring(0, 10))
  }

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
  }

  const deletar = (index) => {
    const atualizaCards = [...cards]
    atualizaCards.splice(index, 1)
    setCards(atualizaCards)
    localStorage.setItem('frutasCards', JSON.stringify(atualizaCards))
  }

  return (
    <div>
      <Pagina titulo="Produtos de Limpeza">

        <Button onClick={() => setExibirFormulario(!exibirFormulario)} style={{ margin: "5px" }}>Cadastrar novo produto de limpeza</Button>
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
                      <Button variant="success" style={{ margin: "5px" }} onClick={salvar}>Salvar</Button>
                    </>
                  ) : (
                    <>
                      <Card.Title>{item.nome}</Card.Title>
                      <p>Preço: <strong> R$ {item.preco}</strong></p>
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
    </div>
  )
}

export default limpeza