import frappe # type: ignore
# @frappe.whitelist(allow_guest=True)
def get_context(context):
	try:	
		# this line to get Jobkind context from url
		context.Job_kind =frappe.form_dict.get("Jobkind")
		#context._kind =frappe.form_dict.get("trainingkind")
		if context.Job_kind in ['Job']:
				context.Job_kind
			# this line to get name context from url
				context.detail = frappe.get_doc("Job",frappe.form_dict.docname)
				return context

		elif context.Job_kind in ['Training']:
				context.Job_kind
				context.detail = frappe.get_doc("Training",frappe.form_dict.docname)
			
				return context
		else:
		# if the data in url not found or false go to page 404 
				frappe.local.flags.redirect_location ='/404'
				raise frappe.Redirect  

	except Exception as e:
				frappe.local.flags.redirect_location ='/404'
				raise frappe.Redirect  
			