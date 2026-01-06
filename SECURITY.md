# Security Alert - MongoDB Credentials Exposed

## ⚠️ CRITICAL: Immediate Action Required

Your MongoDB connection string with credentials was accidentally committed to the GitHub repository. 

### Steps to Fix:

1. **Rotate MongoDB Credentials IMMEDIATELY**
   - Log into MongoDB Atlas dashboard
   - Go to Database Access → Edit the user `harshapolina1_db_user`
   - Change the password to a new secure password
   - Update your `.env` file with the new connection string

2. **Remove Secret from Git History**
   The secret is already exposed in git history. To remove it completely, you need to:
   
   ```bash
   # Option 1: Use git-filter-repo (recommended)
   git filter-repo --path backend/src/config/db.js --invert-paths
   
   # Option 2: Use BFG Repo-Cleaner
   # Download from: https://rtyley.github.io/bfg-repo-cleaner/
   bfg --replace-text passwords.txt
   
   # Option 3: Force push after cleaning (WARNING: This rewrites history)
   git push origin --force --all
   ```
   
   **Note:** Rewriting git history requires force push, which can affect collaborators.

3. **Current Fix Applied**
   - ✅ Removed hardcoded MongoDB URI from `backend/src/config/db.js`
   - ✅ Updated code to use environment variables only
   - ✅ `.env` file is already in `.gitignore`

4. **Prevention**
   - Always use environment variables for secrets
   - Never commit `.env` files
   - Use `.env.example` for documentation (without real values)
   - Consider using GitHub Secrets for CI/CD
   - Use tools like `git-secrets` or `truffleHog` to scan before committing

### What Was Exposed:
- MongoDB username: `harshapolina1_db_user`
- MongoDB password: `hvs2006`
- MongoDB cluster: `project-1.jscyy6f.mongodb.net`

**Action Required:** Change these credentials immediately in MongoDB Atlas.

