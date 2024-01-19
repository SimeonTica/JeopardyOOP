#pragma once
#include "json.hpp"
#include "ReadCSV.h"
#include <random>
#include <sstream>

using json = nlohmann::json;

struct jsonQuestion {

	std::string intrebare;
	std::string punctaj;
	std::vector<std::string> rasp;
	std::string raspCorect;
	std::string id;
	std::string render;
	std::string correct;

};

class Questions : public ReadCSV {

private:
	int questionCount = 1;

	json questionsToSend1;
	json questionsToSend2;
	json questionCategories1;

	std::vector<std::string> stringQuestions1;
	std::vector<std::string> stringQuestions2;
	std::vector<std::string> stringCategories;
	std::vector<std::string> categories{"Level 3", "Level 4", "Level 5"};

	std::vector<int> generateRandomCategories();
	int generateRandomNumberInInterval(int a, int b);
	std::string pickOneQuestion(std::string file);
	std::string StructToString(jsonQuestion q);
	json to_json(const jsonQuestion& q);
	jsonQuestion from_json(const json& j);
	jsonQuestion stringToStruct(std::string line);

public:
	friend class Game;
	friend class Singleplayer;
	friend class Multiplayer;

	void changeQuestionWithClientResponse(const json& q);
	void extractQuestionsAndCategories();
	void convertQuestions();
	void convertQuestionCategories();
	json getQuestionsToSend();
	json getCategoriesToSend();

	void changeQuestionWithClientResponse1(const json& q);
	void convertQuestions1();
	json getQuestionsToSend1();
};