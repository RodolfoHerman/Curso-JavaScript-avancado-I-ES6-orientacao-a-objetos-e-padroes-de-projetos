class ListaNegociacoes {

    //constructor(contexto, armadilha) {
    //constructor(armadilha) {
    constructor(){

        this._negociacoes = [];
        //Retirar a armadilha para utilizar o Proxy
        //this._armadilha = armadilha;
       // this._contexto = contexto;
    }

    adiciona(negociacao) {

        //Gambiarra para utilizar o SET do proxy e atualizar a VIEW.
        //Não será utilizado porque possue problemas de performace, pois se for atribuído
        //mais 200 negociações toda vez será criado um novo array e reatribuído tudo de novo
        //this._negociacoes = [].concat(this._negociacoes, negociacao);

        this._negociacoes.push(negociacao);
        
        //Retirar a armadilha para utilizar o Proxy
        //this._armadilha(this);
        //O parâmetro do Reflect é o contexto de NegociacaoController. O último parâmetro são os parâmetros
        //(em forma de array) que o método _armadilha recebe
        //Reflect.apply(this._armadilha, this._contexto, [this]);

        //Utilizando o ES5 em vez do ES6 podemos utilizar o apply direto na função
        //this._armadilha.apply(this._contexto, [this]);
    }

    get negociacoes() {
        //Programação defensiva
        return [].concat(this._negociacoes);
    }

    esvazia() {
        
        this._negociacoes = [];
        //Retirar a armadilha para utilizar o Proxy
        //this._armadilha(this);
        //O parâmetro do Reflect é o contexto de NegociacaoController. O último parâmetro são os parâmetros
        //(em forma de array) que o método _armadilha recebe
        //Reflect.apply(this._armadilha, this._contexto, [this]);

        //Utilizando o ES5 em vez do ES6 podemos utilizar o apply direto na função
        //this._armadilha.apply(this._contexto, [this]);
    }

    get volumeTotal() {
        return this._negociacoes.reduce((total, n) => total + n.volume, 0,0);
    }

    // A função concat aceita receber um número infinito de parâmetros, inclusive aqueles que não são um array
    // let listaDeNomes1 = ['Flávio', 'Rogers', 'Júlia'];
    // let listaDeNomes2 = ['Vieira', 'Fernanda', 'Gerson'];
    // exibeNoConsole([].concat(listaDeNomes1, listaDeNomes2, 'Rômulo'));

}