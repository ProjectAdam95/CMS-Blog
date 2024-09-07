-- Inserting into the post table with current timestamp
INSERT INTO "post" (title, content, user_id, created_at, updated_at)
VALUES
('First Blog Post by Adam', 'This is a post by Adam Todorovic!', 1, NOW(), NOW()),
('First Blog Post by Jane', 'This is a post by Jane Doe!', 2, NOW(), NOW());

-- Inserting into the comment table with current timestamp
INSERT INTO "comment" (comment_text, post_id, user_id, created_at, updated_at)
VALUES
('Great post, Adam!', 1, 2, NOW(), NOW()),  -- post_id = 1
('Nice one, Jane!', 2, 1, NOW(), NOW()),    -- post_id = 2
('Well written, John!', 1, 1, NOW(), NOW()); -- post_id = 1

