#!/bin/bash
RELEASE=$1

git tag -a $RELEASE -m "releasing $O"
docker image build -t kazamatzuri/yape-web:$RELEASE web/
docker image build -t kazamatzuri/yape-api:$RELEASE api/
docker push kazamatzuri/yape-web:$RELEASE
docker push kazamatzuri/yape-api:$RELEASE