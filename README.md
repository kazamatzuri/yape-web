This is an evolution of the original yape (https://github.com/murrayo/yape).
It is also more or less a construction site. 

To run what we currently have, open a shell and go into the api directory and run:

```
pip install -r requirements.txt
``` 
(this is only required once)

afterwards you can start the api with:
```
export FLASK_APP=./src/main.py
flask run -h 0.0.0.0
```
(or run bootstrap.sh)

To get the UI running, open another shell and go into the web directory:
run
```
npm install
```
(only required once or when dependencies change)

Then run:
```
ng serve
```

The above is considered the development version. You can get a somewhat more production ready deployment by running:

```
docker-compose up
```
which bring everything up as containers. 