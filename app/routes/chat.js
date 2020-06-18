module.exports = function(application){
    application.post("/chat", function(request, response){
        application.app.controllers.chat.startChat(application, request, response);
    });

    application.get("/chat", function(request, response){
        application.app.controllers.chat.startChat(application, request, response);
    });
} 