from app.models import db, Group, environment, SCHEMA
from sqlalchemy.sql import text



def seed_groups():

    for i in range(1, 17):
        for j in range(1, 4):
            db.session.add(Group(
                class_id=i,
                name=f'Group {j}'
            ))

    
    db.session.commit()



def undo_groups():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.groups RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM groups"))
        
    db.session.commit()