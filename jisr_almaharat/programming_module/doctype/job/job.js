// Copyright (c) 2024, admin and contributors
// For license information, please see license.txt

frappe.ui.form.on("Job", {
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
        frm.set_value('posting_date', frappe.datetime.get_today());

        // to change the status value to be Closed if the application deadline is passed
        let toDay = frappe.datetime.get_today();
        let deadline = frm.doc.aplication_deadline;
        let create = frm.doc.creation;

        if(create){
            if (toDay >= deadline) {
                frm.set_value('status', 'Closed');
                frappe.msgprint('This job is closed');
                frm.save();                
            }
        }
	},
});
