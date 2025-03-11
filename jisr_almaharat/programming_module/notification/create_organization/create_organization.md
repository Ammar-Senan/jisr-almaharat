<p><strong>Dear Admin,</strong></p>

<p>A new company has registered on the platform. Please review the company's information and approve it to ensure its accuracy and completeness.</p>

<p><strong>Company Information:</strong><br>
  Company Name: {{ doc.organization_name }}<br>
  Email: {{ doc.email }}<br>
  Address: {{ doc.location }}</p>

<p>Please verify the data and take the appropriate action.</p>
<p><a href="{{ doc.platform_url | default('#') }}" style="display: inline-block; padding: 10px 15px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 5px;">Go to Platform</a></p>


<p><strong>Thank you,</strong><br>
  <strong>Jisr Almaharat </strong></p>
