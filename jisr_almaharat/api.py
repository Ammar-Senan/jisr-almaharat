import frappe # type: ignore

#  this function to be return all job to mobile app  via API
@frappe.whitelist(allow_guest=True)    
# def alljob():
#     # print=("\n\n\n\n\nfrappe.form_dict.docname\n\n\n")
#     Job_info=frappe.get_all("Job",fields=["name",
#     "jop_title","aplication_deadline","organization_name","jop_type","jop_description","image"])
    
#     print(f"\n\n\n\n\n\n{Job_info}\n\n\n\n\n")
#     return Job_info
def alljob():
    jobs = frappe.get_all("Job", fields=["name", "jop_title", "aplication_deadline", "organization_name", "jop_type", "jop_description", "image"])
    for job in jobs:
        job["image"] = frappe.utils.get_url(job["image"])
    # print(f"\n\n\n\n\n\n{job}\n\n\n\n\n")
    #   # تحويل المسار النسبي إلى رابط URL كامل
    return jobs


@frappe.whitelist()  # Allow this function to be accessed via API
def assign_role(email, user_type):
    """Assign a role to a user based on their selected user type"""
    
    if not frappe.db.exists("User", {"email": email}):
        frappe.throw(f"User {email} does not exist.")

    user_doc = frappe.get_doc("User", email)

    # Role mapping based on selected user type
    role_map = {
        "Regular User": "User Role",
        "Company": "Organization Role"
    }

    role_name = role_map.get(user_type)

    if not role_name:
        frappe.throw("Invalid user type.")

    existing_roles = {role.role for role in user_doc.roles}

    if role_name in existing_roles:
        return f"User {email} already has the role {role_name}."

    # Assign the role to the user
    user_doc.append("roles", {"role": role_name})
    user_doc.save(ignore_permissions=True)
    frappe.db.commit()

    # Log the role assignment instead of using print()
    frappe.log_error(f"Assigned role: {role_name} to user: {email}", "User Role Update")

    # Clear cache to ensure role updates take effect
    frappe.clear_cache(user=email)

    return f"Role  has been assigned based on user type : {user_type}."
    
# @frappe.whitelist()  
# def get_context(job_id=None):
#     try:
#         if not job_id:
#             job_id = frappe.form_dict.docname

#         job = frappe.get_doc("Job", job_id)
#         # print(f"\n\n\n\n\n\n{job.book_name}\n\n\n\n\n")
#         return {
#             "status": "success",
#             "data": {
#                 "jop_title": job.jop_title,  
#                 # "jop_title": job.jop_title,
                
#             }
#         }
#     except Exception as e:
#         return {
#             "status": "error",
#             "message": str(e)
#         }


    # get data from job to show in form applicnd
# @frappe.whitelist(allow_guest=True)    
# def get_context(job_id):
#     print=("\n\n\n\n\nfrappe.form_dict.docname\n\n\n")
#     job =  frappe.get_doc("Books",job_id)
#     # job  = frappe.get_doc("Books",frappe.form_dict.docname)
#     return {
#         'book_name': job.book_name, 
#         'au_name': job.book_name    
#     }


# @frappe.whitelist(allow_guest=True)  
# def get_context(context):
#     try:
#        context.applicand_detail = frappe.get_doc("Books",frappe.form_dict.docname)
#        print(f"\n\n\n\n\n\n{context.applicand_detail}\n\n\n\n\n")
#        print(f"\n\n\n\n\n\n{context.applicand_detail.book_name}\n\n\n\n\n")
#        print(f"\n\n\n\n\n\n{context.applicand_detail.au_name}\n\n\n\n\n")
#     except Exception as e:   
#        frappe.local.flags.redirect_location ='/404'
#        raise frappe.Redirect   
    
#     return {
#         'book_name': context.applicand_detail.book_name, 
#         'au_name': context.applicand_detail.au_name    
#     }

   