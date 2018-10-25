#!/bin/bash
export FLASK_APP=./src/main.py
#export FLASK_ENV=development
pipenv run flask run -h 0.0.0.0
