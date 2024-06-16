from allauth.account.forms import LoginForm, SignupForm
from django.contrib.auth.forms import UserChangeForm, UserCreationForm
from django.forms import CharField, EmailInput, PasswordInput, TextInput

from .models import User


class CustomUserCreationForm(UserCreationForm, SignupForm):
    """
    A form that creats a custom user with no privilages
    form a provided email and password.
    """

    def __init__(self, *args, **kargs):
        super(CustomUserCreationForm, self).__init__(*args, **kargs)
        self.fields["first_name"] = CharField(
            label="Имя",
            widget=TextInput(
                attrs={
                    "class": "input__default text__default",
                    "required": False,
                    "placeholder": "Имя",
                }
            ),
        )
        self.fields["last_name"] = CharField(
            label="Фамилия",
            widget=TextInput(
                attrs={
                    "class": "input__default text__default",
                    "required": False,
                    "placeholder": "Фамилия",
                    "label": "",
                }
            ),
        )
        self.fields["username"] = CharField(
            label="Ник",
            widget=TextInput(
                attrs={
                    "class": "input__default text__default",
                    "required": True,
                    "placeholder": "Ник",
                }
            ),
        )
        self.fields["email"] = CharField(
            label="Email",
            widget=EmailInput(
                attrs={
                    "class": "input__default text__default",
                    "type": "email",
                    "required": True,
                    "placeholder": "Email",
                }
            ),
        )
        self.fields["password1"] = CharField(
            label="Пароль",
            widget=PasswordInput(
                attrs={
                    "class": "input__default text__default",
                    "required": True,
                    "placeholder": "Пароль",
                    "label": "Пароль",
                }
            ),
        )
        self.fields["password2"] = CharField(
            label="Пароль (подтверждение)",
            widget=PasswordInput(
                attrs={
                    "class": "input__default text__default",
                    "required": True,
                    "placeholder": "Пароль (подтверждение)",
                    "label": "Password",
                }
            ),
        )
        self.fields.pop("avatar")

    def save(self, request):
        user = super(CustomUserCreationForm, self).save(request)
        return user

    class Meta:
        model = User
        fields = ("first_name", "last_name", "email", "username", "avatar")
        widgets = {
            "last_name": TextInput(
                attrs={
                    "class": "input__default text__default",
                    "required": True,
                    "placeholder": "Фамилия",
                }
            ),
        }


class CustomUserChangeForm(UserChangeForm):
    """
    A form for updating users. Includes all the fields on
    the user, but replaces the password field with admin's
    password hash display field.
    """

    def __init__(self, *args, **kargs):
        super(CustomUserChangeForm, self).__init__(*args, **kargs)

    class Meta:
        model = User
        fields = "__all__"


class MyCustomLoginForm(LoginForm):
    def __init__(self, *args, **kargs):
        super(MyCustomLoginForm, self).__init__(*args, **kargs)
        self.fields["login"] = CharField(
            label="Ник",
            widget=TextInput(
                attrs={
                    "class": "input__default text__default",
                    "required": True,
                    "placeholder": "Ник",
                }
            ),
        )
        self.fields["password"] = CharField(
            label="Пароль",
            widget=PasswordInput(
                attrs={
                    "class": "input__default text__default",
                    "required": True,
                    "placeholder": "Пароль",
                    "label": "Password",
                }
            ),
        )

    def login(self, *args, **kwargs):
        return super(MyCustomLoginForm, self).login(*args, **kwargs)
