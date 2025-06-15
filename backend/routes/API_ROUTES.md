# SmartProposal API Routes Documentation

## Base URL
All API routes are prefixed with `/api`

## Authentication
Most endpoints require authentication via the `verifyUser` middleware. Public endpoints are noted below.

## Available Endpoints

### 1. Dashboard Routes (`/api/dashboard`)
- `GET /api/dashboard` - Get dashboard data based on user role
- `GET /api/dashboard/admin` - Get admin dashboard
- `GET /api/dashboard/wadir` - Get wadir dashboard
- `GET /api/dashboard/dosen` - Get dosen dashboard
- `GET /api/dashboard/reviewer` - Get reviewer dashboard
- `GET /api/dashboard/bendahara` - Get bendahara dashboard

### 2. Proposal Routes (`/api/proposals`)
- `GET /api/proposals` - Get all proposals (with pagination, filters)
- `GET /api/proposals/stats` - Get proposal statistics
- `GET /api/proposals/user/:userId` - Get proposals by user
- `GET /api/proposals/:id` - Get proposal by ID
- `POST /api/proposals` - Create new proposal
- `PUT /api/proposals/:id` - Update proposal
- `DELETE /api/proposals/:id` - Delete proposal
- `PATCH /api/proposals/:id/submit` - Submit proposal

### 3. User Routes (`/api/users`)
- `GET /api/users` - Get all users
- `GET /api/users/stats` - Get user statistics
- `GET /api/users/role/:role` - Get users by role
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user
- `PATCH /api/users/:id/password` - Change user password
- `PATCH /api/users/:id/status` - Update user status
- `PATCH /api/users/:id/last-login` - Update last login

### 4. Department Routes (`/api/departments`)
- `GET /api/departments` - Get all departments
- `GET /api/departments/hierarchy` - Get department hierarchy
- `GET /api/departments/stats` - Get department statistics
- `GET /api/departments/:id` - Get department by ID
- `POST /api/departments` - Create new department
- `PUT /api/departments/:id` - Update department
- `DELETE /api/departments/:id` - Delete department

### 5. Review Routes (`/api/reviews`)
- `GET /api/reviews` - Get all reviews
- `GET /api/reviews/stats` - Get review statistics
- `GET /api/reviews/proposal/:proposalId` - Get reviews by proposal
- `GET /api/reviews/reviewer/:reviewerId` - Get reviews by reviewer
- `GET /api/reviews/:id` - Get review by ID
- `POST /api/reviews` - Create new review
- `POST /api/reviews/assign` - Assign reviewer to proposal
- `PUT /api/reviews/:id` - Update review
- `DELETE /api/reviews/:id` - Delete review

### 6. Document Routes (`/api/documents`)
- `GET /api/documents` - Get all documents
- `GET /api/documents/stats` - Get document statistics
- `GET /api/documents/entity/:entityType/:entityId` - Get documents by entity
- `GET /api/documents/user/:userId` - Get documents by user
- `GET /api/documents/:id` - Get document by ID
- `POST /api/documents/upload` - Upload new document
- `PUT /api/documents/:id` - Update document
- `DELETE /api/documents/:id` - Delete document
- `PATCH /api/documents/:id/approve` - Approve document
- `PATCH /api/documents/:id/reject` - Reject document

### 7. Financial Report Routes (`/api/financial-reports`)
- `GET /api/financial-reports` - Get all financial reports
- `GET /api/financial-reports/stats` - Get financial report statistics
- `GET /api/financial-reports/proposal/:proposalId` - Get financial reports by proposal
- `GET /api/financial-reports/:id` - Get financial report by ID
- `POST /api/financial-reports` - Create new financial report
- `PUT /api/financial-reports/:id` - Update financial report
- `DELETE /api/financial-reports/:id` - Delete financial report
- `PATCH /api/financial-reports/:id/submit` - Submit financial report
- `PATCH /api/financial-reports/:id/verify` - Verify financial report
- `PATCH /api/financial-reports/:id/reject` - Reject financial report

### 8. Fund Utilization Routes (`/api/fund-utilizations`)
- `GET /api/fund-utilizations` - Get all fund utilizations
- `GET /api/fund-utilizations/stats` - Get fund utilization statistics
- `GET /api/fund-utilizations/status/:status` - Get fund utilizations by status
- `GET /api/fund-utilizations/proposal/:proposalId` - Get fund utilizations by proposal
- `GET /api/fund-utilizations/:id` - Get fund utilization by ID
- `POST /api/fund-utilizations` - Create new fund utilization
- `PUT /api/fund-utilizations/:id` - Update fund utilization
- `DELETE /api/fund-utilizations/:id` - Delete fund utilization
- `PATCH /api/fund-utilizations/:id/verify` - Verify fund utilization
- `PATCH /api/fund-utilizations/:id/reject` - Reject fund utilization

### 9. Activity Log Routes (`/api/activity-logs`)
- `GET /api/activity-logs` - Get all activity logs
- `GET /api/activity-logs/recent` - Get recent activities
- `GET /api/activity-logs/stats` - Get activity log statistics
- `GET /api/activity-logs/type/:type` - Get activity logs by type
- `GET /api/activity-logs/user/:userId` - Get activity logs by user
- `GET /api/activity-logs/:id` - Get activity log by ID
- `POST /api/activity-logs` - Create new activity log
- `DELETE /api/activity-logs/:id` - Delete activity log
- `DELETE /api/activity-logs/old/clear` - Clear old activity logs

### 10. Resource Routes (`/api/resources`)
- `GET /api/resources` - Get all resources
- `GET /api/resources/search` - Search resources
- `GET /api/resources/latest` - Get latest resources
- `GET /api/resources/categories` - Get resource categories
- `GET /api/resources/stats` - Get resource statistics
- `GET /api/resources/category/:category` - Get resources by category
- `GET /api/resources/:id` - Get resource by ID
- `POST /api/resources` - Create new resource
- `PUT /api/resources/:id` - Update resource
- `DELETE /api/resources/:id` - Delete resource

### 11. FAQ Routes (`/api/faqs`) - *Some public endpoints*
- `GET /api/faqs` - Get all FAQs (public)
- `GET /api/faqs/search` - Search FAQs (public)
- `GET /api/faqs/popular` - Get popular FAQs (public)
- `GET /api/faqs/categories` - Get FAQ categories (public)
- `GET /api/faqs/stats` - Get FAQ statistics (admin only)
- `GET /api/faqs/category/:category` - Get FAQs by category (public)
- `GET /api/faqs/:id` - Get FAQ by ID (public)
- `POST /api/faqs` - Create new FAQ (admin only)
- `POST /api/faqs/bulk` - Bulk create FAQs (admin only)
- `PUT /api/faqs/:id` - Update FAQ (admin only)
- `DELETE /api/faqs/:id` - Delete FAQ (admin only)

## System Routes
- `GET /api/health` - API health check (public)
- `GET /api/docs` - API documentation (public)

## Legacy Routes (for backward compatibility)
- `/api/admin/*` - Administrator routes
- `/api/customer/*` - Customer routes
- `/api/shared/*` - Shared routes (auth, etc.)

## Query Parameters
Most GET endpoints support common query parameters:
- `page` - Page number for pagination (default: 1)
- `limit` - Items per page (default: 10)
- `search` - Search term
- `status` - Filter by status
- `sort` - Sort field
- `order` - Sort order (asc/desc)

## Response Format
All API responses follow this format:
```json
{
  "success": true/false,
  "message": "Response message",
  "data": {}, // Response data
  "pagination": {}, // For paginated responses
  "error": "Error message" // Only for error responses
}
```

## Error Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error
