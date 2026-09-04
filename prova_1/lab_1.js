// 1a) Filtrar por categoria
const produtosPorCategoria = (produtos, categoria) => {
    const listaFiltrada = produtos.filter(produto => produto.categoria === categoria)
    return listaFiltrada
}

// 1b) Listar nomes formatados
const nomesFormatados = (produtos) => {
    const listaFormatada = produtos.map(produto => `ID: ${produto.id} | Nome: ${produto.nome} | Categoria: ${produto.categoria}`)
    return listaFormatada
}

// 1c) Total Estoque
const totalEstoque = (produtos) => {
    const totalFinal = produtos.reduce((acumulador, produto) => acumulador + (produto.preco * produto.qtd), 0)
    return totalFinal
}

// 1d) Média de preço por categoria
const mediaPrecoPorCategoria = (produtos, categoria) => {
    const listaFiltrada = produtos.filter(produto => produto.categoria === categoria)

    if(listaFiltrada.length === 0){
        return 0
    }

    const totalFinal = listaFiltrada.reduce((acumulador, produto) => acumulador + (produto.preco * produto.qtd), 0)
    const qtdFinal = listaFiltrada.reduce((acumulador, produto) => acumulador + produto.qtd, 0)
    
    return totalFinal / qtdFinal
}


