# Generated by Django 3.2.13 on 2023-02-13 07:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blogs', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='article',
            name='thumbnail',
            field=models.ImageField(blank=True, default='media/article_default.png', null=True, upload_to='article/'),
        ),
    ]
