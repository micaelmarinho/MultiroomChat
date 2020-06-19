module.exports.startChat = function(application, request, response){

    var dados = request.body;// Popula o JSON com base no atributo "name" do <input>

    request.assert("apelido", "Apelido é obrigatório").notEmpty();
    request.assert("apelido", "Apelido deve conter entre 3 e 15 caracteres").len(3, 15);

    var errors = request.validationErrors();

    if(errors){
        response.render("index", {errors: errors});
        return;
    }

    //Recuperando a variável global io definida em app.js
    application.get("io").emit("msgParaCliente", {
        apelido: dados.apelido,
        mensagem: " acabou de entrar no chat"
    });

    response.render("chat", {user_data: dados});
}