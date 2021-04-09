-- Users table seeds here (Example)
INSERT INTO users (name, email, password) VALUES (‘Jack’, 'jack@mail.com', 'test');
INSERT INTO users (name, email, password) VALUES (‘Kira’, 'kira@aol.com', 'test');
INSERT INTO users (name, email, password) VALUES (‘John’, 'john@something.com', 'test');
INSERT INTO users (name, email, password) VALUES (‘Brett’, 'brett@outlook.com', 'test');
INSERT INTO users (name, email, password) VALUES (‘Susan’, 'S@a.com', 'test');
INSERT INTO users (name, email, password) VALUES (‘Jessica’, 'jess@google.com', 'test');

INSERT INTO order_details(order_id, prod_id, quantity) 
VALUES (1, 1, 2),
  (1, 2, 3),
  (2, 4, 1),
  (3, 1, 1),
  (3, 4, 2),
  (3, 2, 1);

INSERT INTO orders(cust_id, amount, purchased) VALUES 
  (1, 2000, current_timestamp),
  (2, 200, current_timestamp),
  (3, 500, current_timestamp);

INSERT INTO product (cat_id, description, price, thumbnail_url, subject_id, level_id, province_id) VALUES 
  (1, 'A worksheet for your student in Math class in Grade 3', 49.99, 'https://cdn.education.com/files/1119001_1120000/1119502/file_1119502.gif?width=184', 1,3,1),
  (2, 'A Test for your student in Social Studies class', 19.99, 'https://cdn.education.com/files/1119001_1120000/1119502/file_1119502.gif?width=184', 8,8,1),
  (3, 'A Lesson Plan for your student in Physics class', 99.99, 'https://cdn.education.com/files/1119001_1120000/1119502/file_1119502.gif?width=184', 2,12,2),
  (1, 'A worksheet for your kindergarten class', 9.99, 'https://cdn.education.com/files/1119001_1120000/1119502/file_1119502.gif?width=184', 6,1,6),
  (2, 'A Unit test for your students in Biology', 14.99, 'https://cdn.education.com/files/1119001_1120000/1119502/file_1119502.gif?width=184', 2,10,1),
  (3, 'A Lesson Plan for grade 5 English', 39.99, 'https://cdn.education.com/files/1119001_1120000/1119502/file_1119502.gif?width=184', 3, 5, 10),
  (3, 'A Lesson Plan for grade 11 English', 59.99, 'https://cdn.education.com/files/1119001_1120000/1119502/file_1119502.gif?width=184', 3, 11, 8),
  (3, 'A Lesson Plan for grade 12 Chemistry', 39.99, 'https://cdn.education.com/files/1119001_1120000/1119502/file_1119502.gif?width=184', 3, 12, 5),
  (3, 'A Lesson Plan for grade 12 Mathematics', 39.99, 'https://cdn.education.com/files/1119001_1120000/1119502/file_1119502.gif?width=184', 3, 12, 5),
  (3, 'A Lesson Plan for grade 5 French ', 39.99, 'https://cdn.education.com/files/1119001_1120000/1119502/file_1119502.gif?width=184', 5, 7, 7),
  (3, 'A Lesson Plan for grade 6 Science', 39.99, 'https://cdn.education.com/files/1119001_1120000/1119502/file_1119502.gif?width=184', 7, 6, 3);

INSERT INTO category (name) VALUES 
('Worksheet'),
('Test'),
('Lesson Plan');

INSERT INTO level (name) VALUES 
('Kindergarten'),
('1st Grade'),
('2nd Grade'),
('3rd Grade'),
('4th Grade'),
('5th Grade'),
('6th Grade'),
('7th Grade'),
('8th Grade'),
('9th Grade'),
('10th Grade'),
('11th Grade'),
('12th Grade');

INSERT INTO subject (name) VALUES 
('Mathematics'),
('Physics'),
('Chemistry'),
('English'),
('French'),
('Art and Music'),
('Science'),
('Social Studies'),
('Biology');

INSERT INTO province (name) VALUES 
('BC'),
('Alberta'),
('Yukon'),
('Manitoba'),
('Saskatchewan'),
('Ontario'),
('Northwest Territories'),
('Nunavut'),
('Nova Scotia'),
('Quebec'),
('New Brunswick'),
('Newfoundland and Labrador'),
('Prince Edward Island');



