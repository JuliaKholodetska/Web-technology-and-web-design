> IT network for developers <
 This app includes authentication, profiles and forum posts.


Live Demo: 

Features:
•	User authentication (login + registration)
•	User input validation 
•	Domain logic -> programmer network

Tech stack: 
[React]and [React Router]for frontend
[Express] and [Node] for the backend
[MongoDB] for the database
[Redux] for state management between React components


# Quick Start

### U need to add your_mondoDB_link and githubtoken in default.json file in config folder 

```
{
  "mongoURI": "<your_mongoDB_Atlas_uri_with_credentials>",
  "jwtSecret": "secret",
  "githubToken": "<yoursecrectaccesstoken>"
}
```

### Install dependencies

```
npm install
```

### Install client dependencies

```
cd client
npm install
```

### Run both Express & React from root

```
npm run dev
```

### Build for production

```bash
cd client
npm run build
```
