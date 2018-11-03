install google cloud sdk

```
gcloud init
```

setup disk:
```
./create-disk.sh
```

setup gke kluster
```
./create-gke-cluster.sh
```

get credentials for kubectl: (yape-test is name of the cluster you set in the first step)
```
gcloud container clusters get-credentials drone
```


run install-drone.sh:
```
./install-drone.sh
```

