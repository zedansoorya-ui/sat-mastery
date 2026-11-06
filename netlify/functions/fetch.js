// Optional CORS proxy. If the host runs functions, the app finds this automatically
// and uses it to import question packs from sites that block browser requests.
// If the host does not run functions, the app simply falls back to a direct request.
exports.handler = async (event) => {
  const target = (event.queryStringParameters || {}).url;
  const cors = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };
  if (!target) return { statusCode: 400, headers: cors, body: JSON.stringify({ error: 'missing url' }) };
  let u;
  try { u = new URL(target); } catch (e) {
    return { statusCode: 400, headers: cors, body: JSON.stringify({ error: 'bad url' }) };
  }
  if (u.protocol !== 'https:' && u.protocol !== 'http:') {
    return { statusCode: 400, headers: cors, body: JSON.stringify({ error: 'unsupported protocol' }) };
  }
  try {
    const r = await fetch(u.toString(), { redirect: 'follow', headers: { 'User-Agent': 'SATMastery/1.0' } });
    const body = await r.text();
    if (body.length > 4_000_000) {
      return { statusCode: 413, headers: cors, body: JSON.stringify({ error: 'response too large' }) };
    }
    return { statusCode: r.status, headers: cors, body };
  } catch (e) {
    return { statusCode: 502, headers: cors, body: JSON.stringify({ error: String(e.message || e) }) };
  }
};
