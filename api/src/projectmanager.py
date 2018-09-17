from .entities.entity import Session, engine, Base
from .entities.project import Project,ProjectSchema

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
    def getProject(projectId):
        session = Session()
        project_object = session.query(Project).get(projectId)
        print(projectId)
        print(project_object)
        # transforming into JSON-serializable objects

        schema = ProjectSchema()
        project = schema.dump(project_object)

        # serializing as JSON
        session.close()
        return project

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
