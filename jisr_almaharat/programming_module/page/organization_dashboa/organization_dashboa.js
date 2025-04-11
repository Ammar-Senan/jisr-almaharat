////////////////// Initialization the Page /////////////////////////////
frappe.pages['organization-dashboa'].on_page_load = function (wrapper) {
    let page = frappe.ui.make_app_page({
        parent: wrapper,
        title: 'Organization Dashboard',
        single_column: true
    });
////////////////// End Initialization the Page /////////////////////////////

///////////////// Create a user interface //////////////////////////////////
    let counter = 0;
    let n = 0 ;
    let $main = $(page.main);

    $main.html(`
        <div class="dashboard-container" style="display: flex; height: 100vh;">
            <aside style="width: 260px; background-color:#004080; color: white; padding: 20px;  border-radius: 15px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
                <nav>
                    <ul style="list-style: none; padding: 0;">
                        <li><a href="#" class="menu-item" id="jobs-btn">Jobs</a></li>
                        <li><a href="#" class="menu-item" id="trainings-btn">Trainings</a></li>
                        <li><a href="#" class="menu-item" id="applications-btn">Applications</a></li>
                        <li><a href="#" class="menu-item" id="notification-btn">Notifcation</a></li>
                        <li><a href="/Home/index" class="menu-item" id="home-btn">Home</a></li>
                    </ul>
                </nav>
            </aside>

            <main style="flex-grow: 1; padding: 25px; background-color: #f9f9f9; border-radius: 15px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
                <div id="content-section">
                    <div id="organization-profile" style="display: flex; gap: 20px; margin-top: 20px;" ></div>
                </div>
            </main>
        </div>
    `);
/////////////////  End the create a user interface //////////////////////////////////

    // Menu item styles
    $('.menu-item').css({
        "color": "white", "font-weight": "bold",
        "text-decoration": "none",
        "display": "block",
        "padding": "10px",
        "border-radius": "5px",
        "margin": "5px 0"
    }).hover(function () {
        $(this).css({ "background-color": "#003366", "border-radius": "8px" });
    }, function () {
        $(this).css({ "background-color": "transparent" });
    });
    if(counter == 0){
        $('#notification-btn').css({ 
            "background-color": "red", 
            "border-radius": "8px" });
    }
    // $('.navbar').css({
    //     "display": "none"
    // })
      

    // Load organization profile
    const loadoOrganizationProfile = () => {
        $('#organization-profile').html('');
        
        let userEmail = frappe.session.user_email;
        frappe.call({
            method: 'frappe.client.get_list',
            args: {
                doctype: 'Organization',
                fields: ['name', 'organization_name', 'registration_date', 'logo', 'email', 'website', 'about_organization', 'location'],
                filters: {
                    email: userEmail
                  }
            },
            callback: function (response) {
                let org = response.message[0] || {};

                $('#content-section').append(`
                    <div class="profile-card" style="background: white; padding: 20px; border-radius: 15px;">
                        <h1>Welcome ${org.organization_name || 'Organization Name'}</h1>
                        <p><strong>Registered:</strong> ${org.registration_date || 'N/A'}</p>
                        <p><strong>Email:</strong> ${org.email || 'N/A'}</p>
                        <p><strong>Website:</strong> <a href="${org.website}" target="_blank">${org.website || 'N/A'}</a></p>
                        <p><strong>Location:</strong> ${org.location || 'N/A'}</p>
                        <p><strong>About:</strong> ${org.about_organization || 'N/A'}</p>
                        <button id="edit-profile-btn" class="btn btn-primary" style="background-color:#004080">Edit Profile</button>
                    </div>
                `);

                // Handle profile editing
                $('#edit-profile-btn').click(function () {
                    frappe.set_route('Form', 'Organization', org.name);
                });
            }
        });
    }

    // Load jobs section
    $('#jobs-btn').click(function () {
        $('#content-section').html('<h3>Loading Jobs...</h3>');

        frappe.call({
            method: 'frappe.client.get_list',
            args: {
                doctype: 'Job',
                fields: ['name', 'jop_title', 'posting_date', 'jop_description', 'creation']
            },
            callback: function (response) {
                let jobs = response.message || [];
                $('#content-section').html(`
                    <div>
                        <h3>Jobs Posted</h3>
                        <button class="btn btn-primary" id="add-job-btn">Add New Job</button>
                        <ul id="job-list" class="list-group mt-3"></ul>
                    </div>
                `);

                if (jobs.length === 0) {
                    $('#job-list').append('<li class="list-group-item text-muted">No jobs posted yet.</li>');
                } else {
                    // to sort jobs by creation date in descending order
                    jobs.sort((a, b) => new Date(b.creation) - new Date(a.creation));
                
                    jobs.forEach(job => {
                        $('#job-list').append(`
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    <strong>${job.jop_title}</strong>
                                    <small class="text-muted">(Posted on: ${job.posting_date})</small>
                                    <p>${job.jop_description || 'No description available.'}</p>
                                </div>
                                <div>
                                    <button class="btn btn-sm btn-warning edit-job" data-name="${job.name}">Edit</button>
                                    <button class="btn btn-sm btn-danger delete-job" data-name="${job.name}">Delete</button>
                                </div>
                            </li>
                        `);
                    });
                }

                // Handle add, edit, and delete actions
                $('#add-job-btn').click(function () {
                    //frappe.new_doc('Job');
                    window.location.href = '/add-job';
                });

                $('.edit-job').click(function () {
                    let job_name = $(this).data('name');
                    frappe.set_route('Form', 'Job', job_name);
                });

                $('.delete-job').click(function () {
                    let job_name = $(this).data('name');
                    frappe.call({
                        method: 'frappe.client.delete',
                        args: { doctype: 'Job', name: job_name },
                        callback: function () {
                            frappe.msgprint('Job deleted successfully.');
                            $('#jobs-btn').trigger('click');
                        }
                    });
                });
            }
        });
    });

    // Load trainings section
    $('#trainings-btn').click(function () {
        $('#content-section').html('<h3>Loading Trainings...</h3>');

        frappe.call({
            method: 'frappe.client.get_list',
            args: {
                doctype: 'Training',
                fields: ['name', 'training_title', 'training_post_date', 'creation']
            },
            callback: function (response) {
                let trainings = response.message || [];
                $('#content-section').html(`
                    <div>
                        <h3>Trainings Posted</h3>
                        <button class="btn btn-primary" id="add-training-btn">Add New Training</button>
                        <ul id="training-list" class="list-group mt-3"></ul>
                    </div>
                `);

                if (trainings.length === 0) {
                    $('#training-list').append('<li class="list-group-item text-muted">No trainings posted yet.</li>');
                } else {
                    // Sort the trainings by posting date in descending order
                    trainings.sort((a, b) => new Date(b.creation) - new Date(a.creation));
                    trainings.forEach(training => {
                        $('#training-list').append(`
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    <strong>${training.training_title}</strong>
                                    <small class="text-muted">(Posted on: ${training.training_post_date})</small>
                                    <p>${training.about_training || 'No description available.'}</p>
                                </div>
                                <div>
                                    <button class="btn btn-sm btn-warning edit-training" data-name="${training.name}">Edit</button>
                                    <button class="btn btn-sm btn-danger delete-training" data-name="${training.name}">Delete</button>
                                </div>
                            </li>
                        `);
                    });
                }

                $('#add-training-btn').click(function () {
                    // frappe.new_doc('Training');
                    window.location.href = '/add-training';
                });

                $('.edit-training').click(function () {
                    let training_name = $(this).data('name');
                    frappe.set_route('Form', 'Training', training_name);
                });

                $('.delete-training').click(function () {
                    let training_name = $(this).data('name');
                    frappe.call({
                        method: 'frappe.client.delete',
                        args: { doctype: 'Training', name: training_name },
                        callback: function () {
                            frappe.msgprint('Training deleted successfully.');
                            $('#trainings-btn').trigger('click');
                        }
                    });
                });
            }
        });
    });

  // Load applications section
  function loadApplications() {
    $('#content-section').html('<h3>Loading Opportunities...</h3>');

    // Fetch Jobs
    frappe.call({
        method: 'frappe.client.get_list',
        args: {
            doctype: 'Job',
            fields: ['name', 'jop_title', 'posting_date', 'jop_description', 'creation'],
            limit_page_length: 50
        },
        callback: function (jobRes) {
            let jobs = jobRes.message || [];

            // Fetch Trainings
            frappe.call({
                method: 'frappe.client.get_list',
                args: {
                    doctype: 'Training',
                    fields: ['name', 'training_title', 'training_post_date', 'creation'],
                    limit_page_length: 50
                },
                callback: function (trainingRes) {
                    let trainings = trainingRes.message || [];

                    $('#content-section').html(`
                        <div style="background-color: white; padding: 20px; border-radius: 15px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
                            <h3 style="color: #2c3e50;">Available Opportunities</h3>
                            <div style="display: flex; flex-wrap: wrap; gap: 20px; margin-top: 20px;" id="opportunity-cards"></div>
                        </div>
                    `);

                    // Render Jobs
                    // sort by creation date
                    jobs.sort((a, b) => new Date(b.creation) - new Date(a.creation));
                    jobs.forEach(job => {
                        frappe.call({
                            method: 'frappe.client.get_count',
                            args: {
                                doctype: 'Application',
                                fields: ['name', 'kind', 'job_name'],
                                filters: {
                                    kind: 'Job',
                                    job_name: job.jop_title
                                }
                            },
                            callback: function (r) {
                                let count = r.message || 0;

                                $('#opportunity-cards').append(`
                                    <div id="jobCard" data-title="${job.jop_title}" data-kind="Job" style="flex: 1 1 300px; background-color: #ecf0f1; border-radius: 12px; padding: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);  cursor: pointer;">
                                        <small style="color: #7f8c8d; font-weight: bold">Job</small><br>
                                        <h4 style="margin-bottom: 10px; color:rgb(23, 120, 185); font-weight: bold">${job.jop_title}</h4>
                                        <p style="margin: 0; color: #7f8c8d;"><strong>Post date:</strong> ${job.posting_date || 'N/A'}</p>
                                        <p style="margin-top: 10px; color: #7f8c8d;"><strong>Number of applicants:</strong> ${count}</p>
                                    </div>
                                `);
                            }
                        });
                    });

                    // Render Trainings
                    // sort by creation date
                    trainings.sort((a, b) => new Date(b.creation) - new Date(a.creation));
                    trainings.forEach(training => {
                        frappe.call({
                            method: 'frappe.client.get_count',
                            args: {
                                doctype: 'Application',
                                fields: ['name', 'kind', 'training_name'],
                                filters: {
                                    kind: 'Training',
                                    training_name: training.training_title
                                }
                            },
                            callback: function (r) {
                                let count = r.message || 0;

                                $('#opportunity-cards').append(`
                                    <div id="jobCard" data-title="${training.training_title}" data-kind="Training" style="flex: 1 1 300px; background-color:rgb(199, 240, 226); border-radius: 12px; padding: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); cursor: pointer;">
                                        <small style="color: #7f8c8d; font-weight: bold">Training</small><br>
                                        <h4 style="margin-bottom: 10px; color:rgb(23, 120, 185); font-weight: bold">${training.training_title}</h4>
                                        <p style="margin: 0; color: #7f8c8d;"><strong>Post date:</strong> ${training.training_post_date || 'N/A'}</p>
                                        <p style="margin-top: 10px; color: #7f8c8d;"><strong>Number of applicants:</strong> ${count}</p>
                                    </div>
                                `);
                            }
                        });
                    });
                }
            });
        }
    });
}

// call the fun on click on id 
$('#applications-btn').click(loadApplications);
$('#applicationCard').click(loadApplications);

//////////////////////////////////  filterApplication   /////////////////////////////////

$('#content-section').on('click', '#jobCard', function () {
    const jobTitle = $(this).data('title');
    const jobKind = $(this).data('kind');
    filterApplication(jobTitle, jobKind);
});

function filterApplication(title, jobkind) {
    $('#content-section').html('<h3>Loading Application...</h3>');
  
    frappe.call({
      method: 'frappe.client.get_list',
      args: {
        doctype: 'Application',
        fields: ['name', 'applicant_name', 'kind', 'organization_name', 'job_name', 'training_name', 'address', 'degree', 'major_of_study', 'creation'],
        filters: {
          organization_name: frappe.session.user_fullname,
        }
      },
      callback: function (response) {
        const allApplications = response.message || [];
  
        // Filter based on jobkind and title
        const filteredApplications = allApplications
          .filter(app => {
            if (jobkind === "Job") {
              return app.job_name === title;
            } else if (jobkind === "Training") {
              return app.training_name === title;
            }
            return false;
          })
          .sort((a, b) => new Date(b.creation) - new Date(a.creation)); // Sort by creation date
  
        // Display title and container
        $('#content-section').html(`
          <div>
            <h3>${title}</h3>
            <button id="Filter_btn" class="btn btn-sm btn-danger">Filter</button>
            <div id="filter-form-container" style="display: none; margin: 15px 0; padding: 15px; background: #f5f5f5; border-radius: 5px;">
                <h5>Filter Applications</h5>
                <div class="form-group">
                    <label for="address-filter">Address</label>
                    <input type="text" class="form-control" id="address-filter" placeholder="Filter by address">
                </div>
                <div class="form-group">
                    <label for="degree-filter">Degree</label>
                    <input type="text" class="form-control" id="degree-filter" placeholder="Filter by degree">
                </div>
                <div class="form-group">
                    <label for="major-filter">Major of Study</label>
                    <input type="text" class="form-control" id="major-filter" placeholder="Filter by major">
                </div>
                <button id="apply-filter-btn" class="btn btn-sm btn-primary">Apply Filter</button>
                <button id="reset-filter-btn" class="btn btn-sm btn-secondary">Reset</button>
            </div>
            <ul id="application-list" class="list-group mt-3"></ul>
          </div>
        `);

        // Show/hide filter form
        $('#Filter_btn').click(function() {
            $('#filter-form-container').toggle();
        });

        // Function to render applications with optional filters
        function renderApplications(filters = {}) {
            $('#application-list').html('');
            
            let applicationsToShow = filteredApplications;
            
            // Apply filters if provided
            if (filters.address) {
                applicationsToShow = applicationsToShow.filter(app => 
                    app.address && app.address.toLowerCase().includes(filters.address.toLowerCase())
                );
            }
            
            if (filters.degree) {
                applicationsToShow = applicationsToShow.filter(app => 
                    app.degree && app.degree.toLowerCase().includes(filters.degree.toLowerCase())
                );
            }
            
            if (filters.major) {
                applicationsToShow = applicationsToShow.filter(app => 
                    app.major_of_study && app.major_of_study.toLowerCase().includes(filters.major.toLowerCase())
                );
            }

            if (applicationsToShow.length === 0) {
                $('#application-list').append('<li class="list-group-item text-muted">No applications match your criteria.</li>');
            } else {
                applicationsToShow.forEach(app => {
                    $('#application-list').append(`
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                <strong>${app.applicant_name}</strong>
                                <small class="text-muted"> Apply for <b>${app.kind}</b> ${app.kind === "Job" ? app.job_name : app.training_name}</small>
                                <div style="margin-top: 5px;">
                                    <small><strong>Address:</strong> ${app.address || 'N/A'}</small><br>
                                    <small><strong>Degree:</strong> ${app.degree || 'N/A'}</small><br>
                                    <small><strong>Major:</strong> ${app.major_of_study || 'N/A'}</small>
                                </div>
                            </div>
                            <div>
                                <button class="btn btn-sm btn-warning review-app" data-name="${app.name}">Review</button>
                            </div>
                        </li>
                    `);
                });
            }

            // Attach event handlers
            $('.review-app').click(function () {
                const appName = $(this).data('name');
                frappe.set_route('Form', 'Application', appName);
            });
        }

        // Initial render
        renderApplications();

        // Apply filter button
        $('#apply-filter-btn').click(function() {
            const filters = {
                address: $('#address-filter').val(),
                degree: $('#degree-filter').val(),
                major: $('#major-filter').val()
            };
            renderApplications(filters);
        });

        // Reset filter button
        $('#reset-filter-btn').click(function() {
            $('#address-filter').val('');
            $('#degree-filter').val('');
            $('#major-filter').val('');
            renderApplications();
        });
      }
    });
}
  
//////////////////////////////  End filterApplication   ////////////////////////////////////

// Load notifications section
   $('#notification-btn').click(function () {
  $('#content-section').html('<h3>Loading Notification...</h3>');

  frappe.call({
    method: 'frappe.client.get_list',
    args: {
      doctype: 'Application',
      fields: ['name', 'applicant_name', 'kind', 'organization_name','job_name','training_name', 'creation'], // Include organization_name
      filters: {
        organization_name: frappe.session.user_fullname // Filter by current organization
      }
    },
    callback: function (response) {
      const applications = response.message || [];
      $('#content-section').html(`
        <div>
          <h3>Notifications</h3>
          <ul id="application-list" class="list-group mt-3"></ul>
        </div>
      `);

      if (applications.length === 0) {
        $('#application-list').append('<li class="list-group-item text-muted">No Notification found.</li>');
      } else {
        // to sort applications by creation date 
        applications.sort((a, b) => new Date(b.creation) - new Date(a.creation));
        applications.forEach(app => {
          $('#application-list').append(`
            <li class="list-group-item d-flex justify-content-between align-items-center">
              <div>
               <strong>${app.applicant_name}</strong>
                <small class="text-muted"> Apply for <b>${app.kind}</b> ${app.kind === "Job" ? app.job_name : app.training_name}</small> 
              </div>
              <div>
                <button class="btn btn-sm btn-warning review-app" data-name="${app.name}">Review</button>
              </div>
            </li>
          `);
        });
      }
    counter = applications.length;
    n = counter;
    
      
      // Attach event handlers
      $('.review-app').click(function () {
        const appName = $(this).data('name');
        frappe.set_route('Form', 'Application', appName);
      });
    }
  });
});

    loadoOrganizationProfile();
};