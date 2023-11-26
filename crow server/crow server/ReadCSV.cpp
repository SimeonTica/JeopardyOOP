#include "ReadCSV.h"

std::vector<std::string> ReadCSV::getDataFromFile(std::string file) {

	std::ifstream csv(file);

	std::vector<std::string> data;

	std::string line;
	if (!csv.is_open()) {
		std::cout << "error opening file";
	}

	while(std::getline(csv, line)) {

		data.push_back(line);

	}

	csv.close();

	return data;
}
