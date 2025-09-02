SSN LMS Auto-Login Userscript
This userscript automates logging into the SSN College of Engineering's Learning Management System (LMS) at https://lms.ssn.edu.in/. It prevents session timeouts by simulating activity, auto-logs in when redirected to the login page, and updates stored credentials when you change your password (required every 45 days).
Note: This script is for personal use and must comply with SSN's LMS terms of service. Misuse may violate institutional policies.
Features

Auto-Login: Automatically fills and submits your username and password on the LMS login page.
Session Maintenance: Simulates mouse activity every 5 minutes to prevent inactivity-based logouts.
Password Update: Detects password changes on the Moodle password change page and updates stored credentials.
Cross-Browser: Works on Chrome and Brave via Tampermonkey.
Secure Storage: Credentials are stored locally in Tampermonkey's storage, not hardcoded.

Prerequisites

A modern browser: Google Chrome or Brave.
Tampermonkey extension installed.

Installation

Install Tampermonkey:
For Chrome: Visit the Chrome Web Store and add Tampermonkey.
For Brave: Enable Chrome Web Store support in Brave settings, then install Tampermonkey from the same link.


Add the Script:
Open Tampermonkey Dashboard (click the Tampermonkey icon > "Dashboard").
Click the "+" icon to create a new script.
Copy and paste the content of ssn-lms-auto-login.user.js from this repository into the editor.
Save the script (Ctrl+S or File > Save).


Initial Setup:
Visit https://lms.ssn.edu.in/login/index.php.
The script will prompt for your username and password (stored locally).
After entering, it will auto-login.



Usage

The script runs automatically on https://lms.ssn.edu.in/*.
On the login page, it auto-fills and submits credentials.
On other LMS pages, it simulates activity to prevent logout.
When prompted to change your password (every 45 days), enter your new password on the change password page. The script captures and stores it for future logins.
To debug, open Developer Tools (F12 > Console) to see logs like "Auto-login attempted" or "New password stored".

Security Considerations

Credentials Storage: Username and password are stored in Tampermonkey's local storage, accessible only by your browser. Do not export or share Tampermonkey data.
Clear Storage: To remove stored credentials, go to Tampermonkey Dashboard > Storage and clear the username and password entries.
Never Share: Do not push this script to public repositories with actual credentials (this repo does not include them).
Policy Compliance: Ensure this script aligns with SSN's IT policies. Unauthorized automation may be prohibited.

Troubleshooting

Script Not Working:
Verify the LMS URL matches @match https://lms.ssn.edu.in/* in the script.
Check element IDs in the login or password change pages (F12 > Inspect) and update selectors in the script if Moodle updates its HTML.


Login Fails: Ensure credentials are correct. Clear stored credentials and re-enter via prompts.
Password Not Updating: Confirm you're on https://lms.ssn.edu.in/login/change_password.php when changing passwords.
Logs: Check console for errors like "Login form elements not found".

Contributing

Fork this repository.
Create a feature branch (git checkout -b feature/YourFeature).
Commit changes (git commit -m "Add YourFeature").
Push to the branch (git push origin feature/YourFeature).
Open a Pull Request.

License
This project is licensed under the MIT License. See the LICENSE file for details.
Disclaimer
This script is provided as-is for educational purposes. The author is not responsible for any misuse or violation of institutional policies. Use at your own risk.
