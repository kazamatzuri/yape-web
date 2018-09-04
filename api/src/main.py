# coding=utf-8

from .entities.entity import Session, engine, Base
from .entities.project import Project

# generate database schema
Base.metadata.create_all(engine)

# start session
session = Session()

# check for existing data
projects = session.query(Project).all()

if len(projects) == 0:
    # create and persist dummy exam
    python_project = Project("Test project", "just playing around", "script")
    session.add(python_project)
    session.commit()
    session.close()

    # reload exams
    projects = session.query(Project).all()

# show existing exams
print('### Projects:')
for proj in projects:
    print(f'({proj.id}) {proj.title} - {proj.description}')
