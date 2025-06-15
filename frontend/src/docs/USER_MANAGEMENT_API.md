# User Management API Integration

## 📋 Overview

This document describes the complete API integration for the User Management module in SmartProposal. The integration connects the React frontend with the Node.js/Express backend using RESTful APIs.

## 🏗️ Architecture

```
Frontend (React)  ←→  API Service Layer  ←→  Backend (Express)  ←→  Database (MySQL)
```

## 📁 Files Created/Modified

### Frontend Files

#### 1. **Services**
- `frontend/src/services/userService.js` - API service layer for user operations
- `frontend/src/hooks/useUserManagement.js` - Custom React hook for user management

#### 2. **Components Updated**
- `frontend/src/views/admin/usermanagement/index.jsx` - Main user directory (replaced dummy data with API calls)
- `frontend/src/views/admin/usermanagement/components/AddNewUser.jsx` - Add user form (integrated with API)

#### 3. **Utilities**
- `frontend/src/components/ui/index.js` - Reusable UI components (Alert, Loading, Modal, etc.)
- `frontend/src/utils/testAPI.js` - API testing utilities
- `frontend/.env` - Environment configuration

### Backend Files (Already Existed)

#### 1. **Controllers**
- `backend/controllers/userController.js` ✅ - Complete CRUD operations
- `backend/controllers/dashboardController.js` ✅ - Dashboard statistics

#### 2. **Routes**
- `backend/routes/api/userRoutes.js` ✅ - User API endpoints
- `backend/routes/api/index.js` ✅ - API router configuration

#### 3. **Models**
- `backend/models/userModel.js` ✅ - User database model
- `backend/middleware/AuthUser.js` ✅ - Authentication middleware

## 🔌 API Endpoints

### User Management Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/users` | Get all users (with pagination/filters) | ✅ Admin/Wadir |
| GET | `/api/users/stats` | Get user statistics | ✅ Admin/Wadir |
| GET | `/api/users/:id` | Get user by ID | ✅ Own profile or Admin |
| POST | `/api/users` | Create new user | ✅ Admin/Wadir |
| PUT | `/api/users/:id` | Update user | ✅ Own profile or Admin |
| DELETE | `/api/users/:id` | Delete user | ✅ Admin only |
| PATCH | `/api/users/:id/status` | Update user status | ✅ Admin/Wadir |
| PATCH | `/api/users/:id/password` | Change password | ✅ Own profile or Admin |
| GET | `/api/users/role/:role` | Get users by role | ✅ Admin/Wadir |

### Query Parameters (GET /api/users)

```javascript
{
  page: 1,           // Page number
  limit: 10,         // Items per page
  search: "john",    // Search in name, email, username
  role: "dosen",     // Filter by role
  status: "active",  // Filter by status
  department: "CS",  // Filter by department
  faculty: "Engineering" // Filter by faculty
}
```

## 🚀 Usage Examples

### 1. Basic Usage in Components

```jsx
import { useUserManagement } from '../../../hooks/useUserManagement';

const MyComponent = () => {
  const {
    users,
    userStats,
    loading,
    error,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser
  } = useUserManagement();

  // Component logic here
};
```

### 2. Creating a New User

```jsx
const handleCreateUser = async (userData) => {
  const result = await createUser({
    username: "john.doe",
    password: "SecurePass123!",
    email: "john.doe@polimdo.ac.id",
    full_name: "John Doe",
    role: "dosen",
    department: "Computer Science",
    status: "active"
  });

  if (result.success) {
    console.log('User created successfully');
  } else {
    console.error('Failed to create user:', result.message);
  }
};
```

### 3. Filtering Users

```jsx
// Fetch users with filters
useEffect(() => {
  fetchUsers({
    page: 1,
    limit: 10,
    role: 'dosen',
    status: 'active',
    search: 'john'
  });
}, []);
```

## 🎛️ Frontend State Management

### useUserManagement Hook State

