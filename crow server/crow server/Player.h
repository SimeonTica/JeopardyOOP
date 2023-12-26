#pragma once
#include <string>
#include <sstream>

class Player
{
private:
	std::string nickname;
	std::int16_t score;

public:
	Player();

	void set_nickname(std::string name);
	void set_score(int score);
	std::string get_nickname();
	void update_score(std::string points);
	std::int16_t get_score();
};