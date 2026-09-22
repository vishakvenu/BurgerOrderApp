'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type Order = { FirstName: string; LastName: string; email: string; street: string; address: string; select: string; lettuce: number; tomato: number; onion: number; cheese: number; beef: number; totalPrice: number };
const items: Array<[keyof Pick<Order, 'lettuce' | 'tomato' | 'onion' | 'cheese' | 'beef'>, string, number]> = [['lettuce', 'Lettuce', 7], ['tomato', 'Tomato', 8], ['onion', 'Onion', 5], ['cheese', 'Cheese', 10], ['beef', 'Beef patty', 20]];
export default function ConfirmPage() {
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [placing, setPlacing] = useState(false);
  useEffect(() => { const details = window.localStorage.getItem('orderDetails'); if (!details) router.replace('/'); else setOrder(JSON.parse(details) as Order); }, [router]);
  if (!order) return <div className="loading">Loading your order…</div>;
  const customerName = `${order.FirstName} ${order.LastName}`.trim();
  const placeOrder = () => { setPlacing(true); window.setTimeout(() => { const previous = JSON.parse(window.localStorage.getItem('orders') || '[]') as Array<Order & { createdAt: string }>; window.localStorage.setItem('orders', JSON.stringify([...previous, { ...order, createdAt: new Date().toISOString() }])); window.sessionStorage.setItem('orderPlaced', 'true'); router.push('/'); }, 900); };
  return <><div className="simple-header"><Link href="/form" className="back-link">← Edit details</Link><span>Step 03 of 03</span></div><main className="confirm-page"><div className="confirm-intro"><p className="eyebrow">FINAL CHECK</p><h1>Ready to make it<br /><em>official?</em></h1><p>Review your order before we fire up the grill.</p></div><div className="receipt-card"><div className="receipt-head"><span>BURGERIAN</span><span>#{String(Date.now()).slice(-5)}</span></div><h2>Order details</h2><div className="customer-details"><p><span>Name</span><strong>{customerName.toUpperCase()}</strong></p><p><span>Deliver to</span><strong>{order.address}, {order.street}</strong></p><p><span>Email</span><strong>{order.email}</strong></p></div><div className="order-lines">{items.map(([id, name, price]) => <div key={id}><span>{name} <small>× {order[id] || 1}</small></span><strong>₹{(order[id] || 1) * price}</strong></div>)}</div><div className="total-line"><span>Total amount</span><strong>₹{order.totalPrice}</strong></div><div className="confirm-actions"><button className="secondary-button" onClick={() => router.push('/')}>Cancel</button><button className="primary-button" onClick={placeOrder} disabled={placing}>{placing ? 'Placing order…' : 'Place order'} <span>→</span></button></div></div></main></>;
}
