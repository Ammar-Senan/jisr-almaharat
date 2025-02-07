import frappe

@frappe.whitelist():
def get_total_job():
    total = frappe.db.sql(""" select count(idx) as total from tabJob""",as_dict=True)[0].total
    return total