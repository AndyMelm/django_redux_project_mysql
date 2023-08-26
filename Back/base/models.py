from django.db import models
from django.contrib.auth.models import User

class Journal(models.Model):
    """
    Represents a trading journal entry.

    Fields:
        user (ForeignKey): The user who created the journal entry.
        strategy (CharField): The trading strategy used.
        instrument (CharField): The trading instrument used.
        date (DateField): The date of the journal entry.
        time (TimeField): The time of the journal entry.
        entryprice (DecimalField): The entry price of the trade.
        exitprice (DecimalField): The exit price of the trade.
        quantity (DecimalField): The quantity of the trade.
        position (CharField): The trading position (e.g., Long, Short).
        winorlose (CharField): Whether the trade was a win or a loss.
        description (TextField): Additional notes or description for the trade.
        image (FileField): An optional image related to the trade.

    Methods:
        __str__: Returns the strategy as the string representation of the journal entry.
    """

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    strategy = models.CharField(max_length=50, null=True, blank=True)
    instrument = models.CharField(max_length=50, null=True, blank=True)
    date = models.DateField(null=True, blank=True)
    time = models.TimeField(null=True, blank=True)
    entryprice = models.DecimalField(max_digits=20, decimal_places=2, null=True, blank=True)
    exitprice = models.DecimalField(max_digits=20, decimal_places=2, null=True, blank=True)
    quantity = models.DecimalField(max_digits=20, decimal_places=2, null=True, blank=True)
    position = models.CharField(max_length=20, null=True, blank=True)
    winorlose = models.CharField(max_length=20, null=True, blank=True)
    description = models.TextField( null=True, blank=True)
    image = models.FileField(upload_to='journal_images/', null=True, blank=True)

    def __str__(self):
        return self.strategy

