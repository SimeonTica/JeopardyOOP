#include "Multiplayer.h"

void Multiplayer::startRoutes(crow::App<crow::CORSHandler>& app) {

    CROW_ROUTE(app, "/multiplayer/create")
        .methods("POST"_method)
        ([&](const crow::request& req) {

        json room;
        json player;

        player = json::parse(req.body);

        Room r;

        rooms.push_back(r);

        room["room"] = r.getRoomId();

        return crow::response(room.dump(4));
            });

    CROW_ROUTE(app, "/ws")
        .websocket()
        .onopen([&](crow::websocket::connection& conn) {
        CROW_LOG_INFO << "new websocket connection";
        std::lock_guard<std::mutex> _(mtx);
        std::pair<crow::websocket::connection*, std::string> user(&conn, "");
        users.push_back(user);
            })
        .onclose([&](crow::websocket::connection& conn, const std::string& reason) {
        CROW_LOG_INFO << "websocket connection closed: " << reason;
        std::lock_guard<std::mutex> _(mtx);

        /*auto it = std::find(users.begin(), users.end(), &conn);

        if (it != users.end()) {
            users.erase(it);
        }
        else {
			CROW_LOG_INFO << "can't find closed connection in user list";
		}*/
            })
        .onmessage([&](crow::websocket::connection& conn, const std::string& data, bool is_binary) {
        std::lock_guard<std::mutex> _(mtx);

        std::pair<crow::websocket::connection*, std::string> user(&conn, "");
        auto it = std::find(users.begin(), users.end(), user);

        json player;
        json room;

        player = json::parse(data);

        if (it != users.end() && it->second == "")
            it->second = player["room"];
        else
            CROW_LOG_INFO << "can't find connection in user list";

        Player p;

        int whichRoom = checkWhichRoom(player["room"]);


        if (whichRoom != -1) {

        p.set_nickname(player["name"]);

            rooms[whichRoom].pushPlayer(p);
            std::vector<Player> roomPlayers = rooms[whichRoom].getPlayers();

            for (int i = 0; i < roomPlayers.size(); i++)
            {
                std::string pos = "player" + std::to_string(i);
                room[pos] = roomPlayers[i].get_nickname();
            }

            for (auto u : users)
                if(u.second == player["room"])
                    u.first->send_text(room.dump(4));

        }
        else {
            for (auto u : users)
                if (u.second == player["room"])
                    u.first->send_text("Room doesn't exist");
        }
            });

    CROW_ROUTE(app, "/ws/startgame")
        .websocket()
        .onopen([&](crow::websocket::connection& conn) {
        CROW_LOG_INFO << "new websocket connection";
        std::lock_guard<std::mutex> _(mtx);
        std::pair<crow::websocket::connection*, std::string> user(&conn, "");
        usersStart.push_back(user);
            })
        .onclose([&](crow::websocket::connection& conn, const std::string& reason) {
                CROW_LOG_INFO << "websocket connection closed: " << reason;
                std::lock_guard<std::mutex> _(mtx);

                /*auto it = std::find(usersStart.begin(), usersStart.end(), &conn);

                if (it != usersStart.end()) {
                    usersStart.erase(it);
                }
                else {
                    CROW_LOG_INFO << "can't find closed connection in user list";
                }*/
            })
        .onmessage([&](crow::websocket::connection& conn, const std::string& data, bool is_binary) {
        std::lock_guard<std::mutex> _(mtx);

        std::pair<crow::websocket::connection*, std::string> user(&conn, "");
        auto it = std::find(usersStart.begin(), usersStart.end(), user);

        json player;
        json room;

        player = json::parse(data);

        if (it != usersStart.end() && it->second == "")
            it->second = player["room"];
        else
            CROW_LOG_INFO << "can't find connection in user list";

        int whichRoom = checkWhichRoom(player["room"]);

        std::cout << whichRoom << std::endl;
        std::cout << player["status"] << std::endl;
        if (whichRoom != -1 && player["status"] == "play") {

            room["status"] = "play";

            for (auto u : usersStart)
                if (u.second == player["room"])
                    u.first->send_text(room.dump(4));

        }
            });


        CROW_ROUTE(app, "/ws/turn")
            .websocket()
            .onopen([&](crow::websocket::connection& conn) {
            CROW_LOG_INFO << "new websocket connection";
            std::lock_guard<std::mutex> _(mtx);
            std::pair<crow::websocket::connection*, std::string> user(&conn, "");
            turn.push_back(user);
                })
            .onclose([&](crow::websocket::connection& conn, const std::string& reason) {
                    CROW_LOG_INFO << "websocket connection closed: " << reason;
                    std::lock_guard<std::mutex> _(mtx);

                    /*auto it = std::find(usersStart.begin(), usersStart.end(), &conn);

                    if (it != usersStart.end()) {
                        usersStart.erase(it);
                    }
                    else {
                        CROW_LOG_INFO << "can't find closed connection in user list";
                    }*/
                })
            .onmessage([&](crow::websocket::connection& conn, const std::string& data, bool is_binary) {
            std::lock_guard<std::mutex> _(mtx);

            std::pair<crow::websocket::connection*, std::string> user(&conn, "");
            auto it = std::find(turn.begin(), turn.end(), user);

            json player;
            json room;

            player = json::parse(data);

            std::cout << player << std::endl;

            if (it != turn.end() && it->second == "")
                it->second = player["room"];
            else
                CROW_LOG_INFO << "can't find connection in user list";

            int whichRoom = checkWhichRoom(player["room"]);

            if (whichRoom != -1 && player["req"] == "which") {

                std::vector<Player> playersInRoom = rooms[whichRoom].getPlayers();

                room["name"] = playersInRoom[rooms[whichRoom].turn].get_nickname();

                for (auto u : turn)
                    if (u.second == player["room"])
                        u.first->send_text(room.dump(4));

            }

            if (whichRoom != -1 && player["req"] == "next") {

                room["update"] = "yes";

                for (auto u : turn)
                    if (u.second == player["room"])
                        u.first->send_text(room.dump(4));

            }

            if (whichRoom != -1 && player["req"] == "stop") {

                room["stop"] = "yes";

                for (auto u : turn)
                    if (u.second == player["room"])
                        u.first->send_text(room.dump(4));

            }

            if (whichRoom != -1 && player["req"] == "change") {

                room["change"] = "yes";

                for (auto u : turn)
                    if (u.second == player["room"])
                        u.first->send_text(room.dump(4));

            }
                });


        CROW_ROUTE(app, "/multiplayer/turn/changeTurn/<string>")
            .methods("GET"_method)
            ([&](std::string roomId) {

            int roomNumber = checkWhichRoom(roomId);

            if (roomNumber != -1) {

                changeTurn(roomId);

                json status;

                status["status"] = "ok";

                return crow::response(status.dump(4));
            }

                });

        CROW_ROUTE(app, "/multiplayer/questions/1/<string>")
        .methods("GET"_method)
        ([&](std::string roomId) {

        int roomNumber = checkWhichRoom(roomId);

        if (roomNumber != -1) {

			json data = rooms[roomNumber].questions.getQuestionsToSend();

			return crow::response(data.dump(4));
		}
            
            });

        CROW_ROUTE(app, "/multiplayer/questions/2/<string>")
        .methods("GET"_method)
        ([&](std::string roomId) {

        int roomNumber = checkWhichRoom(roomId);

        if (roomNumber != -1) {

			json data = rooms[roomNumber].questions.getQuestionsToSend1();

			return crow::response(data.dump(4));
		}
            
            });

        CROW_ROUTE(app, "/multiplayer/categories/<string>")
        .methods("GET"_method)
        ([&](std::string roomId) {

        int roomNumber = checkWhichRoom(roomId);

        if (roomNumber != -1) {

            json data = rooms[roomNumber].questions.getCategoriesToSend();

            return crow::response(data.dump(4));
        }

            });

        CROW_ROUTE(app, "/multiplayer/score/1/<string>/<string>")
        .methods("GET"_method)
        ([&](std::string roomNumber, std::string player) {

        int room = checkWhichRoom(roomNumber);

        if (room != -1) {

            int playerPos = rooms[room].checkPlayerPosition(player);

            if (playerPos != -1) {  

                if (checkStatus(rooms[room].questions) == true) {

                    json points;

                    std::vector<Player> playersInRoom = rooms[room].getPlayers();

                    points["points"] = playersInRoom[playerPos].get_score();

                    return crow::response(points.dump(4));
                }
                else {
                    json points;
                    points["points"] = -1;

                    return crow::response(points.dump(4));
                }
            }

        }
            });

        CROW_ROUTE(app, "/multiplayer/score/2/<string>/<string>")
        .methods("GET"_method)
        ([&](std::string roomNumber, std::string player) {

        int room = checkWhichRoom(roomNumber);

        if (room != -1) {

            int playerPos = rooms[room].checkPlayerPosition(player);

            if (playerPos != -1) {  

                if (checkStatus1(rooms[room].questions) == true) {

                    json points;

                    std::vector<Player> playersInRoom = rooms[room].getPlayers();

                    points["points"] = playersInRoom[playerPos].get_score();

                    return crow::response(points.dump(4));
                }
                else {
                    json points;
                    points["points"] = -1;

                    return crow::response(points.dump(4));
                }
            }

        }
            });        

        CROW_ROUTE(app, "/multiplayer/score/<string>/<string>")
        .methods("POST"_method)
        ([&](const crow::request& req, std::string roomNumber, std::string player) {

        int room = checkWhichRoom(roomNumber);

        if (room != -1) {

			int playerPos = rooms[room].checkPlayerPosition(player);

            if (playerPos != -1) {

				rooms[room].players[playerPos].update_score(req.body);

				crow::response res;

				res.body = "ok";
				res.code = 200;

				return res;
			}

		}
			});

        CROW_ROUTE(app, "/multiplayer/question/1/<string>")
        .methods("POST"_method)
        ([&](const crow::request& req, std::string roomNumber) {

        int room = checkWhichRoom(roomNumber);

        if (room != -1) {

            std::cout << req.body << std::endl;

            json request = json::parse(req.body);
            rooms[room].questions.changeQuestionWithClientResponse(request);
            json data = rooms[room].questions.getQuestionsToSend();

            return crow::response(data.dump(4));

        }
            });

        CROW_ROUTE(app, "/multiplayer/question/2/<string>")
        .methods("POST"_method)
        ([&](const crow::request& req, std::string roomNumber) {

        int room = checkWhichRoom(roomNumber);

        if (room != -1) {

            std::cout << req.body << std::endl;

            json request = json::parse(req.body);
            rooms[room].questions.changeQuestionWithClientResponse1(request);
            json data = rooms[room].questions.getQuestionsToSend1();

            return crow::response(data.dump(4));

        }
            });

        CROW_ROUTE(app, "/multiplayer/finish/<string>")
            .methods("GET"_method)
            ([&](const std::string roomNumber) {

            int room = checkWhichRoom(roomNumber);

            if (room != -1) {

                json player;    
                std::vector<json> vectorResponse;
                json response;

                std::vector<Player> playersInRoom = rooms[room].getPlayers();

                for (int i = 0; i < playersInRoom.size(); i++)
                {
                    player["player"] = playersInRoom[i].get_nickname();
                    player["score"] = playersInRoom[i].get_score();
                    vectorResponse.push_back(player);
                    player.clear();
                }

                response["players"] = vectorResponse;

                return crow::response(response.dump(4));
            }
                });
}

