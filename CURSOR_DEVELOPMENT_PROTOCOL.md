# 🛡️ Cursor Development Protocol - Safety First

**Purpose:** Prevent production breaks, enable safe experimentation, ensure rollback capability
**Created:** 2025-10-29
**Learned from:** Oct 28, 2025 Production Crisis
**Status:** MANDATORY for all development

---

## ⚠️ Core Principle: Never Break Production

**Rules:**
1. **NEVER work directly on `main` branch** for features/changes
2. **ALWAYS test incrementally** (not at the end)
3. **ALWAYS create backup branch** before risky changes
4. **ALWAYS verify in dev server** before committing
5. **NEVER force push to main** without explicit approval
6. **NEVER make changes without explicit approval** - Show plan first, wait for "go"

**Why:** These rules prevented data loss during Oct 28 crisis and will prevent future incidents.

---

## 🚨 Common Mistake: Jumping Ahead

### **DON'T Do This:**
```
❌ Read implementation plan
❌ Understand what needs to change
❌ Start making changes immediately
❌ "I'll just do it real quick"
```

**Problem:** No verification, no approval, breaks conductor model

### **DO This Instead:**
```
✅ Read implementation plan
✅ Create plan/summary of what you'll do
✅ SHOW plan to Johannes
✅ WAIT for approval ("go ahead", "approved", etc.)
✅ THEN make changes one at a time
```

**Why:** The conductor (Johannes) must give the downbeat. The orchestra doesn't start playing on its own.

### **Example (Correct Flow):**

**Cursor:**
> "I've read the plan. Here's what I'll do:
> 1. Change file A (line X)
> 2. Change file B (line Y)
> 3. Test after each change
>
> Ready to proceed?"

**Johannes:**
> "Approved. Start with file A."

**Cursor:**
> "Making change to file A..."

**This is the only acceptable workflow.**

---

## 🌳 Git Strategy

### **Branch Workflow**

#### **For Small Changes (1-3 files, low risk):**
```bash
# Current workflow - acceptable for minor fixes
git checkout main
# Make change
# Test in dev server
git add [specific files]
git commit -m "fix: [description]"
# DON'T push yet - verify first
pnpm dev
# Test in browser
# If good:
git push origin main
```

#### **For Medium/Large Changes (Multiple files, new features):**
```bash
# MANDATORY workflow

# 1. Create feature branch
git checkout -b feature/marion-feedback-typography
# or: feature/[description]

# 2. Make changes incrementally (one section at a time)
# Change file 1
# Test in dev server ✅
# Commit
git add [file1]
git commit -m "feat: update typography to 18px"

# Change file 2
# Test in dev server ✅
# Commit
git add [file2]
git commit -m "feat: remove font-light classes"

# 3. When section complete and verified
# Push feature branch (safe, not production)
git push origin feature/marion-feedback-typography

# 4. Verify everything works
pnpm dev
# Full testing in browser

# 5. Merge to main ONLY when confirmed working
git checkout main
git merge feature/marion-feedback-typography
git push origin main
```

#### **For Risky/Experimental Changes:**
```bash
# ALWAYS create backup first

# 1. Create backup branch
git checkout -b backup-before-[change-name]-$(date +%Y%m%d)
git push origin backup-before-[change-name]-$(date +%Y%m%d)

# 2. Create feature branch
git checkout main
git checkout -b experiment/[description]

# 3. Make changes
# 4. Test extensively
# 5. If works: merge to main
# 6. If fails: delete branch, restore from backup

# Backup branch preserves all work - zero data loss
```

---

## 🧪 Testing Strategy

### **Incremental Testing (MANDATORY)**

**Rule:** Test after EVERY logical change, not just at the end.

#### **Bad (What caused Oct 28 crisis):**
```bash
# Change 10 files (780 lines)
# Run dev server once at end
# Discover everything broken
# Panic
```

