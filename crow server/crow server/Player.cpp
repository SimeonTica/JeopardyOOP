#include "Player.h"

#include <iostream>


Player::Player()
{
	this->nickname = "";
	this->score = 0;
}

void Player::set_nickname(std::string name)
{
	this->nickname = name;
}

std::string Player::get_nickname()
{
	return this->nickname;
}

void Player::update_score(std::int16_t points)
{
	this->score += points;
}

std::int16_t Player::get_score()
{
	return this->score;
}
