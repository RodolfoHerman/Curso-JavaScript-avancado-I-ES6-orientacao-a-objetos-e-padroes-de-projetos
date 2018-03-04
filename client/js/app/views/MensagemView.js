class MensagemView extends View {

    //O constructor não é necessário, pois a classe filha herda o constructor da classe pai e 
    //todas as filhas possuem o mesmo atributo 'elemento' em comum.
    //O que poderia acontecer seria a classe filha possuir um atributo específico dela para ser inicializado
    //sendo assim, criamos o constructor dela, recebendo os 2 atributos, o atributo comum entre as classes é passado
    //para o construtor da classe mãe visa método super e o atributo local inicializado normalmente.    
    constructor(elemento) {
        super(elemento);
    }

    // constructor(elemento) {

    //     this._elemento = elemento;
    // }

    // _template(model) {
    template(model) {
        return model.texto ? `<p class="alert alert-info">${model.texto}</p>` : `<p></p>`;
    }

    // update(model) {

    //     this._elemento.innerHTML = this._template(model);
    // }

}