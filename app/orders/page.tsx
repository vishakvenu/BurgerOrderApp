"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Order = {
  FirstName: string;
  LastName: string;
  select: string;
  totalPrice: number;
  createdAt: string;
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  useEffect(
    () =>
      setOrders(
        (
          JSON.parse(window.localStorage.getItem("orders") || "[]") as Order[]
        ).reverse(),
      ),
    [],
  );
  return (
    <>
      <div className="simple-header">
        <Link href="/" className="back-link">
          ← Build another
        </Link>
        <span>ORDER HISTORY</span>
      </div>
      <main className="orders-page">
        <div className="orders-intro">
          <p className="eyebrow">YOUR BURGERIAN</p>
          <h1>
            Good food,
            <br />
            <em>remembered.</em>
          </h1>
          <p>Every order you&apos;ve placed, all in one place.</p>
        </div>
        {orders.length === 0 ? (
          <div className="empty-state">
            <span>☻</span>
            <h2>No orders yet</h2>
            <p>Your next favourite burger is waiting to be built.</p>
            <Link href="/" className="primary-button">
              Start building <span>→</span>
            </Link>
          </div>
        ) : (
          <div className="history-list">
            {orders.map((order, index) => (
              <article
                className="history-card"
                key={`${order.createdAt}-${index}`}
              >
                <div>
                  <span className="order-number">
                    ORDER #{orders.length - index}
                  </span>
                  <h2>
                    {order.FirstName} {order.LastName}&apos;s burger
                  </h2>
                  <p>
                    {new Date(order.createdAt).toLocaleDateString()} ·{" "}
                    {order.select === "cod" ? "Cash on delivery" : order.select}
                  </p>
                </div>
                <strong>₹{order.totalPrice}</strong>
              </article>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
