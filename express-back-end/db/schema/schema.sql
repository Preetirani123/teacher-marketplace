DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS order_details CASCADE;
DROP TABLE IF EXISTS product CASCADE;
DROP TABLE IF EXISTS province CASCADE;
DROP TABLE IF EXISTS subject CASCADE;
DROP TABLE IF EXISTS level CASCADE;
DROP TABLE IF EXISTS category CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);
create TABLE orders (
  id SERIAL PRIMARY KEY,
  cust_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  amount NUMERIC,
  purchased timestamp default current_timestamp
);
CREATE TABLE category (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR NOT NULL
);
CREATE TABLE level (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR NOT NULL
);
CREATE TABLE province (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR NOT NULL
);
CREATE TABLE subject (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR NOT NULL
);
CREATE TABLE product (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  cat_id INTEGER REFERENCES category(id) ON DELETE CASCADE,
  owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  description TEXT,
  price NUMERIC NOT NULL,
  thumbnail_url VARCHAR(255),
  subject_id INTEGER REFERENCES subject(id) ON DELETE CASCADE,
  level_id INTEGER REFERENCES level(id) ON DELETE CASCADE,
  province_id INTEGER REFERENCES province(id) ON DELETE CASCADE,
  pdf_link VARCHAR(255) default 'https://www.otffeo.on.ca/en/wp-content/uploads/sites/2/2014/09/Lesson-1_2_Cold-War-Scenario.pdf'
);

create TABLE order_details (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
  prod_id INTEGER REFERENCES product(id) ON DELETE CASCADE,
  price NUMERIC NOT NULL,
  quantity INTEGER
);

ALTER TABLE users OWNER TO dev;
ALTER TABLE orders OWNER TO dev;
ALTER TABLE category OWNER TO dev;
ALTER TABLE level OWNER TO dev;
ALTER TABLE province OWNER TO dev;
ALTER TABLE subject OWNER TO dev;
ALTER TABLE product OWNER TO dev;
ALTER TABLE order_details OWNER TO dev;

