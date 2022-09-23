import queue as Q
import sys
sys.path.append(str(sys.path[0]) + '\\Visualization')

from VisualMienBac import printMap

def UCS(start_city, end_city, city_map):
    #Input handling
    if start_city not in city_map:
        raise TypeError(str(start_city) + ' not found in graph !')
        return
    if end_city not in city_map:
        raise TypeError(str(end_city) + ' not found in graph !')
        return
    if(start_city == end_city):
        print('Total distance: 0')
        print('Best route: ')
        return
    #Init
    time = 1
    space = 1
    cur_city = start_city
    cities_list = [start_city]
    cost = 0
    visited = [start_city]
    
    # Initial queue
    queue = Q.PriorityQueue()
    queue.put((0, cities_list))

    #UCS
    while not queue.empty():
        #Generate unvisited neighbor cities
        for neighbor in city_map[cur_city]:
            if neighbor not in visited:
                time += 1
                temp = cities_list[:]
                temp.append(neighbor)
                queue.put((cost + city_map[cur_city][neighbor], temp))
                space += 1
        # Pop the top priority item out of the PriorityQueue
        node = queue.get()
        space -= 1
        # Get the cost, cities_list and last_city
        cost = node[0]
        cities_list = node[1]
        last_city = cities_list[len(cities_list) - 1]

        if end_city == last_city:
            break
        #Update cur_city
        visited.append(last_city)
        space += 1
        cur_city = last_city

    print(f"Time complexity: {time}")
    print(f"Space complexity: {space}")
    print(f'Total distance: {cost}')
    print(f'Shortest path: {cities_list}')
    printMap(cities_list)