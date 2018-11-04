#!/bin/sh

#pipenv run flask db upgrade
#pipenv run flask translate compile
gunicorn -b :5000 --access-logfile - --error-logfile - src.main:app
