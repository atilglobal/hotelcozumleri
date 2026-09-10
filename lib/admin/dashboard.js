import { query, getPool } from "@/lib/db";

export async function getDashboardStats() {
  if (!getPool()) {
    return emptyDashboard();
  }
  try {
    const [todayOrders, pendingOrders, totalOrders, todayRevenue, monthRevenue, newQuotes, hotelioDemos, lowStock, recentOrders, recentQuotes, recentHotelio, lowStockProducts] = await Promise.all([
      query("SELECT COUNT(*) as cnt FROM orders WHERE DATE(created_at) = CURDATE()"),
      query("SELECT COUNT(*) as cnt FROM orders WHERE status = 'pending'"),
      query("SELECT COUNT(*) as cnt FROM orders"),
      query("SELECT COALESCE(SUM(grand_total),0) as total FROM orders WHERE DATE(created_at) = CURDATE() AND payment_status = 'paid'"),
      query("SELECT COALESCE(SUM(grand_total),0) as total FROM orders WHERE MONTH(created_at) = MONTH(CURDATE()) AND YEAR(created_at) = YEAR(CURDATE()) AND payment_status = 'paid'"),
      query("SELECT COUNT(*) as cnt FROM quote_requests WHERE status = 'new'"),
      query("SELECT COUNT(*) as cnt FROM hotelio_demo_requests WHERE status = 'new'"),
      query("SELECT COUNT(*) as cnt FROM products WHERE stock_type = 'stocked' AND stock <= 10 AND status = 'active'"),
      query(`SELECT o.*, u.name, u.surname, u.hotel_name FROM orders o LEFT JOIN users u ON o.user_id = u.id ORDER BY o.created_at DESC LIMIT 5`),
      query("SELECT * FROM quote_requests ORDER BY created_at DESC LIMIT 5"),
      query("SELECT * FROM hotelio_demo_requests ORDER BY created_at DESC LIMIT 5"),
      query("SELECT id, name, sku, stock FROM products WHERE stock_type = 'stocked' AND stock <= 10 AND status = 'active' ORDER BY stock ASC LIMIT 10"),
    ]);

    const sales7 = await query(
      `SELECT DATE(created_at) as date, COALESCE(SUM(grand_total),0) as total FROM orders
       WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 7 DAY) AND payment_status = 'paid'
       GROUP BY DATE(created_at) ORDER BY date`
    );
    const sales30 = await query(
      `SELECT DATE(created_at) as date, COALESCE(SUM(grand_total),0) as total FROM orders
       WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND payment_status = 'paid'
       GROUP BY DATE(created_at) ORDER BY date`
    );
    const statusDist = await query("SELECT status, COUNT(*) as cnt FROM orders GROUP BY status");
    const paymentDist = await query("SELECT payment_method, COUNT(*) as cnt FROM orders WHERE payment_method IS NOT NULL GROUP BY payment_method");

    return {
      cards: {
        todayOrders: todayOrders[0]?.cnt || 0,
        pendingOrders: pendingOrders[0]?.cnt || 0,
        totalOrders: totalOrders[0]?.cnt || 0,
        todayRevenue: Number(todayRevenue[0]?.total || 0),
        monthRevenue: Number(monthRevenue[0]?.total || 0),
        newQuotes: newQuotes[0]?.cnt || 0,
        hotelioDemos: hotelioDemos[0]?.cnt || 0,
        lowStock: lowStock[0]?.cnt || 0,
      },
      charts: { sales7, sales30, statusDist, paymentDist },
      recentOrders,
      recentQuotes,
      recentHotelio,
      lowStockProducts,
    };
  } catch {
    return emptyDashboard();
  }
}

function emptyDashboard() {
  return {
    cards: { todayOrders: 0, pendingOrders: 0, totalOrders: 0, todayRevenue: 0, monthRevenue: 0, newQuotes: 0, hotelioDemos: 0, lowStock: 0 },
    charts: { sales7: [], sales30: [], statusDist: [], paymentDist: [] },
    recentOrders: [],
    recentQuotes: [],
    recentHotelio: [],
    lowStockProducts: [],
  };
}
