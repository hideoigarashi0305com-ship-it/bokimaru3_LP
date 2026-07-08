interface Env {
  DB: D1Database;
  ADMIN_SECRET?: string;
  TURNSTILE_SECRET_KEY?: string;
}

// GET: レビュー一覧と評価サマリーの取得
export const onRequestGet: PagesFunction<Env> = async (context) => {
  try {
    const db = context.env.DB;
    
    // 承認済みのレビューのみ取得
    const { results } = await db
      .prepare("SELECT * FROM reviews WHERE approved = 1 ORDER BY created_at DESC")
      .all();

    // 評価サマリーの集計
    const totalReviews = results.length;
    let sumRatings = 0;
    const ratingDistribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

    for (const r of results) {
      const rating = Number(r.rating);
      sumRatings += rating;
      if (rating >= 1 && rating <= 5) {
        ratingDistribution[rating as 1 | 2 | 3 | 4 | 5]++;
      }
    }

    const averageRating = totalReviews > 0 
      ? parseFloat((sumRatings / totalReviews).toFixed(1)) 
      : 0;

    return new Response(
      JSON.stringify({
        reviews: results,
        summary: {
          total: totalReviews,
          average: averageRating,
          distribution: ratingDistribution,
        },
      }),
      {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "public, max-age=10", // 10秒間のキャッシュ
        },
      }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.message || "Failed to fetch reviews" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

// POST: レビューの投稿（一般投稿 ＆ 管理者一括登録）
export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const db = context.env.DB;
    const request = context.request;
    const body: any = await request.json();
    
    const { nickname, rating, title, comment } = body;

    // バリデーション
    if (!nickname || !rating || !comment) {
      return new Response(
        JSON.stringify({ error: "必須項目が不足しています" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const numRating = Number(rating);
    if (isNaN(numRating) || numRating < 1 || numRating > 5) {
      return new Response(
        JSON.stringify({ error: "評価値は1〜5の間で指定してください" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // 開発者/管理者権限（一括インポートなど）のチェック
    const adminSecret = request.headers.get("X-Admin-Secret");
    const isAdmin = adminSecret && context.env.ADMIN_SECRET && adminSecret === context.env.ADMIN_SECRET;

    // 一般ユーザー投稿時のTurnstile認証チェック（無効化）

    // データベース登録
    const reviewId = crypto.randomUUID();
    // 管理者からのインポート時は指定された投稿日時に沿う（過去データ一括登録のため）
    const createdAt = isAdmin && body.created_at 
      ? body.created_at 
      : new Date().toISOString();
      
    // 管理者投稿は最初から承認(approved=1)、一般投稿は承認待ち(approved=0)
    const approvedVal = isAdmin ? 1 : 0;

    await db
      .prepare(
        "INSERT INTO reviews (id, nickname, rating, title, comment, created_at, approved) VALUES (?, ?, ?, ?, ?, ?, ?)"
      )
      .bind(
        reviewId,
        nickname.trim(),
        numRating,
        title ? title.trim() : null,
        comment.trim(),
        createdAt,
        approvedVal
      )
      .run();

    return new Response(
      JSON.stringify({
        success: true,
        message: isAdmin 
          ? "管理者権限でレビューを即時公開しました" 
          : "レビューを投稿しました（管理者の承認後に公開されます）",
        id: reviewId,
      }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.message || "Failed to submit review" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