#### **Good (Prevents crisis):**
```bash
# Change file 1
pnpm dev
# Verify in browser ✅

# Change file 2
# Refresh browser
# Verify ✅

# Change file 3
# Refresh browser
# Verify ✅

# All changes tested incrementally = confidence
```

---

### **Dev Server Protocol**

#### **Starting Dev Server:**
```bash
cd /Users/j.wild/Projects/3lectrify-platform

# Check which app to run
# Option 1: 3lectrify (main site)
pnpm --filter 3lectrify dev
# Opens: http://localhost:3000

# Option 2: All apps (if needed)
pnpm dev
```

#### **While Dev Server Running:**

**After EACH code change:**
1. Save file in Cursor
2. Wait for "compiled successfully" in terminal
3. Refresh browser (Cmd+R)
4. Verify change worked
5. Check console for errors (F12)

**If errors appear:**
- STOP immediately
- Read error message
- Fix before continuing
- Don't stack changes on broken code

**If change looks wrong:**
- STOP immediately
- `git diff` to see what changed
- Revert if needed: `git checkout [file]`
- Re-think approach

---

### **Testing Checklist (Before Committing)**

**Minimum verification (every commit):**
- [ ] Dev server runs without errors
- [ ] Page loads without console errors
- [ ] Changed element looks correct
- [ ] No obvious visual breaks

**Full verification (before merging to main):**
- [ ] All pages tested:
  - [ ] Homepage (/)
  - [ ] /ihr-vorteil
  - [ ] /unser-konzept
  - [ ] /ueber-uns
  - [ ] /kontakt
- [ ] No console errors on any page
- [ ] Animations work smoothly
- [ ] Responsive (test at 1920px, 1440px, mobile)
- [ ] No layout shifts

---

## 🔄 Safe Change Process (Step-by-Step)

### **For Each Implementation Section:**

#### **Step 1: Setup (Safety First)**
```bash
# If risky: create backup
git checkout -b backup-before-section-X-$(date +%Y%m%d)
git push origin backup-before-section-X-$(date +%Y%m%d)

# Create feature branch
git checkout main
git checkout -b feature/section-X-[description]

# Start dev server
pnpm --filter 3lectrify dev
```

#### **Step 2: Implement (Small Changes)**
```bash
# Read implementation plan
# Identify FIRST file to change

# Make change in file 1
# Save

# IMMEDIATELY test:
# - Refresh browser
# - Verify change
# - Check console

# If good: commit
git add [file1]
git commit -m "feat: [specific change]"

# If bad: revert
git checkout [file1]
# Re-think approach
```

#### **Step 3: Iterate (One File at a Time)**
```bash
# Repeat for each file:
# Change → Test → Commit
# Change → Test → Commit
# Change → Test → Commit

# NOT: Change, change, change, hope it works
```

#### **Step 4: Section Complete (Full Verification)**
```bash
# All files in section changed
# Dev server still running

# Full test:
# - Visit all pages
# - Check all changed elements
# - Look for side effects
# - Console errors?

# If all good:
git push origin feature/section-X-[description]

# Notify Johannes: "Section X complete, ready to verify"
```

#### **Step 5: Merge (Johannes Approval)**
```bash
# After Johannes verifies and approves:

git checkout main
git merge feature/section-X-[description]

# Optional: Squash commits if many
# git merge --squash feature/section-X-[description]

# Push to production
git push origin main

# Vercel auto-deploys
# Monitor for 2-3 minutes
# Check production URL
```

---

## 🚨 Emergency Procedures

### **Scenario: "I broke the dev server"**

```bash
# 1. DON'T PANIC
# 2. Read error message carefully
# 3. Check what you just changed:
git diff

# 4. Revert last change:
git checkout [broken-file]

# 5. Restart dev server:
# Ctrl+C (stop)
pnpm --filter 3lectrify dev

# 6. If still broken:
git status
# Revert all uncommitted changes:
git checkout .

# 7. If STILL broken:
# Might be package.json changes
pnpm install

# 8. Last resort:
git log --oneline -5
git reset --hard [last-good-commit]
```

