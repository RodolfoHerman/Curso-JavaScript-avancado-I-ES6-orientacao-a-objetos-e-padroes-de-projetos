//Criação do método na classe Array do js.
//Esse método é chamado de polyfill.
//Definição : Um polyfill é um script que emula o comportamento 
//de um recurso quando esse não é suportado para garantir que nosso código 
//funcione sem termos que abdicar do que é mais novo.

//Exemplo o Array.includes() não é suportado no Edge

if(!Array.prototype.includes) {

    // Se não existir, adiciona

    console.log('Polyfill para Array.includes aplicado.');

    Array.prototype.includes = function(elemento) {
        return this.indexOf(elemento) != -1;
    };
}

//Quando adicionamos métodos no prototype de uma classe ou função construtora, 
//todas as instâncias dessa função construtora ou classe terão o método.