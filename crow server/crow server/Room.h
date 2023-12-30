#pragma once

#include "Player.h"
#include "Questions.h"
#include <vector>
#include <random>

class Room {

private:
	Questions questions;
	std::vector<Player> players;
	std::string roomId;
	std::string getRandomRoomId();
	int turn = 0;

public:
	Room();
	void pushPlayer(Player player);
	std::vector<Player> getPlayers();
	std::string getRoomId();
	bool checkIfFull();
	int checkPlayerPosition(std::string playerId);

	friend class Multiplayer;
};