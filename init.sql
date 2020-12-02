/*
one-to-many relationship
*/
CREATE TABLE mindmaps
(
   /* 6 character string of alphanumberic */
   id      varchar(6) primary key not null unique,
   /*topic */
   name    varchar(100) not null,
   /*description */
   topic   varchar(3000) not null,
   shape   varchar(100) not null
   /* color? */
);

CREATE TABLE nodes
(
  /* 6 character string of alphanumberic */
  id      varchar(6) primary key not null unique,
  name    varchar(100) not null,
  /* if node is directly attached to mindmap entity,
  parent will be the ID of the node itself, meaning parent == id
  Code checks for this in the endpoints will be important for
  correct functionality */
  parent  varchar(100) not null,
  mindmap varchar(100) not null,
  topic   varchar(3000) not null,
  shape   varchar(100) not null,
  /* color? */
  FOREIGN KEY (mindmap) REFERENCES mindmaps(id),
  FOREIGN KEY (parent) REFERENCES nodes(id)
);

/* Test values */
INSERT INTO mindmaps (id, name, topic, shape)
VALUES  ('123abc', 'ANIMALS', 'animal types', 'rectangle');

INSERT INTO nodes (id, name, parent, mindmap, topic, shape)
VALUES  ('456efg','MAMMAL', '456efg', '123abc', 'a warm-blooded vertebrate animal of a class that is distinguished by the possession of hair or fur, the secretion of milk by females for the nourishment of the young, and (typically) the birth of live young.', 'ellipse');

INSERT INTO nodes (id, name, parent, mindmap, topic, shape)
VALUES  ('555aaa','DOG', '456efg', '123abc', 'woof woof dogs have 4 legs', 'ellipse');

INSERT INTO nodes (id, name, parent, mindmap, topic, shape)
VALUES  ('678rrr','YELLOW LAB', '555aaa', '123abc', 'The yellow Lab is perhaps best known for its role as a guide dog for the blind.', 'ellipse');

