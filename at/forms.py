# -*- coding: utf-8 -*-

from flask_wtf import Form
from wtforms.fields import TextField, RadioField, SelectField, BooleanField, SubmitField, IntegerField, HiddenField
from wtforms.fields.html5 import EmailField
from wtforms.validators import DataRequired, Email, NumberRange, optional, ValidationError, Length

import re
from .utils import *

def _check_phone_number(form, field):
    pattern = re.compile("^[0-9]+$")
    if not pattern.match(field.data):
        raise ValidationError(u'Số điện thoại không chính xác')

class BankForm(Form):
    luong = RadioField('Use Bank', choices=[('yes','Yes'),('no','No')], validators = [DataRequired(message=u'Xin vui lòng chọn một ô')])
    name = TextField('Name', validators = [DataRequired(message=u'Tên không chính xác')])
    phone = TextField('Phone', validators = [DataRequired(message=u'Số điện thoại không chính xác'), Length(min=10, max=12), _check_phone_number])
    email = EmailField('Email', validators = [DataRequired(message=u'Email không chính xác'), Email(message=u'Email không chính xác')])
    region = SelectField('Region', choices=REGION, validators=[DataRequired(message=u'Xin vui lòng chọn Khu vực sinh sống')], coerce=int)
    caoch = SelectField('Salary', choices=CAOCH, validators=[DataRequired(message=u'Xin vui lòng chọn Mức thu nhập của bạn')], coerce=int)
    toidongy = BooleanField("Agree", validators = [DataRequired(message=u'Bạn phải đồng ý với điều khoản của chúng tôi')])
    aff_source = HiddenField("aff_source")
    aff_sid = HiddenField("aff_sid")
    submit = SubmitField('Submit')
