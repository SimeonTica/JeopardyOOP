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
    int v[] = {0,0,0,0,0,0};
    std::vector<int> ans;

    while (i < 5) {

        int dis = generateRandomNumberInInterval(1, 5) - 1;

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

void Questions::extractQuestionsAndCategories() {
	
    stringCategories.clear();
    stringQuestions.clear();

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

    for (int i = 0; i < 5; i++)
    {
        stringCategories.push_back(categories[ans[i]]);
    }
}

void Questions::changeQuestionWithClientResponse(const json& q) {

    std::string line = StructToString(from_json(q));

    std::stringstream ss(line);

    std::string token;
    std::getline(ss, token, ',');

    for (int i = 0; i < stringQuestions.size(); i++)
    {
        std::stringstream ssq(stringQuestions[i]);

        std::string tokenq;
        std::getline(ssq, tokenq, ',');

        if (tokenq == token) {

            stringQuestions[i] = line;
                convertQuestions();
            convertQuestionCategories();
            break;
        }
    }

}

jsonQuestion Questions::stringToStruct(const std::string line) {

    jsonQuestion q;

    std::stringstream ss(line);

    std::string token;

    std::vector <std::string> columns;

    int i = 0;

    while (std::getline(ss, token, ',')){
        //std::cout << token << std::endl;
        columns.push_back(token);
    }
    q.intrebare = columns[0];
    q.punctaj = columns[1];
    q.rasp.push_back(columns[2]);
    q.rasp.push_back(columns[3]);
    q.rasp.push_back(columns[4]);
    q.rasp.push_back(columns[5]);
    q.raspCorect = columns[6];
    q.id = std::to_string(questionCount);
    q.render = columns[8];
    q.correct = columns[9];

    questionCount++;

    return q;

}

std::string Questions::StructToString(jsonQuestion q) {

    std::string line;

    line += q.intrebare + ",";
    line += q.punctaj + ",";
    line += q.rasp[0] + ",";
    line += q.rasp[1] + ",";
    line += q.rasp[2] + ",";
    line += q.rasp[3] + ",";
    line += q.raspCorect + ",";
    line += q.id + ",";
    line += q.render + ",";
    line += q.correct;


    return line;
}

json Questions::to_json(const jsonQuestion &q) {

    json j = {
            {"intrebare", q.intrebare},
            {"punctaj", q.punctaj},
            {"rasp", {
                {{"r", q.rasp[0]}, {"id", 1}},
                {{"r", q.rasp[1]}, {"id", 2}},
                {{"r", q.rasp[2]}, {"id", 3}},
                {{"r", q.rasp[3]}, {"id", 4}}
            }},
            {"raspCorect", q.raspCorect},
            {"id", q.id},
            {"render", q.render},
            {"correct", q.correct}
        };

    return j;
}

jsonQuestion Questions::from_json(const json& j) {

    jsonQuestion q;

    j.at("intrebare").get_to(q.intrebare);
    j.at("punctaj").get_to(q.punctaj);
    j.at("raspCorect").get_to(q.raspCorect);
    j.at("id").get_to(q.id);
    j.at("render").get_to(q.render);
    j.at("correct").get_to(q.correct);
    q.rasp.push_back(j.at("rasp")[0].at("r"));
    q.rasp.push_back(j.at("rasp")[1].at("r"));
    q.rasp.push_back(j.at("rasp")[2].at("r"));
    q.rasp.push_back(j.at("rasp")[3].at("r"));

    return q;
}

void Questions::convertQuestions() {

    std::vector<json> jsonVector;

    for (int i = 0; i < stringQuestions.size(); i++)
    {
        jsonVector.push_back(to_json(stringToStruct(stringQuestions[i])));
    }

    questionsToSend = jsonVector;
}

void Questions::convertQuestionCategories() {

    std::vector<json> jsonVector;

    for (int i = 0; i < stringCategories.size(); i++)
    {
        jsonVector.push_back({ {"category", stringCategories[i]}, {"id", i + 1}});
    }

    questionCategories = jsonVector;
}

json Questions::getQuestionsToSend() {

    return questionsToSend;

}

json Questions::getCategoriesToSend() {

    return questionCategories;

}