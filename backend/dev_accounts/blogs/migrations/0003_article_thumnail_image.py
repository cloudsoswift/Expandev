# Generated by Django 3.2.13 on 2023-02-03 01:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blogs', '0002_article_overview'),
    ]

    operations = [
        migrations.AddField(
            model_name='article',
            name='thumnail_image',
            field=models.ImageField(blank=True, default='media/thumnail_default.png', null=True, upload_to=''),
        ),
    ]