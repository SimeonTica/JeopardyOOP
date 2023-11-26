#include "crow.h"
#include "crow/middlewares/cors.h"
#include "nlohmann/json.hpp"

#include "Questions.h"
#include "ReadCSV.h"

#include <vector>

using json = nlohmann::json;

int main() {

    //crow::App<crow::CORSHandler> app;

    Questions questions;
    ReadCSV readcsv;

    //readcsv.getDataFromFile(".\\questions\\category 1\\250.csv");

    questions.getQuestions();

    /*CROW_ROUTE(app, "/")
        ([]() {

        json data;

        json q1 = {
            { "1", {
            {"question", "What"},
            {"answer", "yes"},
            } }
        };

        json q2 = {
            { "2", {
            {"question", "what2"},
            {"answer", "yes2"},
            } }
        };

        data = json::array({q1, q2});

        return crow::response(data.dump());
        });

    app.port(8080).multithreaded().run();*/
    return 0;
}