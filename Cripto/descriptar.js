const sha1 = require('node-sha1');
const axios = require('axios');
async function fetchData(url){
    try{
        const response  = await axios.get(url);

        return response.data;
    }catch(e){
    
        return e;
    }
}

function desencriptar(texto, chave) {
    var msgCripto = new Array();
    var alfabeto = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

    var texto = texto.toLowerCase();

    for (i = 0; i < texto.length; i++) {
        atual = texto.charAt(i);

        if (alfabeto.includes(atual)) {
            indice = alfabeto.indexOf(atual) - chave;

            if (indice >= 0) {
                msgCripto.push(alfabeto[indice]);
            } else {
                msgCripto.push(alfabeto[indice + 26]);
            }
        }
        else {
            msgCripto.push(atual);
        }
    }
    decif = msgCripto.join('');
    return decif
}

async function run(){
    try{
        let response = await fetchData('https://api.codenation.dev/v1/challenge/dev-ps/generate-data?token=024ac4f0e46eb73234566f4ef86a9008ae6303d6')
        response.decifrado = desencriptar(response.cifrado, response.numero_casas);
        response.resumo_criptografico = sha1(response.decifrado);
        console.log(response);
        

    }catch(e){
        console.log(e);
    }
}

run();