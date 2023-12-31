# Generated by Django 4.0.6 on 2023-06-20 14:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0004_journal_quantity_journal_winorlose_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='journal',
            old_name='buyprice',
            new_name='entryprice',
        ),
        migrations.RenameField(
            model_name='journal',
            old_name='sellprice',
            new_name='exitprice',
        ),
        migrations.AddField(
            model_name='journal',
            name='instrument',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='journal',
            name='description',
            field=models.TextField(blank=True, null=True),
        ),
    ]
