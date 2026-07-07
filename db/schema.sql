CREATE TABLE IF NOT EXISTS reviews (
    id TEXT PRIMARY KEY,
    nickname TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK(rating >= 1 AND rating <= 5),
    title TEXT,
    comment TEXT NOT NULL,
    created_at TEXT NOT NULL, -- ISO8601フォーマットのテキスト (YYYY-MM-DDTHH:MM:SSZ)
    approved INTEGER NOT NULL DEFAULT 0 -- 0:承認待ち, 1:承認済み（公開）
);

CREATE INDEX IF NOT EXISTS idx_reviews_approved_created ON reviews(approved, created_at DESC);
