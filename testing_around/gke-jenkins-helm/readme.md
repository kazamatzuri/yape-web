(see https://medium.com/@timhberry/deploy-jenkins-to-google-kubernetes-engine-with-helm-60e0a4d7de93 for inspiration)

install google cloud sdk


```
gcloud init
```

setup gke kluster
```
./create-gke-cluster.sh
```

and verify:
```
gcloud container clusters list
```

update kubectl credentials and verify connectivity:
```
gcloud container clusters get-credentials yape
kubectl get pods --all-namespaces
```

create tiller service account:
```
kubectl apply -f tiller-rbac.yaml
```


This currently fails with:
serviceaccount/tiller created
Error from server (Forbidden): error when creating "tiller-rbac.yaml": clusterrolebindings.rbac.authorization.k8s.io is forbidden: User "fhaupt@intersystemsgcp.com" cannot create clusterrolebindings.rbac.authorization.k8s.io at the cluster scope: Required "container.clusterRoleBindings.create" permission.

(you might need to talk to TS about that)
(works for me now)

install helm server side:
```
helm init --service-account tiller
```

Dropping jenkins in:
```
helm install --name my-jenkins stable/jenkins
```

get generated adminpwd:
```
printf $(kubectl get secret --namespace default my-jenkins -o jsonpath="{.data.jenkins-admin-password}" | base64 --decode);echo
```

get access url:
```
export SERVICE_IP=$(kubectl get svc --namespace default my-jenkins --template "{{ range (index .status.loadBalancer.ingress 0) }}{{ . }}{{ end }}")
echo http://$SERVICE_IP:8080/login
```



