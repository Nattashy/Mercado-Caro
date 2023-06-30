import React from 'react'
import Pagina from '../../components/Pagina'
import { useState, useEffect } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import ListGroup from 'react-bootstrap/ListGroup'
import InputMask from 'react-input-mask'
import { FaTrash } from 'react-icons/fa'
import { BsPencilFill } from 'react-icons/bs'
import jsPDF from 'jspdf'

const index = () => {

  const [validated, setValidated] = useState(false)
  const [faturamento, setFaturamento] = useState([])
  const [valor, setValor] = useState([])
  const [mes, setMes] = useState('')
  const [editIndex, setEditIndex] = useState(-1)
  const [exibirFormulario, setExibirFormulario] = useState(false)

  useEffect(() => {
    const storedFaturamento = localStorage.getItem('faturamento')
    if (storedFaturamento) {
      setFaturamento(JSON.parse(storedFaturamento))
    }
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.stopPropagation()
    } else {
      const novoFaturamento = {
        valor,
        mes
      }
      if (editIndex !== -1) {

        const updatedFaturamento = [...faturamento]
        updatedFaturamento[editIndex] = novoFaturamento
        setFaturamento(updatedFaturamento)
        setEditIndex(-1) // Limpa o index de edição
      } else {
        setFaturamento([...faturamento, novoFaturamento])
        setValidated(true)
      }
      localStorage.setItem('faturamento', JSON.stringify([...faturamento, novoFaturamento]))
      resetForm()

    }

  }

  const gerarPDF = () => {
    const doc = new jsPDF()

    doc.text('Faturamento:', 10, 10)
    faturamento.forEach((faturamento, index) => {
      const linha = `${index + 1}. Valor: R$ ${faturamento.valor} | Mês: ${faturamento.mes}`
      doc.text(linha, 10, 20 + index * 10)
    })

    doc.save('faturamento.pdf')
  }

  const deletar = (index) => {
    const updatedFaturamento = [...faturamento]
    updatedFaturamento.splice(index, 1)
    setFaturamento(updatedFaturamento)
    localStorage.setItem('faturamento', JSON.stringify(updatedFaturamento))
  }

  const editar = (index) => {
    const faturamentos = faturamento[index]
    setValor(faturamentos.valor)
    setMes(faturamentos.mes)
    setEditIndex(index)
    setExibirFormulario(true)
  }

  const resetForm = () => {
    setValor('')
    setMes('')
    setValidated(false)
    setEditIndex(-1)
  }

  return (
    <div>
      <Pagina titulo='Faturamento'>

        <Button onClick={() => setExibirFormulario(!exibirFormulario)} style={{ margin: "5px", }}>Cadastrar novo faturamento</Button>
        {exibirFormulario && (
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="informacoes">
              <h1>Dados Faturamento</h1>


              <div className="form-group has-validation" style={{ margin: '5px' }}>
                <label htmlFor="validationCustom06">Valor</label>
                <InputMask
                  as={Col}
                  md="4"
                  className="form-control"
                  id="validationCustom06"
                  mask="99.999,99"
                  maskChar=""
                  value={valor}
                  onChange={(e) => setValor(e.target.value)}
                  placeholder="Valor"
                  required
                />
              </div>

              <Form.Group as={Col} md="4" controlId="validationCustom02" style={{ margin: '5px' }}>
                <Form.Label>Mês</Form.Label>
                <Form.Select type="text"
                  placeholder="Mês"
                  required
                  value={mes}
                  onChange={(e) => setMes(e.target.value)}>
                  <option value="Janeiro">Janeiro</option>
                  <option value="Fevereiro">Fevereiro</option>
                  <option value="Março">Março</option>
                  <option value="Abril">Abril</option>
                  <option value="Maio">Maio</option>
                  <option value="Junho">Junho</option>
                  <option value="Julho">Julho</option>
                  <option value="Agosto">Agosto</option>
                  <option value="Setembro">Setembro</option>
                  <option value="Outubro">Outubro</option>
                  <option value="Novembro">Novembro</option>
                  <option value="Dezembro">Dezembro</option>
                </Form.Select>
              </Form.Group>

            </Row>

            <Button variant="success" type="submit" style={{ margin: '5px' }}>Salvar</Button>
          </Form>
        )}

        <Button variant="warning" onClick={gerarPDF} style={{ margin: "5px"}}>Gerar PDF</Button>

        {faturamento.length > 0 && (

          <div>
            <h2 style={{ margin: "20px 0 20px 0" }}>Faturamentos Mensais:</h2>
            {faturamento.map((faturamento, index) => (
              <ListGroup key={index}>

                <ListGroup.Item action variant="success" key={index} style={{ margin: "5px" }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ padding: '12px', color: 'black' }}>
                      <strong>Valor:</strong> R$ {faturamento.valor} <strong>Mês:</strong> {faturamento.mes}
                    </div>
                    <div>
                      <BsPencilFill
                        style={{ margin: "15px", cursor: "pointer", color: 'black' }}
                        onClick={() => editar(index)}
                      />
                      <FaTrash
                        style={{ margin: "5px", cursor: "pointer", color: 'black' }}
                        onClick={() => deletar(index)}
                      />
                    </div>
                  </div>
                </ListGroup.Item>

              </ListGroup>
            ))}
          </div>
        )}

      </Pagina>
    </div>
  )
}

export default index