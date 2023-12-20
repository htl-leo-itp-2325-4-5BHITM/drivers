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
