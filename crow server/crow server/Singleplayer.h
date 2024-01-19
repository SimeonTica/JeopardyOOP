#pragma once

#include "crow.h"
#include "crow/middlewares/cors.h"
#include "Player.h"
#include "Questions.h"

class Singleplayer {

private:
	std::vector<Questions> questions;
	std::vector<Player> players;

	int checkWhichPlayer(std::string pl);
	bool checkStatus(Questions questions);
	bool checkStatus1(Questions questions);

public:
	void startRoutes(crow::App<crow::CORSHandler>& app);
	void pushPlayerAndQuestions(Questions questions, Player player);
};