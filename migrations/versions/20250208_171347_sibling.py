"""students classes

Revision ID: bae28b244f87
Revises: 2074a18457ce
Create Date: 2024-12-02 20:19:47.191005

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")


# revision identifiers, used by Alembic.
revision = 'bae27b244f89'
down_revision = 'b4b73c7eb34c'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('siblings',
    sa.Column('student_id', sa.Integer(), nullable=False),
    sa.Column('sibling_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['sibling_id'], ['students.id'], ),
    sa.ForeignKeyConstraint(['student_id'], ['students.id'], ),
    sa.PrimaryKeyConstraint('student_id', 'sibling_id')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE students_classes SET SCHEMA {SCHEMA};")


def downgrade():
    op.drop_table('siblings')
