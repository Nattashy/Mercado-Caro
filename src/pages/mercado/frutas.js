import React, { useEffect, useState } from 'react'
import Pagina from '../../components/Pagina'
import { Button, Card, Col, Row } from 'react-bootstrap'
import { format } from 'date-fns'
import InputMask from 'react-input-mask'

const frutas = () => {

  const cardsIniciais = [
  /*{ nome: 'Morango', preco: '22,89', estoque: '50', validade: new Date('02/08/2024'), foto: 'https://d3ugyf2ht6aenh.cloudfront.net/stores/034/476/products/morango1-924faba335e47f115e15807677255039-640-0.png' },
    { nome: 'Melancia', preco: '44,99', estoque: '20', validade: new Date('05/07/2024'), foto: 'https://www.cartacapital.com.br/wp-content/uploads/2022/03/iStock-157636928.jpg' },
    { nome: 'Maçã', preco: '35,88', estoque: '30', validade: new Date('01/07/2024'), foto: 'https://mercadoorganico.com/6314-large_default/maca-gala-organica-500g-osm.jpg' },
    { nome: 'Cereja', preco: '25,85', estoque: '10', validade: new Date('02/09/2024'), foto: 'https://cdn.shoppub.io/cdn-cgi/image/w=1000,h=1000,q=80,f=auto/cenourao/media/uploads/produtos/foto/nohgfujy/cereja-importada.jpg' },
    { nome: 'Framboesa', preco: '20,19', estoque: '60', validade: new Date('04/01/2024'), foto: 'https://www.infoescola.com/wp-content/uploads/2009/12/framboesa.jpg' },
    { nome: 'Laranja', preco: '43,99', estoque: '100', validade: new Date('09/05/2024'), foto: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Orange-Fruit-Pieces.jpg/1200px-Orange-Fruit-Pieces.jpg' },
    { nome: 'Limão', preco: '69,81', estoque: '100', validade: new Date('06/12/2024'), foto: 'https://assessa.com.br/wp-content/uploads/lim%C3%A3o-feat-img.jpg' },
    { nome: 'Manga', preco: '55,99', estoque: '100', validade: new Date('02/03/2024'), foto: 'https://static.mundoeducacao.uol.com.br/mundoeducacao/2021/05/manga.jpg' },
    { nome: 'Uva', preco: '49,99', estoque: '200', validade: new Date('09/07/2024'), foto: 'https://media.guiame.com.br/archives/2015/10/15/1427125018-uva.jpg' },
    { nome: 'Abacate', preco: '105,99', estoque: '100', validade: new Date('09/02/2024'), foto: 'https://s2-ge.glbimg.com/atIp_axsQ9CQci2-CQ6zGIqLTUU=/1200x/smart/filters:cover():strip_icc()/s.glbimg.com/es/ge/f/original/2014/11/20/abacate.jpg' },
    { nome: 'Banana', preco: '78,99', estoque: '90', validade: new Date('06/04/2024'), foto: 'https://d3ugyf2ht6aenh.cloudfront.net/stores/174/441/products/banana-prata1-1de4a86361951570af15122893837003-1024-1024.webp' },
    { nome: 'Mamão', preco: '96,99', estoque: '75', validade: new Date('01/05/2024'), foto: 'https://revistacampoenegocios.com.br/wp-content/uploads/2020/11/Mam%C3%A3o-01-1024x773.jpg' }
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
    const storedCards = localStorage.getItem('frutasCards')
    if (storedCards) {
      const parsedCards = JSON.parse(storedCards).map(card => ({ ...card, validade: new Date(card.validade) }))
      setCards(parsedCards)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('frutasCards', JSON.stringify(cards.map(card => ({ ...card, validade: card.validade.toISOString() }))))
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
  }

  const deletar = (index) => {
    const atualizaCards = [...cards]
    atualizaCards.splice(index, 1)
    setCards(atualizaCards)
    localStorage.setItem('frutasCards', JSON.stringify(atualizaCards))
  }

  return (
    <div>
      <Pagina titulo="Frutas">
        <Button onClick={() => setExibirFormulario(!exibirFormulario)} style={{ margin: "5px" }}>Cadastrar nova fruta</Button>
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
                      <input type="text" name="preco" value={editPreco} onChange={handleInputChange} style={{ margin: "5px", borderRadius: '5px' }} placeholder="Preço" />
                      <input type="text" name="estoque" value={editEstoque} onChange={handleInputChange} style={{ margin: "5px", borderRadius: '5px' }} placeholder="Estoque" />
                      <input type="date" name="validade" value={editValidade} onChange={handleInputChange} style={{ margin: "5px", borderRadius: '5px', padding: '5px' }} placeholder="Data de Validade" />
                      <br />
                      <Button variant="success" style={{ margin: "5px" }} onClick={salvar}>Salvar</Button>
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
    </div>
  );
};

export default frutas
