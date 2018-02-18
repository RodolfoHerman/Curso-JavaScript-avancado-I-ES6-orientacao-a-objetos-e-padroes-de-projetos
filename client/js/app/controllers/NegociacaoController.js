class NegociacaoController {

    constructor() {

        //Ao atribuir a função querySelector a variável $ sem bind ela fica fora do contexto e por isso não irá funcionar essa marração.
        //Necessário então realizar um bind com o document para manter a função em $ no contexto do document
        let $ = document.querySelector.bind(document);

        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
    }

    // adiciona(event, form) {
    adiciona(event) {

        event.preventDefault();

        //console.log(typeof(this._inputData));
        //console.log(form);

        //utlizamos o operador SPREAD (...) para transformar o array em parâmetros separados
        let data = new Date(
                        ...this._inputData.value
                        .split('-')
                        .map((item, indice) => item - indice % 2)
                    );
        
        let negociacao = new Negociacao(
            data,
            this._inputQuantidade.value,
            this._inputValor.value
        );

        console.log(negociacao);
        
        this.limpaForm();
    }

    limpaForm() {
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0;

        this._inputData.focus();
    }


}