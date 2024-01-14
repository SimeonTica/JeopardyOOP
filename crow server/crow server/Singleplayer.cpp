#include "Singleplayer.h"

int Singleplayer::checkWhichPlayer(std::string pl) {

    for (int i = 0; i < players.size(); i++)
    {
        if (players[i].get_nickname() == pl) {

            return i;
        }
    }
    return -1;
}

void Singleplayer::startRoutes(crow::App<crow::CORSHandler>& app) {

    CROW_ROUTE(app, "/questions/<string>")
        .methods("GET"_method)
        ([&](const std::string& a) {
        int playerIndex = checkWhichPlayer(a);
        if (playerIndex != -1) {
            json data = questions[playerIndex].getQuestionsToSend();
            return crow::response(data.dump(4));
        }
        else {
            return crow::response(404, "Player not found");
        }
            });

    CROW_ROUTE(app, "/question/<string>")
        .methods("POST"_method)
        ([&](const crow::request& req, std::string a) {

        int player = checkWhichPlayer(a);

        json request = json::parse(req.body);
        questions[player].changeQuestionWithClientResponse(request);
        json data = questions[player].getQuestionsToSend();

        return crow::response(data.dump(4));
            });

    CROW_ROUTE(app, "/score/<string>")
        .methods("POST"_method)
        ([&](const crow::request& req, std::string a) {

        int player = checkWhichPlayer(a);

        players[player].update_score(req.body);

        crow::response res;

        res.body = "idk";
        res.code = 200;

        return res;
            });

    CROW_ROUTE(app, "/categories/<string>")
        ([&](std::string a) {

        int player = checkWhichPlayer(a);

        json data = questions[player].getCategoriesToSend();

        return crow::response(data.dump(4));
            });

    CROW_ROUTE(app, "/score/<string>")
        .methods("GET"_method)
        ([&](std::string a) {

        int player = checkWhichPlayer(a);

        if (checkStatus(questions[player]) == true) {

            json points;
            points["points"] = players[player].get_score();

            //questions.erase(questions.begin() + player); i dont get why this throws mem error 
            //players.erase(players.begin() + player);

            players[player].set_nickname("DELETED"); // workaround (not ideal)

            return crow::response(points.dump(4));
        }
        else {
            json points;
            points["points"] = -1;
            return crow::response(points.dump(4));
        }
            });

}

bool Singleplayer::checkStatus(Questions questions) {

    for (int i = 0; i < questions.stringQuestions.size(); i++)
    {
        jsonQuestion quest = questions.stringToStruct(questions.stringQuestions[i]);
        std::cout << quest.render << " " << i + 1 << "\n";
        if (quest.render == "TRUE") {
            return false;
        }
    }
    std::cout << "Done\n";
    return true;
}

void Singleplayer::pushPlayerAndQuestions(Questions q, Player p) {

    this->questions.push_back(q);
    this->players.push_back(p);
}