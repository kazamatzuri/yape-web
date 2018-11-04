FROM python:3.7-alpine

RUN adduser -D yape

WORKDIR /home/yape

RUN apk -U --no-cache add g++ freetype-dev libpng-dev git

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY src src

COPY boot.sh boot.sh
RUN chmod +x boot.sh

ENV FLASK_APP =./src/main.py

RUN chown -R yape:yape ./
USER yape

EXPOSE 5000
ENTRYPOINT ["./boot.sh"]
