# Warehouse

## Description
Warehouse is an inventory tracking system that makes finding your stuff easier!

## Motivation
I've been doing a ton of Spring cleaning and, while knee deep in unlabeled boxes, I figured I could use an easily accessible and searchable inventory of all this STUFF!  

This turned out to be a great project to build while following [TheNetNinja](https://www.youtube.com/TheNetNinja)'s course on GraphQL [(Linkage)](https://www.youtube.com/watch?v=ed8SzALpx1Q).  

It's been a valuable dive into working with Express, GraphQL schemas and mutations, and of course React and JS development.  

I'm also planning to finally try out Jest's snapshot testing! That should be cool. 

## Roadmap
• Indicate loading when Adding an Item
• Add Search box for Inventory  
• Add Location dialog  
• Continue to build test suite
• Deploy live demo

## Stack
Front-end is React/Apollo  
Back-end is Express/GraphQL  
CSS Grid (really digging `grid-template-areas` for easy layouts!)  

## Run Locally
```
• Using Node 10.15.1 with NVM
```  

### GraphQL Server (/server)

Create `/.env` with the following entries
```
DB_USER=<mongodb-user>
DB_PASS=<mongodb-user-pw>
DB_HOST=<mongodb-host>
```  
then   
```
nvm use
npm install
npm start
```  

### React Client (/client)
```
nvm use
npm install
npm start
```

### Access Running Apps
client: http://localhost:3000  
server: http://localhost:4000/graphql  


