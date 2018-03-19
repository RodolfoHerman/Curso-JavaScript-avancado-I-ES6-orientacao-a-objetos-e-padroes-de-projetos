class Bind {
    //O parâmetro '...props' é o REST OPERATOR, significa que a partir do terceiro parâmetro passado para o construtor
    //todos os parâmetros serão colocados no array props (obs: sempre tem que ser o último parâmetro do construtor ou função)
    constructor(model, view, ...props) {

        let proxy = ProxyFactory.create(model, props, model => view.update(model));
        view.update(model);

        return proxy;
    }

}