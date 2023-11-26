#pragma once
#include "nlohmann/json.hpp"
#include "ReadCSV.h"
#include <random>

using json = nlohmann::json;

class Questions : public ReadCSV {

private:
	json questions;
	std::vector<std::string> stringQuestions;
	std::vector<std::string> categories{"category 1", "category 2", "category 3", "category 4", "category 5", "category 6", "category 7", "category 8", "category 9", "category 10", "category 11", "category 12", "category 13", "category 14", "category 15", "category 16", "category 7", "category 18", "category 19", "category 20"};
	std::vector<int> generateRandomCategories();
	int generateRandomNumberInInterval(int a, int b);
	std::string pickOneQuestion(std::string file);

public:
	void getQuestions();
	void convertQuestions();
};