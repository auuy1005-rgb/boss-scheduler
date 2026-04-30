export async function onRequestGet(context) {
  const { env } = context;

  const row = await env.DB.prepare(
    "SELECT value FROM app_state WHERE key = ?"
  ).bind("main").first();

  if (!row) {
    return Response.json({
      players: [],
      schedules: [],
      viewBoss: "普拉"
    });
  }

  try {
    return Response.json(JSON.parse(row.value));
  } catch (error) {
    return Response.json({
      players: [],
      schedules: [],
      viewBoss: "普拉"
    });
  }
}

export async function onRequestPost(context) {
  const { request, env } = context;

  let data;
  try {
    data = await request.json();
  } catch (error) {
    return Response.json({ error: "JSON 格式錯誤" }, { status: 400 });
  }

  const clean = {
    players: Array.isArray(data.players) ? data.players : [],
    schedules: Array.isArray(data.schedules) ? data.schedules : [],
    viewBoss: typeof data.viewBoss === "string" ? data.viewBoss : "普拉",
    updatedAt: new Date().toISOString()
  };

  await env.DB.prepare(
    `INSERT INTO app_state (key, value, updated_at)
     VALUES (?, ?, CURRENT_TIMESTAMP)
     ON CONFLICT(key) DO UPDATE SET
       value = excluded.value,
       updated_at = CURRENT_TIMESTAMP`
  ).bind("main", JSON.stringify(clean)).run();

  return Response.json({ ok: true, state: clean });
}
