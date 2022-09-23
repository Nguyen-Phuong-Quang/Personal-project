import json
import sys
import os

real_distance_filename = os.path.join(sys.path[0], "InputData\\neighbor.json")
heuristics_distance_filename = os.path.join(sys.path[0], "InputData\\sld.json")

def read_from_json_file(filename):
    f = open(filename, "r")
    data = json.load(f)
    for city in data:
        for neighbor in data[city]:
            data[city][neighbor] = float(data[city][neighbor])
    return data

# Real distance between two cities
city_map = read_from_json_file(real_distance_filename)
# Heuristic distance between two cities
heuristics_distance = read_from_json_file(heuristics_distance_filename)