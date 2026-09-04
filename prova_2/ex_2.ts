

class Cliente {
    private _nome: string
    private _codigo: number
    private static _codigos: number[] = []

    constructor(nome: string) {
        this._nome = nome
        this._codigo = Cliente.gerarCodigo()
    }

    private static gerarCodigo = (): number => {
        let codigo = Math.random()
        while (Cliente._codigos.includes(codigo)) {
            codigo = Math.random()
        }
        Cliente._codigos.push(codigo)
        return codigo
    }

    get nome(): string {
        return this._nome
    }

    get codigo(): number {
        return this._codigo
    }

    static get codigos(): number[] {
        return [...Cliente._codigos]
    }
}

type Aluguel = {
    cliente: Cliente,
    dataAluguel: Date
}

abstract class Midia {
    protected titulo: string
    protected copias: number
    protected alugueis: Aluguel[]

    constructor(titulo: string, copias: number){
        this.titulo = titulo
        this.copias = copias
        this.alugueis = []
    }

    descricao(): string {
        return `Título: ${this.titulo}, Cópias Disponíveis: ${this.copias}`
    }

    alugar(cliente: Cliente): boolean {
        if(this.copias <= 0){
            return false
        }
        const aluguelAtual = this.alugueis.some(aluguel => aluguel.cliente.codigo === cliente.codigo)
        if(aluguelAtual){
            return false
        }

        this.copias -= 1
        const novoAluguel = {cliente: cliente, dataAluguel: new Date()} // Definir uma nova data com new Date()
        this.alugueis.push(novoAluguel)
        return true
    } 

    abstract devolver(cliente: Cliente): number
}

class Filme extends Midia {
    private elenco: Artista[]

    constructor(titulo: string, copias: number, artistas: Artista[]){
        super(titulo, copias)
        this.elenco = artistas
    }

    devolver(cliente: Cliente): number {
        const indiceAlguel = this.alugueis.findIndex(aluguel => aluguel.cliente === cliente)
        if(indiceAlguel === -1) return -1

        this.copias++

        const diferencaMs = Date.now() - this.alugueis[indiceAlguel].dataAluguel.getTime()
        const diasAlguel = diferencaMs / (1000 * 60 * 60 * 24)

        const atraso = diasAlguel > 5 ? diasAlguel - 5 : 0
        const multa = atraso * 3

        this.alugueis.splice(indiceAlguel, 1)
        return multa
    }
}

interface Artista {
    nome: string
    sobrenome: string
    nacionalidade: string
}