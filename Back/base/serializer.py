from rest_framework import serializers
from .models import Journal


class JournalSerializer(serializers.ModelSerializer):
    """
    Serializer for the Journal model.

    Fields:
        id (ReadOnlyField): The ID of the journal entry.
        user (PrimaryKeyRelatedField): The user who created the journal entry.
        strategy (CharField): The trading strategy used.
        instrument (CharField): The trading instrument used.
        date (DateField): The date of the journal entry.
        time (TimeField): The time of the journal entry.
        entryprice (DecimalField): The entry price of the trade.
        exitprice (DecimalField): The exit price of the trade.
        quantity (DecimalField): The quantity of the trade.
        position (CharField): The trading position (e.g., Long, Short).
        winorlose (CharField): Whether the trade was a win or a loss.
        description (CharField): Additional notes or description for the trade.
        image (ImageField): An optional image related to the trade.

    Meta:
        model (Journal): The Journal model to be serialized.
        fields: A tuple containing the fields to be included in the serialization (all fields in this case).
    """
    
    class Meta:
        model = Journal
        fields = "__all__"
