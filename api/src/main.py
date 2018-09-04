# coding=utf-8
from flask import Flask, jsonify, request
from flask_cors import CORS
from .entities.entity import Session, engine, Base
from .entities.project import Project,ProjectSchema

app = Flask(__name__)
CORS(app)

# generate database schema
Base.metadata.create_all(engine)

@app.route('/projects')
def get_projects():
    # fetching from the database
    session = Session()
    project_objects = session.query(Project).all()

    # transforming into JSON-serializable objects

    schema = ProjectSchema(many=True)
    projects = schema.dump(project_objects)

    # serializing as JSON
    session.close()
    return jsonify(projects.data)


@app.route('/projects', methods=['POST'])
def add_project():
    # mount exam object
    posted_project = ProjectSchema(only=('title', 'description'))\
        .load(request.get_json())

    project = Project(**posted_project.data, created_by="HTTP post request")

    # persist exam
    session = Session()
    session.add(project)
    session.commit()

    # return created exam
    new_project = ProjectSchema().dump(project).data
    session.close()
    return jsonify(new_project), 201
