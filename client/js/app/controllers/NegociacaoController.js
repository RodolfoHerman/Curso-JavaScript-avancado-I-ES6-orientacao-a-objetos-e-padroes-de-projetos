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
        let self = this;

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

        //Utilização do Proxy para não sujar o MODEL
        this._listaNegociacoes = new Proxy(new ListaNegociacoes(), {

            get: function(target, prop, receiver) {

                if(['adiciona','esvazia'].includes(prop) && typeof(target[prop]) == typeof(Function)) {

                    return function() {

                        console.log(`Foi interceptado "${prop}"`);
                        let retorno = Reflect.apply(target[prop], target, arguments);
                        self._negociacoesView.update(target);
                        //return retorno;
                    }
                }

                return Reflect.get(target, prop, receiver);
            }

        });

        this._negociacoesView = new NegociacoesView($('#negociacoesView'));

        this._negociacoesView.update(this._listaNegociacoes);

        this._mensagem = new Mensagem('');

        this._mensagemView = new MensagemView($('#mensagemView'));
        this._mensagemView.update(this._mensagem);
    }

    apaga() {

        this._listaNegociacoes.esvazia();
        //this._negociacoesView.update(this._listaNegociacoes);

        this._mensagem.texto = "Negociações apagadas com sucesso";
        this._mensagemView.update(this._mensagem);
    }

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
        this._mensagemView.update(this._mensagem);

        console.log(this._listaNegociacoes);
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