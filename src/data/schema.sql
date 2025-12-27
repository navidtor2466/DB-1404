-- =============================================
-- HAMSAFAR MIRZA - Database Schema
-- Phase 3: Practical Implementation
-- Based on Phase 2 Logical Design (3NF)
-- =============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- USERS & SPECIALIZATION (Disjoint, Total)
-- =============================================
CREATE TABLE users (
    user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    password_hash VARCHAR(255) NOT NULL,
    profile_image VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW(),
    -- User type for disjoint, total specialization
    user_type VARCHAR(20) NOT NULL CHECK (user_type IN ('regular', 'moderator', 'admin'))
);

-- Subtype: Regular Users
CREATE TABLE regular_users (
    user_id UUID PRIMARY KEY REFERENCES users(user_id) ON DELETE CASCADE,
    travel_preferences JSONB DEFAULT '[]',
    experience_level VARCHAR(20) DEFAULT 'beginner' 
        CHECK (experience_level IN ('beginner', 'intermediate', 'advanced', 'expert'))
);

-- Subtype: Moderators
CREATE TABLE moderators (
    user_id UUID PRIMARY KEY REFERENCES users(user_id) ON DELETE CASCADE,
    assigned_regions JSONB DEFAULT '[]',
    approval_count INT DEFAULT 0
);

-- Subtype: Admins
CREATE TABLE admins (
    user_id UUID PRIMARY KEY REFERENCES users(user_id) ON DELETE CASCADE,
    access_level INT DEFAULT 1 CHECK (access_level >= 1 AND access_level <= 5),
    last_admin_action TIMESTAMP
);

-- =============================================
-- PROFILE (Weak Entity - depends on USERS)
-- =============================================
CREATE TABLE profiles (
    profile_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL UNIQUE REFERENCES users(user_id) ON DELETE CASCADE,
    bio TEXT,
    cover_image VARCHAR(255)
);

-- Multi-valued attribute: interests
CREATE TABLE profile_interests (
    profile_id UUID REFERENCES profiles(profile_id) ON DELETE CASCADE,
    interest VARCHAR(100) NOT NULL,
    PRIMARY KEY (profile_id, interest)
);

-- =============================================
-- SOCIAL: FOLLOWS (Recursive M:N on USERS)
-- =============================================
CREATE TABLE follows (
    follower_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    following_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW(),
    PRIMARY KEY (follower_id, following_id),
    CHECK (follower_id != following_id) -- Cannot follow yourself
);

-- =============================================
-- CITIES & PLACES
-- =============================================
CREATE TABLE cities (
    city_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    province VARCHAR(100),
    country VARCHAR(100) DEFAULT 'Iran',
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8)
);

CREATE TABLE places (
    place_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    city_id UUID REFERENCES cities(city_id) ON DELETE SET NULL,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    map_url VARCHAR(255)
);

-- Multi-valued: features
CREATE TABLE place_features (
    place_id UUID REFERENCES places(place_id) ON DELETE CASCADE,
    feature VARCHAR(100) NOT NULL,
    PRIMARY KEY (place_id, feature)
);

-- Multi-valued: images
CREATE TABLE place_images (
    place_id UUID REFERENCES places(place_id) ON DELETE CASCADE,
    image_url VARCHAR(255) NOT NULL,
    PRIMARY KEY (place_id, image_url)
);

