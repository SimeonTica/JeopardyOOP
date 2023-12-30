#include "Room.h"

Room::Room() {
	this->roomId = getRandomRoomId();

	questions.extractQuestionsAndCategories();
	questions.convertQuestions();
	questions.convertQuestionCategories();
}

std::string Room::getRandomRoomId() {
	std::string roomId = "";

	std::random_device rd; // obtain a random number from hardware
	std::mt19937 gen(rd()); // seed the generator
	std::uniform_int_distribution<> distr(100000, 999999); // define the range

	roomId = std::to_string(distr(gen));

	return roomId;
}

std::string Room::getRoomId() {
	return this->roomId;
}

void Room::pushPlayer(Player player) {
	this->players.push_back(player);
}

std::vector<Player> Room::getPlayers() {
	return this->players;
}

bool Room::checkIfFull() {
	if (this->players.size() == 4) {
		return true;
	}
	return false;
}

int Room::checkPlayerPosition(std::string playerId) {
	for (int i = 0; i < this->players.size(); i++) {
		if (this->players[i].get_nickname() == playerId) {
			return i;
		}
	}
	return -1;
}