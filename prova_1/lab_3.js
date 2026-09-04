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