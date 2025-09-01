#!/bin/bash

# DESIST Launch Status Dashboard
# Run this script to get a quick overview of launch readiness

echo "🚀 DESIST LAUNCH STATUS DASHBOARD"
echo "=================================="
echo ""

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo "❌ Error: Not in a git repository"
    exit 1
fi

# Launch date
LAUNCH_DATE="2025-09-15"
TODAY=$(date +%Y-%m-%d)

# Calculate days until launch
if command -v gdate > /dev/null 2>&1; then
    # macOS with GNU coreutils
    DAYS_UNTIL_LAUNCH=$(($(gdate -d "$LAUNCH_DATE" +%s) - $(gdate -d "$TODAY" +%s)))
    DAYS_UNTIL_LAUNCH=$((DAYS_UNTIL_LAUNCH / 86400))
else
    # Try with standard date (may not work on all systems)
    DAYS_UNTIL_LAUNCH="(calculation not available)"
fi

echo "📅 Launch Date: $LAUNCH_DATE"
echo "📅 Today: $TODAY"
echo "⏰ Days until launch: $DAYS_UNTIL_LAUNCH"
echo ""

# Git status
echo "📊 GIT STATUS"
echo "=============="
echo "Current branch: $(git branch --show-current)"
echo "Last commit: $(git log -1 --pretty=format:'%h - %s (%cr)' 2>/dev/null || echo 'No commits found')"

# Check for uncommitted changes
if ! git diff-index --quiet HEAD --; then
    echo "⚠️  Warning: You have uncommitted changes"
    git status --porcelain
else
    echo "✅ Working directory clean"
fi
echo ""

# Check for key files
echo "📁 CRITICAL FILES STATUS"
echo "========================"

files=(
    "README.md"
    "HANDOVER.md"
    ".github/ISSUE_TEMPLATE/launch-critical.yml"
    ".github/LAUNCH_TRACKING.md"
    "package.json"
)

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file exists"
    else
        echo "❌ $file missing"
    fi
done
echo ""

# Check package.json for critical dependencies
echo "📦 DEPENDENCY CHECK"
echo "=================="
if [ -f "package.json" ]; then
    echo "Node.js project detected"
    
    # Check if node_modules exists
    if [ -d "node_modules" ]; then
        echo "✅ Dependencies installed"
    else
        echo "⚠️  Dependencies not installed - run 'npm install'"
    fi
    
    # Check for security vulnerabilities
    if command -v npm > /dev/null 2>&1; then
        echo "🔍 Checking for security vulnerabilities..."
        if npm audit --audit-level=high > /dev/null 2>&1; then
            echo "✅ No high-severity vulnerabilities found"
        else
            echo "⚠️  Security vulnerabilities detected - run 'npm audit' for details"
        fi
    fi
else
    echo "ℹ️  No package.json found"
fi
echo ""

# Launch readiness checklist
echo "🎯 LAUNCH READINESS CHECKLIST"
echo "============================="
echo "Review these key areas before launch:"
echo ""
echo "🔐 Security:"
echo "   - [ ] Security audit completed"
echo "   - [ ] SSL certificates configured"
echo "   - [ ] Authentication system tested"
echo "   - [ ] Data encryption verified"
echo ""
echo "⚡ Performance:"
echo "   - [ ] Load testing completed"
echo "   - [ ] Performance benchmarks met"
echo "   - [ ] CDN configured"
echo "   - [ ] Database optimized"
echo ""
echo "♿ Accessibility:"
echo "   - [ ] WCAG 2.1 AA compliance verified"
echo "   - [ ] Screen reader testing completed"
echo "   - [ ] Color contrast checked"
echo "   - [ ] Keyboard navigation tested"
echo ""
echo "⚖️  Legal & Compliance:"
echo "   - [ ] Privacy policy updated"
echo "   - [ ] Terms of service finalized"
echo "   - [ ] GDPR compliance verified"
echo "   - [ ] Cookie policy implemented"
echo ""
echo "📱 Technical:"
echo "   - [ ] Mobile responsiveness verified"
echo "   - [ ] Cross-browser testing completed"
echo "   - [ ] Error handling implemented"
echo "   - [ ] Monitoring systems active"
echo ""
echo "📚 Documentation:"
echo "   - [ ] User documentation complete"
echo "   - [ ] API documentation updated"
echo "   - [ ] Support team trained"
echo "   - [ ] Deployment guides ready"
echo ""

# Next steps
echo "🎯 NEXT STEPS"
echo "============="
echo "1. Review handover document: cat HANDOVER.md"
echo "2. Create GitHub issues for launch-critical items"
echo "3. Set up project board: .github/LAUNCH_TRACKING.md"
echo "4. Assign team members to critical issues"
echo "5. Schedule daily launch readiness standup"
echo ""

# Emergency contacts reminder
echo "🆘 EMERGENCY CONTACTS"
echo "===================="
echo "Technical Issues: [Add technical lead contact]"
echo "Security Issues: [Add security team contact]"
echo "Legal Issues: [Add legal team contact]"
echo "Executive Escalation: [Add executive contact]"
echo ""

echo "Run this script daily to track launch readiness!"
echo "For detailed tracking, see: .github/LAUNCH_TRACKING.md"
