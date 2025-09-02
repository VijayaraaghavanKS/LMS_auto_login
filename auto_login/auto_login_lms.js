// ==UserScript==
// @name         Auto-Login and Password Update for SSN LMS (Moodle)
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Automatically logs in to SSN LMS, prevents inactivity logout, and updates password when reset.
// @author       You
// @match        https://lms.ssn.edu.in/*
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

(function() {
    'use strict';

    const LOGIN_PATH = '/login/index.php';
    const CHANGE_PASS_PATH = '/login/change_password.php';

    // Function to get stored credentials
    function getStoredCreds() {
        return {
            username: GM_getValue('username', ''),
            password: GM_getValue('password', '')
        };
    }

    // Function to store credentials
    function storeCreds(username, password) {
        if (username) GM_setValue('username', username);
        if (password) GM_setValue('password', password);
    }

    // Function to perform auto-login
    function autoLogin() {
        const { username, password } = getStoredCreds();
        const usernameField = document.getElementById('username') || document.querySelector('input[name="username"]');
        const passwordField = document.getElementById('password') || document.querySelector('input[name="password"]');
        const rememberCheckbox = document.getElementById('rememberusername');
        const submitButton = document.getElementById('loginbtn') || document.querySelector('button[type="submit"]');

        if (usernameField && passwordField && submitButton) {
            if (!username || !password) {
                // Prompt for credentials if not stored
                const newUsername = prompt('Enter your SSN LMS username:', username || '');
                const newPassword = prompt('Enter your SSN LMS password:', password || '');
                if (newUsername && newPassword) {
                    storeCreds(newUsername, newPassword);
                    autoLogin(); // Retry with new creds
                }
                return;
            }

            usernameField.value = username;
            passwordField.value = password;
            if (rememberCheckbox) rememberCheckbox.checked = true;
            submitButton.click();
            console.log('Auto-login attempted');
        } else {
            console.log('Login form elements not found');
        }
    }

    // Function to handle password change page
    function handlePasswordChange() {
        const form = document.querySelector('form[id*="mform"]') || document.querySelector('form');
        if (!form) return;

        // Auto-fill old password if available
        const oldPassField = document.getElementById('id_oldpassword') || document.querySelector('input[name="password"]');
        if (oldPassField && getStoredCreds().password) {
            oldPassField.value = getStoredCreds().password;
        }

        // Add submit event listener to capture new password
        form.addEventListener('submit', function() {
            const newPass1 = document.getElementById('id_newpassword1') || document.querySelector('input[name="newpassword1"]');
            const newPass2 = document.getElementById('id_newpassword2') || document.querySelector('input[name="newpassword2"]');
            if (newPass1 && newPass2 && newPass1.value === newPass2.value && newPass1.value) {
                storeCreds(null, newPass1.value);
                console.log('New password stored');
            }
        });
    }

    // Function to simulate activity to prevent inactivity logout
    function preventLogout() {
        setInterval(() => {
            // Simulate a mouse move or click to keep session alive
            const event = new MouseEvent('mousemove', { bubbles: true });
            document.dispatchEvent(event);
            console.log('Simulated activity to prevent logout');
        }, 300000); // Every 5 minutes
    }

    // Main logic
    window.addEventListener('load', function() {
        const path = window.location.pathname;
        if (path === LOGIN_PATH) {
            autoLogin();
            // Also add submit listener for manual login to update creds if changed
            const form = document.querySelector('form#login') || document.querySelector('form');
            if (form) {
                form.addEventListener('submit', function() {
                    const usernameField = document.getElementById('username');
                    const passwordField = document.getElementById('password');
                    if (usernameField && passwordField) {
                        storeCreds(usernameField.value, passwordField.value);
                    }
                });
            }
        } else if (path === CHANGE_PASS_PATH) {
            handlePasswordChange();
        } else {
            // On other pages, prevent logout
            preventLogout();
        }
    });

    // Periodically check if redirected to login (e.g., due to timeout)
    setInterval(() => {
        if (window.location.pathname === LOGIN_PATH) {
            autoLogin();
        }
    }, 60000); // Check every minute

})();