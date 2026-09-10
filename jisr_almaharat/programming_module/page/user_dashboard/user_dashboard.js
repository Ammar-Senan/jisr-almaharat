frappe.pages['user-dashboard'].on_page_load = function(wrapper) {
    var page = frappe.ui.make_app_page({
        parent: wrapper,
        title: 'User Dashboard',
        single_column: true
    });

   let $content = $(`
        <style>
            :root {
                --ud-primary: #171717;
                --ud-primary-hover: #262626;
                --ud-bg-card: #ffffff;
                --ud-border: #eaecf0;
                --ud-text-main: #101828;
                --ud-text-muted: #667085;
                --ud-radius-lg: 16px;
                --ud-radius-md: 10px;
                --ud-shadow-sm: 0 1px 3px rgba(16, 24, 40, 0.05);
                --ud-shadow-md: 0 4px 12px -2px rgba(16, 24, 40, 0.08);
            }

            .dashboard-container {
                max-width: 1000px;
                margin: 0 auto;
                padding: 24px 16px;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            }

            /* Header Section */
            .dashboard-header {
                text-align: center;
                margin-bottom: 32px;
            }

            .dashboard-title {
                font-size: 28px;
                font-weight: 700;
                color: var(--ud-text-main);
                margin: 0 0 6px 0;
                letter-spacing: -0.02em;
            }

            .dashboard-subtitle {
                font-size: 15px;
                color: var(--ud-text-muted);
                margin: 0;
                font-weight: 500;
            }

            /* Profile Card */
            .profile-card {
                background: var(--ud-bg-card);
                border: 1px solid var(--ud-border);
                border-radius: var(--ud-radius-lg);
                padding: 28px;
                box-shadow: var(--ud-shadow-sm);
                display: grid;
                grid-template-columns: 140px 1fr;
                gap: 28px;
                margin-bottom: 32px;
                transition: box-shadow 0.2s ease;
            }

            .profile-card:hover {
                box-shadow: var(--ud-shadow-md);
            }

            .profile-avatar-wrapper {
                position: relative;
                width: 140px;
                height: 140px;
            }

            .profile-image {
                width: 100%;
                height: 100%;
                border-radius: var(--ud-radius-md);
                object-fit: cover;
                border: 1px solid var(--ud-border);
            }

            .profile-details {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
            }

            .profile-about {
                background: #f8fafc;
                border: 1px solid var(--ud-border);
                border-radius: var(--ud-radius-md);
                padding: 16px;
                font-size: 14px;
                line-height: 1.6;
                color: var(--ud-text-main);
                margin-bottom: 18px;
            }

            .profile-contact-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
                gap: 12px;
                margin-bottom: 20px;
            }

            .contact-item {
                display: flex;
                align-items: center;
                gap: 10px;
                font-size: 13.5px;
                color: var(--ud-text-muted);
            }

            .contact-item i {
                font-size: 16px;
                color: #475467;
            }

            .action-bar {
                display: flex;
                gap: 10px;
                flex-wrap: wrap;
            }

            .btn-dash {
                display: inline-flex;
                align-items: center;
                gap: 8px;
                font-size: 13.5px;
                font-weight: 500;
                padding: 9px 16px;
                border-radius: var(--ud-radius-md);
                border: 1px solid var(--ud-border);
                background: #ffffff;
                color: var(--ud-text-main);
                cursor: pointer;
                transition: all 0.15s ease;
            }

            .btn-dash:hover {
                background: #f9fafb;
                border-color: #d0d5dd;
            }

            .btn-dash-primary {
                background: var(--ud-primary);
                color: #ffffff;
                border-color: var(--ud-primary);
            }

            .btn-dash-primary:hover {
                background: var(--ud-primary-hover);
                color: #ffffff;
            }

            /* Content / Applications Section */
            .section-card {
                background: var(--ud-bg-card);
                border: 1px solid var(--ud-border);
                border-radius: var(--ud-radius-lg);
                padding: 24px;
                box-shadow: var(--ud-shadow-sm);
            }

            .section-header {
                font-size: 18px;
                font-weight: 600;
                color: var(--ud-text-main);
                margin-bottom: 16px;
            }

            .application-list {
                display: flex;
                flex-direction: column;
                gap: 10px;
            }

            .application-item {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 16px 20px;
                border: 1px solid var(--ud-border);
                border-radius: var(--ud-radius-md);
                background: #ffffff;
                text-decoration: none;
                cursor: pointer;
                transition: all 0.2s ease;
            }

            .application-item:hover {
                border-color: #b2ddff;
                box-shadow: var(--ud-shadow-sm);
                transform: translateY(-1px);
            }

            .app-kind {
                display: inline-block;
                font-size: 11px;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 0.05em;
                color: var(--ud-text-muted);
                margin-bottom: 4px;
            }

            .app-title {
                margin: 0;
                font-size: 14.5px;
                color: var(--ud-text-main);
            }

            .badge-status {
                font-size: 12px;
                font-weight: 500;
                padding: 6px 12px;
                border-radius: 20px;
                display: inline-flex;
                align-items: center;
                gap: 6px;
            }

            .badge-pending {
                background: #fffaeb;
                color: #b54708;
                border: 1px solid #fedf89;
            }

            .badge-approved {
                background: #ecfdf3;
                color: #027a48;
                border: 1px solid #abefc6;
            }

            .badge-rejected {
                background: #fef3f2;
                color: #b42318;
                border: 1px solid #fecdca;
            }

            .loading-state, .empty-state {
                text-align: center;
                padding: 40px 20px;
                color: var(--ud-text-muted);
            }

            @media (max-width: 768px) {
                .profile-card {
                    grid-template-columns: 1fr;
                    justify-items: center;
                    text-align: center;
                }

                .profile-contact-grid {
                    grid-template-columns: 1fr;
                    text-align: left;
                }

                .action-bar {
                    justify-content: center;
                }

                .application-item {
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 12px;
                }
            }
        </style>

        <div class="dashboard-container">
            <div class="dashboard-header">
                <h1 class="dashboard-title" id="user-profile-title">User Profile</h1>
                <p class="dashboard-subtitle" id="user-specialization">Specialization</p>
            </div>
            <div id="user-profile-list"></div>
        </div>
    `);

    $(page.main).append($content);

    function loadUserProfiles() {
        $('#user-profile-list').html(`
            <div class="loading-state">
                <i class="fa fa-spinner fa-spin fa-2x"></i>
                <p class="mt-2">Loading profile details...</p>
            </div>
        `);

        frappe.call({
            method: 'frappe.client.get_list',
            args: {
                doctype: 'User1',
                fields: ['name', 'name1', 'email', 'phone_number', 'specialization', 'address', 'about_me', 'image']
            },
            callback: function (response) {
                let users = response.message || [];
                $('#user-profile-list').empty();

                if (users.length === 0) {
                    $('#user-profile-list').html(`
                        <div class="empty-state">
                            <i class="fa fa-user-slash fa-2x"></i>
                            <p class="mt-2">No user profile records found.</p>
                        </div>
                    `);
                } else {
                    const user = users[0];
                    $('#user-profile-title').text(user.name1 || 'User Profile');
                    $('#user-specialization').text(user.specialization || 'No Specialization Specified');

                    const profileHtml = `
                        <div class="profile-card">
                            <div class="profile-avatar-wrapper">
                                <img src="${user.image || '/assets/frappe/images/default-avatar.png'}" 
                                     class="profile-image" 
                                     alt="${frappe.utils.escape_html(user.name1)}"
                                     onerror="this.src='/assets/frappe/images/default-avatar.png'">
                            </div>
                            <div class="profile-details">
                                <div class="profile-about">
                                    ${user.about_me ? frappe.utils.escape_html(user.about_me) : '<em>No biography available.</em>'}
                                </div>
                                <div class="profile-contact-grid">
                                    <div class="contact-item">
                                        <i class="fa fa-envelope"></i>
                                        <span>${user.email ? frappe.utils.escape_html(user.email) : 'N/A'}</span>
                                    </div>
                                    <div class="contact-item">
                                        <i class="fa fa-phone"></i>
                                        <span>${user.phone_number ? frappe.utils.escape_html(user.phone_number) : 'N/A'}</span>
                                    </div>
                                    <div class="contact-item">
                                        <i class="fa fa-map-marker-alt"></i>
                                        <span>${user.address ? frappe.utils.escape_html(user.address) : 'No address provided'}</span>
                                    </div>
                                </div>
                                <div class="action-bar">
                                    <button class="btn-dash btn-dash-primary" id="edit-profile-btn">
                                        <i class="fa fa-edit"></i> Edit Profile
                                    </button>
                                    <button class="btn-dash" id="applications-toggle-btn">
                                        <i class="fa fa-file-alt"></i> Show Applications
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div id="content-section"></div>
                    `;

                    $('#user-profile-list').append(profileHtml);

                    // Event Listeners
                    $('#edit-profile-btn').on('click', function () {
                        frappe.set_route('Form', 'User1', user.name);
                    });

                    $('#applications-toggle-btn').on('click', function () {
                        const $btn = $(this);
                        const isShowing = $btn.data('showing');

                        if (isShowing) {
                            hideApplications();
                            $btn.data('showing', false)
                                .html('<i class="fa fa-file-alt"></i> Show Applications');
                        } else {
                            loadApplications();
                            $btn.data('showing', true)
                                .html('<i class="fa fa-eye-slash"></i> Hide Applications');
                        }
                    });
                }
            }
        });
    }
    //////////////////////////////////////////
    function hideApplications() {
        $('#content-section').empty();
    }

    function loadApplications() {
        $('#content-section').html(`
            <div class="section-card">
                <div class="loading-state">
                    <i class="fa fa-spinner fa-spin fa-lg"></i>
                    <p class="mt-2 mb-0">Fetching your applications...</p>
                </div>
            </div>
        `);

        frappe.call({
            method: 'frappe.client.get_list',
            args: {
                doctype: 'Application',
                fields: ['name', 'kind', 'job_name', 'training_name', 'applicant_name', 'workflow_state', 'creation'],
                filters: {
                    applicant_name: frappe.session.user_fullname
                }
            },
            callback: function (response) {
                let applications = response.message || [];
                
                let containerHtml = `
                    <div class="section-card">
                        <h3 class="section-header">Your Applications</h3>
                        <div id="application-list" class="application-list"></div>
                    </div>
                `;

                $('#content-section').html(containerHtml);

                if (applications.length === 0) {
                    $('#application-list').html(`
                        <div class="empty-state">
                            <p class="mb-0">You have not submitted any applications yet.</p>
                        </div>
                    `);
                } else {
                    applications.sort((a, b) => new Date(b.creation) - new Date(a.creation));
                    
                    applications.forEach(app => {
                        let targetTitle = app.kind === "Job" ? app.job_name : app.training_name;
                        let redirectUrl = app.kind === "Job" 
                            ? `/Home/jobDetails/${encodeURIComponent(app.job_name)}` 
                            : `/Home/training_details/${encodeURIComponent(app.training_name)}`;

                        let badgeClass = 'badge-pending';
                        if (app.workflow_state === 'Approved') badgeClass = 'badge-approved';
                        if (app.workflow_state === 'Rejected') badgeClass = 'badge-rejected';

                        let itemHtml = `
                            <div class="application-item" data-url="${redirectUrl}">
                                <div>
                                    <span class="app-kind">${frappe.utils.escape_html(app.kind || 'Application')}</span>
                                    <p class="app-title">
                                        Applied for <strong>${frappe.utils.escape_html(targetTitle)}</strong>
                                    </p>
                                </div>
                                <div>
                                    <span class="badge-status ${badgeClass}">
                                        ${frappe.utils.escape_html(app.workflow_state || 'Pending')}
                                    </span>
                                </div>
                            </div>
                        `;

                        $('#application-list').append(itemHtml);
                    });

                    // Handle card clicks dynamically safely
                    $('#application-list').on('click', '.application-item', function () {
                        const url = $(this).data('url');
                        if (url) {
                            window.location.href = url;
                        }
                    });
                }
            }
        });
    }

    loadUserProfiles();
};
