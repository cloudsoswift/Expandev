from allauth.account.adapter import DefaultAccountAdapter

class CustomAccountAdapter(DefaultAccountAdapter):

    def save_user(self, request, user, form, commit=False):
        user = super().save_user(request, user, form, commit)
        data = form.cleaned_data
        user.nickname = data.get('nickname')
        user.login_type = data.get('login_type')
        user.stat = data.get('stat')
        user.phone_number = data.get('phone_number')
        user.svc_use_pcy_agmt_yn = data.get('svc_use_pcy_agmt_yn')
        user.ps_info_proc_agmt_yn = data.get('ps_info_proc_agmt_yn')
        user.mkt_info_proc_agmt_yn = data.get('mkt_info_proc_agmt_yn')
        user.news_feed_push_yn = data.get('news_feed_push_yn')
        user.noti_push_yn = data.get('noti_push_yn')
        user.position = data.get('position')

        user.save()
        return user