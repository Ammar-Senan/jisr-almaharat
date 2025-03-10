<h3>Dear {{ doc.organization_name | default("Esteemed Organization") }},</h3>

<p>A new {{ doc.kind | default("application") }} application has been Created.</p>

<p><strong>Applicant Name:</strong> {{ doc.applicant_name | default("Unknown Applicant") }}</p>

{% if doc.kind == "Job" %}
<p><strong>Job Position:</strong> {{ doc.job_name | default("Unknown Job") }}</p>
{% else %}
<p><strong>Training Program:</strong> {{ doc.training_name | default("Unknown Training") }}</p>
{% endif %}

<p>Please go to the platform to review the application.</p>

<p><a href="{{ doc.platform_url | default('#') }}" style="display: inline-block; padding: 10px 15px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 5px;">Go to Platform</a></p>

<p>Best regards,</p>
<p><strong>Jisr Almaharat</strong></p>