```javascript
{
  // Data
  users: [],              // Array of user objects
  userStats: {},          // User statistics object
  loading: false,         // Loading state
  error: null,            // Error message
  pagination: {},         // Pagination info
  
  // Actions
  fetchUsers,             // Fetch users with filters
  createUser,             // Create new user
  updateUser,             // Update existing user
  deleteUser,             // Delete user
  updateUserStatus,       // Update user status
  getUserById,            // Get user details
  changePassword,         // Change user password
  getUsersByRole,         // Get users by role
  
  // Utilities
  clearError              // Clear error state
}
```

## 🔒 Authentication & Authorization

### Session-Based Authentication
- Uses Express sessions with cookies
- Automatic session validation through middleware
- Redirects to login if unauthorized

### Role-Based Access Control
- **Admin**: Full access to all user operations
- **Wadir**: Can view/create/update users (limited delete)
- **Other roles**: Can only view/update own profile

## 🚨 Error Handling

### Frontend Error Handling

```jsx
// Component error states
{error && (
  <Alert type="error" message={error} />
)}

// Loading states
{loading && (
  <LoadingSpinner text="Loading users..." />
)}

// API call error handling
const result = await createUser(userData);
if (!result.success) {
  showMessage('error', result.message);
}
```

### Backend Error Responses

```javascript
// Error response format
{
  success: false,
  message: "Error description",
  error: "Detailed error information"
}

// Success response format
{
  success: true,
  message: "Operation successful",
  data: { /* response data */ }
}
```

## 🧪 Testing

### Running API Tests

```javascript
// In browser console
import { testAPI } from './utils/testAPI';

// Test all endpoints
testAPI.runAllTests();

// Test specific functionality
testAPI.testConnection();
testAPI.testUserEndpoints();
testAPI.testCreateUser();
```

### Testing Checklist

- [ ] API connection established
- [ ] User authentication working
- [ ] CRUD operations functional
- [ ] Pagination working
- [ ] Filtering working
- [ ] Error handling working
- [ ] Loading states working
- [ ] Real-time updates working

## 🔧 Configuration

### Environment Variables

```bash
# Frontend (.env)
REACT_APP_API_URL=http://localhost:5000
REACT_APP_NAME=SmartProposal
REACT_APP_VERSION=1.0.0
NODE_ENV=development

# Backend (.env)
PORT=5000
DB_HOST=localhost
DB_NAME=smartproposal
DB_USER=root
DB_PASS=password
SESSION_SECRET=your_session_secret
```

## 📊 Performance Considerations

### Frontend Optimizations
- Debounced search input
- Pagination for large datasets
- Memoized components where appropriate
- Error boundaries for fault tolerance

### Backend Optimizations
- Indexed database queries
- Pagination limits
- Input validation
- Rate limiting (can be added)

## 🐛 Common Issues & Solutions

### 1. CORS Issues
```javascript
// Ensure backend CORS is configured
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
```

### 2. Session Issues
```javascript
// Ensure cookies are included in requests
const api = axios.create({
  withCredentials: true
});
```

### 3. Environment Variables
```javascript
// Check if API URL is loaded
console.log('API URL:', process.env.REACT_APP_API_URL);
```

## 🚀 Deployment Notes

### Frontend Deployment
1. Update `REACT_APP_API_URL` for production
2. Build application: `npm run build`
3. Deploy to web server

### Backend Deployment
1. Ensure database is accessible
2. Update environment variables
3. Start server: `npm start`

## 📝 Next Steps

### Immediate (Phase 1)
- [ ] Test complete integration
- [ ] Fix any API connection issues
- [ ] Verify authentication flow
- [ ] Test CRUD operations

### Short Term (Phase 2)
- [ ] Add user profile picture upload
- [ ] Implement user bulk operations
- [ ] Add advanced filtering
- [ ] Add export functionality

### Long Term (Phase 3)
- [ ] Add real-time notifications
- [ ] Implement user activity tracking
- [ ] Add user analytics dashboard
- [ ] Add user management reports

## 🆘 Support

If you encounter issues:

1. Check browser console for errors
2. Verify API endpoint availability
3. Check network tab for failed requests
4. Verify authentication status
5. Check backend logs

For testing API connectivity, use the provided test utilities:

```javascript
// Quick API test
import { testAPI } from './utils/testAPI';
testAPI.testConnection();
```
