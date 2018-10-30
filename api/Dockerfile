FROM python:3.7-alpine

RUN adduser -D yape

WORKDIR /home/yape

RUN apk --no-cache add g++ freetype-dev libpng-dev git
COPY Pipfile Pipfile
COPY Pipfile.lock Pipfile.lock
RUN pip install pipenv

COPY src src
COPY setup.py boot.sh ./
RUN chmod +x boot.sh
RUN pipenv install --system --deploy
RUN pipenv install gunicorn

ENV FLASK_APP =./src/main.py

RUN chown -R yape:yape ./
USER yape

EXPOSE 5000
ENTRYPOINT ["./boot.sh"]
