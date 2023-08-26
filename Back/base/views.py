from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.contrib.auth.models import User
from .models import Journal
from rest_framework.views import APIView
from rest_framework import status
from .serializer import JournalSerializer
from django.contrib.auth.models import User
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
import requests
from django.http import JsonResponse
from decouple import config


@api_view(["POST"])
def register(request):
    """
    Register a new user.

    This view allows users to register with their email, username, and password.

    Parameters:
        request (Request): The HTTP request object.

    Returns:
        Response: The response object with the registration status and a success message.

    Raises:
        ValidationError: If the email address is invalid.
        Exception: If an error occurs during the registration process.
    """
    try:
        email = request.data["email"]
        username = request.data["username"]

        validate_email(email)  # Perform email validation

        # Check if the email already exists
        if User.objects.filter(email=email).exists():
            return Response(
                {
                    "message": "Email is already in use. Please choose a different email."
                },
                status=400,
            )

        # Check if the username already exists
        if User.objects.filter(username=username).exists():
            return Response(
                {
                    "message": "Username is already taken. Please choose a different username."
                },
                status=400,
            )

        # Create the new user
        user = User.objects.create_user(
            username=username, email=email, password=request.data["password"]
        )
        user.is_active = True
        user.is_staff = False
        user.save()

        return Response({"message": "Registration successful. You can now login."})
    except ValidationError:
        return Response({"message": "Invalid email address."}, status=400)
    except Exception as e:
        return Response(
            {"message": "An error occurred during registration.", "error": str(e)},
            status=500,
        )


class JournalView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk=None):
        user = request.user
        if pk is not None:
            if user.id != int(pk):
                return Response(
                    {"detail": "You are not authorized to access this resource."},
                    status=status.HTTP_403_FORBIDDEN,
                )
            my_model = Journal.objects.filter(user=user)
            serializer = JournalSerializer(my_model, many=True)
        else:
            my_model = Journal.objects.filter(user=user)
            serializer = JournalSerializer(my_model, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = JournalSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        my_model = Journal.objects.get(pk=pk)
        serializer = JournalSerializer(my_model, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        my_model = Journal.objects.get(pk=pk)
        my_model.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_user_id(request):
    """
    Get the user ID of the currently authenticated user.

    This view returns the user ID of the user making the request.

    Parameters:
        request (Request): The HTTP request object.

    Returns:
        Response: The response object with the user ID.
    """
    user_id = request.user.id
    return Response({"user_id": user_id})


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_crypto_price(request):
    """
    Get the price of a cryptocurrency.

    This view allows users to get the price of a specific cryptocurrency by providing its symbol.

    Parameters:
        request (Request): The HTTP request object.

    Returns:
        JsonResponse: The JSON response with the price of the cryptocurrency.

    Raises:
        requests.RequestException: If there's an error fetching cryptocurrency data.
    """
    if request.method == "GET":
        crypto_symbol = request.GET.get("crypto_symbol", "").strip().upper()
        if not crypto_symbol:
            return JsonResponse(
                {"error": "Please provide a valid cryptocurrency symbol."}, status=400
            )

        api_key = config("api_key_converter")
        url = f"https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol={crypto_symbol}&convert=USD"

        headers = {
            "X-CMC_PRO_API_KEY": api_key,
        }

        try:
            response = requests.get(url, headers=headers)
            data = response.json()
            if "data" in data and crypto_symbol in data["data"]:
                crypto_price = data["data"][crypto_symbol]["quote"]["USD"]["price"]
                return JsonResponse({"price": crypto_price})
            else:
                return JsonResponse({"error": "Cryptocurrency not found."}, status=404)
        except requests.RequestException:
            return JsonResponse(
                {
                    "error": "Failed to fetch cryptocurrency data. Please try again later."
                },
                status=500,
            )

    return JsonResponse({"error": "Invalid request method."}, status=400)
