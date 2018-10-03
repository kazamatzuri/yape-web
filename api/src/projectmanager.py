from .entities.entity import Session, engine, Base
from .entities.project import Project,ProjectSchema
from .entities.pbutton import PButton,PButtonSchema
from os import walk
import os
from os.path import join
from datetime import datetime
from flask import send_from_directory
import numpy as np
import pandas as pd
import sqlite3
import yape
import logging
import traceback
#note: getting an error: ImportError: Python is not installed as a framework. The Mac OS X backend...
# see to fix it:
#https://stackoverflow.com/questions/49367013/pipenv-install-matplotlib

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
    def check_data(db,name):
        cur = db.cursor()
        cur.execute("SELECT name FROM sqlite_master WHERE type='table' AND name=?", [name])
        if len(cur.fetchall()) == 0:
            #logging.warning("no data for:"+name)
            return False
        return True

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
        print("createdb "+id)
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
        print("before try")
        try:
            os.remove(filedb)
        except OSError:
            pass
        #call(["yape","-q","--filedb",filedb,f])
        params=['--filedb',filedb,f]
        #logging.debug(params)
        args = yape.main.parse_args(params)
        try:
            yape.main.yape2(args)
        except:
            logging.debug("error while parsing:"+f)
            logging.debug(traceback.format_exc())
            print(traceback.format_exc())
        session.commit()
        session.close()

    @staticmethod
    def assertDB(id):
        session=Session()
        pb=session.query(PButton).get(id)
        filedb=pb.database
        if filedb is None or filedb=="":
            ProjectManager.createDB(id)
        session.close()
        return {}

    @staticmethod
    def getTextFields(id):
        session=Session()
        pb=session.query(PButton).get(id)
        filedb=pb.database
        session.close()
        db=sqlite3.connect(filedb)
        cur = db.cursor()
        list=['license', 'cpffile', 'ss1', 'ss2', 'cstatc11', 'cstatc12', 'cstatc13', 'cstatc14',
              'cstatD1', 'cstatD2', 'cstatD3', 'cstatD4', 'cstatD5', 'cstatD6', 'cstatD7', 'cstatD8',
              'windowsinfo','linuxinfo', 'tasklist']
        data={}
        for field in list:
            if ProjectManager.check_data(db,field):
                cur.execute("select * from "+field)
                data[field]=cur.fetchall()
        cur.close()
        return data

    @staticmethod
    def getFields(id):
        session=Session()
        ProjectManager.assertDB(id)
        pb=session.query(PButton).get(id)
        filedb=pb.database
        session.close()
        db=sqlite3.connect(filedb)
        cursor = db.execute('select * from mgstat')
        names = [description[0] for description in cursor.description]
        return names


    @staticmethod
    def getData(id,fields):
        session=Session()
        ProjectManager.assertDB(id)
        pb=session.query(PButton).get(id)
        filedb=pb.database
        session.close()
        db=sqlite3.connect(filedb)
        if fields is None:
            df=pd.read_sql_query("select datetime,Glorefs from mgstat",db)
            session.close()

            return df[['datetime','Glorefs']].to_json(orient='values')
        #else:


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
        ProjectManager.createDB(pb.id)
        session.close()
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
