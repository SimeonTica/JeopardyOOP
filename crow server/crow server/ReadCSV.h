#pragma once
#include <fstream>
#include <vector>
#include <string>
#include <iostream>

class ReadCSV {

public:
	std::vector<std::string> getDataFromFile(std::string file);
};