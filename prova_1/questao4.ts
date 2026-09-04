/**
 * IFSC - Campus São José
 * Unidade Curricular: Programação Frontend II
 * Prova (a2) - Questão 4 (Editor de Texto com Desfazer/Refazer usando Pilhas)
 */

// ---------------------------------------------------------------------------
// a) Estrutura e tipagem (Polimorfismo e Generics)
// ---------------------------------------------------------------------------

// Interface genérica que representa uma estrutura de dados de Pilha (LIFO)
export interface Pilha<T> {
    push(item: T): void;
    pop(): T | undefined;
    isEmpty(): boolean;
    size(): number;
    clear(): void;
    peek(): T | undefined;
}

// Classe genérica que implementa a interface Pilha utilizando um array interno
class PilhaArray<T> implements Pilha<T> {
    private items: T[] = [];

    // Adiciona um elemento ao topo da pilha
    push(item: T): void {
        this.items.push(item);
    }

    // Remove e retorna o elemento do topo da pilha
    pop(): T | undefined {
        return this.items.pop();
    }

    // Verifica se a pilha está vazia
    isEmpty(): boolean {
        return this.items.length === 0;
    }

    // Retorna a quantidade de elementos na pilha
    size(): number {
        return this.items.length;
    }

    // Remove todos os elementos da pilha
    clear(): void {
        this.items = [];
    }

    // Retorna o elemento do topo da pilha sem removê-lo
    peek(): T | undefined {
        return this.items[this.items.length - 1];
    }
}

// ---------------------------------------------------------------------------
// Inicialização das pilhas de estados do editor
// ---------------------------------------------------------------------------
// Criamos instâncias de PilhaArray parametrizadas para strings, pois
// armazenaremos os estados textuais do editor de texto.
const pilhaDesfazer = new PilhaArray<string>();
const pilhaRefazer = new PilhaArray<string>();

// ---------------------------------------------------------------------------
// Seleção dos elementos do DOM com seletores flexíveis
// ---------------------------------------------------------------------------
const editor = (
    document.getElementById("editor") || 
    document.getElementById("textarea") || 
    document.getElementById("texto") || 
    document.querySelector("textarea")
) as HTMLTextAreaElement | null;

const btnDesfazer = (
    document.getElementById("btn-undo") || 
    document.getElementById("undo") || 
    document.getElementById("btn-desfazer") || 
    document.getElementById("desfazer") || 
    document.querySelector(".btn-undo") || 
    document.querySelector(".desfazer")
) as HTMLButtonElement | null;

const btnRefazer = (
    document.getElementById("btn-redo") || 
    document.getElementById("redo") || 
    document.getElementById("btn-refazer") || 
    document.getElementById("refazer") || 
    document.querySelector(".btn-redo") || 
    document.querySelector(".refazer")
) as HTMLButtonElement | null;

const contadorDesfazer = (
    document.getElementById("contador-undo") || 
    document.getElementById("undo-count") || 
    document.getElementById("contador-desfazer") || 
    document.getElementById("desfazer-contador") || 
    document.querySelector(".undo-count") || 
    document.querySelector(".desfazer-contador")
) as HTMLElement | null;

const contadorRefazer = (
    document.getElementById("contador-redo") || 
    document.getElementById("redo-count") || 
    document.getElementById("contador-refazer") || 
    document.getElementById("refazer-contador") || 
    document.querySelector(".redo-count") || 
    document.querySelector(".refazer-contador")
) as HTMLElement | null;

// Variável para rastrear o último estado de texto confirmado no editor
let ultimoEstado: string = editor ? editor.value : "";

// ---------------------------------------------------------------------------
// Funções Principais de Comportamento
// ---------------------------------------------------------------------------

/**
 * Atualiza o estado visual dos botões e contadores no DOM
 */
function atualizarInterface(): void {
    // Desabilita os botões se as respectivas pilhas estiverem vazias
    if (btnDesfazer) {
        btnDesfazer.disabled = pilhaDesfazer.isEmpty();
    }
    if (btnRefazer) {
        btnRefazer.disabled = pilhaRefazer.isEmpty();
    }

    // Exibe a quantidade de estados em cada pilha
    if (contadorDesfazer) {
        contadorDesfazer.textContent = pilhaDesfazer.size().toString();
    }
    if (contadorRefazer) {
        contadorRefazer.textContent = pilhaRefazer.size().toString();
    }
}

/**
 * Reverte a última alteração feita (Desfazer / Undo)
 */
function desfazer(): void {
    if (!editor || pilhaDesfazer.isEmpty()) return;

    const estadoAtual = editor.value;
    
    // Move o estado atual para a pilha de refazer
    pilhaRefazer.push(estadoAtual);

    // Remove o estado anterior da pilha de desfazer e restaura no editor
    const estadoAnterior = pilhaDesfazer.pop();
    if (estadoAnterior !== undefined) {
        editor.value = estadoAnterior;
        ultimoEstado = estadoAnterior;
    }

    atualizarInterface();
}

/**
 * Reaplica a última alteração desfeita (Refazer / Redo)
 */
function refazer(): void {
    if (!editor || pilhaRefazer.isEmpty()) return;

    const estadoAtual = editor.value;

    // Move o estado atual para a pilha de desfazer
    pilhaDesfazer.push(estadoAtual);

    // Remove o estado mais recente de refazer e restaura no editor
    const estadoProximo = pilhaRefazer.pop();
    if (estadoProximo !== undefined) {
        editor.value = estadoProximo;
        ultimoEstado = estadoProximo;
    }

    atualizarInterface();
}

/**
 * Inicializa os ouvintes de eventos do DOM
 */
function inicializar(): void {
    if (editor) {
        ultimoEstado = editor.value;

        // b) DOM e layout: captura a digitação de novos caracteres
        editor.addEventListener('input', () => {
            // Quando digitar, o estado anterior (guardado em ultimoEstado) vai para a pilha de desfazer
            pilhaDesfazer.push(ultimoEstado);
            
            // Quando o usuário digitar após desfazer, a pilha de refazer deve ser esvaziada
            pilhaRefazer.clear();

            // Atualiza o rastreamento do estado atual
            ultimoEstado = editor.value;

            // Atualiza os botões e contadores
            atualizarInterface();
        });
    }

    if (btnDesfazer) {
        btnDesfazer.addEventListener('click', desfazer);
    }

    if (btnRefazer) {
        btnRefazer.addEventListener('click', refazer);
    }

    // Atalhos de teclado (Ctrl + Z e Ctrl + Y)
    document.addEventListener('keydown', (event: KeyboardEvent) => {
        // Ctrl + Z (Desfazer)
        if (event.ctrlKey && !event.shiftKey && !event.altKey && event.key.toLowerCase() === 'z') {
            event.preventDefault(); // Impede o comportamento nativo do navegador
            desfazer();
        }
        // Ctrl + Y (Refazer)
        else if (event.ctrlKey && !event.shiftKey && !event.altKey && event.key.toLowerCase() === 'y') {
            event.preventDefault(); // Impede o comportamento nativo do navegador
            refazer();
        }
    });

    // Sincroniza a interface no carregamento inicial
    atualizarInterface();
}

// Executa a inicialização de forma segura quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inicializar);
} else {
    inicializar();
}
