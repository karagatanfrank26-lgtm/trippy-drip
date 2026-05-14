# 🔑 GitHub SSH Setup & Push Instructions

## Quick Setup (One-time only)

### Step 1: Generate SSH Key (Run this in terminal)

```bash
"C:\Program Files\Git\cmd\git.exe" config --global user.name "Trippy Drip Admin"
"C:\Program Files\Git\cmd\git.exe" config --global user.email "admin@trippydrip.com"
```

### Step 2: Create SSH Key

```bash
ssh-keygen -t ed25519 -C "admin@trippydrip.com" -N "" -f "$env:USERPROFILE\.ssh\id_ed25519"
```

(This creates SSH key with no password - press Enter when prompted)

### Step 3: Copy SSH Key

```bash
type "$env:USERPROFILE\.ssh\id_ed25519.pub"
```

Copy the entire output (starts with `ssh-ed25519`).

### Step 4: Add SSH Key to GitHub

1. Go to: https://github.com/settings/ssh/new
2. Title: `Trippy Drip Dev`
3. Key type: Authentication Key
4. Paste your SSH key
5. Click "Add SSH key"

### Step 5: Update Git Remote to Use SSH

```bash
cd "c:\Users\Administrator\Documents\trippy drip final"
"C:\Program Files\Git\cmd\git.exe" remote set-url origin git@github.com:karagatanfrank26-lgtm/trippy-drip.git
```

### Step 6: Push to GitHub

```bash
"C:\Program Files\Git\cmd\git.exe" push -u origin main
```

**That's it!** All future pushes just need: `git push`

---

## Alternative: Use Personal Access Token (If SSH doesn't work)

### Step 1: Create Token on GitHub
1. Go to: https://github.com/settings/tokens/new
2. Select scope: `repo` (full control of private repositories)
3. Generate token
4. Copy the token

### Step 2: Use Token to Push

```bash
cd "c:\Users\Administrator\Documents\trippy drip final"
"C:\Program Files\Git\cmd\git.exe" push -u origin main
# When prompted for password, paste the token
```

---

## Manual Method: Create Repo on GitHub First

If above doesn't work:

1. Go to: https://github.com/new
2. Repo name: `trippy-drip`
3. Description: `Streetwear e-commerce with GCash payment`
4. Public
5. Click "Create repository"
6. Follow the "push an existing repository" instructions shown

---

## Commands Quick Reference

```bash
# Check current remote
"C:\Program Files\Git\cmd\git.exe" remote -v

# Push code
"C:\Program Files\Git\cmd\git.exe" push -u origin main

# Check status
"C:\Program Files\Git\cmd\git.exe" status

# View log
"C:\Program Files\Git\cmd\git.exe" log --oneline
```

---

**Which method would you prefer?**
1. SSH Setup (Recommended - easiest long-term)
2. Personal Access Token
3. Manual GitHub creation
