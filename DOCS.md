### Run Project

- run project locally

```
npm inslall
```
Create `.env` file, copy  `.env.simple` file into `.env` file, and add your credentials.

Go to prisma directory and generate prisma client
```
cd prisma && npx prisma generate
```

To create migrations and run project,  run the script
```
npm run start:migrate
```
Project will start on http://localhost:5050



- run project using docker
``` 
 docker compose up --build
```
