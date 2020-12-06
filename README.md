![GPL-3 License](https://img.shields.io/github/license/rahuldahal/playbook)
![Top-language used](https://img.shields.io/github/languages/top/rahuldahal/playbook)

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

# Getting Started

## Project setup

1. Fork this repository,
click on the *fork* icon located on top-right side of this page, below your avatar

2. Clone that *forked* repository. On your terminal, type

```bash
git clone https://github.com/[yourUsername]/playbook playbook
```

3. Set up the *upstream* remote URL for referencing the original repository

```bash
git remote add upstream https://github.com/rahuldahal/playbook
```

4. Change the directory and install dependencies

```bash
cd playbook
npm install # dependencies for the server
npm run client-install # dependencies for the client(react)
```

## The generic workflow

1. Pull the latest changes from the original repository (the upstream)

```bash
git pull upstream master
```

2. Then, create a branch for every new feature

```bash
git checkout -b [branchName] # eg. git checkout -b signup
```

3. Start the dev-server

```bash
npm run dev # starts both the server(@port 5000) and the client(@port 3000)
```

4. Do your change / Implement a new feature
5. Don't forget to keep pushing your progress to the remote (your *forked* repository)

```bash
git add .
git commit -m "brief about your change..."
git push -u origin [branchName]
```

6. Create a pull request,
	* Go to your *forked* repository on github,
	* If there are no conflicts, you will see a button saying  **create a new Pull Request**.
	* click on that big green button.

