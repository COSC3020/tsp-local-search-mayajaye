// Maya Conway
// code.js
// TSP Local Search
// 5-6-25

function swap(arr, i, j) {
    let tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
}

function twoOptSwap(route, i, k) {
    let routeCopy = route.slice();
    while (i < k) {
        // cities from 1 to i-1 and k+1 to n stay the same, cities i to k are reversed
        swap(routeCopy, i, k);
        i++; k--;
    }
    return routeCopy;
}

function findDistance(distance_matrix, route) {
    let distance = 0;
    for (let j = 0; j < route.length - 1; j++) {
        //add all edges of the route up
        distance += distance_matrix[route[j]][route[j + 1]];
    }
    return distance;
}

function tsp_ls(distance_matrix) {
    let n = distance_matrix.length;
    let route = [];
    for (let i = 0; i < n; i++) route.push(i);

    //get the random start route
    for (let i = n - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        swap(route, i, j);
    }

    let distance = findDistance(distance_matrix, route); //get its distance

    //if no better distance is found, that means we have done all possible 2 opt swaps, so we return the shortest found distance
    let newDistance;
    do {
        newDistance = ls(distance_matrix, route, distance);
        if (newDistance < distance) {
            distance = newDistance;
        }
    }
    while (newDistance < distance);
    
    return distance;

}

function ls(distance_matrix, route, distance) {
    let n = route.length;

    //i should be less than k so we can work on what is in between them,
    //k should be >= i + 2 so we are swapping more than 2 cities
    for (let i = 0; i < n - 2; i++) {
        for (let k = i + 2; k < n; k++) {
            let newRoute = twoOptSwap(route, i, k);
            let newDistance = findDistance(distance_matrix, newRoute);

            //only swap if a better distance is found so that previous iterations aren't undone
            if (newDistance < distance) {
                for (let j = 0; j < n; j++) route[j] = newRoute[j];
                distance = newDistance;
            }
        }
    }
    return distance;
}
