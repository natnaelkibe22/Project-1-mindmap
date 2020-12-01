/*
one-to-many relationship
*/
CREATE TABLE mindmaps
(
   /* 6 character string of alphanumberic */
   id      varchar(6) primary key not null,
   name    varchar(100) not null,
   topic   varchar(3000) not null,
   shape   varchar(100) not null
);

CREATE TABLE nodes
(
  /* 6 character string of alphanumberic */
  id      varchar(6) primary key not null,
  name    varchar(100) not null,
  /* if node is directly attached to mindmap entity,
  parent will be the ID of the node itself, meaning parent == id
  Code checks for this in the endpoints will be important for
  correct functionality*/
  parent  varchar(100) not null,
  mindmap varchar(100) not null,
  topic   varchar(3000) not null,
  shape   varchar(100) not null,
  FOREIGN KEY (mindmap) REFERENCES mindmaps(id),
  FOREIGN KEY (parent) REFERENCES nodes(id)
);

INSERT INTO mindmaps (id, name, topic, shape)
VALUES  ('123abc', 'ANIMALS', 'animal types', 'rectangle');

INSERT INTO nodes (id, name, parent, mindmap, topic, shape)
VALUES  ('456efg','MAMMAL', '456efg', '123abc', 'a warm-blooded vertebrate animal of a class that is distinguished by the possession of hair or fur, the secretion of milk by females for the nourishment of the young, and (typically) the birth of live young.', 'ellipse');