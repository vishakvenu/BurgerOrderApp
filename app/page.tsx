'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import { useRouter } from 'next/navigation';
import logo from '../src/assets/download.png';

type IngredientId = 'lettuce' | 'tomato' | 'onion' | 'cheese' | 'beef';
type Counts = Record<IngredientId, number>;
type Ingredient = { id: IngredientId; name: string; price: number; color: string };

const ingredients: Ingredient[] = [
  { id: 'lettuce', name: 'Lettuce', price: 7, color: '#8bd449' },
  { id: 'tomato', name: 'Tomato', price: 8, color: '#ff5d55' },
  { id: 'onion', name: 'Onion', price: 5, color: '#c47aaa' },
  { id: 'cheese', name: 'Cheese', price: 10, color: '#ffd34f' },
  { id: 'beef', name: 'Beef patty', price: 20, color: '#9b5a32' },
];

function Header() {
  return (
    <header className="site-header">
      <Link href="/" className="brand">
        <Image src={logo} alt="" width={44} height={44} priority />
        <span>BURGERIAN</span>
      </Link>
      <nav>
        <Link href="/" className="nav-link active">Build a burger</Link>
        <Link href="/orders" className="nav-link">Orders <span className="nav-arrow">↗</span></Link>
      </nav>
    </header>
  );
}

function BurgerPreview({ counts }: { counts: Counts }) {
  return (
    <div className="preview-card">
      <div className="preview-kicker">YOUR CREATION</div>
      <h2>Stack it your way.</h2>
      <div className="burger-stage">
        <div className="burger bun-top" />
        <div className="sesame sesame-one" /><div className="sesame sesame-two" /><div className="sesame sesame-three" />
        {ingredients.flatMap(({ id }) => Array.from({ length: counts[id] + 1 }, (_, index) => (
          <div className={`burger ingredient ${id}`} key={`${id}-${index}`} />
        )))}
        <div className="burger bun-bottom" />
      </div>
      <div className="preview-caption">
        <span><strong>{Object.values(counts).reduce((sum, value) => sum + value, 0) + 5}</strong> layers</span>
        <span className="live-dot">Freshly stacked</span>
      </div>
    </div>
  );
}

export default function HomePage() {
  const router = useRouter();
  const [counts, setCounts] = useState<Counts>({ lettuce: 0, tomato: 0, onion: 0, cheese: 0, beef: 0 });
  const [toast, setToast] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem('burgerDraft');
    if (saved) setCounts(JSON.parse(saved) as Counts);
    if (window.sessionStorage.getItem('orderPlaced')) {
      setToast(true);
      window.sessionStorage.removeItem('orderPlaced');
      const timer = window.setTimeout(() => setToast(false), 5000);
      return () => window.clearTimeout(timer);
    }
  }, []);

  const total = useMemo(() => 45 + ingredients.reduce((sum, item) => sum + counts[item.id] * item.price, 0), [counts]);
  const updateCount = (id: IngredientId, change: number) => setCounts((current) => ({ ...current, [id]: Math.max(0, current[id] + change) }));
  const checkout = () => {
    window.localStorage.setItem('burgerDraft', JSON.stringify(counts));
    window.localStorage.setItem('orderDetails', JSON.stringify({ ...counts, totalPrice: total }));
    router.push('/form');
  };

  return (
    <main>
      <Header />
      {toast && <div className="toast"><span className="toast-icon">✓</span><div><strong>Order placed successfully</strong><span>Enjoy your meal! <Link href="/orders">View orders</Link></span></div><button onClick={() => setToast(false)}>×</button></div>}
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">HANDCRAFTED · MADE FOR YOU</p>
          <h1>Build the burger<br /><em>you crave.</em></h1>
          <p className="hero-description">Pick your favourites, stack them high, and get it delivered while it&apos;s still hot.</p>
          <div className="hero-stats"><span><strong>100%</strong> fresh ingredients</span><span><strong>20 min</strong> average delivery</span></div>
        </div>
        <BurgerPreview counts={counts} />
      </section>
      <section className="builder-section">
        <div className="section-heading"><div><p className="eyebrow">STEP 01 · CUSTOMIZE</p><h2>Choose your layers</h2></div><p className="base-price">Starting at <strong>₹45</strong></p></div>
        <div className="ingredient-grid">
          {ingredients.map((item) => (
            <div className="ingredient-card" key={item.id}>
              <div className="ingredient-swatch" style={{ background: item.color } as CSSProperties}><span>{item.id === 'beef' ? '●' : item.id === 'cheese' ? '◆' : item.id === 'tomato' ? '●' : '✦'}</span></div>
              <div className="ingredient-info"><h3>{item.name}</h3><p>+ ₹{item.price} each</p></div>
              <div className="stepper"><button onClick={() => updateCount(item.id, -1)} disabled={!counts[item.id]} aria-label={`Remove ${item.name}`}>−</button><span>{counts[item.id]}</span><button onClick={() => updateCount(item.id, 1)} aria-label={`Add ${item.name}`}>+</button></div>
            </div>
          ))}
        </div>
        <div className="checkout-bar"><div><span className="muted">Your total</span><strong>₹{total}</strong></div><button className="primary-button" onClick={checkout}>Continue to checkout <span>→</span></button></div>
      </section>
    </main>
  );
}
