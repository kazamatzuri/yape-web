kubectl delete -f drone-secret.yaml
kubectl delete -f drone-configmap.yaml
kubectl delete -f drone-server-deployment.yaml
kubectl delete -f drone-server-service.yaml 2> /dev/null