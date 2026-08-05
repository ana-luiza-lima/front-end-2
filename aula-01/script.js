const display = document.querySelector('#display')
const teclado = document.querySelector('.keys')

let entradaAtual = '0'
let valorAnterior = null
let operador = null

teclado.addEventListener('click', (e) =>{
    const botao = e.target
    if(!botao) return

    const digito = botao.dataset.digit
    const operacao = botao.dataset.op
    const acao = botao.dataset.action

    if(digito){
        inserirDigito(digito)
        return
    } 
    if(operacao){
        registrarOperacao(operacao)
        return
    }
    if(acao){
        executarAcao(acao)
        return
    }
    // alert(`${digito} - ${operacao} - ${acao}`)

})

const inserirDigito = digito => {

    if(digito === "." && entradaAtual.includes('.')) return

    if(entradaAtual === '0') {
        entradaAtual = digito
        atualizarDisplay(entradaAtual)
        return
    }
    entradaAtual += digito
    atualizarDisplay(entradaAtual)
}

const atualizarDisplay = (entrada) => {
    display.textContent = entrada
}

const registrarOperacao = (operacao) => {
    if(operacao === 'raiz' || operacao === 'porcento'){
        calcularUnaria(operacao)
        return
    }

    calcularBinaria(operacao)
}

const calcularUnaria = op => {
    const valor = Number(entradaAtual)
    let resultado = 0
    if(op === 'raiz') {
        resultado = Math.sqrt(valor)
    }
    if(op === 'porcento'){
        resultado = valor / 100;
    }
    entradaAtual = String(resultado)
    atualizarDisplay(entradaAtual)
}

const calcularBinaria = (op) => {

    valorAnterior = Number(entradaAtual)
    operador = op
    entradaAtual = '0'
    // não atualizar o display nessa parte - atualizar somente quando vier o próximo número

}

const executarAcao = (acao) => {
    switch(acao) {
        case 'clear':
            limparTudo()
            break
        case 'backspace':
            removerUltimo()
            break
        case 'sign':
            alterarSinal()
            break
        case 'equals':
    }
}

const alterarSinal = () => {
    if(entradaAtual === '0') return
    if(entradaAtual.starsWith('-')) 
        entradaAtual = entradaAtual.slice(1)
    else entradaAtual = '-' + entradaAtual
    atualizarDisplay(entradaAtual)
}

const removerUltimo = () => {
    //verificar se tá certo
    entradaAtual.length > 1 ? entradaAtual = entradaAtual.slice(0, -1) : '0'
    atualizarDisplay(entradaAtual)
    // if(entradaAtual.length = 1){
    //     atualizarDisplay('0')
    // }
    // entradaAtual = entradaAtual.slice(0, -1)
    // atualizarDisplay(entradaAtual)
}

const limparTudo = () => {
    entradaAtual = '0'
    valorAnterior = null
    operador = null
    atualizarDisplay(entradaAtual)
}