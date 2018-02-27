class NegociacoesView {


    constructor(elemento) {

        this._elemento = elemento;
    }

    _template(model) {

        return `
            <table class="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th>DATA</th>
                        <th>QUANTIDADE</th>
                        <th>VALOR</th>
                        <th>VOLUME</th>
                    </tr>
                </thead>
                
                <tbody>
                    ${model.negociacoes.map(n => `
                            
                        <tr>
                            <td>${DateHelper.dataParaTexto(n.data)}</td>
                            <td>${n.quantidade}</td>
                            <td>${n.valor}</td>
                            <td>${n.volume}</td>
                        </tr>

                    `).join('')}
                </tbody>
                
                <tfoot>
                    <td colspan="3"></td>
                    <td>
                        ${
                            //Immediately-invoked function expression (IIFE) ou a função imediata.
                            //Dentro da expressão é necessário retornar um valor, porém só quando usamos 
                            //uma instrução não podemos utilizar uma sequência de instruções, sendo assim
                            //adiciona-se uma função dentro de $ é um recurso usado na criação de escopo do JavaScript
                            //que ajuda a colocar um bloco na expressão
                            // (function(){
                            //     let total = 0;
                            //     model.negociacoes.forEach(n => total += n.volume);
                            //     return total;
                            // })()

                            // //Utilizando a função reduce como paradigma funcional
                            // model.negociacoes.reduce(function(total, n) {
                            //     //para cada elemento do array pega o volume e soma ao valor contido na variável total
                            //     return total + n.volume;
                            // }, 0.0) //segundo parâmetro da função reduce é 0.0 que inicializa a variável total

                            //Melhorando ainda mais a função reduce() utilizando arrow function
                            //Como a função retornará um único valor, não foi necessário utilizar a IIFE
                            //para incluirmos várias instruções dentro do foreach
                            model.negociacoes.reduce((total, n) => total + n.volume, 0.0)
                        }
                    </td>
                </tfoot>
            </table>
        `;
    }

    update(model) {

        this._elemento.innerHTML = this._template(model);
    }

}