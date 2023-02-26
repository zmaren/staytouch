SET check_function_bodies = false;

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;
COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';

CREATE TABLE IF NOT EXISTS public.users (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY NOT NULL,
    username text UNIQUE NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL,
    gender text NOT NULL,
    password text NOT NULL
);

CREATE TABLE IF NOT EXISTS public.user_tracking (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY NOT NULL,
    user_id uuid NOT NULL,
    lat text NOT NULL,
    lng text NOT NULL
);

ALTER TABLE ONLY public.user_tracking
    ADD CONSTRAINT user_tracking_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE RESTRICT ON DELETE RESTRICT;

CREATE OR REPLACE FUNCTION find_users_within_radius(lat float, lng float, radius float, authUserId varchar)
RETURNS SETOF users AS $$
    SELECT users.*
    FROM users
    LEFT JOIN user_tracking on user_tracking.user_id = users.id
    WHERE user_tracking.user_id::varchar != $4::varchar
    AND (2 * 6371 * ASIN(
		SQRT (
			POWER (
				SIN(
					RADIANS(
						( user_tracking.lat::float - $1 ) / 2
					) 
				),
				2 
				) + COS( RADIANS( $1 ) ) * COS( RADIANS( user_tracking.lat::float ) ) * POWER (
				SIN(
					RADIANS(
						( user_tracking.lng::float - $2 ) / 2
					) 
				),
				2 
			) 
		) 
	)) <= $3
$$ LANGUAGE sql STABLE;

INSERT INTO users (id, username, first_name, last_name, gender, password)
VALUES
    ('123e4567-e89b-12d3-a456-426655440001', 'testuser1', 'John', 'Doe', 'male', '$2a$12$J0e/kfRrezwBYvQx7DQOROv7Qi8LxVHs0OTQ7Gl5/1R5PHgm594ea'),
    ('123e4567-e89b-12d3-a456-426655440002', 'testuser2', 'Jane', 'Doe', 'female', '$2a$12$J0e/kfRrezwBYvQx7DQOROv7Qi8LxVHs0OTQ7Gl5/1R5PHgm594ea'),
    ('123e4567-e89b-12d3-a456-426655440003', 'testuser3', 'Bob', 'Smith', 'male', '$2a$12$J0e/kfRrezwBYvQx7DQOROv7Qi8LxVHs0OTQ7Gl5/1R5PHgm594ea'),
    ('123e4567-e89b-12d3-a456-426655440004', 'admin', 'Admin', 'User', 'male', '$2a$12$3w0NMjHhhn5rBMc9mnaqzOQHD5DufkEe9WqW7oHLCdjcjGnNCkpzi');

INSERT INTO user_tracking (id, user_id, lat, lng)
VALUES
    ('223e4567-e89b-12d3-a456-426655450001', '123e4567-e89b-12d3-a456-426655440001', 40.712776, -74.005974),
    ('223e4567-e89b-12d3-a456-426655450002', '123e4567-e89b-12d3-a456-426655440002', 41.878113, -87.629799),
    ('223e4567-e89b-12d3-a456-426655450003', '123e4567-e89b-12d3-a456-426655440003', 34.052235, -118.243683),
    ('223e4567-e89b-12d3-a456-426655450004', '123e4567-e89b-12d3-a456-426655440004', 38.9072, -77.0369);

