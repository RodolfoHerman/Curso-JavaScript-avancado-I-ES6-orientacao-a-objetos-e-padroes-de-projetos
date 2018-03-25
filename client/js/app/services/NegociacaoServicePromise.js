//Promises (promessas) agora fazem parte da linguagem JavaScript a partir do ES6. 
//Elas representam o resultado futuro de uma ação, que pode ser de sucesso ou fracasso. 
//Elas visam tornar códigos assíncronos mais legíveis e fáceis de manter, 
//evitando o Callback Hell. Uma ou outra chamada assíncrona não é problemática, 
//o problema é quando temos uma sucessão de chamadas assíncronas e o modo tradicional 
//de lidar com elas, aninhando callbacks, torna o código difícil de ler e manter, 
//principalmente o tratamento de erros.
class NegociacaoServicePromise {

    constructor() {

        this._http = new HttpService();
    }

    //Pssando a responsabilidade para obter negociações para a classe de Serviço
    obterNegociacoes() {

        return Promise.all([this.obterNegociacoesDaSemana(), 
                            this.obterNegociacoesDaSemanaAnterior(), 
                            this.obterNegociacoesDaSemanaRetrasada()])
                    .then(negociacoes => {

                        return negociacoes.reduce((compacto, array) => compacto.concat(array), []);
                    })
                    .catch(erro => {
                        throw new Error(erro);
                    });
    }


    obterNegociacoesDaSemana() {
        
        //Aproveitando o retorno da 'promise' da classe HttpResolve 
        return this._http.get('negociacoes/semana')
                .then(negociacoes => {
                    return (negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.valor, objeto.quantidade)));
                })
                .catch(erro => {
                    console.log(erro);
                    throw new Error('Não foi possível obter negociações da semana!');
                });
        
        
        //Isolando a responsabilidade de abrir a conexao na classe HttpResolve. (Encapsulamento)
        return new Promise((resolve, reject) => {

            this._http.get('negociacoes/semana')
                .then(negociacoes => {
                    resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.valor, objeto.quantidade)));
                })
                .catch(erro => {
                    console.log(erro);
                    reject('Não foi possível obter negociações da semana!');
                });
        });
        
        
        return new Promise((resolve, reject) => {

            let xhr = new XMLHttpRequest();

            xhr.open('GET', 'negociacoes/semana');

            xhr.onreadystatechange = () => {

                if(xhr.readyState == 4) {
        
                    if(xhr.status == 200) {
    
                        resolve(JSON.parse(xhr.responseText)
                                .map(objeto => new Negociacao(new Date(objeto.data), objeto.valor, objeto.quantidade)));

                    } else {
    
                        console.log(xhr.responseText);
                        reject('Não foi possível obter negociações da semana!');

                    }
                }
            };

            xhr.send();
        });
    }

    obterNegociacoesDaSemanaAnterior() {

        //Aproveitando o retorno da 'promise' da classe HttpResolve 
        return this._http.get('negociacoes/anterior')
                .then(negociacoes => {
                    return (negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.valor, objeto.quantidade)));
                })
                .catch(erro => {
                    console.log(erro);
                    throw new Error('Não foi possível obter negociações da semana anterior!');
                });


        //Isolando a responsabilidade de abrir a conexao na classe HttpResolve
        return new Promise((resolve, reject) => {

            this._http.get('negociacoes/anterior')
                .then(negociacoes => {
                    resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.valor, objeto.quantidade)));
                })
                .catch(erro => {
                    console.log(erro);
                    reject('Não foi possível obter negociações da semana anterior!');
                });
        });

        
        return new Promise((resolve, reject) => {

            let xhr = new XMLHttpRequest();

            xhr.open('GET', 'negociacoes/anterior');

            xhr.onreadystatechange = () => {

                if(xhr.readyState == 4) {
        
                    if(xhr.status == 200) {
    
                        resolve(JSON.parse(xhr.responseText)
                                .map(objeto => new Negociacao(new Date(objeto.data), objeto.valor, objeto.quantidade)));

                    } else {
    
                        console.log(xhr.responseText);
                        reject('Não foi possível obter negociações da semana anterior!');

                    }
                }
            };

            xhr.send();
        });
    }

    obterNegociacoesDaSemanaRetrasada() {
        
        //Aproveitando o retorno da 'promise' da classe HttpResolve 
        return this._http.get('negociacoes/retrasada')
                .then(negociacoes => {
                    return (negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.valor, objeto.quantidade)));
                })
                .catch(erro => {
                    console.log(erro);
                    throw new Error('Não foi possível obter negociações da semana retrasada!');
                });        
        
        //Isolando a responsabilidade de abrir a conexao na classe HttpResolve
        return new Promise((resolve, reject) => {

            this._http.get('negociacoes/retrasada')
                .then(negociacoes => {
                    resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.valor, objeto.quantidade)));
                })
                .catch(erro => {
                    console.log(erro);
                    reject('Não foi possível obter negociações da semana retrasada!');
                });
        });        
        
        return new Promise((resolve, reject) => {

            let xhr = new XMLHttpRequest();

            xhr.open('GET', 'negociacoes/retrasada');

            xhr.onreadystatechange = () => {

                if(xhr.readyState == 4) {
        
                    if(xhr.status == 200) {
    
                        resolve(JSON.parse(xhr.responseText)
                                .map(objeto => new Negociacao(new Date(objeto.data), objeto.valor, objeto.quantidade)));

                    } else {
    
                        console.log(xhr.responseText);
                        reject('Não foi possível obter negociações da semana retrasada!');

                    }
                }
            };

            xhr.send();
        });
    }

}