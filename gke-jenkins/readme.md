Jenkins on gke directly (no helm)
(see https://cloud.google.com/solutions/jenkins-on-kubernetes-engine for inspiration)


install google cloud sdk


```
gcloud init
```

setup gke kluster
```
./create-gke-cluster.sh
```
(note the scopes are different than in the other tests)

and verify:
```
gcloud container clusters list
```

update kubectl credentials and verify connectivity:
```
gcloud container clusters get-credentials yape
kubectl get pods --all-namespaces
```

let's add helm support and nginx-ingress
```
kubectl apply -f tiller-rbac.yaml
helm init  --service-account tiller
helm install --values traefik-values.yaml stable/traefik
```

get external ip with:
```
kubectl get svc -n kube-system
```
(look for the external-ip on ingress-controller), you should get 'default backend - 404' on this now


With the yape chart in the same directory do
```
helm install ./yape --name yape
```

setup ingress rule for yape:
```
kubectl apply -f yape-ingress.yaml
```

Eventually the hostname should be overridden (or set in values.yaml) to something that resolves to the external ip from above, for now I'm setting it on my machine in /etc/hosts



let's create a jenkins namespace:
```
kubectl create namespace jenkins
```

add services:
```
kubectl apply -f jenkins-service.yaml
```

add jenkins itself:
```
kubectl apply -f jenkins.yaml
```