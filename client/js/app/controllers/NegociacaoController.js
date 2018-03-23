//Solução procedural: toda vez que criarmos um código e precisaremos buscar em algum lugar do nosso sistema 
//alguém que o valide. Temos uma separação entre dado e comportamento. Podemos pensar na estrutura de OO
class NegociacaoController {

    constructor() {

        //Ao atribuir a função querySelector a variável $ sem bind ela fica fora do contexto e por isso não irá funcionar essa marração.
        //Necessário então realizar um bind com o document para manter a função em $ no contexto do document
        let $ = document.querySelector.bind(document);

        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        //Necessário criar uma variável para receber o 'this' do contexto do NegociacaoController 
        //let self = this;

        //Não faz mal declarar negociacoesView apos essa assinatura de metodo, pois
        //quando este metodo for chamado em ListaNegociacoes já terá a instancia
        //de negociacoesView criada
        // this._listaNegociacoes = new ListaNegociacoes(this, function(model) {//É passado o contexto do NegociacaoController como parâmetro
        //     //console.log(model);
        //     this._negociacoesView.update(model);
        // });

        //O contexto de uma arrow function é léxico e não é dinâmico como a função padrão acima.
        //Sendo assim, não precisamos passar o contexto do NegociacaoController pois a arraow function já entende isso
        // this._listaNegociacoes = new ListaNegociacoes(model => this._negociacoesView.update(model));

        //utilizando o ProxyFactory. Utilização do BIND para tirar essa reponsabilidade do controller
        // this._listaNegociacoes = ProxyFactory.create(
        //     new ListaNegociacoes(), 
        //     ['adiciona', 'esvazia'],
        //     //Aqui a arrow function possui escopo léxico, sendo assim, não precisa do 'self' pois esta entende que pertence
        //     //a classe 'NegociacaoController'
        //     model => this._negociacoesView.update(model));


        //Utilização do Proxy para não sujar o MODEL
        // this._listaNegociacoes = new Proxy(new ListaNegociacoes(), {

        //     get: function(target, prop, receiver) {

        //         if(['adiciona','esvazia'].includes(prop) && typeof(target[prop]) == typeof(Function)) {

        //             return function() {

        //                 console.log(`Foi interceptado "${prop}"`);
        //                 let retorno = Reflect.apply(target[prop], target, arguments);
        //                 self._negociacoesView.update(target);
        //                 //return retorno;
        //             }
        //         }

        //         return Reflect.get(target, prop, receiver);
        //     }

        // });

        //Não utilizamos a varável this._negociacoesView, por isso pode ser criada diretamente  na instância do BIND
        //this._negociacoesView = new NegociacoesView($('#negociacoesView'));

        //Realização do BIND
        this._listaNegociacoes = new Bind(
            new ListaNegociacoes(), 
            new NegociacoesView($('#negociacoesView')), 
            'adiciona', 'esvazia');

        //O 'BIND' faz o update
        //this._negociacoesView.update(this._listaNegociacoes);

        //this._mensagem = new Mensagem();

        //utilizando o ProxyFactory. Utilização do BIND para tirar essa reponsabilidade do controller
        // this._mensagem = ProxyFactory.create(
        //     new Mensagem(),
        //     ['texto'],
        //     model => this._mensagemView.update(model));

        //Não utilizamos a varável this._mensagemView, por isso pode ser criada diretamente  na instância do BIND
        //this._mensagemView = new MensagemView($('#mensagemView'));
        
        //Realização do BIND
        this._mensagem = new Bind(
            new Mensagem(), 
            new MensagemView($('#mensagemView')), 
            'texto');

        //O 'BIND' faz o update
        //this._mensagemView.update(this._mensagem);
    }

    apaga() {

        this._listaNegociacoes.esvazia();
        //this._negociacoesView.update(this._listaNegociacoes);

        this._mensagem.texto = "Negociações apagadas com sucesso";
        //Devido ao 'ProxyFactory' ele é uma armadilha e não precisa mais de update aqui (quando faz alterações na VIEW)
        //this._mensagemView.update(this._mensagem);
    }

    //Isolando responsabilidade de buscar dados do servidor
    importaNegociacoes() {

        let service = new NegociacaoService();

        //Utilizando a estratégia do Error-First (primeiro parâmetro é o erro)
        service.obterNegociacoesDaSemana((erro, negociacoes) => {

            if(erro) {

                this._mensagem.texto = erro;
                return;
            }

            negociacoes.forEach(negociacao => {

                this._listaNegociacoes.adiciona(negociacao);
                this._mensagem.texto = 'Negociações importadas com sucesso';
            });

        });
    }    

    // importaNegociacoes() {

    //     let xhr = new XMLHttpRequest();
        
    //     xhr.open('GET', 'negociacoes/semana');
        
    //     xhr.onreadystatechange = () => {
            
    //         // Os estados possíveis de um requisição AJAX

    //         // 0: requisição ainda não iniciada
    //         // 1: conexão com o servidor estabelecida
    //         // 2: requisição recebida
    //         // 3: processando requisição
    //         // 4: requisição está concluída e a resposta está pronta

    //         //Se o status for igual a 4 buscamos o dados do servidor
    //         if(xhr.readyState == 4) {

    //             //Se temos certaza de qu os os dados chegaram se o status for igual a 200
    //             if(xhr.status == 200) {

    //                 JSON.parse(xhr.responseText)
    //                     .map(objeto => new Negociacao(new Date(objeto.data), objeto.valor, objeto.quantidade))
    //                     .forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));

    //                 this._mensagem.texto = 'Negociação adicionada com sucesso! ';

    //             } else {

    //                 console.log(xhr.responseText);
    //                 this._mensagem.texto = "Não foi possível obter as negociçoes";
    //             }
    //         }
    //     };

    //     xhr.send();
    // }

    // adiciona(event, form) {
    adiciona(event) {

        event.preventDefault();

        //console.log(typeof(this._inputData));
        //console.log(form);

        //utlizamos o operador SPREAD (...) para transformar o array em parâmetros separados
        // let data = new Date(
        //     ...this._inputData.value
        //     .split('-')
        //     .map((item, indice) => item - indice % 2)
        // );      
        
        //Criado um método para realizar a craiação do objeto
        // let negociacao = new Negociacao(
        //     DateHelper.textoParaData(this._inputData.value),
        //     this._inputQuantidade.value,
        //     this._inputValor.value
        // );

        this._listaNegociacoes.adiciona(this._criaNegociacao());
        //this._negociacoesView.update(this._listaNegociacoes);

        //Burlando o encapsulamento quando não há programação defensiva
        //this._listaNegociacoes.negociacoes.push(this._criaNegociacao());

        this._mensagem.texto = "Negociação adicionada com sucesso !!";
        //Devido ao 'ProxyFactory' ele é uma armadilha e não precisa mais de update aqui (quando faz alterações na VIEW)
        //this._mensagemView.update(this._mensagem);

        //console.log(this._listaNegociacoes);
        // console.log(DateHelper.dataParaTexto(negociacao.data));
        
        this._limpaFormulario();
    }

    _criaNegociacao() {
        
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value
        );
    }

    _limpaFormulario() {
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0;

        this._inputData.focus();
    }


}