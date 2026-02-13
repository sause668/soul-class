"""announcements

Revision ID: a1b2c3d4e5f6
Revises: 8a0158fcc4e2
Create Date: 2026-02-11 17:06:00.000000

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")


# revision identifiers, used by Alembic.
revision = 'a1b2c3d4e5f6'
down_revision = '8a0158fcc4e2'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('announcements',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=200), nullable=False),
    sa.Column('content', sa.Text(), nullable=False),
    sa.Column('image_url', sa.String(length=500), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('updated_at', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE announcements SET SCHEMA {SCHEMA};")


def downgrade():
    op.drop_table('announcements')
