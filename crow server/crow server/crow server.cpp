// crow server.cpp : This file contains the 'main' function. Program execution begins and ends there.

#include <crow.h>
#include <iostream>

int main() {
    crow::SimpleApp app;

    struct YourObject {
        std::string intrebare;
        std::string punctaj;
        std::vector<crow::json::wvalue> rasp;
        int raspCorect;
        int id;
        bool render;
    };

    CROW_ROUTE(app, "/questons")
        ([]() {
        // Create a response in JSON format with the array of objects
        std::vector<YourObject> yourArray = {
    {
        "Cine a fost mihai viteazul?",
        "300$",
        {
            { "un conducator al moldovei", 1 },
            { "un sofer", 2 },
            { "un conducator al romaniei", 3 },
            { "un gimnast", 4 }
        },
        3,
        1,
        true
    },
    {
        "Cine a fost vlad tepes?",
        "400$",
        {
            { "un conducator al moldovei", 1 },
            { "un sofer", 2 },
            { "un conducator al romaniei", 3 },
            { "un gimnast", 4 }
        },
        3,
        2,
        false
    },
    {
        "Cine e vladimir putin?",
        "500$",
        {
            { "un conducator al rusiei", 1 },
            { "un sofer", 2 },
            { "un conducator al romaniei", 3 },
            { "un gimnast", 4 }
        },
        1,
        3,
        true
    },
    {
        "Cum se ajunge pe luna?",
        "600$",
        {
            { "cu masina", 1 },
            { "cu racheta", 2 },
            { "cu barca", 3 },
            { "un gimnast", 4 }
        },
        2,
        4,
        true
    },
    {
        "Care este cea mai rapida masina?",
        "700$",
        {
            { "bugatti", 1 },
            { "ferrari", 2 },
            { "dacia", 3 },
            { "mclaren", 4 }
        },
        1,
        5,
        false
    },
    {
        "Cine a facut aceasta interfata?",
        "2000$",
        {
            { "simi", 1 },
            { "adi", 2 },
            { "vlad", 3 },
            { "cristi", 4 }
        },
        1,
        6,
        true
    }
        };
        crow::json::wvalue response(crow::json::type::List);

        for (const YourObject& obj : yourArray) {
            crow::json::wvalue item;
            item["intrebare"] = obj.intrebare;
            item["punctaj"] = obj.punctaj;

            // Create a JSON array for "rasp" and add its elements
            crow::json::wvalue raspArray(crow::json::type::List);
            for (const std::string& raspItem : obj.rasp) {
                crow::json::wvalue r;
                r = raspItem;
                raspArray.push_back(r);
            }
            item["rasp"] = raspArray;

            item["raspCorect"] = obj.raspCorect;
            item["id"] = obj.id;
            item["render"] = obj.render;

            // Add the item directly to the JSON array
            response.push_back(item);
        }

        return crow::response(response);
            });

    // Start the Crow server
    app.port(8080).multithreaded().run();

    return 0;
}