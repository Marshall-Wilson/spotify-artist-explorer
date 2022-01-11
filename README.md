# Spotify Artist Explorer
by Marshall Wilson

## Purpose
A one-page react app that allows the user to generate a playlist that starts at one artist and ends at another by going sequentially through related artists. 

## Installation
Clone down this repository. You will need `node` and `npm` installed globally on your machine.  

Installation:

`npm install`  

To Start Server:

`npm start`  

To Visit App:

`localhost:3000`  

## Implementation
This app implements a breadth-first search using Spotify's "related artists" list. It will explore the starting artist's related artists, then the related artists of those artists, and so on, thus ensuring that it will return the shortest path between the two artists. 

## Reflection
Initially this project was just experimenting with the Spotify API and the types of data that were available through it. However, once I got going, I decided it would be fun to recreate a [C++ project I had completed at Tufts](https://github.com/Marshall-Wilson/collaboration-explorer) but with a more practical application. 

Like that project, my initial implementation of this app explored connections based on artists who had collaborated on songs with eachother. Unfortunately, getting this data required many API calls per artist and would get rate limited quickly making it very slow. Retrieving related artists required many times fewer API calls and so allowed the app to run smoothly. 

## Known Issues
Currently this app runs fairly slowly due to the time it takes to complete each API call and Spotify's rate limit for developer projects. One idea for improving this in the future would be to crawl the artist data initially and generate a graph of artists and their connections, thus allowing the bfs search to happen server-side and with minimal API calls 