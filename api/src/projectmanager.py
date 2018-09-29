from .entities.entity import Session, engine, Base
from .entities.project import Project,ProjectSchema
from .entities.pbutton import PButton,PButtonSchema

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
