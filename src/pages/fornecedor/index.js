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
    const [fornecedores, setFornecedores] = useState([])
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [contato, setContato] = useState('')
    const [uf, setUf] = useState('')
    const [editIndex, setEditIndex] = useState(-1)
    const [exibirFormulario, setExibirFormulario] = useState(false)

    useEffect(() => {
        const storedFornecedores = localStorage.getItem('fornecedores')
        if (storedFornecedores) {
            setFornecedores(JSON.parse(storedFornecedores))
        }
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault()
        const form = event.currentTarget
        if (form.checkValidity() === false) {
            event.stopPropagation()
        } else {
            const novoFornecedor = {
                nome,
                email,
                contato,
                uf
            }
            if (editIndex !== -1) {
                const updatedFornecedores = [...fornecedores]
                updatedFornecedores[editIndex] = novoFornecedor
                setFornecedores(updatedFornecedores)
                setEditIndex(-1) // Limpa o index de edição
            } else {
                setFornecedores([...fornecedores, novoFornecedor])
                setValidated(true)
            }
            localStorage.setItem('fornecedores', JSON.stringify([...fornecedores, novoFornecedor]))
            resetForm()
        }
    }

    const deletar = (index) => {
        const updatedFornecedores = [...fornecedores]
        updatedFornecedores.splice(index, 1)
        setFornecedores(updatedFornecedores)
        localStorage.setItem('fornecedores', JSON.stringify(updatedFornecedores))
    }

    const editar = (index) => {
        const fornecedor = fornecedores[index]
        setNome(fornecedor.nome)
        setEmail(fornecedor.email)
        setContato(fornecedor.contato)
        setUf(fornecedor.uf)
        setEditIndex(index)
        setExibirFormulario(true)
    }

    const resetForm = () => {
        setNome('')
        setEmail('')
        setContato('')
        setUf('')
        setValidated(false)
        setEditIndex(-1)
    }


    return (
        <div>
            <Pagina titulo={'Fornecedor'}>

                <Button onClick={() => setExibirFormulario(!exibirFormulario)} style={{ margin: "5px" }}>Cadastrar um novo Fornecedor</Button>
                {exibirFormulario && (
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Row className="informacoes">
                            <h1>Dados do Fornecedor</h1>

                            <Form.Group as={Col} md="4" controlId="validationCustom01" style={{ margin: '5px' }}>
                                <Form.Label>Nome</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Nome"
                                    required value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por favor insira o nome do fornecedor.
                                </Form.Control.Feedback>
                            </Form.Group>

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
                                <label htmlFor="validationCustom06">Contato</label>
                                <InputMask
                                    as={Col}
                                    md="4"
                                    className="form-control"
                                    id="validationCustom06"
                                    mask="(99) 9999-9999"
                                    maskChar=""
                                    value={contato}
                                    onChange={(e) => setContato(e.target.value)}
                                    placeholder="(00) 0000-0000"
                                    required
                                />
                                <div className="invalid-feedback">Por favor insira um contato válido.</div>
                            </div>


                            <Form.Group as={Col} md="4" controlId="validationCustom02" style={{ margin: '5px' }}>
                                <Form.Label>Uf</Form.Label>
                                <Form.Select type="text"
                                    placeholder="Mês"
                                    required
                                    value={uf}
                                    onChange={(e) => setUf(e.target.value)}>
                                    <option value="AC">AC</option>
                                    <option value="AM">AM</option>
                                    <option value="AP">AP</option>
                                    <option value="BA">BA</option>
                                    <option value="DF">DF</option>
                                    <option value="GO">GO</option>
                                    <option value="MG">MG</option>
                                    <option value="PA">PA</option>
                                    <option value="RJ">RJ</option>
                                    <option value="RO">RO</option>
                                    <option value="PI">SP</option>
                                    <option value="TO">TO</option>
                                </Form.Select>
                            </Form.Group>

                        </Row>

                        <Button variant="success" type="submit" style={{ margin: '5px' }}>Salvar</Button>
                    </Form>
                )}

                {fornecedores.length > 0 && (
                    <div>
                        <h2 style={{ margin: "20px 0 20px 0" }}>Fornecedores:</h2>
                        {fornecedores.map((fornecedores, index) => (
                            <ListGroup key={index}>

                                <ListGroup.Item action variant="warning" key={index} style={{ margin: "5px" }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <div style={{ padding: '12px', color: 'black' }}>
                                            <strong>Nome:</strong> {fornecedores.nome}
                                            <strong> Email:</strong> {fornecedores.email}
                                            <strong> Contato:</strong> {fornecedores.contato}
                                            <strong> UF:</strong> {fornecedores.uf}
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