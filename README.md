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
Production: `docker-compose up --build`
Development: `docker-compose -f docker-compose-dev.yml up --build`

- mongo-express web => localhost:8081
- node server => localhost:8080

## production TODO:

hook up a real AWS instead of ngrok.
hook up xfers api to disburse
some scheduler for end of duration calculation
some calculator with end of month disbursement
post all the thanks
