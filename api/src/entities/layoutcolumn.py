from sqlalchemy import Column, String, Integer, ForeignKey, DateTime
from marshmallow import Schema, fields
from sqlalchemy.orm import relationship

from .entity import Entity, Base


class LayoutColumn(Base):
    __tablename__ = 'layoutcolumn'

    id = Column(Integer, primary_key=True)
    col = Column(String)
    layout_id = Column(Integer, ForeignKey('layout.id'))

    def __init__(self,layout,col):
        Entity.__init__(self, "system")
        self.layout_id=layout
        self.col=col

class LayoutColumnSchema(Schema):
    id = fields.Number()
    col = fields.Str()
    layout_id = fields.Number()
