abstract class ContaBancaria{
    protected saldo: number
    protected titular: string

    constructor(saldo: number, titular:string){
        this.saldo = saldo
        this.titular = titular
    }

    depositar(valor: number): void{
        this.saldo+= valor
    }

    abstract sacar(valor:number): boolean

    exibirSaldo(): string{
        return `Titular: ${this.titular}, Saldo: ${this.saldo}`
    }
}

class ContaCorrente extends ContaBancaria{
    private limiteChequeEspecial: number

    constructor(saldo: number, titular:string, limiteChequeEspecial: number){
        super(saldo, titular)
        this.limiteChequeEspecial = limiteChequeEspecial
    }

    sacar(valor:number): boolean {
        if(valor <= (this.saldo + this.limiteChequeEspecial)){
            this.saldo -= valor
            return true
        } else {
            return false
        }
    }
}

class ContaPoupanca extends ContaBancaria{

    sacar(valor:number): boolean {
        if(valor <= this.saldo){
            this.saldo -= valor
            return true
        } else {
            return false
        }
    }
}

interface Banco {
    [cpf: string]: ContaBancaria
}