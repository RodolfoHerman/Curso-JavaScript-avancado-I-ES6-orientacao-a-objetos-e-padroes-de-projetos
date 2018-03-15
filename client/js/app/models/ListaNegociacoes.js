class ListaNegociacoes {

    //constructor(contexto, armadilha) {
    constructor(armadilha) {

        this._negociacoes = [];
        this._armadilha = armadilha;
       // this._contexto = contexto;
    }

    adiciona(negociacao) {

        this._negociacoes.push(negociacao);
        this._armadilha(this);
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
        this._armadilha(this);
        //O parâmetro do Reflect é o contexto de NegociacaoController. O último parâmetro são os parâmetros
        //(em forma de array) que o método _armadilha recebe
        //Reflect.apply(this._armadilha, this._contexto, [this]);

        //Utilizando o ES5 em vez do ES6 podemos utilizar o apply direto na função
        //this._armadilha.apply(this._contexto, [this]);
    }

    // A função concat aceita receber um número infinito de parâmetros, inclusive aqueles que não são um array
    // let listaDeNomes1 = ['Flávio', 'Rogers', 'Júlia'];
    // let listaDeNomes2 = ['Vieira', 'Fernanda', 'Gerson'];
    // exibeNoConsole([].concat(listaDeNomes1, listaDeNomes2, 'Rômulo'));

}