export default function handler(req, res) {
  const { items = [] } = req.body || {};
  const results = items.map(item => ({
    name: item,
    price: (Math.random() * 10 + 1).toFixed(2),
    seller: 'Venditore Demo',
    delivery: Math.floor(Math.random() * 3) + 1,
    link: `https://www.google.com/search?q=${encodeURIComponent(item)}`
  }));
  res.status(200).json({ results });
}
