// Copyright (c) 2024, admin and contributors
// For license information, please see license.txt

frappe.ui.form.on("Training", {
	refresh(frm) {

                // to get the organization information from docType Organization by session
                let userEmail = frappe.session.user;
                frappe.call({
                    method: 'frappe.client.get_list',
                    args: {
                      doctype: 'Organization',
                      fields: ['name', 'organization_name', 'email', 'website', 'location'], 
                      filters: {
                        email: userEmail
                      }
                    },
                    callback: function (response) {
                      const organization = response.message || [];
                        if (organization.length > 0) {
                            frm.set_value('organization_name', organization[0].organization_name);
                            frm.set_value('organization_email', organization[0].email);
                            frm.set_value('organization_site', organization[0].website);
                            frm.set_value('organization_location', organization[0].location);
                        }
        
                }});
                
                  
                // to set the posting date to be the current date
                frm.set_value('training_post_date', frappe.datetime.get_today());
},
});
