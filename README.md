# 🥩 MeetUp on MeetHub

## 📜 Description

En app där du enkelt kan se vilka aktiviteter som finns över hela Sverige, du bokar enkelt en plats via appen efter du skapat ett konto och loggat in.

## 🛠️ Build with

[![React][React.js]][React-url]
[![AWS][AWS-logo]][AWS-url]
[![Serverless][Serverless-logo]][Serverless-url]
[![DynamoDB][DynamoDB-logo]][DynamoDB-url]

## 💡 Flow of thought

Vårt arbete började med att omvandla våra user stories till tickets på Trello, och vi satte dagliga standups kl. 09:00 (svensk tid 🌍) för att hålla alla uppdaterade. Frontend-teamet inledde med en Figmaskiss för att ge designen riktning, men vi utvecklade sedan designen i samarbete med hela teamet.

Validering har varit ett nyckelord för oss – både frontend och backend är fyllda med kontroller för att säkerställa en smidig användarupplevelse. Appen kräver inloggning för att få åtkomst till innehållet, och vi använder token-baserad inloggning som sparas i sessionStorage och rensas vid utloggning. Säkerhet, användarvänlighet och funktionalitet har varit i fokus genom hela projektet.

Alla bidrag går genom pull requests till vår dev-branch och kräver minst två godkännanden för att säkra kvaliteten och hålla oss synkade. 👥

### 📐 Utilities

- [Figma](https://www.figma.com/design/BUZQycJOrb8PuuaJlYBtgQ/meetup%2C-syntax-sorcery?node-id=0-1&node-type=canvas&t=2h4YESOWLyK7q32A-0)
- [Trello](https://trello.com/b/F2HUbbwv/syntax-sorcery)

### 🌐 Links

dev: http://ss-meetup-dev.s3-website.eu-north-1.amazonaws.com/ </br>
prod: http://ss-meetup-prod.s3-website.eu-north-1.amazonaws.com/

## Creators of this masterpiece ✨

💡 Linn Johansson – Idéspruta och kodknackare </br>
🛡️ Rebecka Larsson – Backend-kodens beskyddare</br>
🎨 Jens Brandels – Pixelperfektionist och designmagiker</br>
🌍 Johan Skoog – Vår globetrottande fullstack-sheriff</br>
🔧 Kristofer Almeros – Backend-fixar’n med koll på allt</br>

<!-- Logon och länkar för AWS och Serverless -->

[AWS-logo]: https://img.shields.io/badge/AWS-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white
[AWS-url]: https://aws.amazon.com/
[Serverless-logo]: https://img.shields.io/badge/Serverless-FD5750?style=for-the-badge&logo=serverless&logoColor=white
[Serverless-url]: https://www.serverless.com/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[DynamoDB-logo]: https://img.shields.io/badge/Amazon%20DynamoDB-4053D6?style=for-the-badge&logo=amazon-dynamodb&logoColor=white
[DynamoDB-url]: https://aws.amazon.com/dynamodb/
