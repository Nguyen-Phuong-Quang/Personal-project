import sys
sys.path.append(str(sys.path[0]) + '\\Preprocessing')
sys.path.append(str(sys.path[0]) + '\\SearchAlgos')

from preprocessing import heuristics_distance, city_map
from A_star import A_star_algorithm
from GreedyBestFirstSearch import GBFS
from UniformCostSearch import UCS

def main():
    start_city = input('Start city: ')
    end_city = input('End city: ')

    start_city = ' '.join(start_city.split()).title()
    end_city = ' '.join(end_city.split()).title()
    print("Enter the search algorithm: ")
    print("1. Uniform-cost Search")
    print("2. Greedy Best First Search")
    print("3. A* Search")
    choice = int(input("1-3: "))
    if choice == 1:
        UCS(start_city, end_city, city_map)
    elif choice == 2:
        GBFS(start_city, end_city, city_map, heuristics_distance)
    elif choice == 3:
        A_star_algorithm(start_city, end_city, city_map, heuristics_distance)
    else:
        print("Invalid Choice")

if __name__ == '__main__':
    main()