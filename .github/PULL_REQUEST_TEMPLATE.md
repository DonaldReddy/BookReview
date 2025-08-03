## 📄 Description
Implemented Google Sign-In authentication using @react-oauth/google in the BookReview project. This allows users to sign in securely using their Google accounts, improving user experience and login convenience.

- [ ] Bug fix
- [x] New feature
- [x] Documentation update
- [ ] Refactor

### Linked Issue
Closes #[35]

---

## 🔍 Changes
- Integrated @react-oauth/google for OAuth login
- Set up GoogleOAuthProvider in App.tsx
- Added GoogleLogin component in SignIn page
- Sent Google ID token to backend for verification
- On successful login, extracted user details and stored them in Redux
- Redirected user based on their role (ADMIN or USER)
- Handled loading and error states gracefully

---

## 📷 Screenshots
<video controls src="Book Review - Google Chrome 2025-07-28 22-24-43.mp4" title="Sign with Google"></video>

---

## ✅ Checklist
- [x] My code follows the project's code style.
- [x] I have performed a self-review of my code.
- [x] I have commented my code where necessary.
- [x] I have updated relevant documentation.

---

Thank you for your contribution! 🎉