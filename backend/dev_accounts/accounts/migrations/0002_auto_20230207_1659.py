# Generated by Django 3.2.13 on 2023-02-07 07:59

import django.contrib.auth.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='mkt_info_recv_agmt_yn',
        ),
        migrations.RemoveField(
            model_name='user',
            name='news_feed_push_yn',
        ),
        migrations.RemoveField(
            model_name='user',
            name='noti_push_yn',
        ),
        migrations.RemoveField(
            model_name='user',
            name='password',
        ),
        migrations.RemoveField(
            model_name='user',
            name='phone_number',
        ),
        migrations.RemoveField(
            model_name='user',
            name='ps_info_proc_agmt_yn',
        ),
        migrations.RemoveField(
            model_name='user',
            name='svc_use_pcy_agmt_yn',
        ),
        migrations.AddField(
            model_name='user',
            name='introduce',
            field=models.TextField(blank=True, default='아직 자기소개가 없습니다.', null=True),
        ),
        migrations.AddField(
            model_name='user',
            name='platform',
            field=models.CharField(default=1, max_length=30),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='user',
            name='profile_image',
            field=models.ImageField(default='media/default.png', upload_to=''),
        ),
        migrations.AddField(
            model_name='user',
            name='sns_service_id',
            field=models.CharField(default=1, max_length=100, unique=True),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='user',
            name='username',
            field=models.CharField(default=1, error_messages={'unique': 'A user with that username already exists.'}, help_text='Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.', max_length=150, unique=True, validators=[django.contrib.auth.validators.UnicodeUsernameValidator()], verbose_name='username'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='user',
            name='login_type',
            field=models.CharField(default=1, max_length=10),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='user',
            name='position',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='stat',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.DeleteModel(
            name='Profile',
        ),
    ]
