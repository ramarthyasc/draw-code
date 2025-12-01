CREATE TABLE users (
    userid text PRIMARY KEY,
    name text,
    email text NOT NULL UNIQUE,
    picture text
);

CREATE TABLE refresh_tokens (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    userid text NOT NULL REFERENCES users(userid) ON DELETE CASCADE,
    token text NOT NULL UNIQUE,
    expires_at timestamptz NOT NULL,
    revoked boolean NOT NULL DEFAULT false,
    rotated_from uuid REFERENCES refresh_tokens(id),
    absolute_expires_at timestamptz NOT NULL
);
