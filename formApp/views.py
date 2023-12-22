import json
from django.http import JsonResponse
from django.shortcuts import render
from pymongo import MongoClient
from django.views.decorators.csrf import csrf_exempt
import uuid

connection_string = 'mongodb://localhost:27017'


def index(request):
    return render(request, 'index.html')


@csrf_exempt  # Use this decorator if CSRF protection is enabled
def save_data(request):
    if request.method == 'POST':
        try:
            # Assuming you are sending JSON data
            data = json.loads(request.body)
            
            unique_form_id = str(uuid.uuid4())
            data["form_id"] = unique_form_id
            client = MongoClient(connection_string)
            db = client.jotform
            collection = db.form

            # document = {'key': 'value'}
            collection.insert_one(data)
            result = collection.find({'key': 'value'})

            return JsonResponse({'success': True,
                                 'message': 'Data saved successfully'})

        except json.JSONDecodeError as e:
            return JsonResponse({'success': False,
                                'message': 'Invalid JSON data'})
    else:
        return JsonResponse({'success': False,
                            'message': 'Invalid request method'})


def form_template(request):
    client = MongoClient(connection_string)
    db = client.jotform
    collection = db.form
    cursor = collection.find()
    documents = list(cursor)

    return render(request, 'formtemplates.html', {"data": documents})


def your_redirect_view(request, form_id):
    client = MongoClient(connection_string)
    db = client.jotform
    collection = db.form
    result = collection.find_one({"form_id": form_id})

    return render(request, 'form.html', {"data": result})


@csrf_exempt  # Use this decorator if CSRF protection is enabled
def save_response(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            unique_form_id = str(uuid.uuid4())
            data["form_id"] = unique_form_id
            client = MongoClient(connection_string)
            db = client.jotform
            collection = db.Responses

            collection.insert_one(data)

            return JsonResponse({'success': True,
                                 'message': 'Data saved successfully'})

        except json.JSONDecodeError as e:
            return JsonResponse({'success': False,
                                'message': 'Invalid JSON data'})
    else:
        return JsonResponse({'success': False,
                            'message': 'Invalid request method'})
