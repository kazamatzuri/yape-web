#!/usr/bin/env bash
gcloud components update
gcloud container clusters create yape --scopes=https://www.googleapis.com/auth/cloud-platform \
  --machine-type g1-small --num-nodes 1
if [ $? -eq 1 ]
then
  echo "Unable to create GKE cluster. Aborting."
  exit 1
fi
