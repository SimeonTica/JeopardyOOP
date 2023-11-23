#include "crow.h"
#include "crow/middlewares/cors.h"
#include "Questions.h"

int main() {

    crow::App<crow::CORSHandler> app;

    Questions questions;

    questions.convertQuestions();

    CROW_ROUTE(app, "/")
        ([]() {

        crow::json::wvalue response;
        response["message"] = "Hello, JSON!";
        response["status"] = "success";

        return crow::response(response);
            });

    app.port(8080).multithreaded().run();
    return 0;
}