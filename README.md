# ordo-backend

The backend REST API for the order management app **Ordo.**

## Tech stack :

<img src="https://img.shields.io/badge/-NodeJS-black?style=flat&logo=node.js">
<img src="https://img.shields.io/badge/-MongoDB-black?style=flat&logo=mongoDB">
<img src="https://img.shields.io/badge/-Express-black?style=flat&logo=express">

## General Guidelines

- use camelCase to name variables
  - eg : `const menuItem` , `let orderId` etc...
- use under_score to name endpoints
  - eg: `PUT /order/edit_order`, `GET /menu_items` etc.....
- create a branch with your own name and commit your changes to that branch.
- keep commit messages short and self-explanatory.
- create a PR from your branch to the `main` branch.

## Steps to run locally

Node.js (14+) and MongoDB(4.2+) must be installed.
Nodemon must be installed globally. If not, run `npm install -g nodemon` .

- clone the repository from `main` branch
- run `npm install` at the root of the project directory
- create a `.env` file at the root of the repository
- set the essential environment variables.
- run `npm run dev ` to start the development server on port 5000

## Essential Environment Variables

This is the list of environment variables required in the `.env` file for the app to work correctly.

`JWT_PRIVATE_KEY`\
`DB_URI`
