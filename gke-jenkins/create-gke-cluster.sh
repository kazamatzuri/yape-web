#!/usr/bin/env bash
gcloud components update
gcloud container clusters create yape --scopes "https://www.googleapis.com/auth/cloud-platform,https://www.googleapis.com/auth/projecthosting,storage-rw"
if [ $? -eq 1 ]
then
  echo "Unable to create GKE cluster. Aborting."
  exit 1
fi
