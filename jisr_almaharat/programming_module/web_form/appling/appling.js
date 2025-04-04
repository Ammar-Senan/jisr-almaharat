frappe.ready(function() {
	// bind events here
	frappe.web_form.set_value("kind", "{{Job_kind}}");

	if ("{{Job_kind}}" == "Training") {
		frappe.web_form.set_value("training_name", "{{detail.jop_title }}");

		// get org info
		let training =  "{{detail.jop_title }}";
		frappe.call({
			method: 'frappe.client.get_list',
			args: {
				doctype: 'Training',
				fields: ['name', 'organization_name', 'organization_email', 'training_title'], 
				filters: {
					training_title: training
				}
			},
			callback: function (response) {
				const training = response.message || [];
				if (training.length > 0) {
					frappe.web_form.set_value('organization_name', training[0].organization_name);
					frappe.web_form.set_value('organization_email', training[0].organization_email);
					
				}

		}});
	}else if ("{{Job_kind}}" == "Job") {
		frappe.web_form.set_value("job_name", "{{detail.jop_title }}");

		// get org info
		let job =  "{{detail.jop_title }}";
		frappe.call({
			method: 'frappe.client.get_list',
			args: {
				doctype: 'Job',
				fields: ['name', 'organization_name', 'organization_email', 'jop_title'], 
				filters: {
				jop_title: job
				}
			},
			callback: function (response) {
				const job = response.message || [];
				if (job.length > 0) {
					frappe.web_form.set_value('organization_name', job[0].organization_name);
					frappe.web_form.set_value('organization_email', job[0].organization_email);
					
				}

		}});
	};
	
	//make job_name unhidden if kind is job and make training_name unhidden if kind is training in frappe web form
	frappe.web_form.on('kind', (field, value) => {
		if (value == "Training") {
			frappe.web_form.set_df_property('job_name', 'hidden', 1);
			frappe.web_form.set_df_property('training_name', 'hidden', 0);
		}else if(value == "Job") {
			frappe.web_form.set_df_property('job_name', 'hidden', 0);
			frappe.web_form.set_df_property('training_name', 'hidden', 1);
		};
		
	});

	// to take applicant info from session
	let userEmail = frappe.session.user;
	frappe.call({
		method: 'frappe.client.get_list',
		args: {
			doctype: 'User1',
			fields: ['name', 'name1', 'email', 'phone_number', 'address'], 
			filters: {
			email: userEmail
			}
		},
		callback: function (response) {
			const user = response.message || [];
			if (user.length > 0) {
				frappe.web_form.set_value('applicant_name', user[0].name1);
				frappe.web_form.set_value('phone', user[0].phone_number);
				frappe.web_form.set_value('email', user[0].email);
				frappe.web_form.set_value('address',user[0].address);
				
			}

	}});

	//discard btn
	$(".discard-btn").off("click").on("click", function (event) {
        event.preventDefault(); // Prevent default discard behavior

        //frappe.web_form.reset(); // Reset the form fields
        window.location.href = "/Home/index"; // Redirect to the admin dashboard
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

	

})