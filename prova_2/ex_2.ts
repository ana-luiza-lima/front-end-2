

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

}

interface Artista {
    nome: string
    sobrenome: string
    nacionalidade: string
}