from flask.cli import AppGroup
from .users import seed_users, undo_users
from .teachers import seed_teachers, undo_teachers
from .students import seed_students, undo_students
from .classes import seed_classes, undo_classes
from .students_classes import seed_students_classes, undo_students_classes
from .assignments import seed_assignments, undo_assignments
from . grades import seed_grades, undo_grades

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    # if environment == 'production':
        # Before seeding in production, you want to run the seed undo 
        # command, which will  truncate all tables prefixed with 
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
    undo_grades()
    undo_assignments()
    undo_students_classes()
    undo_classes()
    undo_students()
    undo_teachers()
    undo_users()

    seed_users()
    seed_teachers()
    seed_students()
    seed_classes()
    seed_students_classes()
    seed_assignments()
    seed_grades()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_grades()
    undo_assignments()
    undo_students_classes()
    undo_classes()
    undo_students()
    undo_teachers()
    undo_users()
    # Add other undo functions here
