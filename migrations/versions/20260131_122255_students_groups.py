"""students_groups

Revision ID: 8a0158fcc4e2
Revises: 2fc36dd94dcd
Create Date: 2026-01-31 12:22:55.924704

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")


# revision identifiers, used by Alembic.
revision = '8a0158fcc4e2'
down_revision = '2fc36dd94dcd'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('students_groups',
    sa.Column('student_id', sa.Integer(), nullable=False),
    sa.Column('group_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['group_id'], ['groups.id'], ),
    sa.ForeignKeyConstraint(['student_id'], ['students.id'], ),
    sa.PrimaryKeyConstraint('student_id', 'group_id')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE students_groups SET SCHEMA {SCHEMA};")


def downgrade():
    op.drop_table('students_groups')
