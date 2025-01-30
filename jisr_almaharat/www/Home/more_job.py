import frappe # type: ignore
def get_context(context):
    context.All_Job=frappe.get_all("Job",fields=["name","jop_title","aplication_deadline","organization_name","jop_type"])
    return context
 
