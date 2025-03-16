# Copyright (c) 2024, admin and contributors
# For license information, please see license.txt

import frappe
from frappe.website.website_generator import WebsiteGenerator
from frappe.utils import getdate

class Job(WebsiteGenerator):
	def on_update(self):
		# التحقق من وجود الحقول المطلوبة
		if self.aplication_deadline and self.status:

			# الحصول على تاريخ اليوم
			today = getdate()

			# الحصول على تاريخ Aplication Deadline
			deadline = getdate(self.aplication_deadline)
			
			# مقارنة التواريخ
			if today == deadline:
				# إذا كان تاريخ اليوم يساوي Aplication Deadline
				frappe.db.set_value("Job", self.jop_title, "status", "Closed")
				frappe.msgprint("Job status is now Closed.")


		
		
