const agenda = []

const adicionarContato = (contato) => {
    if(!contato.id || !contato.nome || !contato.telefone){
        return false
    }

    const agendaFiltrada = agenda.filter( cont => cont.id == contato.id)
    if(agendaFiltrada.length > 0){
        return false
    }

    agenda.push(contato)
    return true
}

const removerContato = (id) => {
    const agendaFiltrada = agenda.filter(cont => cont.id != id)
    if(agendaFiltrada.length === agenda.length){
        return false
    }
    agenda = agendaFiltrada
    return true
}

const buscarContato = (nome) => {
    const busca = agenda.find(contato => contato.nome.toLowerCase() === nome.toLowerCase()) //método find retorna undefined se não encontra
    if(!busca){
        return null
    }
    return busca
}

const listarContatos = () => {
    const lista = agenda.map(contato => `ID: ${contato.id}, Nome: ${contato.nome}, Telefone: ${contato.telefone}`)
    return lista
}

const limparAgenda = () => {
    agenda.length = 0
}
