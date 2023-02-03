-- psql -d YOUR_DATABASE -f create.sql

create schema cccat9;

create table cccat9.product (
  product_id integer primary key,
  description text,
  price numeric,
  width integer,
  height integer,
  length integer,
  weight numeric,
  currency text
);

insert into cccat9.product (product_id, description, price, width, height, length, weight, currency) values (1,'A', 1000, 100, 30, 10, 3, 'BRL');
insert into cccat9.product (product_id, description, price, width, height, length, weight, currency) values (2,'B', 5000, 50, 50, 50, 22, 'BRL');
insert into cccat9.product (product_id, description, price, width, height, length, weight, currency) values (3,'C', 30, 10, 10, 10, 0.9, 'BRL');
insert into cccat9.product (product_id, description, price, width, height, length, weight, currency) values (4,'D', 100, 100, 30, 10, 3, 'USD');

create table cccat9.coupon (
  code text primary key,
  percentage numeric,
  expiry_date timestamp
);

insert into cccat9.coupon (code, percentage, expiry_date) values ('VALE20', 20, '2024-12-30T10:00:00');
insert into cccat9.coupon (code, percentage, expiry_date) values ('VALE20_EXPIRED', 20, '2022-12-30T10:00:00');
