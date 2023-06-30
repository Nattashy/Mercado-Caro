const cadastroValidator = {
    cpf: {
        required: 'O campo é obrigatório',
        minLength: {
            value: 11,
            message: 'Insira um CPF válido.'
        },
        maxLength: {
            value: 11,
            message: 'Insira um CPF válido.'
        }
    }
}

export default cadastroValidator