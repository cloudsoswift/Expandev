from allauth.account.adapter import DefaultAccountAdapter

class CustomAccountAdapter(DefaultAccountAdapter):

    def save_user(self, request, user, form, commit=False):
        user = super().save_user(request, user, form, commit)
        data = form.cleaned_data
        user.nickname = data.get('nickname')
        user.email= data.get('email')
        user.login_type = data.get('login_type')
        user.sns_service_id = data.get('sns_service_id')
        user.save()
        return user
