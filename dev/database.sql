-- Database schema for SmartProposal Application

-- Users and Authentication
CREATE TABLE users (
    id VARCHAR(36) PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    role ENUM('admin', 'wadir', 'dosen', 'bendahara', 'reviewer') NOT NULL,
    faculty VARCHAR(100),
    department VARCHAR(100),
    position VARCHAR(100),
    profile_image VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL,
    status ENUM('active', 'inactive') DEFAULT 'active'
);

-- Sessions for proposal submissions
CREATE TABLE sessions (
    id VARCHAR(20) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    status ENUM('upcoming', 'active', 'closed') NOT NULL,
    start_date DATETIME NOT NULL,
    end_date DATETIME NOT NULL,
    final_report_deadline DATETIME,
    created_by VARCHAR(36),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    total_budget DECIMAL(15,2),
    remaining_days INT,
    FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Faculties/Departments
CREATE TABLE departments (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    code VARCHAR(20) UNIQUE NOT NULL,
    parent_id VARCHAR(36) NULL,
    head_id VARCHAR(36),
    contact_email VARCHAR(100),
    contact_phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (head_id) REFERENCES users(id),
    FOREIGN KEY (parent_id) REFERENCES departments(id)
);

-- Proposals
CREATE TABLE proposals (
    id VARCHAR(20) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    user_id VARCHAR(36) NOT NULL,
    session_id VARCHAR(20) NOT NULL,
    department_id VARCHAR(36) NOT NULL,
    status ENUM('draft', 'submitted', 'under_review', 'approved', 'rejected', 'revision_required') NOT NULL,
    ml_score DECIMAL(5,2),
    budget DECIMAL(15,2) NOT NULL,
    type VARCHAR(50) NOT NULL,
    priority ENUM('high', 'medium', 'low') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    submitted_at DATETIME NULL,
    deadline DATETIME NULL,
    progress INT DEFAULT 0,
    reject_reason TEXT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (session_id) REFERENCES sessions(id),
    FOREIGN KEY (department_id) REFERENCES departments(id)
);

-- Proposal Details
CREATE TABLE proposal_details (
    proposal_id VARCHAR(20) PRIMARY KEY,
    completeness DECIMAL(5,2) DEFAULT 0,
    format DECIMAL(5,2) DEFAULT 0,
    budget_validity DECIMAL(5,2) DEFAULT 0,
    timeline_realism DECIMAL(5,2) DEFAULT 0,
    innovation_score DECIMAL(5,2) DEFAULT 0,
    feasibility_score DECIMAL(5,2) DEFAULT 0,
    methodology_score DECIMAL(5,2) DEFAULT 0,
    impact_score DECIMAL(5,2) DEFAULT 0,
    sustainability_score DECIMAL(5,2) DEFAULT 0,
    FOREIGN KEY (proposal_id) REFERENCES proposals(id) ON DELETE CASCADE
);

-- Collaborators for proposals
CREATE TABLE collaborators (
    id VARCHAR(36) PRIMARY KEY,
    proposal_id VARCHAR(20) NOT NULL,
    name VARCHAR(100) NOT NULL,
    role VARCHAR(50) NOT NULL,
    email VARCHAR(100),
    institution VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (proposal_id) REFERENCES proposals(id) ON DELETE CASCADE
);

-- Document management
CREATE TABLE documents (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    file_path VARCHAR(255) NOT NULL,
    size VARCHAR(20) NOT NULL,
    format VARCHAR(20) NOT NULL,
    upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'pending',
    notes TEXT,
    entity_type ENUM('proposal', 'report', 'resource') NOT NULL,
    entity_id VARCHAR(36) NOT NULL,
    uploaded_by VARCHAR(36) NOT NULL,
    FOREIGN KEY (uploaded_by) REFERENCES users(id)
);

-- Reviews and validations
CREATE TABLE reviews (
    id VARCHAR(36) PRIMARY KEY,
    proposal_id VARCHAR(20) NOT NULL,
    reviewer_id VARCHAR(36) NOT NULL,
    score DECIMAL(5,2),
    comments TEXT,
    recommendation ENUM('approve', 'reject', 'revise') NOT NULL,
    review_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('pending', 'completed') DEFAULT 'pending',
    FOREIGN KEY (proposal_id) REFERENCES proposals(id) ON DELETE CASCADE,
    FOREIGN KEY (reviewer_id) REFERENCES users(id)
);

-- ML validation metrics
CREATE TABLE ml_validations (
    id VARCHAR(36) PRIMARY KEY,
    proposal_id VARCHAR(20) NOT NULL,
    accuracy DECIMAL(5,2) NOT NULL,
    precision_score DECIMAL(5,2) NOT NULL,
    recall DECIMAL(5,2) NOT NULL,
    f1_score DECIMAL(5,2) NOT NULL,
    false_positive_rate DECIMAL(5,2),
    false_negative_rate DECIMAL(5,2),
    validation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    override_by VARCHAR(36) NULL,
    override_reason TEXT NULL,
    FOREIGN KEY (proposal_id) REFERENCES proposals(id) ON DELETE CASCADE,
    FOREIGN KEY (override_by) REFERENCES users(id)
);

-- Budget allocations
CREATE TABLE budget_allocations (
    id VARCHAR(36) PRIMARY KEY,
    session_id VARCHAR(20) NOT NULL,
    department_id VARCHAR(36) NOT NULL,
    amount DECIMAL(15,2) NOT NULL,
    allocation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    allocated_by VARCHAR(36) NOT NULL,
    status ENUM('planned', 'allocated', 'utilized') NOT NULL,
    notes TEXT,
    FOREIGN KEY (session_id) REFERENCES sessions(id),
    FOREIGN KEY (department_id) REFERENCES departments(id),
    FOREIGN KEY (allocated_by) REFERENCES users(id)
);

-- Budget distributions by category
CREATE TABLE budget_categories (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    code VARCHAR(20) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Financial Reports
CREATE TABLE financial_reports (
    id VARCHAR(20) PRIMARY KEY,
    proposal_id VARCHAR(20) NOT NULL,
    title VARCHAR(255) NOT NULL,
    report_type ENUM('monthly', 'quarterly', 'session', 'final', 'audit') NOT NULL,
    period VARCHAR(50) NOT NULL,
    submitted_by VARCHAR(36) NOT NULL,
    submission_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('draft', 'submitted', 'verified', 'rejected') NOT NULL,
    format VARCHAR(10) DEFAULT 'PDF',
    verification_date TIMESTAMP NULL,
    verified_by VARCHAR(36) NULL,
    notes TEXT,
    FOREIGN KEY (proposal_id) REFERENCES proposals(id) ON DELETE CASCADE,
    FOREIGN KEY (submitted_by) REFERENCES users(id),
    FOREIGN KEY (verified_by) REFERENCES users(id)
);

-- Fund Utilization details
CREATE TABLE fund_utilizations (
    id VARCHAR(20) PRIMARY KEY,
    proposal_id VARCHAR(20) NOT NULL,
    title VARCHAR(255) NOT NULL,
    researcher VARCHAR(100) NOT NULL,
    faculty VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    submission_date DATE NOT NULL,
    amount_used DECIMAL(15,2) NOT NULL,
    total_allocated DECIMAL(15,2) NOT NULL,
    status ENUM('Menunggu Verifikasi', 'Terverifikasi', 'Ditolak') NOT NULL,
    notes TEXT,
    rejection_reason TEXT NULL,
    FOREIGN KEY (proposal_id) REFERENCES proposals(id) ON DELETE CASCADE
);

-- Final Reports
CREATE TABLE final_reports (
    id VARCHAR(36) PRIMARY KEY,
    proposal_id VARCHAR(20) NOT NULL,
    title VARCHAR(255) NOT NULL,
    abstract TEXT NOT NULL,
    introduction TEXT,
    methodology TEXT,
    results TEXT,
    discussion TEXT,
    conclusion TEXT,
    references TEXT,
    submission_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('draft', 'submitted', 'reviewed', 'approved', 'rejected') DEFAULT 'draft',
    FOREIGN KEY (proposal_id) REFERENCES proposals(id) ON DELETE CASCADE
);

-- Feedback for reports and proposals
CREATE TABLE feedbacks (
    id VARCHAR(36) PRIMARY KEY,
    entity_type ENUM('proposal', 'report', 'final_report') NOT NULL,
    entity_id VARCHAR(36) NOT NULL,
    reviewer VARCHAR(100) NOT NULL,
    section VARCHAR(50) NULL,
    message TEXT NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('resolved', 'unresolved') DEFAULT 'unresolved',
    response TEXT
);

-- Session statistics
CREATE TABLE session_statistics (
    id VARCHAR(36) PRIMARY KEY,
    session_id VARCHAR(20) NOT NULL,
    active_users INT DEFAULT 0,
    total_sessions INT DEFAULT 0,
    average_duration VARCHAR(10),
    security_alerts INT DEFAULT 0,
    FOREIGN KEY (session_id) REFERENCES sessions(id) ON DELETE CASCADE
);

-- Session device stats
CREATE TABLE session_device_stats (
    id VARCHAR(36) PRIMARY KEY,
    session_id VARCHAR(20) NOT NULL,
    desktop INT DEFAULT 0,
    mobile INT DEFAULT 0,
    tablet INT DEFAULT 0,
    FOREIGN KEY (session_id) REFERENCES sessions(id) ON DELETE CASCADE
);

-- Session browser stats
CREATE TABLE session_browser_stats (
    id VARCHAR(36) PRIMARY KEY,
    session_id VARCHAR(20) NOT NULL,
    chrome INT DEFAULT 0,
    firefox INT DEFAULT 0,
    safari INT DEFAULT 0,
    edge INT DEFAULT 0,
    FOREIGN KEY (session_id) REFERENCES sessions(id) ON DELETE CASCADE
);

-- Session location stats
CREATE TABLE session_location_stats (
    id VARCHAR(36) PRIMARY KEY,
    session_id VARCHAR(20) NOT NULL,
    city VARCHAR(50) NOT NULL,
    count INT DEFAULT 0,
    percentage DECIMAL(5,2) DEFAULT 0,
    FOREIGN KEY (session_id) REFERENCES sessions(id) ON DELETE CASCADE
);

-- Session time distribution
CREATE TABLE session_time_distribution (
    id VARCHAR(36) PRIMARY KEY,
    session_id VARCHAR(20) NOT NULL,
    morning INT DEFAULT 0,
    afternoon INT DEFAULT 0,
    evening INT DEFAULT 0,
    night INT DEFAULT 0,
    FOREIGN KEY (session_id) REFERENCES sessions(id) ON DELETE CASCADE
);

-- Session user roles
CREATE TABLE session_user_roles (
    id VARCHAR(36) PRIMARY KEY,
    session_id VARCHAR(20) NOT NULL,
    dosen INT DEFAULT 0,
    mahasiswa INT DEFAULT 0,
    admin INT DEFAULT 0,
    reviewer INT DEFAULT 0,
    lainnya INT DEFAULT 0,
    FOREIGN KEY (session_id) REFERENCES sessions(id) ON DELETE CASCADE
);

-- Security issues
CREATE TABLE security_issues (
    id VARCHAR(36) PRIMARY KEY,
    session_id VARCHAR(20) NOT NULL,
    type VARCHAR(100) NOT NULL,
    count INT DEFAULT 0,
    severity ENUM('high', 'medium', 'low') NOT NULL,
    FOREIGN KEY (session_id) REFERENCES sessions(id) ON DELETE CASCADE
);

-- Daily usage statistics
CREATE TABLE daily_usage (
    id VARCHAR(36) PRIMARY KEY,
    session_id VARCHAR(20) NOT NULL,
    time VARCHAR(5) NOT NULL,
    sessions INT DEFAULT 0,
    date DATE DEFAULT (CURRENT_DATE),
    FOREIGN KEY (session_id) REFERENCES sessions(id) ON DELETE CASCADE
);

-- Recent activities
CREATE TABLE recent_activities (
    id VARCHAR(36) PRIMARY KEY,
    user VARCHAR(100) NOT NULL,
    role VARCHAR(50) NOT NULL,
    action VARCHAR(255) NOT NULL,
    time VARCHAR(50) NOT NULL,
    device VARCHAR(50) NOT NULL,
    browser VARCHAR(50) NOT NULL,
    location VARCHAR(100) NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Log activities
CREATE TABLE activity_logs (
    id VARCHAR(36) PRIMARY KEY,
    type ENUM('proposal', 'system', 'document') NOT NULL,
    action VARCHAR(50) NOT NULL,
    user VARCHAR(100) NOT NULL,
    title VARCHAR(255) NOT NULL,
    timestamp VARCHAR(10) NOT NULL,
    date VARCHAR(20) NOT NULL,
    status ENUM('success', 'warning', 'error', 'info') NOT NULL,
    details TEXT,
    user_avatar VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Resources/Documentation
CREATE TABLE resources (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(50) NOT NULL,
    download_url VARCHAR(255),
    date VARCHAR(20) NOT NULL,
    size VARCHAR(10) NOT NULL,
    type VARCHAR(10) NOT NULL
);

-- FAQ Database
CREATE TABLE faq (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category VARCHAR(50) NOT NULL,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Laporan Akhir (Final Report) Sessions
CREATE TABLE laporan_akhir_sessions (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    status VARCHAR(50) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    duration VARCHAR(50),
    completion_date DATETIME,
    total_proposals INT,
    approved INT,
    rejected INT,
    revised INT,
    approval_rate DECIMAL(5,2),
    average_score DECIMAL(5,2),
    average_review_time VARCHAR(20),
    total_budget VARCHAR(50),
    allocated_budget VARCHAR(50)
);

-- Evaluation Metrics
CREATE TABLE evaluation_metrics (
    id VARCHAR(36) PRIMARY KEY,
    session_id VARCHAR(36) NOT NULL,
    metric_name VARCHAR(50) NOT NULL,
    value DECIMAL(5,2) NOT NULL,
    change VARCHAR(10) NOT NULL,
    FOREIGN KEY (session_id) REFERENCES laporan_akhir_sessions(id) ON DELETE CASCADE
);

-- ML Performance Metrics
CREATE TABLE ml_performance (
    id VARCHAR(36) PRIMARY KEY,
    session_id VARCHAR(36) NOT NULL,
    accuracy DECIMAL(5,2) NOT NULL,
    precision_score DECIMAL(5,2) NOT NULL,
    recall DECIMAL(5,2) NOT NULL,
    prediction_rate DECIMAL(5,2) NOT NULL,
    manual_override_rate DECIMAL(5,2) NOT NULL,
    time_reduction VARCHAR(10) NOT NULL,
    comparison_to_last VARCHAR(10) NOT NULL,
    FOREIGN KEY (session_id) REFERENCES laporan_akhir_sessions(id) ON DELETE CASCADE
);

-- Top Proposals
CREATE TABLE top_proposals (
    id VARCHAR(36) PRIMARY KEY,
    session_id VARCHAR(36) NOT NULL,
    proposal_id VARCHAR(20) NOT NULL,
    title VARCHAR(255) NOT NULL,
    department VARCHAR(100) NOT NULL,
    pi VARCHAR(100) NOT NULL,
    score DECIMAL(5,2) NOT NULL,
    budget VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL,
    FOREIGN KEY (session_id) REFERENCES laporan_akhir_sessions(id) ON DELETE CASCADE
);

-- Budget Distribution
CREATE TABLE budget_distribution (
    id VARCHAR(36) PRIMARY KEY,
    session_id VARCHAR(36) NOT NULL,
    category VARCHAR(100) NOT NULL,
    value DECIMAL(5,2) NOT NULL,
    FOREIGN KEY (session_id) REFERENCES laporan_akhir_sessions(id) ON DELETE CASCADE
);

-- Insights and Recommendations
CREATE TABLE insights_recommendations (
    id VARCHAR(36) PRIMARY KEY,
    session_id VARCHAR(36) NOT NULL,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    impact ENUM('Tinggi', 'Medium', 'Rendah') NOT NULL,
    status ENUM('new', 'implemented', 'pending') NOT NULL,
    FOREIGN KEY (session_id) REFERENCES laporan_akhir_sessions(id) ON DELETE CASCADE
);

-- Reports
CREATE TABLE reports (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL,
    date DATE NOT NULL,
    status ENUM('completed', 'pending') NOT NULL,
    department VARCHAR(100) NOT NULL,
    download_count INT DEFAULT 0,
    file_size VARCHAR(10) NOT NULL,
    file_type VARCHAR(10) NOT NULL,
    author VARCHAR(100) NOT NULL,
    last_modified DATE NOT NULL
);

-- Indexes for improved query performance
CREATE INDEX idx_proposals_user_id ON proposals(user_id);
CREATE INDEX idx_proposals_session_id ON proposals(session_id);
CREATE INDEX idx_proposals_status ON proposals(status);
CREATE INDEX idx_proposals_type ON proposals(type);
CREATE INDEX idx_financial_reports_proposal_id ON financial_reports(proposal_id);
CREATE INDEX idx_financial_reports_status ON financial_reports(status);
CREATE INDEX idx_fund_utilizations_status ON fund_utilizations(status);
CREATE INDEX idx_reviews_proposal_id ON reviews(proposal_id);
CREATE INDEX idx_reviews_reviewer_id ON reviews(reviewer_id);
CREATE INDEX idx_faq_category ON faq(category);
CREATE INDEX idx_documents_entity_id ON documents(entity_id);
CREATE INDEX idx_documents_entity_type ON documents(entity_type);
CREATE INDEX idx_activity_logs_type ON activity_logs(type);
