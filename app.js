//Importar configurações do servidor
var app = require("./config/server");

//Porta de escuta de requisições
var server = app.listen(80, function(){
    console.log("Servidor ON");
});

//O socket trabalha com um protocolo próprio, diferente do HTTP. Por isso podemos escutar requisições de socket na mesma porta 80 do HTTP.
//Aqui estamos configurando o socket.io para escutar na mesma porta das requisições HTTP do site.
//Disponibilizamos esta biblioteca do socket.io no cliente também para fazer as duas pontas da comunicação. Para fazer isso, uma rota "/socket.io/socket.io.js é automaticamente criada pelo socket.io para chamarmos no cliente".
//Para debugar websockets criados no chrome, vá em "Network => WS"
var io = require("socket.io").listen(server);

//Definindo variável global para usar no controller do chat.
app.set("io", io);

//Criar conexão por websocket usando o evento de connection do socket.io
//Este evento é acionado quando uma requisição é feita ao servidor utilizando o objeto io do lado do cliente.
io.on("connection", function(socket){
    console.log("usuário se conectou");
    //Evento acionado quando o usuário se desconecta da página em que o objeto io do lado do cliente está instanciado.
    socket.on("disconnect", function(){
        console.log("usuário se desconectou");
    });

    socket.on("msgParaServidor", function(msg){
        ////////////////////Diálogos/////////////////////////////////

        //Envia a mensagem para o mesmo usuário que enviou a mensagem
        socket.emit("msgParaCliente", {
            apelido: msg.apelido,
            mensagem: msg.mensagem
        });

        //Envia a mensagem para todos os clientes conectados no socket menos para quem enviou a mensagem.
        //Por isso usamos o socket.emit() acima
        socket.broadcast.emit("msgParaCliente", {
            apelido: msg.apelido,
            mensagem: msg.mensagem
        });

        ////////////////////Particpantes/////////////////////////////////
        
        //Só atualiza a lista de participantes se o cliente que entrou no chat não digitou nenhuma mensagem. Fazemos isso para prevenir que a lista de participantes fique com nomes repetidos.
        if(parseInt(msg.participantes) == 0){
            //Envia a mensagem para o mesmo usuário que enviou a mensagem
            socket.emit("participantesParaCliente", {
                apelido: msg.apelido
            });

            //Envia a mensagem para todos os clientes conectados no socket menos para quem enviou a mensagem.
            //Por isso usamos o socket.emit() acima
            socket.broadcast.emit("participantesParaCliente", {
                apelido: msg.apelido
            });
        }
    });
});