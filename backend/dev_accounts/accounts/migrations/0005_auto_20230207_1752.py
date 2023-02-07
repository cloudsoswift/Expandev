# Generated by Django 3.2.13 on 2023-02-07 08:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0004_remove_user_login_type'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='nickname',
        ),
        migrations.RemoveField(
            model_name='user',
            name='platform',
        ),
        migrations.RemoveField(
            model_name='user',
            name='position',
        ),
        migrations.AddField(
            model_name='user',
            name='login_type',
            field=models.CharField(default=1, max_length=10),
            preserve_default=False,
        ),
    ]