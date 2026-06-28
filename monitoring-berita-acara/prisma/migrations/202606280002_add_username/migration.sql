ALTER TABLE "users" ADD COLUMN "username" TEXT;

WITH raw_username AS (
  SELECT
    "id",
    regexp_replace(split_part(lower("email"), '@', 1), '[^a-z0-9._-]', '', 'g') AS raw_value
  FROM "users"
),
normalized_username AS (
  SELECT
    "id",
    left(
      CASE
        WHEN length(raw_value) >= 3 THEN raw_value
        ELSE 'user_' || substr(md5("id"), 1, 8)
      END,
      24
    ) AS base_value
  FROM raw_username
),
ranked_username AS (
  SELECT
    "id",
    base_value,
    row_number() OVER (PARTITION BY base_value ORDER BY "id") AS position,
    count(*) OVER (PARTITION BY base_value) AS total
  FROM normalized_username
)
UPDATE "users" AS target
SET "username" = CASE
  WHEN ranked.total = 1 THEN ranked.base_value
  ELSE ranked.base_value || '_' || ranked.position
END
FROM ranked_username AS ranked
WHERE target."id" = ranked."id";

ALTER TABLE "users" ALTER COLUMN "username" SET NOT NULL;
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");
