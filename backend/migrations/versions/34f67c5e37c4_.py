"""empty message

Revision ID: 34f67c5e37c4
Revises: 068b0fcb0563
Create Date: 2023-03-14 10:31:18.159727

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '34f67c5e37c4'
down_revision = '068b0fcb0563'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('commodity_price', schema=None) as batch_op:
        batch_op.add_column(sa.Column('high', sa.Float(), nullable=True))
        batch_op.add_column(sa.Column('low', sa.Float(), nullable=True))
        batch_op.add_column(sa.Column('close', sa.Float(), nullable=True))
        batch_op.add_column(sa.Column('volume', sa.Float(), nullable=True))
        batch_op.add_column(sa.Column('change', sa.Float(), nullable=True))
        batch_op.add_column(sa.Column('change_percentage', sa.Float(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('commodity_price', schema=None) as batch_op:
        batch_op.drop_column('change_percentage')
        batch_op.drop_column('change')
        batch_op.drop_column('volume')
        batch_op.drop_column('close')
        batch_op.drop_column('low')
        batch_op.drop_column('high')

    # ### end Alembic commands ###
