/*
one-to-many relationship
*/
CREATE TABLE mindmaps
(
   name    varchar(100) primary key not null,
   topic   varchar(3000) not null,
   shape   varchar(100) not null
);

create table children
(
  name    varchar(100) primary key not null,
  parent  varchar(100) not null,
  topic   varchar(3000) not null,
  shape   varchar(100) not null,
  FOREIGN KEY (parent) REFERENCES mindmaps(name)
);

INSERT INTO mindmaps (name, topic, shape)
VALUES  ('ANIMALS', 'classification of animals', 'ellipse');

INSERT INTO children (name, parent, topic, shape)
VALUES  ('MAMMAL', 'ANIMALS', 'a warm-blooded vertebrate animal of a class that is distinguished by the possession of hair or fur, the secretion of milk by females for the nourishment of the young, and (typically) the birth of live young.', 'ellipse');

