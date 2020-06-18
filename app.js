//Importar configurações do servidor
var app = require("./config/server");

//Porta de escuta de requisições
app.listen(80, function(){
    console.log("Servidor ON");
});