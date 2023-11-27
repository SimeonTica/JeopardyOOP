#include "crow.h"
#include "crow/middlewares/cors.h"
#include "nlohmann/json.hpp"

#include "Questions.h"
#include "ReadCSV.h"

#include <vector>

using json = nlohmann::json;

int main() {

    crow::App<crow::CORSHandler> app;

    Questions questions;

    questions.extractQuestionsAndCategories();
    questions.convertQuestions();
    questions.convertQuestionCategories();

    CROW_ROUTE(app, "/questions")
        ([&]() {

        json data = questions.getQuestionsToSend();


        return crow::response(data.dump(4));
        });

    CROW_ROUTE(app, "/categories")
        ([&]() {

        json data = questions.getCategoriesToSend();


        return crow::response(data.dump(4));
            });

    app.port(8080).multithreaded().run();
    return 0;
}