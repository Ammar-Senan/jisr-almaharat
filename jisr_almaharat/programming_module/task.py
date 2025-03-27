import frappe
from frappe.website.website_generator import WebsiteGenerator
from frappe.utils import getdate, now, get_datetime


def update_status():
    now_date = get_datetime(now())
    
    # ///////////////// change the Job status //////////////////////
    jobs = frappe.get_all("Job", fields=["name", "status", "application_deadline"])
    for job in jobs:
        if job.application_deadline and job.status:
            # Application Deadline
            deadline = get_datetime(job.application_deadline)
            if now_date >= deadline:
                # Application Deadline
                frappe.db.set_value("Job", job.name, "status", "Closed")
                frappe.msgprint(f"Job {job.name} status is now Closed.")
    
    # ///////////////// change the Training status //////////////////////
    trainings = frappe.get_all("Training", fields=["name", "training_status", "aplication_deadline"])
    for training in trainings:
        if training.application_deadline and training.training_status:
            # Application Deadline
            deadline = get_datetime(training.application_deadline)
            if now_date >= deadline:
                # Application Deadline
                frappe.db.set_value("Training", training.name, "training_status", "Close")
                frappe.msgprint(f"Training {training.name} is now Closed.")
    print("yes i is working");


# import frappe
# from frappe.website.website_generator import WebsiteGenerator
# from frappe.utils import getdate,get_datetime

# def update_status():
# 	# now_date = get_datetime(now())
# 	# # ///////////////// change the Job status //////////////////////
# 	# job = frappe.get_all("Job",fields=["name","status","application_deadline"])
# 	# if self.aplication_deadline and self.status:
# 	# 	#Aplication Deadline
# 	# 	deadline = getdate(self.aplication_deadline)
# 	# 	if now_date >= dealine:
# 	# 		#Aplication Dealine
# 	# 		frappe.db.set_value("Job", self.jop_title, "status", "Closed")
# 	# 		frappe.msgprint("Job status is now Closed.")
	
# 	# # ///////////////// change the Training status //////////////////////
# 	# training = frappe.get_all("Training",fields=["name","training_status","aplication_deadline"])
# 	# if self.aplication_deadline and self.training_status:
# 	# 	#Aplication Deadline
# 	# 	deadline = getdate(self.aplication_deadline)
# 	# 	if now_date >= dealine:
# 	# 		#Aplication Dealine
# 	# 		frappe.db.set_value("Job", self.training_title, "training_status", "Close")
# 	# 		frappe.msgprint("Training is now Closed.")
#     print("ammar this work")