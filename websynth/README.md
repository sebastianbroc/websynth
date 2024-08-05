# Docker-Deployment
### Frontend Docker-Container starten:
```
docker build -t websynth .
docker run -t -p 8080:80 websynth
```

### Websocket-Server starten:
Im Ordner "websocket-server"
```
docker build -t websocket-server .
docker run -t -p 8081:8085 websocket-server
```


# Entwicklungsumgebung
### Frontend
```
npm install
npm run serve
```

### Websocket-Server
Im Ordner "websocket-server"
```
npm install
node index.js
```
