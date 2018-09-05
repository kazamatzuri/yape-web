#!/bin/bash
export FLASK_APP=./src/main.py
docker run --name online-exam-db -p 5432:5432 -e POSTGRES_DB=yape-web -e POSTGRES_PASSWORD=yape-passw0rd --rm -d postgres
source $(pipenv --venv)/bin/activate
flask run -h 0.0.0.0
docker container stop postgres
