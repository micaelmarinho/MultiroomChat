/*consign()
    .include("app/routes")
    .then("app/models")
    .then("app/controllers")
    .into(app); =====>>>>> Isso que faz com que a função abaixo entenda o que é "application".*/

module.exports = function(application){
    application.get("/", function(request, response){
        application.app.controllers.index.home(application, request, response);
    });
}   
