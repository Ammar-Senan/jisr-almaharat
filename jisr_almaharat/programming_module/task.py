import frappe
from frappe.website.website_generator import WebsiteGenerator
from frappe.utils import getdate,get_datetime

def update_status():
 	job = frappe.get_all("Job", fields=["name", "status", "aplication_deadline"])
	now_date = get_datetime(now())
	if self.aplication_deadline and self.status:
		#  Aplication Deadline
		deadline = getdate(self.aplication_deadline)
		if now_date >= deadline:
			# Aplication Deadline
			frappe.db.set_value("Job", self.jop_title, "status", "Closed")
			frappe.msgprint("Job status is now Closed.")


