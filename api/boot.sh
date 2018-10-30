#!/bin/sh
pipenv shell
flask db upgrade
flask translate compile
gunicorn -b :5000 --access-logfile - --error-logfile - src.main:app
