import frappe
from frappe.website.website_generator import WebsiteGenerator
from frappe.utils import getdate,get_datetime,now


def update_status():
    now_date = get_datetime(now())
    # change the format now_date to be YYYY-MM-DD
    now_date = now_date.strftime('%Y-%m-%d')

	# ///////////////// change the Job status //////////////////////
    jobs = frappe.get_all("Job", fields=["name", "status","aplication_deadline"]) or []
    for job in jobs:
        if job.get("name") and job.get("status"):
            if job.get("aplication_deadline").strftime('%Y-%m-%d') <= now_date and job.get("status") == "Available":
                job_doc = frappe.get_doc("Job", job["name"])
                job_doc.status = "Closed"
                job_doc.save(ignore_permissions=True)
                frappe.db.commit()
        else:
            print("Invalid job data ")


    # ///////////////// change the Training status //////////////////////
    trainings = frappe.get_all("Training", fields=["name", "training_status", "aplication_deadline"]) or []    
    for training in trainings:
        if training.get("name") and training.get("training_status"):
           if training.get("aplication_deadline").strftime('%Y-%m-%d') <= now_date and training.get("training_status") == "Available":
                training_doc = frappe.get_doc("Training", training["name"])
                training_doc.training_status = "Close"
                training_doc.save(ignore_permissions=True)
                frappe.db.commit()
        else:
            print("Invalid training data ")
    print("The Status updated successfully!")