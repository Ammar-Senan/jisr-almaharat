from frappe import _
from frappe.model.document import Document # type: ignore
from frappe.auth import LoginManager
from frappe.utils import get_url, now_datetime
import frappe # type: ignore

from frappe import whitelist
import frappe

# @frappe.whitelist(allow_guest=True)  # Require authentication
# def create_application(
#     organization_name,
#     organization_email,
#     kind,
#     job_name,
#     applicant_name,
#     email
# ):
#     try:
#         # Check permissions
#         if not frappe.has_permission("Application", "create"):
#             frappe.throw("Insufficient permissions", frappe.PermissionError)

#         # Create new document
#         doc = frappe.new_doc("Application")
#         doc.update({
#             "organization_name": organization_name,
#             "organization_email": organization_email,
#             "kind": kind,
#             "job_name": job_name,
#             "applicant_name": applicant_name,
#             "email": email
#         })
        
#         # Insert document
#         doc.insert(ignore_permissions=True)  # Enforce permissions
#         frappe.db.commit()  # Save to database

#         return {
#             "success": True,
#             "message": "Application created successfully",
#             "name": doc.name  # Return the created document ID
#         }

#     except Exception as e:
#         frappe.log_error(frappe.get_traceback(), "Application Creation Failed")
#         return {
#             "success": False,
#             "message": str(e)
#         }

@frappe.whitelist(allow_guest=True)    
def allApplication(email):
    jobs = frappe.get_all("Application", 
      filters={"email":email},               
      fields=['name', 'kind', 'job_name', 'email', 'training_name', 'applicant_name', 'workflow_state'], )             
    return  jobs


@whitelist(allow_guest=True)
def new_apply(organization_name, organization_email, kind, job_name, applicant_name, email,phone):
    try:    
        apply = frappe.new_doc("Application")
        apply.organization_name = organization_name
        apply.organization_email = organization_email
        apply.kind = kind
        apply.job_name = job_name
        apply.applicant_name = applicant_name
        apply.email = email
        apply.phone = phone
       
        apply.insert(ignore_permissions=True)   
        frappe.db.commit()
        
        return True
    except Exception as e:
        return False






@frappe.whitelist( allow_guest=True )
def login(usr, pwd):
    try:
        login_manager = frappe.auth.LoginManager()
        login_manager.authenticate(user=usr, pwd=pwd)
        login_manager.post_login()
    except frappe.exceptions.AuthenticationError:
        frappe.clear_messages()
        frappe.local.response["message"] = {
            "success_key":0,
            "message":"Authentication Error!"
        }

        return

    api_generate = generate_keys(frappe.session.user)
    user = frappe.get_doc('User', frappe.session.user)

    frappe.response["message"] = {
        "success_key":1,
        "message":"Authentication success",
        "sid":frappe.session.sid,
        "api_key":user.api_key,
        "api_secret":api_generate,
        "username":user.username,
        "Full_Name":user.full_name,
        "email":user.email,
        "roles": [r.role for r in user.roles],
    }

def generate_keys(user):
    user_details = frappe.get_doc('User', user)
    api_secret = frappe.generate_hash(length=15)

    if not user_details.api_key:
        api_key = frappe.generate_hash(length=15)
        user_details.api_key = api_key

    user_details.api_secret = api_secret
    user_details.save()

    return api_secret




@frappe.whitelist(allow_guest=True)    
def alljob():
    jobs = frappe.get_all("Job", 
            fields=["name", "jop_title", "aplication_deadline", 
                "organization_name", "organization_email","jop_type","jop_description", "image"])  # Include image field
            
        # Convert relative image paths to full URLs
    for job in jobs:
            if job.get("image"):
                job["image"] = frappe.utils.get_url(job["image"])
                
    return  jobs



@frappe.whitelist(allow_guest=True)
def getTrainingInfo():
 
    Training = frappe.get_all("Training", 
           fields=["name", "training_title", "aplication_deadline", "organization_name",
                "training_pattren", "about_training", "training_post_date",
                 "training_status", "creation","image"])
    #  # Include image field
            
        # Convert relative image paths to full URLs
    for Trainin in Training:
            if Trainin.get("image"):
                Trainin["image"] = frappe.utils.get_url(Trainin["image"])
                
    return  Training


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
    # user_doc.enabled = 1
    frappe.db.commit()

    # Log the role assignment instead of using print()
    frappe.log_error(f"Assigned role: {role_name} to user: {email}", "User Role Update")

    # Clear cache to ensure role updates take effect
    frappe.clear_cache(user=email)

    return f"Role  has been assigned based on user type : {user_type}."
    