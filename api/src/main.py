# coding=utf-8
from flask import Flask, jsonify, request, session, Response
from flask_cors import CORS
from .entities.entity import Session, engine, Base
from .entities.project import Project,ProjectSchema
from .entities.pbutton import PButton
from .auth import AuthError, requires_auth
from .projectmanager import ProjectManager
import os
import json
from werkzeug.utils import secure_filename
import logging

UPLOAD_FOLDER='/Users/kazamatzuri 1/work/temp/yape-data'
ALLOWED_EXTENSIONS = set(['html'])

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 1024 * 1024 * 1024
CORS(app)

# generate database schema
Base.metadata.create_all(engine)


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/project/<id>',methods=['POST'])
def upload_file(id):
    pm = ProjectManager()
    try:
        project = pm.getProject(id).data
    except:
        sc={"status":"project not found"}
        return Response(jsonify(sc),status=404,mimetype='application/json')
    if request.method=='POST':
        if 'file' not in request.files:
            return "error"
        files = request.files.to_dict()
        for file in files:
            if files[file].filename == '':
                logging.error("no filename supplied in upload")
                sc={"status":"error"}
                return Response(jsonify(sc),status=400,mimetype='application/json')
            if file and allowed_file(files[file].filename):
                filename = secure_filename(files[file].filename)
                fn=filename.rsplit('.',1)[0].lower()
                dir=os.path.join(app.config['UPLOAD_FOLDER'],fn)
                if not os.path.exists(dir):
                    os.makedirs(dir)
                files[file].save(os.path.join(dir, filename))
                sc={"status":"success","id":fn}
                pm.addPButton(id,filename)
                return jsonify(sc),201
    sc={"status":"error"}
    return jsonify(sc),400

#@requires_auth
@app.route('/pbutton/<id>')
def get_pbutton(id):
    pm = ProjectManager()
    return jsonify(pm.getPbutton(id).data)

@app.route('/pbutton/<id>/parse')
def parse_pbutton(id):
    pm = ProjectManager()
    return jsonify(pm.createDB(id))


@app.route('/pbutton/<id>/graphs',methods=['PUT','POST'])
def updateGraphs(id):
    pm=ProjectManager()
    pm.generateGraphs(id)
    return jsonify({}),200

@app.route('/pbutton/<id>/textfields')
def getTextFields(id):
    pm=ProjectManager()
    return jsonify(pm.getTextFields(id))

@app.route('/pbutton/<id>/fields')
def getFields(id):
    pm=ProjectManager()
    return jsonify(pm.getFields(id))

@app.route('/pbutton/<id>/data',methods=["GET","POST"])
def getData(id):
    pm=ProjectManager()
    if request.method=='POST':
        #print(request.get_json())
        data = request.data
        req_data = json.loads(data)
        print(req_data)
        return pm.getData(id,req_data)
    else:
        return pm.getData(id,None)

@app.route('/pbutton/<id>/<url>')
def getImage(id,url):
    pm=ProjectManager()
    return pm.serveImg(id,url)

@app.route('/pbutton/<id>/graphs')
def getGraphs(id):
    pm = ProjectManager()
    return jsonify(pm.getGraphs(id))

@app.route('/projects')
#@requires_auth
def get_projects():
    pm = ProjectManager()
    return jsonify(pm.getProjects().data)
    # fetching from the database
    #return jsonify(projects.data)

#@requires_auth
@app.route('/project/<id>')
def get_project(id):
    pm = ProjectManager()
    return jsonify(pm.getProject(id).data)
    # fetching from the database
    #return jsonify(projects.data)

@app.route('/project/<id>/pbuttons')
def get_project_buttons(id):
    pm = ProjectManager()
    return jsonify(pm.getPButtons(id).data)
    # fetching from the database
    #return jsonify(projects.data)


@app.route('/projects', methods=['POST'])
#@requires_auth
def add_project():
    pm = ProjectManager()
    data=request.get_json()
    new_project=pm.createProject(data["title"],data["description"])
    return jsonify(new_project), 201


@app.errorhandler(AuthError)
def handle_auth_error(ex):
    response = jsonify(ex.error)
    response.status_code = ex.status_code
    return response