int Multiplayer::checkWhichRoom(std::string roomId) {

    for (int i = 0; i < rooms.size(); i++)
    {
        if (rooms[i].getRoomId() == roomId) {

			return i;
		}
	}
	return -1;
}   

bool Multiplayer::checkStatus(Questions questions) {

    for (int i = 0; i < questions.stringQuestions1.size(); i++)
    {
        jsonQuestion quest = questions.stringToStruct(questions.stringQuestions1[i]);
        if (quest.render == "TRUE") {
            std::cout << "false" << std::endl;
            return false;
        }
        std::cout << "true" << std::endl;
    }

    return true;
}

bool Multiplayer::checkStatus1(Questions questions) {

    for (int i = 0; i < questions.stringQuestions2.size(); i++)
    {
        jsonQuestion quest = questions.stringToStruct(questions.stringQuestions2[i]);
        if (quest.render == "TRUE") {
            std::cout << "false" << std::endl;
            return false;
        }
    }
    std::cout << "true" << std::endl;
    return true;
}

void Multiplayer::changeTurn(std::string roomId) {

    int room = checkWhichRoom(roomId);
    int playerCount = rooms[room].getPlayers().size();

    if (rooms[room].turn == playerCount - 1) {
		rooms[room].turn = 0;
	}
    else {
		rooms[room].turn++;
	}

}