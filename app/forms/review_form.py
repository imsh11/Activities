from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, NumberRange

class Review_Form(FlaskForm):
    review = StringField('Review', validators=[DataRequired()])
    stars = IntegerField('Stars', validators=[DataRequired(), NumberRange(min=1, max=5)])
