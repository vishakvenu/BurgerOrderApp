"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { ChangeEvent, FormEvent } from "react";

type FormValues = {
  FirstName: string;
  LastName: string;
  email: string;
  street: string;
  pincode: string;
  address: string;
  select: string;
};
type DraftDetails = Record<string, string | number>;
const initialForm: FormValues = {
  FirstName: "",
  LastName: "",
  email: "",
  street: "",
  pincode: "",
  address: "",
  select: "",
};

export default function FormPage() {
  const router = useRouter();
  const [form, setForm] = useState(initialForm);
  const [draft, setDraft] = useState<DraftDetails | null>(null);
  useEffect(() => {
    const details = window.localStorage.getItem("orderDetails");
    if (!details) router.replace("/");
    else setDraft(JSON.parse(details) as DraftDetails);
  }, [router]);
  const change = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) =>
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.localStorage.setItem(
      "orderDetails",
      JSON.stringify({ ...draft, ...form }),
    );
    router.push("/confirm");
  };
  return (
    <>
      <div className="simple-header">
        <Link href="/" className="back-link">
          ← Back to builder
        </Link>
        <span>Step 02 of 03</span>
      </div>
      <main className="form-page">
        <div className="form-intro">
          <p className="eyebrow">ALMOST THERE</p>
          <h1>
            Where should we
            <br />
            <em>deliver?</em>
          </h1>
          <p>Tell us where to send your freshly stacked burger.</p>
        </div>
        <form className="order-form" onSubmit={submit}>
          <div className="form-grid">
            <label>
              First name
              <input
                name="FirstName"
                value={form.FirstName}
                onChange={change}
                required
              />
            </label>
            <label>
              Last name
              <input
                name="LastName"
                value={form.LastName}
                onChange={change}
                required
              />
            </label>
            <label className="full">
              Email address
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={change}
                required
              />
            </label>
            <label>
              Street
              <input
                name="street"
                value={form.street}
                onChange={change}
                required
              />
            </label>
            <label>
              PIN code
              <input
                name="pincode"
                value={form.pincode}
                onChange={change}
                required
              />
            </label>
            <label className="full">
              Delivery address
              <textarea
                name="address"
                value={form.address}
                onChange={change}
                rows={3}
                required
              />
            </label>
            <label className="full">
              Payment method
              <select
                name="select"
                value={form.select}
                onChange={change}
                required
              >
                <option value="">Select a payment option</option>
                <option value="cod">Cash on delivery</option>
                <option value="upi">UPI</option>
                <option value="Net banking">Net banking</option>
              </select>
            </label>
          </div>
          <button className="primary-button form-submit">
            Review order <span>→</span>
          </button>
        </form>
      </main>
    </>
  );
}
