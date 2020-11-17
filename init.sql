CREATE TABLE mindmap (
  center VARCHAR(1000) NOT NULL,
  topic VARCHAR(1000),
  subtopic VARCHAR(1000)
);

INSERT INTO mindmap (center, topic, subtopic)
VALUES  (' TEST CENTER', ' TEST TOPIC', 'TES SUBTOPIC');
