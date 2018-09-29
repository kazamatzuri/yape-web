from sqlalchemy import Column, String, Integer, ForeignKey
from marshmallow import Schema, fields
from sqlalchemy.orm import relationship

from .entity import Entity, Base


class PButton(Entity, Base):
    __tablename__ = 'pbutton'

    filename = Column(String)
    graphdir = Column(String, nullable=True)
    ran_last = Column(DateTime, nullable=True)
    project_id = Column(Integer, ForeignKey('project.id'))

    def __init__(self, created_by,project_id,filename):
        Entity.__init__(self, created_by)
        self.created_by=created_by
        self.project_id=project_id
        self.filename=filename

class PButtonSchema(Schema):
    id = fields.Number()
    filename = fields.Str()
    graphdir = fields.Str()
    ran_last = fields.DateTime()
    project_id = fields.Number()
    created_at = fields.DateTime()
    updated_at = fields.DateTime()
    last_updated_by = fields.Str()
