# PlayBook Academy

A video browsing platform

# Developers, read this instruction

## Summary:

    Tech Stack: MERN
    Workflow Methodology: Agile

## BackEnd Architecture and Details

Follows the MVC pattern, i.e.

    Model: Contains Database Models(Schemas), uses mongoose as the ODM
    View: The "frontEnd", uses React via Create-React-App
    Controller: Handles routing of the entire application

Other key details include:

- ExpressJS as the backend framework
- PassportJS for managing authentication
- StripeJS for payment integration

## FrontEnd Architecture and Details

Follows the architecture strapped by Create-React-App

- Uses BEM methodology for naming components
- SCSS as the CSS pre-processor
- React Router for client-side routing
- Redux for complex state management

# Getting Started

1. Clone this repository,

```bash
git clone https://github.com/rahuldahal/playbook playbook
```

2. Change the directory and install dependencies

```bash
cd playbook
npm install # dependencies for the server
npm run client-install # dependencies for the client(react)
```

3. Create a branch for every new feature

```bash
git checkout -b [branchName] # eg. git checkout -b signup
```

4. Start the dev-server

```bash
npm run dev # starts both the server(@port 5000) and the client(@port 3000)
```

5. Do your change / Implement a new feature
6. Add your changes to the staging area, then commit and push

```bash
git add .
git commit -m "brief about your change..."
git push -u origin [branchName]
```
