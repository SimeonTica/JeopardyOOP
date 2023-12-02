#pragma once
#include <string>

class Player
{
private:
	std::string nickname;
	std::int16_t score;

public:
	Player();
	void set_nickname(std::string name);
	std::string get_nickname();
	void update_score(std::int16_t points);
	std::int16_t get_score();
};