const frutasValidator = {
    estoque: {
        required: 'O campo é obrigatório',
        maxLength: {
            value: 20,
            message: 'A quantidade de caracteres máxima é 20'
        },
    }
}

export default frutasValidator