from sqlalchemy import Column, String, Integer, ForeignKey
from marshmallow import Schema, fields
from sqlalchemy.orm import relationship

from .entity import Entity, Base


class PButton(Entity, Base):
    __tablename__ = 'pbutton'

    filename = Column(String)
    project_id = Column(Integer, ForeignKey('project.id'))

    def __init__(self, created_by):
        Entity.__init__(self, created_by)


class PButtonSchema(Schema):
    id = fields.Number()
    filename = fields.Str()
    project_id = fields.Number()
    created_at = fields.DateTime()
    updated_at = fields.DateTime()
    last_updated_by = fields.Str()
