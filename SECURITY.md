# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | ✅ Yes             |
| < 1.0   | ❌ No              |

## Reporting a Vulnerability

We take security seriously. If you discover a security vulnerability, please **do not** open a public GitHub issue.

### How to Report

Send a detailed report to: **sanyogsingh369@gmail.com**

Please include:
- A description of the vulnerability
- Steps to reproduce the issue
- Potential impact assessment
- Any suggested remediation (optional)

### What to Expect

- **Acknowledgement**: Within 48 hours of your report
- **Status Update**: Within 7 days
- **Resolution**: Within 30 days for critical vulnerabilities

### Security Best Practices for Contributors

- Never commit secrets, API keys, or credentials to the repository
- Use `.env` files locally and reference `.env.example` for templates
- Keep dependencies updated and scan with `pip-audit` / `npm audit`
- Use environment variables for all configuration values
- Follow the principle of least privilege for API keys and database access

## Disclosure Policy

Once a vulnerability is resolved, we will publish a security advisory and credit the reporter (unless they request anonymity).
