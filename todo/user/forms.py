from allauth.account.forms import SignupForm
from django.contrib.auth.forms import UserChangeForm, UserCreationForm

from .models import User


class CustomUserCreationForm(UserCreationForm, SignupForm):
    """
    A form that creats a custom user with no privilages
    form a provided email and password.
    """

    def __init__(self, *args, **kargs):
        super(CustomUserCreationForm, self).__init__(*args, **kargs)

    def save(self, request):
        user = super(CustomUserCreationForm, self).save(request)
        return user
    
    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'email', 'username', 'avatar')

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
        fields = '__all__'
