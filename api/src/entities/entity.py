# coding=utf-8

from datetime import datetime
from sqlalchemy import create_engine, Column, String, Integer, DateTime,MetaData
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

db_url = '127.0.0.1:5432'
db_name = 'yape-web'
db_user = 'postgres'
db_password = 'yape-passw0rd'
#engine = create_engine(f'postgresql://{db_user}:{db_password}@{db_url}/{db_name}')
#engine = create_engine('sqlite:///data.db')
engine = create_engine('sqlite:///data.db')
Session = sessionmaker(bind=engine)

Base = declarative_base()


class Entity():
    id = Column(Integer, primary_key=True)
    created_at = Column(DateTime)
    updated_at = Column(DateTime)
    last_updated_by = Column(String)

    def __init__(self, created_by):
        self.created_at = datetime.now()
        self.updated_at = datetime.now()
        self.last_updated_by = created_by
