from sqlalchemy import Column, String, Integer, ForeignKey, DateTime
from marshmallow import Schema, fields
from sqlalchemy.orm import relationship

from .entity import Entity, Base


class State(Entity, Base):
    __tablename__ = 'state'

    lookupkey = Column(String,unique=True)
    data = Column(String)

    def __init__(self):
        Entity.__init__(self, created_by)


class StateSchema(Schema):
    id = fields.Number()
    data = fields.Str()
    created_at = fields.DateTime()
    updated_at = fields.DateTime()
    last_updated_by = fields.Str()