-- =============================================
-- POSTS
-- =============================================
CREATE TABLE posts (
    post_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    place_id UUID REFERENCES places(place_id) ON DELETE SET NULL,
    city_id UUID REFERENCES cities(city_id) ON DELETE SET NULL,
    title VARCHAR(200) NOT NULL,
    content TEXT,
    experience_type VARCHAR(20) CHECK (experience_type IN ('visited', 'imagined')),
    approval_status VARCHAR(20) DEFAULT 'pending' 
        CHECK (approval_status IN ('pending', 'approved', 'rejected')),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Multi-valued: images
CREATE TABLE post_images (
    post_id UUID REFERENCES posts(post_id) ON DELETE CASCADE,
    image_url VARCHAR(255) NOT NULL,
    PRIMARY KEY (post_id, image_url)
);

-- =============================================
-- COMMENTS (Weak Entity - depends on POSTS)
-- =============================================
CREATE TABLE comments (
    comment_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    post_id UUID NOT NULL REFERENCES posts(post_id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- =============================================
-- RATINGS (M:N between USERS and POSTS)
-- =============================================
CREATE TABLE ratings (
    user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    post_id UUID REFERENCES posts(post_id) ON DELETE CASCADE,
    score INT NOT NULL CHECK (score >= 1 AND score <= 5),
    created_at TIMESTAMP DEFAULT NOW(),
    PRIMARY KEY (user_id, post_id)
);

-- =============================================
-- COMPANION SYSTEM
-- =============================================
CREATE TABLE companion_requests (
    request_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    destination_place_id UUID REFERENCES places(place_id) ON DELETE SET NULL,
    destination_city_id UUID REFERENCES cities(city_id) ON DELETE SET NULL,
    travel_date DATE NOT NULL,
    description TEXT,
    status VARCHAR(20) DEFAULT 'active' 
        CHECK (status IN ('active', 'completed', 'cancelled')),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Multi-valued: conditions
CREATE TABLE request_conditions (
    request_id UUID REFERENCES companion_requests(request_id) ON DELETE CASCADE,
    condition VARCHAR(100) NOT NULL,
    PRIMARY KEY (request_id, condition)
);

CREATE TABLE companion_matches (
    match_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    request_id UUID NOT NULL REFERENCES companion_requests(request_id) ON DELETE CASCADE,
    companion_user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    status VARCHAR(20) DEFAULT 'pending' 
        CHECK (status IN ('pending', 'accepted', 'rejected')),
    message TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- =============================================
-- VIEWS (Derived Attributes)
-- =============================================

-- Profile with follower/following counts (derived attributes)
CREATE VIEW profiles_with_counts AS
SELECT 
    p.*,
    u.name,
    u.username,
    u.email,
    u.profile_image,
    u.user_type,
    (SELECT COUNT(*) FROM follows WHERE following_id = p.user_id) AS followers_count,
    (SELECT COUNT(*) FROM follows WHERE follower_id = p.user_id) AS following_count
FROM profiles p
JOIN users u ON p.user_id = u.user_id;

-- Posts with average rating (derived attribute)
CREATE VIEW posts_with_rating AS
SELECT 
    p.*,
    COALESCE(AVG(r.score)::DECIMAL(3,2), 0) AS avg_rating,
    COUNT(r.user_id) AS rating_count
FROM posts p
LEFT JOIN ratings r ON p.post_id = r.post_id
GROUP BY p.post_id;

-- =============================================
-- INDEXES (for better performance)
-- =============================================
CREATE INDEX idx_posts_user_id ON posts(user_id);
CREATE INDEX idx_posts_place_id ON posts(place_id);
CREATE INDEX idx_posts_city_id ON posts(city_id);
CREATE INDEX idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX idx_comments_post_id ON comments(post_id);
CREATE INDEX idx_ratings_post_id ON ratings(post_id);
CREATE INDEX idx_follows_follower ON follows(follower_id);
CREATE INDEX idx_follows_following ON follows(following_id);
CREATE INDEX idx_companion_requests_status ON companion_requests(status);
CREATE INDEX idx_companion_requests_travel_date ON companion_requests(travel_date);
CREATE INDEX idx_places_city_id ON places(city_id);

-- =============================================
-- TRIGGERS (for maintaining data integrity)
-- =============================================

-- Auto-create profile when user is created
CREATE OR REPLACE FUNCTION create_profile_for_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO profiles (user_id) VALUES (NEW.user_id);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_create_profile
AFTER INSERT ON users
FOR EACH ROW
EXECUTE FUNCTION create_profile_for_user();

-- Auto-create subtype record based on user_type
CREATE OR REPLACE FUNCTION create_user_subtype()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.user_type = 'regular' THEN
        INSERT INTO regular_users (user_id) VALUES (NEW.user_id);
    ELSIF NEW.user_type = 'moderator' THEN
        INSERT INTO moderators (user_id) VALUES (NEW.user_id);
    ELSIF NEW.user_type = 'admin' THEN
        INSERT INTO admins (user_id) VALUES (NEW.user_id);
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_create_subtype
AFTER INSERT ON users
FOR EACH ROW
EXECUTE FUNCTION create_user_subtype();

-- =============================================
-- SAMPLE DATA
-- =============================================

-- Insert Cities
INSERT INTO cities (city_id, name, description, province, country, latitude, longitude) VALUES
    ('c1000000-0000-0000-0000-000000000001', 'اصفهان', 'نصف جهان، شهر هنر و معماری ایران', 'اصفهان', 'ایران', 32.6546, 51.6680),
    ('c1000000-0000-0000-0000-000000000002', 'شیراز', 'شهر شعر و گل، زادگاه حافظ و سعدی', 'فارس', 'ایران', 29.5918, 52.5836),
    ('c1000000-0000-0000-0000-000000000003', 'یزد', 'شهر بادگیرها و اولین شهر خشتی جهان', 'یزد', 'ایران', 31.8974, 54.3569),
    ('c1000000-0000-0000-0000-000000000004', 'کاشان', 'شهر گلاب و خانه‌های تاریخی زیبا', 'اصفهان', 'ایران', 33.9850, 51.4100),
    ('c1000000-0000-0000-0000-000000000005', 'تبریز', 'شهر اولین‌ها و بازار تاریخی بزرگ', 'آذربایجان شرقی', 'ایران', 38.0800, 46.2919);

-- Insert Places
INSERT INTO places (place_id, city_id, name, description, latitude, longitude) VALUES
    ('p1000000-0000-0000-0000-000000000001', 'c1000000-0000-0000-0000-000000000001', 'میدان نقش جهان', 'یکی از بزرگترین میادین تاریخی جهان و میراث جهانی یونسکو', 32.6572, 51.6780),
    ('p1000000-0000-0000-0000-000000000002', 'c1000000-0000-0000-0000-000000000001', 'سی و سه پل', 'پل تاریخی و نماد شهر اصفهان بر روی زاینده‌رود', 32.6431, 51.6611),
    ('p1000000-0000-0000-0000-000000000003', 'c1000000-0000-0000-0000-000000000002', 'تخت جمشید', 'کاخ هخامنشیان و یکی از مهم‌ترین آثار باستانی جهان', 29.9349, 52.8918),
    ('p1000000-0000-0000-0000-000000000004', 'c1000000-0000-0000-0000-000000000002', 'حافظیه', 'آرامگاه حافظ شیرازی، شاعر بزرگ ایران', 29.6202, 52.5481),
    ('p1000000-0000-0000-0000-000000000005', 'c1000000-0000-0000-0000-000000000003', 'مسجد جامع یزد', 'مسجدی با بلندترین مناره‌های ایران', 31.8979, 54.3556);

-- Insert Place Features
INSERT INTO place_features (place_id, feature) VALUES
    ('p1000000-0000-0000-0000-000000000001', 'میراث یونسکو'),
    ('p1000000-0000-0000-0000-000000000001', 'بازار سنتی'),
    ('p1000000-0000-0000-0000-000000000001', 'معماری صفوی'),
    ('p1000000-0000-0000-0000-000000000003', 'میراث یونسکو'),
    ('p1000000-0000-0000-0000-000000000003', 'باستان‌شناسی');

-- =============================================
-- END OF SCHEMA
-- =============================================
