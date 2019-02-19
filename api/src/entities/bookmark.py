from sqlalchemy import Column, String, Integer, ForeignKey, DateTime
from marshmallow import Schema, fields
from sqlalchemy.orm import relationship
import json


from .entity import Entity, Base


class Bookmark(Entity, Base):
    __tablename__ = "bookmark"

    columns = Column(String)
    pbutton = Column(Integer)
    xRange = Column(String)
    yRange = Column(String)
    project = Column(Integer, ForeignKey("project.id"))

    def __init__(self, data, created_by):
        Entity.__init__(self, "system")
        self.created_by = created_by
        self.columns = json.dumps(data["columns"])
        self.pbutton = data["pbutton"]
        self.xRange = json.dumps(data["xRange"])
        self.yRange = json.dumps(data["yRange"])
        self.project = data["project"]


class BookmarkSchema(Schema):
    id = fields.Number()
    columns = fields.Str()
    pbutton = fields.Number()
    created_at = fields.DateTime()
    updated_at = fields.DateTime()
    created_by = fields.Str()
    xRange = fields.Str()
    yRange = fields.Str()
    project = fields.Number()
