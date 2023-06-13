from django.http import HttpResponse
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from numpy import *   


# Ich benutze diese Array anstatt ein DB, macht es einfacher für Pruf von Koncept, und war nicht in meine Aufgabe
classDataArray = []
# Einfacher als suchen Array von oben.... 
classIdsArray = []

# todo entfernen allow all.... 
allowAll = {"Access-Control-Allow-Origin": '*'} # nur für prototyp.... 

@csrf_exempt
def createClass(request):
  if request.method == 'POST':
    data = json.loads(request.body.decode())
    finaldata = data['data']
    # einfach prufen von gultige Daten:
    if (
        len(finaldata['courseName']) == 0 or   
        len(finaldata['startTime']) == 0  or
        len(finaldata['endTime']) == 0 or
        len(finaldata['date']) == 0
        ):
      return HttpResponse(status=406, headers=allowAll)
    
    classToSave = {
        'courseId': finaldata['id'],
        'courseName': finaldata['courseName'],
        'startTime': finaldata['startTime'],
        'endTime': finaldata['endTime'],
        'date' : finaldata['date']
    }
    print("finaldata test ", classToSave)
    classDataArray.append(classToSave)
    classIdsArray.append(finaldata['id'])
    print('here is the classDataArray', classDataArray)
    return HttpResponse(status=201, headers=allowAll)
  else:
    return HttpResponse(status=400, headers=allowAll)
  
@csrf_exempt     
def modifyClass(request):
  print("entered modify class here is current array", classDataArray )
  if request.method == 'PUT':
    data = json.loads(request.body.decode())
    finaldata = data['data']
    classToModify = {
      'courseId': finaldata['id'],
      'courseName': finaldata['courseName'],
      'startTime': finaldata['startTime'],
      'endTime': finaldata['endTime'],
      'date' : finaldata['date']
    }
    print("finaldata test modify", classToModify)
    print("before the search", classDataArray)
    classindex = next((index for (index, d) in enumerate(classDataArray) if d["courseId"] ==finaldata['id'] ), None)
    print("index is ", classindex)
    classDataArray.pop(classindex)
    classDataArray.append(classToModify)
    print("here is the array after empty", classDataArray)
    
    # for i in range(1, len(tempArray)):
    #   classDataArray.append(i)
    #classDataArray.append(classToModify)

    print('here is the classDataArray after mod', classDataArray)
    return HttpResponse(status=201, headers=allowAll)
  else:
    return HttpResponse(status=400, headers=allowAll)

@csrf_exempt
def sendIds(request):
  if request.method == 'GET':
    response_data = {"data": classDataArray}
    return JsonResponse(response_data, status=201)

