from .entities.entity import Session, engine, Base
from .entities.project import Project,ProjectSchema
from .entities.pbutton import PButton,PButtonSchema
from os import walk
from os.path import join
from datetime import datetime
from flask import send_from_directory
import numpy as np
import pandas as pd
import sqlite3

from subprocess import call
UPLOAD_FOLDER='/Users/kazamatzuri 1/work/temp/yape-data'

class ProjectManager():
    class __ProjectManager:

        def __str__(self):
            return repr(self)
    instance = None

    def __init__(self):
        if not ProjectManager.instance:
            ProjectManager.instance = ProjectManager.__ProjectManager()


    def __getattr__(self, name):
        return getattr(self.instance, name)

    @staticmethod
    def generateGraphs(id):
        session=Session()
        pb=session.query(PButton).get(id)
        dir=pb.graphdir
        if (dir is None or dir==""):
            dir=pb.filename.split(".")[0]
        pb.ran_last=datetime.now()
        pb.graphdir=dir
        #pb.save()
        session.commit()

        bdir=join(UPLOAD_FOLDER,dir)
        print(bdir)
        f=join(bdir,pb.filename)
        print(f)
        #call(["yape","-q","-a","-o",dir,f])
        session.close()
        return

    @staticmethod
    def serveImg(id,url):
        session=Session()
        pb=session.query(PButton).get(id)
        dir=join(UPLOAD_FOLDER,pb.graphdir)
        session.close()
        return send_from_directory(dir,url)

    @staticmethod
    def createDB(id):
        session=Session()
        pb=session.query(PButton).get(id)
        dir=pb.graphdir
        if (dir is None or dir==""):
            dir=pb.filename.split(".")[0]
        pb.graphdir=dir
        dir=join(UPLOAD_FOLDER,pb.graphdir)
        filedb=join(dir,"data.db")
        pb.database=filedb
        bdir=join(UPLOAD_FOLDER,dir)
        f=join(bdir,pb.filename)
        call(["yape","-q","--filedb",filedb,f])
        session.commit()
        session.close()

    @staticmethod
    def getData(id):
        session=Session()
        pb=session.query(PButton).get(id)
        filedb=pb.database
        if filedb is None or filedb=="":
            ProjectManager.createDB(id)
            session.close()
            session=Session()
            pb=session.query(PButton).get(id)
            filedb=pb.database
        db=sqlite3.connect(filedb)
        df=pd.read_sql_query("select * from mgstat",db)
        session.close()
        return df[['datetime','Glorefs']].to_json(orient='values')

    @staticmethod
    def getGraphs(id):
        session=Session()
        pb=session.query(PButton).get(id)
        dir=join(UPLOAD_FOLDER,pb.graphdir)
        session.close()
        print("graphdir: "+dir)
        if (dir is None or dir==""):
            return []
        f = []
        for (dirpath, dirnames, filenames) in walk(dir):
            f.extend(filenames)
            break
        f = [ fi for fi in f if fi.endswith(".png") ]
        return f

    @staticmethod
    def getProjects():
        session = Session()
        project_objects = session.query(Project).all()

        # transforming into JSON-serializable objects

        schema = ProjectSchema(many=True)
        projects = schema.dump(project_objects)

        # serializing as JSON
        session.close()
        return projects

    @staticmethod
    def getPbutton(pbId):
        session = Session()
        pb_object = session.query(PButton).get(pbId)
        #print(projectId)
        #print(project_object)
        # transforming into JSON-serializable objects
        schema = PButtonSchema()
        pb = schema.dump(pb_object)
        # serializing as JSON
        session.close()
        return pb

    @staticmethod
    def getProject(projectId):
        session = Session()
        project_object = session.query(Project).get(projectId)
        #print(projectId)
        #print(project_object)
        # transforming into JSON-serializable objects

        schema = ProjectSchema()
        project = schema.dump(project_object)

        # serializing as JSON
        session.close()
        return project

    @staticmethod
    def getPButtons(projectId):

        session = Session()
        pbutton_objects = session.query(PButton).filter(PButton.project_id==projectId)
        schema = PButtonSchema(many=True)

        pbuttons = schema.dump(pbutton_objects)
        session.close()
        return pbuttons
        #print(projectId)
        #print(project_object)
        # transforming into JSON-serializable objects

        schema = ProjectSchema()
        project = schema.dump(project_object)

        # serializing as JSON
        session.close()
        return project


    @staticmethod
    def addPButton(projectid,filename):
        pb=PButton(created_by="system",project_id=projectid,filename=filename)
        session=Session()
        session.add(pb)
        session.commit()
        print("saved pid:"+projectid+" fn:"+filename)

    @staticmethod
    def createProject(title,description):
        if description is None:
            description=""
        # mount exam object
        #posted_project = ProjectSchema(only=('title', 'description')).load(request.get_json())
        project = Project(title=title,description=description, created_by="HTTP post request")
        # persist exam
        session = Session()
        session.add(project)
        session.commit()

        # return created exam
        new_project = ProjectSchema().dump(project).data
        session.close()
        return new_project
