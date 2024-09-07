-- Inserting into the posts table with current timestamp
INSERT INTO "posts" (title, content, user_id, created_at)
VALUES
('First Blog Post by Adam', 'This is a post by Adam Todorovic!', 1, NOW()),
('First Blog Post by Jane', 'This is a post by Jane Doe!', 2, NOW());

-- Inserting into the comments table with current timestamp
INSERT INTO "comments" (comment_text, post_id, user_id, created_at)
VALUES
('Great post, Adam!', 1, 2, NOW()),  -- post_id = 1
('Nice one, Jane!', 2, 1, NOW()),    -- post_id = 2
('Well written, John!', 1, 1, NOW()); -- post_id = 1


