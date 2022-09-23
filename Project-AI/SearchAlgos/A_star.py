import sys

sys.path.append(str(sys.path[0]) + '\\Visualization')
from VisualMienBac import printMap

def A_star_algorithm(start_city, end_city, city_map, heuristics_distance):
    if(start_city not in heuristics_distance.keys()):
        print('Can not find the start city. Please select a start city again.')
        return
    elif(end_city not in heuristics_distance.keys()):
        print('Can not find the end city. Please select an end city again.')
        return
    if(start_city == end_city):
        print('Total distance: 0')
        print('Best route: ')
        return
    # initialize values 
    min_cost_value = 1e9    
    visited = [start_city]
    optimal_node = [start_city]
    cur_city = start_city
    cur_cost = {cur_city : 0}
    route = {cur_city : None}
    remove_nodes = []
    f ={end_city:1e9+1}
    f[cur_city] = heuristics_distance[cur_city][end_city] + cur_cost[cur_city]
    time = 1

    # find the best route and the min_distance
    while f[end_city] != min_cost_value:
        for neighbor_city in city_map[cur_city].keys():
            # Check unvisited cities for optimal_node            
            if neighbor_city not in optimal_node:
                temp_cur_cost = cur_cost[cur_city] + city_map[cur_city][neighbor_city]
                if neighbor_city not in f.keys() or f[neighbor_city] > temp_cur_cost + heuristics_distance[neighbor_city][end_city]:
                    if neighbor_city in route.keys():
                        remove_nodes.append((neighbor_city, route[neighbor_city]))
                    cur_cost[neighbor_city] = temp_cur_cost
                    f[neighbor_city] = cur_cost[neighbor_city] + heuristics_distance[neighbor_city][end_city]
                    route[neighbor_city] = cur_city
                else: remove_nodes.append((neighbor_city, route[neighbor_city]))    
                if neighbor_city not in visited:
                    visited.append(neighbor_city)
                time = time + 1
        #Insert the optimal node
        optimal_node.append(cur_city)
        visited.remove(cur_city)
        # Update cur_city
        cur_city = list(f.items())[0][0]
        min_cost_value = list(f.items())[0][1]
        for neighbor_city in visited:
            if f[neighbor_city] < min_cost_value:
                cur_city = neighbor_city
                min_cost_value = f[neighbor_city]
    space = len(route) + len(remove_nodes)
    shortest_path, total_distance = trace_back(route, end_city, city_map)
    print(f"Time complexity: {time}")
    print(f"Space complexity: {space}")
    print(f'Total distance: {total_distance}')
    print(f'Path found: {shortest_path}')  

    printMap(shortest_path)

def trace_back(visited: dict, end_city, city_map):

    path = []
    total_distance = 0
    cur_city = end_city
    cur_city_parent = visited[end_city]
    while 1:
        if cur_city_parent is not None:
            path.append(cur_city)
            total_distance += city_map[cur_city_parent][cur_city]
            cur_city = visited[cur_city]
            cur_city_parent = visited[cur_city]
        else:
            path.append(cur_city)
            break
    path.reverse()
    return path, total_distance 