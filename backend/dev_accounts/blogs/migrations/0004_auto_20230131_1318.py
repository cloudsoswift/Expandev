# Generated by Django 3.2.13 on 2023-01-31 04:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blogs', '0003_auto_20230131_1318'),
    ]

    operations = [
        migrations.AlterField(
            model_name='articleimage',
            name='image_path',
            field=models.CharField(max_length=255),
        ),
        migrations.AlterField(
            model_name='test',
            name='content',
            field=models.TextField(),
        ),
    ]
