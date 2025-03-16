frappe.ready(function() { 

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
				frappe.web_form.set_value('organization_name', organization[0].organization_name);
				frappe.web_form.set_value('organization_email', organization[0].email);
				frappe.web_form.set_value('organization_site', organization[0].website);
				frappe.web_form.set_value('organization_location', organization[0].location);
			}

	}});

	frappe.web_form.set_value('posting_date', frappe.datetime.get_today());

	
 
});