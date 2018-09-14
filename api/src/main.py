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

UPLOAD_FOLDER='/Users/kazamatzuri/work/temp/yape-data'
ALLOWED_EXTENSIONS = set(['html'])

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 1024 * 1024 * 1024
CORS(app)

# generate database schema
Base.metadata.create_all(engine)


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/upload',methods=['POST'])
def upload_file():
    if request.method=='POST':
        if 'file' not in request.files:
            return "error"
        for file in request.files.getlist['file']:
            if file.filename == '':
                logging.error("no filename supplied in upload")
                sc={"status":"error"}
                return Response(jsonify(sc),status=400,mimetype='application/json')
            if file and allowed_file(file.filename):
                filename = secure_filename(file.filename)
                id=filename.split.rsplit('.',1)[0].lower()
                dir=os.path.join(app.config['UPLOAD_FOLDER'],filename.split.rsplit('.',1)[0].lower())
                if not os.path.exists(dir):
                    os.makedirs(dir)
                file.save(os.path.join(dir, filename))
                sc={"status":"success","id":id}
                return Response(jsonify(sc),status=201,mimetype='application/json')
    sc={"status":"error"}
    return Response(jsonify(sc),status=400,mimetype='application/json')

#@app.route('/pbutton',methods=['POST'])
#def upload_pbuttons:
#    pb=PButton()
#    session = Session()
#    session.add(pb)
#    session.commit()


@app.route('/projects')
def get_projects():
    pm = ProjectManager()
    return jsonify(pm.getProjects().data)
    # fetching from the database
    #return jsonify(projects.data)


@app.route('/projects', methods=['POST'])
@requires_auth
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
