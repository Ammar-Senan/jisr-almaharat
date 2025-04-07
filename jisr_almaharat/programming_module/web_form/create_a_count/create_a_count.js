frappe.ready(function() {
	
	let userEmail = frappe.session.user;
	frappe.call({
		method: 'frappe.client.get_list',
		args: {
		doctype: 'User',
		fields: ['name', 'email', 'full_name'], 
		filters: {
			email: userEmail
		}
	},
		callback: function (response) {
		  const user = response.message || [];
			if (user.length > 0) {
				frappe.web_form.set_value('name1', user[0].full_name);
                frappe.web_form.set_value('email', user[0].email);
			}

	}});

	//discard btn
	$(".discard-btn").off("click").on("click", function (event) {
        event.preventDefault(); // Prevent default discard behavior

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
  document.querySelector(".navbar").style.display = "none";
})