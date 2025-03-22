import frappe # type: ignore
def get_context(context):
    context.Categories=frappe.get_all("Job",
    fields=["name","jop_title","aplication_deadline","organization_name","jop_type","job_categories","jop_location"])

    return context