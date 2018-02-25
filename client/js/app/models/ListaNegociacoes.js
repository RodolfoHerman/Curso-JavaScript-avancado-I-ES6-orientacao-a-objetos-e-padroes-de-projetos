class ListaNegociacoes {

    constructor() {

        this._negociacoes = [];
    }

    adiciona(negociacao) {

        this._negociacoes.push(negociacao);
    }

    get negociacoes() {
        //Programação defensiva
        return [].concat(this._negociacoes);
    }

    // A função concat aceita receber um número infinito de parâmetros, inclusive aqueles que não são um array
    // let listaDeNomes1 = ['Flávio', 'Rogers', 'Júlia'];
    // let listaDeNomes2 = ['Vieira', 'Fernanda', 'Gerson'];
    // exibeNoConsole([].concat(listaDeNomes1, listaDeNomes2, 'Rômulo'));

}