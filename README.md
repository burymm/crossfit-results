# Crossfit results

## Installation
### Mongo for windows
Install mongo mongodb via link
https://www.mongodb.com/download-center#community
- Use custom menu installation.
- Install to `c:\mongodb` folder 
- Uncheck Install mongodb Compass option
- Add c:\mongodb\bin\ to system environment path
- create local db use script `create-db.cmd && mongo-server.cmd`

## Run application
From node folder run script
`mongo-server.cmd`

Then run node application
`npm start`

Run front end part. From front folder run 
`ng serve`

Application host by url: http://localhost:3000.