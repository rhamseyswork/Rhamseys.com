#!/bin/bash
#chmod +x update_client_branch.sh
#./update_client_branch.sh
#rename to update.sh

# Ensure we're on the server branch
git checkout main

# Pull the latest changes from the server branch (optional but recommended)
git pull origin main --rebase

# Add all changes to staging
git add -A

# Commit the changes
git commit -m "Update server branch with latest changes"

# Force push the changes to GitHub
git push origin main --force