import frappe # type: ignore
from frappe.model.document import Document # type: ignore
@frappe.whitelist(allow_guest=True)
def new_book(book_name, au_name):
    # return "in function"
    try:    
        book = frappe.new_doc("Books")
        book.book_name = book_name
        book.au_name = au_name
        book.insert()   
        frappe.db.commit()
        
        return {"success": True, "message": "Success to create book"}
    except Exception as e:
        frappe.log_error(frappe.get_traceback(), "Failed to create book")
        return {"success": False, "message": str(e)}
    

@frappe.whitelist()  # Allow this function to be accessed via API
def assign_role(email, user_type):
    """Assign a role to a user based on their selected user type"""
    
    if not frappe.db.exists("User", {"email": email}):
        frappe.throw(f"User {email} does not exist.")

    user_doc = frappe.get_doc("User", email)

    # Role mapping based on selected user type
    role_map = {
        "Regular User": "User Role",
        "Company": " "
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

   