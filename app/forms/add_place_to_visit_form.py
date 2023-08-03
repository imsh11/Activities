from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError


class Add_place_to_visit(FlaskForm):
    status = StringField('Status', validators=[DataRequired()])
