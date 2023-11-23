#pragma once
#include "crow.h"

class Questions {

private:
	crow::json::wvalue questions;
public:
	void convertQuestions();
	void getQuestions();
};