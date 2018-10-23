from sqlalchemy import Column, String, Integer, ForeignKey
from marshmallow import Schema, fields
from sqlalchemy.orm import relationship

from .entity import Entity, Base
from .pbutton import PButton,PButtonSchema
from .comment import Comment,CommentSchema
from .bookmark import Bookmark,BookmarkSchema

class Project(Entity, Base):
    __tablename__ = 'project'

    title = Column(String)
    wrc = Column(Integer)
    description = Column(String)
    user = Column(String)
    pbuttons = relationship("PButton")
    comments = relationship("Comment")
    bookmarks = relationship("Bookmark")

    def __init__(self, title, description, created_by):
        Entity.__init__(self, created_by)
        self.title = title
        self.user = created_by
        self.description = description

class ProjectSchema(Schema):
    id = fields.Number()
    wrc = fields.Number()
    title = fields.Str()
    user = fields.Str()
    description = fields.Str()
    created_at = fields.DateTime()
    updated_at = fields.DateTime()
    last_updated_by = fields.Str()
    pbuttons = fields.Nested(PButtonSchema,many=True)
    comments = fields.Nested(CommentSchema,many=True)
    bookmarks = fields.Nested(BookmarkSchema,many=True)
