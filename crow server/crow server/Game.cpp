#include "Game.h"

Game::Game() {

    startGame();
}

void Game::startGame() {

    crow::App<crow::CORSHandler> app;

    Singleplayer singleplayer;
    Multiplayer multiplayer;

    CROW_ROUTE(app, "/singleplayer/<string>") 
        ([&](std::string pName){
        
        Questions questions;
        Player player;

        questions.extractQuestionsAndCategories();
        questions.convertQuestions();
        questions.convertQuestionCategories();
        player.set_nickname(pName);
        player.set_score(0);

        singleplayer.pushPlayerAndQuestions(questions, player);

        json response;
        response["ok"] = 1;
        return crow::response(response.dump(4));
        });

    singleplayer.startRoutes(app);
    multiplayer.startRoutes(app);

    app.port(8080).multithreaded().run();
}