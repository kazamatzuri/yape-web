from sqlalchemy import Column, String, Integer, ForeignKey, DateTime
from marshmallow import Schema, fields
from sqlalchemy.orm import relationship

from .entity import Entity, Base
from .layoutcolumn import LayoutColumn,LayoutColumnSchema


class Layout(Entity, Base):
    __tablename__ = 'layout'

    name = Column(String)
    owner = Column(String)
    columns = relationship("LayoutColumn")


    def __init__(self, created_by,name):
        Entity.__init__(self, created_by)
        self.created_by=created_by
        self.name=name



class LayoutSchema(Schema):
    id = fields.Number()
    name = fields.Str()
    owner = fields.Str()
    columns= fields.Nested("LayoutColumnSchema",many=True)
    created_at = fields.DateTime()
    updated_at = fields.DateTime()
    last_updated_by = fields.Str()
