from sqlalchemy import Column, String, Integer, ForeignKey
from marshmallow import Schema, fields
from sqlalchemy.orm import relationship

from .entity import Entity, Base


class PButton(Entity, Base):
    __tablename__ = 'pbutton'

    file = Column(String)
    project_id = Column(Integer, ForeignKey('project.id'))

    def __init__(self, created_by):
        Entity.__init__(self, created_by)


class ProjectSchema(Schema):
    id = fields.Number()
    wrc = fields.Number()
    title = fields.Str()
    description = fields.Str()
    created_at = fields.DateTime()
    updated_at = fields.DateTime()
    last_updated_by = fields.Str()