---

### **Scenario: "I committed something wrong"**

```bash
# If not pushed yet:
git log --oneline -3
git reset --soft HEAD~1  # Undo last commit, keep changes
# Fix
# Recommit

# If already pushed to feature branch:
# Not a problem - just fix and commit again

# If already pushed to main (DANGER):
# 1. STOP
# 2. Tell Johannes immediately
# 3. Create backup branch
# 4. Assess damage
# 5. May need force push (Johannes decision)
```

---

### **Scenario: "Everything is broken, need to start over"**

```bash
# If you have backup branch:
git checkout main
git reset --hard backup-before-[name]-[date]
git push --force origin main  # Johannes must approve

# If no backup (bad situation):
git log --oneline -20
# Find last known good commit
git reset --hard [commit-hash]
git push --force origin main  # Johannes must approve

# Lesson: ALWAYS create backup for risky changes
```

---

## 📝 Commit Message Standards

### **Format:**
```
<type>: <short description>

[optional body]

[optional refs]
```

### **Types:**
- `feat:` New feature
- `fix:` Bug fix
- `refactor:` Code change (no behavior change)
- `style:` Visual/CSS changes
- `docs:` Documentation only
- `test:` Adding tests
- `chore:` Maintenance

### **Examples:**

**Good:**
```bash
git commit -m "feat: update body text to 18px regular

- Changed tailwind.config.ts base text size
- Updated all font-light to font-normal
- Verified across all pages

Refs: Marion feedback #1"
```

**Bad:**
```bash
git commit -m "changes"
git commit -m "fixed stuff"
git commit -m "updates"
```

---

## 🎯 Component-Specific Guidelines

### **Shared Components (packages/ui/)**

**EXTRA CAUTION:** Changes here affect ALL apps

**Protocol:**
```bash
# 1. Always create feature branch
git checkout -b feature/component-[name]-update

# 2. Change component
# 3. Test in 3lectrify app FIRST
pnpm --filter 3lectrify dev

# 4. If working, test in other apps (if they exist)
# 5. Commit only when verified

# 6. Document what changed:
git commit -m "feat(ui): update FeatureCards background color

Changed bg from default to #3C5067 per design feedback.
Verified in 3lectrify app.

Refs: Marion feedback #6"
```

---

### **App-Specific (apps/3lectrify/)**

**Lower risk:** Only affects 3lectrify

**Protocol:**
```bash
# Can work on main for small changes
# Feature branch for larger changes

# Always test before commit
pnpm --filter 3lectrify dev
```

---

## 🔍 Code Review Checklist (Self-Review Before Commit)

**Before committing, ask yourself:**

- [ ] Did I test this change in dev server?
- [ ] Does the page load without errors?
- [ ] Did I check the browser console?
- [ ] Does this match the implementation plan?
- [ ] Did I only change what was needed? (no scope creep)
- [ ] Is my commit message clear?
- [ ] Would I be comfortable pushing this to production?

**If any answer is "no" → FIX before committing**

---

## 📊 Implementation Section Template

**For each section in implementation plan:**

```markdown
## Section X: [Name]

### Pre-Implementation Checklist
- [ ] Read section requirements
- [ ] Identify files to change
- [ ] Create backup branch (if risky)
- [ ] Create feature branch
- [ ] Start dev server

### Implementation
- [ ] File 1 changed → tested ✅
- [ ] File 2 changed → tested ✅
- [ ] File 3 changed → tested ✅

### Verification
- [ ] Dev server runs without errors
- [ ] Visual verification in browser
- [ ] Console clear of errors
- [ ] Change matches plan

### Completion
- [ ] All files committed
- [ ] Feature branch pushed
- [ ] Johannes notified for approval
```

---

## 🎓 Lessons from Oct 28 Crisis

