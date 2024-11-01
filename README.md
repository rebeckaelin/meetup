# MeetUp on MeetHub

## Description 🥩

En app där du enkelt kan se vilka aktiviteter som finns över hela Sverige, du bokar enkelt en plats via appen efter du skapat ett konto och loggat in.

## Build with

[![React][React.js]][React-url]
[![AWS][AWS-logo]][AWS-url]
[![Serverless][Serverless-logo]][Serverless-url]
[![DynamoDB][DynamoDB-logo]][DynamoDB-url]

## Flow of thought

Vi började med att bryta ner user stories till tickets som kan ses på vår trello och bestämde att vi skulle ha daily standups varje dag kl 09:00 (svensk tid 🌍)
De som hade huvudansvar för frontenden gjorde en Figmaskiss för att ha en grund men som allt efter tiden gick utvecklats i samröre med övriga medlemmar.

Vi har försökt att validera så mycket som möjligt i både frontend och backend för att säkerställa funktionalitet. Så att allting flyter som vi tänkt. Vi använder token för att komma åt samtliga sidor så inloggning krävs. Detta lagras i sessionstorage som rensas när man loggat ut.

Vi har jobbat stenhårt med pull requests till en dev branch där vi haft minst två reviews på koden man vill bidra med. 🌵

### Utilities

- [Figma](https://www.figma.com/design/BUZQycJOrb8PuuaJlYBtgQ/meetup%2C-syntax-sorcery?node-id=0-1&node-type=canvas&t=2h4YESOWLyK7q32A-0)
- [Trello](https://trello.com/b/F2HUbbwv/syntax-sorcery)

![screenshot](screenshot.png)

### Links

dev: http://ss-meetup-dev.s3-website.eu-north-1.amazonaws.com/ </br>
prod: http://ss-meetup-prod.s3-website.eu-north-1.amazonaws.com/

## Authors

- Linn Johansson
- Rebecka Larsson
- Jens Brandels
- Johan Skoog
- Kristofer Almeros

<!-- Logon och länkar för AWS och Serverless -->

[AWS-logo]: https://img.shields.io/badge/AWS-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white
[AWS-url]: https://aws.amazon.com/
[Serverless-logo]: https://img.shields.io/badge/Serverless-FD5750?style=for-the-badge&logo=serverless&logoColor=white
[Serverless-url]: https://www.serverless.com/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[DynamoDB-logo]: https://img.shields.io/badge/Amazon%20DynamoDB-4053D6?style=for-the-badge&logo=amazon-dynamodb&logoColor=white
[DynamoDB-url]: https://aws.amazon.com/dynamodb/
