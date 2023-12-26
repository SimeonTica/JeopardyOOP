#include "Player.h"


Player::Player()
{
	this->nickname = "";
	this->score = 0;
}

void Player::set_nickname(std::string name)
{
	this->nickname = name;
}

void Player::set_score(int score)
{
	this->score = score;
}

std::string Player::get_nickname()
{
	return this->nickname;
}

void Player::update_score(std::string points)
{

	std::stringstream ss(points);
	std::string ans;

	std::getline(ss, ans, '"');
	std::getline(ss, ans, '"');

	int score = std::stoi(ans);
	this->score += score;
}

std::int16_t Player::get_score()
{
	return this->score;
}