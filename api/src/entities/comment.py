from sqlalchemy import Column, String, Integer, ForeignKey, DateTime
from marshmallow import Schema, fields
from sqlalchemy.orm import relationship

from .bookmark import Bookmark, BookmarkSchema
from .entity import Entity, Base


class Comment(Entity, Base):
    __tablename__ = "comment"

    comment = Column(String)
    bookmark = Column(Integer, ForeignKey("bookmark.id"))
    project_id = Column(Integer, ForeignKey("project.id"))

    def __init__(self, created_by, project_id, filename):
        Entity.__init__(self, created_by)
        self.created_by = created_by
        self.project_id = project_id
        self.filename = filename


class CommentSchema(Schema):
    id = fields.Number()
    project_id = fields.Number()
    created_at = fields.DateTime()
    updated_at = fields.DateTime()
    last_updated_by = fields.Str()
    comment = fields.Str()
    bookmark = fields.Nested(BookmarkSchema, many=True)
