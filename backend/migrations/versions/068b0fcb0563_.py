"""empty message

Revision ID: 068b0fcb0563
Revises: da7f6c797699
Create Date: 2023-03-11 19:54:58.544693

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '068b0fcb0563'
down_revision = 'da7f6c797699'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('commodity_price', schema=None) as batch_op:
        batch_op.drop_column('high')
        batch_op.drop_column('close')
        batch_op.drop_column('low')
        batch_op.drop_column('open')
        batch_op.drop_column('volume')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('commodity_price', schema=None) as batch_op:
        batch_op.add_column(sa.Column('volume', sa.FLOAT(), nullable=True))
        batch_op.add_column(sa.Column('open', sa.FLOAT(), nullable=True))
        batch_op.add_column(sa.Column('low', sa.FLOAT(), nullable=True))
        batch_op.add_column(sa.Column('close', sa.FLOAT(), nullable=True))
        batch_op.add_column(sa.Column('high', sa.FLOAT(), nullable=True))

    # ### end Alembic commands ###