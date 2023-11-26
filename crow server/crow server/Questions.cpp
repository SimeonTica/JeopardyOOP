#include "Questions.h"

#include <iostream>

int Questions::generateRandomNumberInInterval(int a, int b) {

    std::random_device rd; // obtain a random number from hardware
    std::mt19937 gen(rd()); // seed the generator
    std::uniform_int_distribution<> distr(a, b); // define the range

    return distr(gen);
}

std::vector<int> Questions::generateRandomCategories() {

    int i = 0;
    int v[] = { 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 };
    std::vector<int> ans;

    while (i < 5) {

        int dis = generateRandomNumberInInterval(1, 20) - 1;

        if (v[dis] == 0) {

            v[dis] = 1;
            ans.push_back(dis);
            i++;
        }

    }

    return ans;
}

std::string Questions::pickOneQuestion(std::string file) {

    std::vector<std::string> allLines = getDataFromFile(file);

    int randomLineNumber = generateRandomNumberInInterval(1, allLines.size() - 1);

    return allLines[randomLineNumber];

}

void Questions::getQuestions() {
	
    std::vector<int> ans = generateRandomCategories();

    for (int i = 0; i < 5; i++)
    {
        std::string file = ".\\questions\\" + categories[ans[i]] + "\\";
        stringQuestions.push_back(pickOneQuestion(file + "250.csv"));
    }

    for (int i = 0; i < 5; i++)
    {
        std::string file = ".\\questions\\" + categories[ans[i]] + "\\";
        stringQuestions.push_back(pickOneQuestion(file + "500.csv"));
    }

    for (int i = 0; i < 5; i++)
    {
        std::string file = ".\\questions\\" + categories[ans[i]] + "\\";
        stringQuestions.push_back(pickOneQuestion(file + "750.csv"));
    }

    for (int i = 0; i < 5; i++)
    {
        std::string file = ".\\questions\\" + categories[ans[i]] + "\\";
        stringQuestions.push_back(pickOneQuestion(file + "1000.csv"));
    }

    for (int i = 0; i < 20; i++)
    {
        std::cout << stringQuestions[i] << std::endl;
    }

}

void Questions::convertQuestions() {



}