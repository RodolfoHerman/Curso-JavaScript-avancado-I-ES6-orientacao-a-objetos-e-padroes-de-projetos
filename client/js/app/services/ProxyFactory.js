class ProxyFactory {

    static create(objeto, props, acao) {

        return new Proxy(objeto, {

            //É necessário colocar esse trecho pois aqui são tratados, dentro do if, os métodos do objeto, por exemplo 'adiciona'.
            //Caso não seja um método o if não é executado e realiza o 'get' normal do objeto
            get: function(target, prop, receiver) {

                if(props.includes(prop) && ProxyFactory._isFuncao(target[prop])) {

                    return function() {

                        let retorno = Reflect.apply(target[prop], target, arguments);
                        //Acao é o método 'trap' que é executado para atualizar a VIEW
                        acao(target);
                        return retorno;
                    }
                }

                return Reflect.get(target, prop, receiver);
            },

            //É necessário colocar esse trecho pois aqui são tratados as prorpiedades do objeto, por exemplo 'set texto'
            set: function(target, prop, value, receiver) {

                let retorno = Reflect.set(target, prop, value, receiver);
                
                if(props.includes(prop)) {

                    acao(target);
                }

                return retorno;
            }

        });

    }

    static _isFuncao(func) {
        return typeof(func) == typeof(Function);
    }
}

// O padrão de projeto Factory ocorre quando temos uma classe que nos ajuda 
// a criar um objeto complexo, ou seja, ela esconde de nós os detalhes de 
// criação desse objeto. É por isso que uma classe Factory possui 
// apenas um método, faz sentido, porque se tivéssemos que chamar mais de 
// um para criar um objeto a responsabilidade de sua criação cairia em nosso colo.