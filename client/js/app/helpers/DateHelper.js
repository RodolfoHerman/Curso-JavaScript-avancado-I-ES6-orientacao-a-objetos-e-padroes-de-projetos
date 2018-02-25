class DateHelper {

    constructor() {
        throw new Error("Não é possível instanciar a classe DateHelper");
    }
    
    static textoParaData(texto) {
        //Expressão regular. 
        //Contudo, ela não garante que a data será sempre correta, 
        //pois se o usuário digitar um ano com mais de 4 dígitos ou 
        //um dia com mais de dois dígitos ela considerará como correta.
        // if(!/\d{4}-\d{2}-\d{2}/.test(texto)) {
        //     throw new Error("Formato da data deve ser aaaa-mm-dd");
        // }
        
        //Melhorando a expressão regular
        //O ^ significa 'começando com' e o $ significa 'terminando com'
        if(!/^\d{4}-\d{2}-\d{2}$/.test(texto)) {
            throw new Error("Formato da data deve ser aaaa-mm-dd");
        }

        return new Date(
            ...texto.split("-").map((item, indice) => item - indice % 2)
        );
    }

    static dataParaTexto(data) {

        //Utilização do TEMPLATE STRING (ES2015)
        return `${data.getDate()}/${data.getMonth()}/${data.getFullYear()}`;

        // return data.getDate() 
        //     + "/" + (data.getMonth() + 1)
        //     + "/" + data.getFullYear();

    }


}