from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.views import (
    PasswordResetView,
    PasswordResetDoneView,
    PasswordResetConfirmView,
    PasswordResetCompleteView,
)
from . import views


urlpatterns = [
    # Login endpoint to obtain JWT token
    path("login/", TokenObtainPairView.as_view()),

    # Reset Password endpoints using templates
    path(
        "reset_password/",
        PasswordResetView.as_view(template_name="password_reset.html"),
        name="reset_password",
    ),
    path(
        "reset_password_sent/",
        PasswordResetDoneView.as_view(template_name="password_reset_sent.html"),
        name="password_reset_done",
    ),
    path(
        "reset/<uidb64>/<token>/",
        PasswordResetConfirmView.as_view(template_name="password_reset_form.html"),
        name="password_reset_confirm",
    ),
    path(
        "reset_password_complete/",
        PasswordResetCompleteView.as_view(template_name="password_reset_done.html"),
        name="password_reset_complete",
    ),

    # User registration endpoint
    path("register/", views.register),

    # Journal views endpoint
    path("journal/", views.JournalView.as_view()),
    path("journal/<pk>/", views.JournalView.as_view()),

    # Endpoint to get the user ID
    path("get_user_id/", views.get_user_id),
    
    # Endpoint to get cryptocurrency price
    path("get_crypto_price/", views.get_crypto_price),
]
