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

def get_context(context):
    context.Full_time=frappe.get_all("Job",
    fields=["name","jop_title","aplication_deadline","organization_name","jop_type","jop_location", "image", "status", "creation"])
    # context.Full_time=frappe.db.sql(""" SELECT jop_title FROM tabJob """ ),
    # for job in context.Full_time:
    #  print("\n\n\n",job['jop_title'],"\n\n\n\n")
    context.user_data = get_user_roles()  
    return context

 