### **What Went Wrong:**
1. ❌ Worked directly on main (no feature branch)
2. ❌ Changed 10 files / 780 lines at once
3. ❌ Didn't test incrementally
4. ❌ Build succeeded but runtime failed
5. ❌ Had to emergency revert

### **What Saved Us:**
1. ✅ Created backup branch before reverting
2. ✅ Git allowed hard reset to known good state
3. ✅ Force push restored production in 30 minutes
4. ✅ Zero data loss (backup preserved work)
5. ✅ Documentation during crisis helped

### **New Rules (Prevent Recurrence):**
1. ✅ ALWAYS feature branch for multi-file changes
2. ✅ ALWAYS test after each file change
3. ✅ ALWAYS create backup for risky changes
4. ✅ NEVER assume build success = runtime success
5. ✅ ALWAYS verify in browser before commit

---

## 🚀 Quick Reference

### **Starting Work:**
```bash
# 1. Create feature branch
git checkout -b feature/[description]

# 2. Start dev server
pnpm --filter 3lectrify dev

# 3. Open browser
http://localhost:3000

# 4. Make changes one at a time
# 5. Test after each change
# 6. Commit when verified
```

### **Committing:**
```bash
git add [specific files]
git commit -m "type: description"
git push origin feature/[branch]
```

### **Merging to Production:**
```bash
# After Johannes approval:
git checkout main
git merge feature/[branch]
git push origin main
# Vercel auto-deploys
# Monitor production
```

### **Emergency Revert:**
```bash
git log --oneline -5
git reset --hard [last-good-commit]
git push --force origin main  # Johannes approval required
```

---

## 🎯 Success Criteria

**A safe development session:**
- ✅ Feature branch used (not main directly)
- ✅ Each change tested before next change
- ✅ Dev server ran without errors throughout
- ✅ All commits have clear messages
- ✅ Johannes verified before production push
- ✅ No surprises in production
- ✅ Rollback plan exists

**An unsafe development session:**
- ❌ Working on main directly
- ❌ Many changes without testing
- ❌ Dev server errors ignored
- ❌ Vague commit messages
- ❌ Push to production without verification
- ❌ No backup plan

---

## 📚 Related Documents

- `ORCHESTRATION-WORKFLOW.md` - How Johannes + Claude + Cursor work together
- `MARION_FEEDBACK_IMPLEMENTATION.md` - Current implementation plan
- `.git/config` - Git configuration
- `turbo.json` - Monorepo build config
- `package.json` - Scripts and dependencies

---

## 💡 Pro Tips

### **Tip 1: Commit Often**
```
Don't hoard changes. Small commits = easy to revert.
Better: 10 small commits than 1 giant commit
```

### **Tip 2: Descriptive Branch Names**
```
Good: feature/marion-feedback-typography
Good: fix/stacked-cards-jump-bug
Good: experiment/new-animation-approach

Bad: fix
Bad: changes
Bad: test
```

### **Tip 3: Keep Dev Server Running**
```
Don't restart for every change.
Hot reload is your friend.
Restart only if package.json changes or weird errors.
```

### **Tip 4: Trust Your Eyes**
```
If something looks wrong in browser, it IS wrong.
Don't convince yourself it's okay.
Fix it before moving on.
```

### **Tip 5: When in Doubt, Backup**
```
Backup branch costs nothing.
Emergency revert costs everything.
```

---

## 🔄 Document Updates

**Update this document when:**
- New lessons learned from incidents
- Better workflows discovered
- Team processes change
- Tools/setup changes

**Last Updated:** 2025-10-29
**Next Review:** After Marion feedback implementation complete

---

**END OF CURSOR_DEVELOPMENT_PROTOCOL.md**

---

## 🛡️ Remember

> "Safe code is shipped code. Broken code teaches lessons.
> We learn from October 28, 2025. We implement safely.
> Feature branches, incremental testing, backup plans.
> This is how professionals prevent production fires."

**This protocol is non-negotiable. It prevents disasters.**
