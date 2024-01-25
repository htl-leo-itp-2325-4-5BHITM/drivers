# Fahrgemeinschafts - App

## Building

The project has 2 parts: frontend and backend

### Frontend

Development is done by: 
```bash
cd ./frontend
npm install
npm start
```

### Backend

Development is done by: 
(Tutorial from moodle minikube,...)
```bash
cd ./backend
podman machine start  
minikube start --driver=podman
```

And:
(use from 'get pods' name instead "pos&lt;tab&gt;-&lt;tab&gt;")
```bash
cd ./k8s
kubectl get pods
kubectl port-forward pos&lt;tab&gt;-&lt;tab&gt; 5433:5432
```

## Fehlerbehebeungen 

###password/user/ (Quarkus) Fehler kann sicht nicht verbinden / connection refused:
podman / minikube löschen und nochmal installieren
muss dann auch kubectl installieren


### 1. Delete Setup
cd. backend
```bash
minikube delete
podman machine stop
podman machine rm podman-machine-default
```
### 2. setup your environment (once)
```bash
podman machine init --cpus 2
podman machine set --rootful
podman machine start
minikube start
```
### on OSX:

```bash
minikube --driver=podman start
minikube addons enable dashboard
minikube addons enable metrics-server
minikube stop
podman machine stop
```

