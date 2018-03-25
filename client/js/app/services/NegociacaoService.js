//Isolando a responsabilidade de buscar dados do servidor, além disso, isolado a url de serviço
class NegociacaoService {

    //O Error-first Callback, ou errorback, é um padrão que foi adotado no mundo Node.js. 
    //O callback é uma função chamada quando uma tarefa for executada, 
    //como uma requisição Ajax ou o acesso ao banco de dados. 
    //No entanto, a qualquer momento pode acontecer um erro no processamento 
    //e aí vem a questão de como lidar com isso.
    //A convenção é que cada callback receba sempre o erro no primeiro parâmetro.
    obterNegociacoesDaSemana(cb) {

        let xhr = new XMLHttpRequest();

        xhr.open('GET', 'negociacoes/semana');

        //A propriedade onreadystatechange guarda uma função para: ser executada automaticamente 
        //cada vez que há uma alteração no estado da requisição.
        xhr.onreadystatechange = () => {

            // Os estados possíveis de um requisição AJAX

            // 0: requisição ainda não iniciada
            // 1: conexão com o servidor estabelecida
            // 2: requisição recebida
            // 3: processando requisição
            // 4: requisição está concluída e a resposta está pronta

            //Se o status for igual a 4 buscamos o dados do servidor
            if(xhr.readyState == 4) {

                //Se temos certaza de qu os os dados chegaram se o status for igual a 200
                if(xhr.status == 200) {

                    cb(null, JSON.parse(xhr.responseText)
                        .map(objeto => new Negociacao(new Date(objeto.data), objeto.valor, objeto.quantidade)));

                } else {

                    console.log(xhr.responseText);
                    cb('Não foi possível obter negociações da semana! ',null);
                }
            }
        };

        xhr.send();
    }

    obterNegociacoesDaSemanaAnterior(cb) {

        let xhr = new XMLHttpRequest();

        xhr.open('GET', 'negociacoes/anterior');

        xhr.onreadystatechange = () => {

            if(xhr.readyState == 4) {

                if(xhr.status == 200) {
                    
                    cb(null, JSON.parse(xhr.responseText)
                        .map(objeto => new Negociacao(new Date(objeto.data), objeto.valor, objeto.quantidade)));

                } else {

                    console.log(xhr.responseText);
                    cb('Não foi possível obter negociações da semana anterior! ',null);

                }
            }
        };

        xhr.send();
    }

    obterNegociacoesDaSemanaRetrasada(cb) {

        let xhr = new XMLHttpRequest();

        xhr.open('GET', 'negociacoes/retrasada');

        xhr.onreadystatechange = () => {

            if(xhr.readyState == 4) {

                if(xhr.status == 200) {
                    
                    cb(null, JSON.parse(xhr.responseText)
                        .map(objeto => new Negociacao(new Date(objeto.data), objeto.valor, objeto.quantidade)));

                } else {

                    console.log(xhr.responseText);
                    cb('Não foi possível obter negociações da semana retrasada! ',null);

                }
            }
        };

        xhr.send();
    }    

}