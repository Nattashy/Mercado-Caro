import React from 'react'
import Pagina from '../../components/Pagina'
import { useState, useEffect } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import InputGroup from 'react-bootstrap/InputGroup'
import ListGroup from 'react-bootstrap/ListGroup'
import InputMask from 'react-input-mask'
import { FaTrash } from 'react-icons/fa'
import { BsPencilFill } from 'react-icons/bs'


const index = () => {

  const [validated, setValidated] = useState(false)
  const [funcionarios, setFuncionarios] = useState([])
  const [nome, setNome] = useState('')
  const [sobrenome, setSobrenome] = useState('')
  const [cpf, setCpf] = useState('')
  const [email, setEmail] = useState('')
  const [telefone, setTelefone] = useState('')
  const [editIndex, setEditIndex] = useState(-1)
  const [exibirFormulario, setExibirFormulario] = useState(false)

  useEffect(() => {
    const storedFuncionarios = localStorage.getItem('funcionarios')
    if (storedFuncionarios) {
      setFuncionarios(JSON.parse(storedFuncionarios))
    }
  }, [])


  const handleSubmit = (event) => {
    event.preventDefault()
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.stopPropagation()
    } else {
      const novoFuncionario = {
        nome,
        sobrenome,
        cpf,
        email,
        telefone
      }
      if (editIndex !== -1) {
        // Se estiver editando, atualiza o funcionário existente
        const updatedFuncionarios = [...funcionarios]
        updatedFuncionarios[editIndex] = novoFuncionario
        setFuncionarios(updatedFuncionarios)
        setEditIndex(-1) // Limpa o index de edição
      } else {
        // Se estiver adicionando, insere um novo funcionário
        setFuncionarios([...funcionarios, novoFuncionario])
        setValidated(true)
      }
      localStorage.setItem('funcionarios', JSON.stringify([...funcionarios, novoFuncionario]))
      resetForm()

    }

  }

  const deletar = (index) => {
    const updatedFuncionarios = [...funcionarios]
    updatedFuncionarios.splice(index, 1)
    setFuncionarios(updatedFuncionarios)
    localStorage.setItem('funcionarios', JSON.stringify(updatedFuncionarios))
  }

  const editar = (index) => {
    const funcionario = funcionarios[index]
    setNome(funcionario.nome)
    setSobrenome(funcionario.sobrenome)
    setCpf(funcionario.cpf)
    setEmail(funcionario.email)
    setTelefone(funcionario.telefone)
    setEditIndex(index)
    setExibirFormulario(true)
  }

  const resetForm = () => {
    setNome('')
    setSobrenome('')
    setCpf('')
    setEmail('')
    setTelefone('')
    setValidated(false)
    setEditIndex(-1)
  }


  return (
    <div>
      <Pagina titulo={'Funcionários'}>

        <Button onClick={() => setExibirFormulario(!exibirFormulario)} style={{ margin: "5px" }}>Cadastrar novo funcionário</Button>
        {exibirFormulario && (
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="informacoes">
              <h1>Dados Funcionário</h1>

              <Form.Group as={Col} md="4" controlId="validationCustom01" style={{ margin: '5px' }}>
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nome"
                  required value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Por favor insira seu nome.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="4" controlId="validationCustom02" style={{ margin: '5px' }}>
                <Form.Label>Sobrenome</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Sobrenome"
                  required
                  value={sobrenome}
                  onChange={(e) => setSobrenome(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">Por favor insira seu sobrenome.</Form.Control.Feedback>
              </Form.Group>


              <div className="form-group has-validation" style={{ margin: '5px' }}>
                <label htmlFor="validationCustom06">CPF</label>
                <InputMask
                  className="form-control"
                  id="validationCustom06"
                  mask="999.999.999-99"
                  maskChar=""
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                  placeholder="000.000.000-00"
                  required
                />
              </div>

              <Form.Group as={Col} md="4" controlId="validationCustomUsername" style={{ margin: '5px' }}>
                <Form.Label>Email</Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="nome@email.com"
                    aria-describedby="inputGroupPrepend"
                    required value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Por favor insira seu email.
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              <div className="form-group has-validation" style={{ margin: '5px' }}>
                <label htmlFor="validationCustom06">Telefone</label>
                <InputMask
                  as={Col}
                  md="4"
                  className="form-control"
                  id="validationCustom06"
                  mask="(99) 9999-9999"
                  maskChar=""
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  placeholder="(00) 00000-0000"
                  required
                />
                <div className="invalid-feedback">Por favor insira um telefone válido.</div>
              </div>

            </Row>

            <Button variant="success" type="submit" style={{ margin: '5px' }} onClick={handleSubmit} >Salvar</Button>
          </Form>
        )}

        {funcionarios.length > 0 && (
          <div>
            <h2 style={{ margin: "20px 0 20px 0" }}>Funcionários Cadastrados:</h2>
            {funcionarios.map((funcionario, index) => (
              <ListGroup key={index}>

                <ListGroup.Item action variant="info" key={index} style={{ margin: "5px" }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ padding: '12px', color: 'black' }}>
                      <strong>Nome:</strong> {funcionario.nome} <strong>Sobrenome:</strong> {funcionario.sobrenome}
                      <strong> CPF:</strong> {funcionario.cpf}
                      <strong> Email:</strong> {funcionario.email}
                      <strong> Telefone:</strong> {funcionario.telefone}
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
  );
}

export default index