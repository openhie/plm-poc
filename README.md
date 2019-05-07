# Patient Level Monitoring - Proof of Concept

Server code is in the server directory.
UI code is in the ui directory.

The UI is compiled and stored in the server/public directory so it can be served by the same server.

## Notes
By default, the server will store data in a sqlite memory only database.  This can be changed by editing server/config/config.json.

Adding new records with the same patient ID will overwrite the previous entry.  This is to ensure that the saved CSV will only include one record per patient.

## Deployment

To run, change into the server directory and run:

```
npm install
npm start
```

Browse to http://localhost:3000/
