from sqlalchemy import Column, String, Integer, ForeignKey, DateTime
from marshmallow import Schema, fields
from sqlalchemy.orm import relationship
import json

from .entity import Entity, Base


class Bookmark(Entity, Base):
    __tablename__ = 'state'

    data = Column(String)

    def __init__(self,data):
        Entity.__init__(self, "system")
        self.data=json.dumps(data)

class BookmarkSchema(Schema):
    id = fields.Number()
    data = fields.Str()
    created_at = fields.DateTime()
    updated_at = fields.DateTime()
