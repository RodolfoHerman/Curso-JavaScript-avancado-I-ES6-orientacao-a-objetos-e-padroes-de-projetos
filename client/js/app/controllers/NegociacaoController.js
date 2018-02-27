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

        this._listaNegociacoes = new ListaNegociacoes();
        this._negociacoesView = new NegociacoesView($('#negociacoesView'));

        this._negociacoesView.update(this._listaNegociacoes);
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
        this._negociacoesView.update(this._listaNegociacoes);

        //Burlando o encapsulamento quando não há programação defensiva
        this._listaNegociacoes.negociacoes.push(this._criaNegociacao());

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