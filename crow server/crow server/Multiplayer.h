#pragma once

#include "crow.h"
#include "crow/middlewares/cors.h"
#include "crow/websocket.h"
#include "Room.h"
#include "Questions.h"
#include <mutex>
#include <unordered_set>
#include <vector>

class Multiplayer{

private:
	std::vector<Room> rooms;
	std::mutex mtx;
	std::vector<std::pair<crow::websocket::connection*, std::string>> users;
	std::vector<std::pair<crow::websocket::connection*, std::string>> usersStart;
	std::vector<std::pair<crow::websocket::connection*, std::string>> turn;


	bool checkStatus(Questions questions);
	bool checkStatus1(Questions questions);

	int checkWhichRoom(std::string roomId);
	void changeTurn(std::string roomId);

public:
	void startRoutes(crow::App<crow::CORSHandler>& app);

};