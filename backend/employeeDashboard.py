from flask_restful import Resource
from config import mongo
from flask import jsonify
from bson import ObjectId

class EmployeeDashboard(Resource):
    def get(self, emp_id):
        try:
            # Check if the employee exists in the database
            employee_exists = mongo.db.Employee.find_one({"_id": ObjectId(emp_id)})

            if not employee_exists:
                return jsonify({"message": "Employee not found"})

            # Retrieve employee's daily data from the database
            employee_data = mongo.db.AttendanceRecords.find({"empId": ObjectId(emp_id)}).sort("dateTimeIn", 1)

            # Format the data with serial numbers
            formatted_data = []
            for index, entry in enumerate(employee_data, start=1):
                formatted_entry = {
                    "sNo": index,
                    "date": entry["dateTimeIn"].strftime("%d-%m-%Y"),
                    "time": entry["dateTimeIn"].strftime("%H:%M"),
                    "status": entry["status"].capitalize(),
                    "salaryded": "-"
                }
                formatted_data.append(formatted_entry)

            if formatted_data:
                return jsonify({"result": formatted_data})
            else:
                return jsonify({"message": "No attendance records for the employee"})

        except Exception as e:
            return jsonify({"message": f"Internal Server error: {str(e)}"})




# from flask_restful import Resource
# from config import mongo
# from flask import jsonify, request, json
# from bson import json_util, ObjectId

# class EmployeeDashboard(Resource):
#     def get(self, emp_id):
#         try:
#             # Check if the employee exists in the database
#             employee_exists = mongo.db.Employee.find_one({"_id": ObjectId(emp_id)})

#             if not employee_exists:
#                 return jsonify({"message": "Employee not found"})

#             # Retrieve employee's daily data from the database
#             employee_data = mongo.db.AttendanceRecords.find({"empId": ObjectId(emp_id)})

#             # Format the data as per your specified format
#             formatted_data = []
#             for entry in employee_data:
#                 formatted_entry = {
#                     "id": str(entry["_id"]),
#                     "date": entry["dateTimeIn"].strftime("%d-%m-%Y"),
#                     "time": entry["dateTimeIn"].strftime("%H:%M"),
#                     "status": entry["status"].capitalize()
#                 }
#                 formatted_data.append(formatted_entry)

#             if formatted_data:
#                 return jsonify({"result": formatted_data})
#             else:
#                 return jsonify({"message": "No attendance records for the employee"})

#         except Exception as e:
#             return jsonify({"message": f"Internal Server error: {str(e)}"})



# from flask_restful import Resource
# from config import mongo
# from flask import jsonify, request, json
# from bson import json_util

# class EmployeeDashboard(Resource):
#     def get(self, emp_id):
#         try:
#             # Retrieve employee's daily data from the database
#             employee_data = mongo.db.AttendanceRecords.find({"empId": emp_id})

#             # Format the data as per your specified format
#             formatted_data = []
#             for entry in employee_data:
#                 formatted_entry = {
#                     "id": str(entry["_id"]),
#                     "date": entry["dateTimeIn"].strftime("%d-%m-%Y"),
#                     "time": entry["dateTimeIn"].strftime("%H:%M"),
#                     "status": entry["status"].capitalize()
#                 }
#                 formatted_data.append(formatted_entry)

#             if formatted_data:
#                 return jsonify({"result": formatted_data})
#             else:
#                 return jsonify({"message": "Employee not found or no attendance records"})

#         except Exception as e:
#             return jsonify({"message": f"Internal Server error: {str(e)}"})



# from flask_restful import Resource, abort
# from config import mongo
# from datetime import datetime
# from flask import jsonify

# class EmployeeDashboard(Resource):
#     def get(self, emp_id):
#         # Retrieve employee's daily data from the database
#         employee_data = list(mongo.db.AttendanceRecords.find({"empId": emp_id}))

#         # Check if the list is empty
#         if not employee_data:
#             abort(404, message="Employee not found or no attendance records")

#             # Format the data as per your specified format
#         formatted_data = []
#         for entry in employee_data:
#             formatted_entry = {
#                 "id": str(entry["_id"]),
#                 "date": datetime.strftime(entry["dateTimeIn"], "%d-%m-%Y"),
#                 "time": datetime.strftime(entry["dateTimeIn"], "%H:%M"),
#                 "status": entry["status"].capitalize()
#             }
#             formatted_data.append(formatted_entry)

#         return jsonify(formatted_data), 200




# from flask_restful import Resource
# from config import mongo
# from datetime import datetime
# from flask import abort

# class EmployeeDashboard(Resource):
#     def get(self, emp_id):
#         try:
#             # Retrieve employee's daily data from the database
#             employee_data = mongo.db.AttendanceRecords.find({"empId": emp_id})

#             # Check if employee data is found
#             if not employee_data:
#                 abort(404, message=f"No attendance records found for employee with ID {emp_id}")

#             # Format the data as per your specified format
#             formatted_data = []
#             for entry in employee_data:
#                 formatted_entry = {
#                     "id": str(entry["_id"]),
#                     "date": datetime.strftime(entry["dateTimeIn"], "%d-%m-%Y"),
#                     "time": datetime.strftime(entry["dateTimeIn"], "%H:%M"),
#                     "status": entry["status"].capitalize()
#                     #"salaryded": entry.get("salaryPolicy", "-")
#                 }
#                 formatted_data.append(formatted_entry)

#             return formatted_data, 200

#         except Exception as e:
#             # Handle other exceptions
#             abort(500, message=f"An error occurred: {str(e)}")





# from flask_restful import Resource
# from config import mongo
# from datetime import datetime

# class EmployeeDashboard(Resource):
#     def get(self, emp_id):
#         # Retrieve employee's daily data from the database
#         employee_data = mongo.db.AttendanceRecords.find({"empId": emp_id})

#         # Format the data as per your specified format
#         formatted_data = []
#         for entry in employee_data:
#             formatted_entry = {
#                 "id": str(entry["_id"]),
#                 "date": datetime.strftime(entry["dateTimeIn"], "%d-%m-%Y"),
#                 "time": datetime.strftime(entry["dateTimeIn"], "%H:%M"),
#                 "status": entry["status"].capitalize()
#                 #"salaryded": entry.get("salaryPolicy", "-")
#             }
#             formatted_data.append(formatted_entry)

#         return formatted_data, 200