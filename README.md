# Briefly, what you need

## development

- ngrok
  - after setting up ngrok to ur localhost u need to go to slack and change the ngrok address there
- yarn to get the nodemodules
- probably need to get another token from slack and do some secrets management

## setup db

- mongodb
  - setup mongodb using brew and brew services
  - optional : download mongodb compass to view your db
- seed database
- from root project directory

node ./seed/seed.js (it wont override so you gotta drop ur db first if u have one)

## setup(docker)

1. set up `.env` should have these const inside:

- SLACK_BOT_ACCESS_TOKEN
- X-XFERS-APP-API-KEY
- X-XFERS-APP-API-SECRET
- X-XFERS-USER-API-KEY

2. start docker-compose

- Production: `docker-compose up --build`
- Development: `docker-compose -f docker-compose-dev.yml up --build`

DONE

- mongo-express web => localhost:8081
- node server => localhost:8080

How to test your code with your env config:

- when the docker container running, do `docker exec -it thanks-bot_server_1 bash`
- then you can use the `node test.js` to test whatever you want to test

## production TODO:

hook up a real AWS instead of ngrok.
hook up xfers api to disburse
some scheduler for end of duration calculation
some calculator with end of month disbursement
post all the thanks
