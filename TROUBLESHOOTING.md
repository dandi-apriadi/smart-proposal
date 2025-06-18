# 🔧 Troubleshooting Dashboard Integration

## Problem: SystemOverview showing 0 values

### Current Status:
- ✅ Backend APIs created (dashboardController.js, analyticsController.js)
- ✅ Frontend components updated
- ✅ API service methods added
- ❌ Data showing as 0 in UI

### Debugging Steps:

#### 1. Check Backend Server
```bash
cd backend
npm start
```
- Ensure server runs on http://localhost:5000
- Check for any startup errors

#### 2. Test API Endpoints
```bash
node test-backend.js
```
- Tests all analytics endpoints
- Verifies server connectivity

#### 3. Check Database Content
```bash
# Create sample data if database is empty
node create-sample-data.js
```

#### 4. Test Specific Endpoints

**Test Demo Endpoint (No Auth Required):**
```bash
curl http://localhost:5000/api/dashboard/demo
```

**Test Analytics Endpoint (Requires Auth):**
```bash
curl -X GET http://localhost:5000/api/analytics/system-overview \
  -H "Content-Type: application/json" \
  -b "your-session-cookie"
```

#### 5. Frontend Debugging

**Check Browser Console:**
1. Open DevTools → Console
2. Look for API request logs
3. Check for error messages

**Expected Console Logs:**
```
🔄 Fetching system overview analytics...
✅ System overview analytics fetched successfully
🔍 SystemOverview received apiData: {...}
```

#### 6. Authentication Check

**Verify User Login:**
1. Login as admin user
2. Check session storage
3. Verify auth cookies

### Common Issues & Solutions:

#### Issue 1: "Module not found" errors
**Solution:** Fix import statements in analyticsController.js
```javascript
// Use individual imports instead of index.js
import { User } from "../models/userModel.js";
import { Department } from "../models/departmentModel.js";
```

#### Issue 2: Authentication required errors
**Solution:** Ensure user is logged in as admin
```javascript
// Check user role in controller
if (!['admin'].includes(req.user.role)) {
    return res.status(403).json({
        success: false,
        message: 'Access denied. Admin rights required'
    });
}
```

#### Issue 3: Empty database
**Solution:** Create sample data
```bash
node create-sample-data.js
```

#### Issue 4: CORS errors
**Solution:** Check backend CORS configuration
```javascript
app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
}));
```

### Data Flow Verification:

#### Backend → Database Query:
```sql
SELECT COUNT(*) FROM users WHERE status = 'active';
SELECT COUNT(*) FROM proposals;
SELECT status, COUNT(*) FROM proposals GROUP BY status;
```

#### Expected API Response Structure:
```json
{
    "success": true,
    "message": "System overview data retrieved successfully",
    "data": {
        "overview": {
            "total_users": 150,
            "active_users": 120,
            "total_proposals": 45,
            "total_departments": 8
        },
        "proposal_stats": [
            {"status": "approved", "count": 25},
            {"status": "pending", "count": 15},
            {"status": "rejected", "count": 5}
        ]
    }
}
```

#### Frontend Processing:
```javascript
const processedData = {
    activeUsers: apiData?.overview?.active_users || 0,
    totalProposals: apiData?.overview?.total_proposals || 0,
    pendingReviews: apiData?.proposal_stats?.find(p => p.status === 'pending')?.count || 0,
    approvedProposals: apiData?.proposal_stats?.find(p => p.status === 'approved')?.count || 0
};
```

### Quick Fix Commands:

```bash
# 1. Restart backend with logging
cd backend && DEBUG=* npm start

# 2. Check if database has data
node -e "
const db = require('./backend/config/Database.js').default;
db.query('SELECT COUNT(*) as count FROM users').then(console.log);
"

# 3. Create test data
node create-sample-data.js

# 4. Test API directly
curl http://localhost:5000/api/dashboard/demo | jq .

# 5. Start frontend with debugging
cd frontend && REACT_APP_DEBUG=true npm start
```

### Success Indicators:
- ✅ No "Demo Data" badge when logged in
- ✅ Real numbers showing in SystemOverview cards
- ✅ Charts displaying actual data
- ✅ Console logs showing successful API calls
- ✅ No error messages in browser console

### Next Steps if Still Not Working:
1. Check network tab in DevTools for failed requests
2. Verify database connection and content
3. Test with Postman or similar API client
4. Check backend logs for errors
5. Verify environment variables (REACT_APP_API_URL)
