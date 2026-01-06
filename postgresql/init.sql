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


CREATE TABLE question_detail (
    id integer GENERATED ALWAYS AS IDENTITY (START WITH 0 MINVALUE 0) PRIMARY KEY,
    name text NOT NULL UNIQUE,
    difficulty text NOT NULL,
    detail jsonb NOT NULL
);

CREATE TABLE question_template (
    id  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    qname text NOT NULL UNIQUE REFERENCES question_detail(name) ON DELETE CASCADE ON UPDATE CASCADE,
    qmeta jsonb NOT NULL,
    langtemplates jsonb NOT NULL
)







-- USER_CODE NOT BEING STORED IN DB> DON"T NEED TO BE SHOWN FOR OTHER USER DEVICES - instead stored in LOCALSTORAGE

-- For storing user-code - for specific user - for specific question - for specific language
-- CREATE TABLE user_code (
--     id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
--     userid text NOT NULL REFERENCES users(userid) ON DELETE CASCADE,
--     qname text NOT NULL REFERENCES question_detail(name) ON DELETE CASCADE ON UPDATE CASCADE,
--     language text NOT NULL,
--     code text NOT NULL,
--     CONSTRAINT unique_user_question_language UNIQUE(userid, qname, language)
-- );

-- SEED VALUES FROM SERVER USING nodepg

