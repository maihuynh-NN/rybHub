-- Create dtb
CREATE DATABASE ryb_management;

-- 1. Table: user (auth and roles)
CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    avatar_url VARCHAR(255),
    role VARCHAR(20) DEFAULT 'regular' CHECK (role IN('admin', 'privileged', 'regular')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Table: buildings
CREATE TABLE buildings (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    label VARCHAR(50) NOT NULL,
    address TEXT,
    image_url VARCHAR(255),
    calculation_method INTEGER DEFAULT 1 CHECK (calculation_method IN(1,2,3)),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by INTEGER REFERENCES users(id)
);

-- 3. Table: rooms
CREATE TABLE rooms(
    id SERIAL PRIMARY KEY,
    building_id INTEGER REFERENCES buildings(id) ON DELETE CASCADE,
    room_number VARCHAR(20) NOT NULL,
    status VARCHAR(20) DEFAULT 'empty' CHECK( status IN('in_rent', 'empty')),
    size VARCHAR(50),
    amenities TEXT,
    room_fee DECIMAL(10, 2),
    images JSONB DEFAULT '[]',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    UNIQUE(building_id, room_number)
);

-- Index for performance
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_buildings_label ON buildings(label);
CREATE INDEX idx_rooms_building ON rooms(building_id);
CREATE INDEX idx_room_status ON rooms(status);

-- INSERT DEFAUT ADMIN USE
INSERT INTO users (username, email, password_hash, full_name, role) 
VALUES ('admin', 'admin@apartment.com', '$2b$10$placeholder', 'Anh Vu', 'admin');