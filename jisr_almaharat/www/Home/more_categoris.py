import frappe # type: ignore
# ////////////////////////// code to get the session role 
def get_user_roles():
    """Fetch current user's roles"""
    user = frappe.session.user  # Get the currently logged-in user
    user_doc = frappe.get_doc("User", user)  # Fetch the user document
    roles = [role.role for role in user_doc.roles]  # Extract roles

    # Log the output (for debugging)
    frappe.logger().info(f"User: {user}, Roles: {roles}")

    return {"user": user, "roles": roles}

# def get_context(context):
#     context.Jcategories=frappe.get_all("Job",
#     fields=["name","jop_title","aplication_deadline","organization_name","jop_type","jop_location", "job_categories", "image", "status", "creation"])
    
#     context.Tcategories=frappe.get_all("Training",
#     fields=["name","training_title","about_training","aplication_deadline","training_post_date","organization_name","training_pattren", "training_categories","location", "image", "training_status", "creation"])
#     context.user_data = get_user_roles()  
#     return context

def get_context(context):
    # try:
    context.detail = frappe.get_doc("Job",frappe.form_dict.docname) 
    print(f"\n\n\n\n\n\n{context.docname}\n\n\n\n\n")
    # except Exception as e:   
    #    frappe.local.flags.redirect_location ='/404'
    #    raise frappe.Redirect  

     # Add user roles to context
    context.user_data = get_user_roles()      
    return context
