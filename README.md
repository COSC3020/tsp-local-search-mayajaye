# Traveling Salesperson Problem -- Local Search

This exercise is about the Traveling Salesperson Problem I mentioned in the
lecture on NP-hard problems -- given a set of cities, determine the length of
the shortest tour that visits all of them. We can get from any city to any other
city, i.e. the graph of cities is completely connected. We consider the version
of the Traveling Salesperson Problem that finds the shortest tour to visit $n$
cities, starting at a city and ending at the $n$ th city; it *does not* go
back to the start. The start city may be any of the cities. Remember that the
graph for a TSP is undirected, i.e. the cost is the same in either direction.

The 2-opt algorithm for solving the Traveling Salesperson Problem is a
randomized local search algorithm that, at each iteration, reverses part of the
route. It starts with a random route (this is the randomized part), and changes
part of the route in each step (this is the local search part, sprinkled with
more randomness). The pseudocode for one iteration is as follows:

```javascript
2optSwap(route, i, k)
  cities 1 to i-1 stay in the order they are
  cities i to k are reversed
  cities k + 1 to n stay in the order they are
```

For example, if I call the above function with route A--B--C--D--E--F, $i=2$,
$k=4$, the resulting route is A--B--E--D--C--F.

The algorithm starts with a random route; if the new route at the end of an
iteration decreases the total length, it is retained as the current incumbent.
The incumbent after the final iteration is returned as the solution.

Implement the 2-opt algorithm, which repeatedly runs the above steps. Your
implementation needs to fix two design parameters that I have left open. First,
you need to design a stopping criterion -- when would it make sense to stop and
return the shortest route found so far rather than trying another iteration?
Second, design a way to choose $i$ and $k$ -- note that they need to be
different in subsequent iterations, as one iteration would simply undo what
the previous one did otherwise. Start with the template I provided in `code.js`.
Describe in your code how you designed your stopping criterion and ways of
choosing $i$ and $k$ and why.

The function takes a distance matrix (the adjacency matrix for the graph where
the values in the cells are the distances between the corresponding cities) and
returns the length of the shortest tour (not the tour itself).

Test your new function; I've provided some basic testing code in `code.test.js`.

## Runtime Analysis

What is the worst-case asymptotic time complexity of your implementation? What
is the worst-case asymptotic memory complexity? Add your answer, including your
reasoning, to this markdown file.

The steps of this algorithm are:
1. Create the list of cities. $\Theta(|V|)$
2. Get the random start route. $\Theta(|V|)$
3. Get the route's distance. $\Theta(|V|)$
4. While there are improvements to be made; $\Theta(|V|!)$ because there are |V|! possible permutations. On the worst case, ls might only find a small improvement each iteration, so it might have to try all |V|! permutations to find the local minimum.
    1. For loop over 0 to n - 2. $\Theta(|V|)$
        1. For loop over i + 2 to n - 1. $\Theta(|V|)$
              1. Do the twoOptSwap. On the worst case, this is $\Theta(|V|)$ because i and k will be on opposite sides of the array
              2. Get the new route's distance. $\Theta(|V|)$
              3. If the new distance is better than the previous, make the new route the next iteration's route and the new distance the 'current incumbent'. $\Theta(|V|)$


The runtime equation is:

$T(n) = 3|V| + |V|! \cdot (|V|^{2} \cdot 3|V|)$

Ignore the constant factors

$= |V| + |V|! \cdot |V|^{3}$

Ignoring the asymptotically insignificant term,

$T(n) \in \Theta(|V|! \cdot |V|^{3})$

The memory complexity consists of 
1. The number of cities in the route $(|V|)$
2. The copy of that array in 2optswaps $(|V|)$


So, the memory complexity is $\Theta(|V|)$

#### Sources

I looked at [this](https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array) for the "Fisher-Yates" shuffle function

[This](https://www.youtube.com/watch?v=8vbKIfpDPJI&t=76s) guy on youtube explained the 2opt swap with an example

"I certify that I have listed all sources used to complete this exercise,
including the use of any Large Language Models. All of the work is my own, except
where stated otherwise. I am aware that plagiarism carries severe penalties and
that if plagiarism is suspected, charges may be filed against me without prior
notice."