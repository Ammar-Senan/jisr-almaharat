frappe.ready(function() {
	// bind events here
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

	frappe.web_form.set_value('training_post_date', frappe.datetime.get_today());

	frappe.web_form.on("aplication_deadline", (field, value) => {
		let today = frappe.datetime.get_today(); // Get today's date in YYYY-MM-DD format
	
		if (value && value < today) {
			// Delay message to prevent multiple pop-ups
			setTimeout(() => {
				frappe.msgprint("The application deadline cannot be in the past.");
			}, 200); 
	
			frappe.web_form.set_value("aplication_deadline", ""); // Reset the field
		}
	});

	//discard btn
	$(".discard-btn").off("click").on("click", function (event) {
        event.preventDefault(); // Prevent default discard behavior

        //frappe.web_form.reset(); // Reset the form fields
        window.location.href = "/app/organization-dashboa"; // Redirect to the admin dashboard
    });	

	//Save btn


// ////////////////// The Form Style ////////////////////////
	// by element
	document.querySelector("body").style.backgroundColor = "#E6F0FF";
	// by class
	document.querySelector(".web-form-header").style.backgroundColor = "#F8FAFC";
	document.querySelector(".web-form").style.backgroundColor = "#F8FAFC";

	// document.querySelector(".flex ").style.backgroundColor = "orange";
	document.querySelector(".submit-btn").style.backgroundColor = "#000080";
	document.querySelector(".web-footer").style.display = "none";
  document.querySelector(".navbar").style.display = "none";

})