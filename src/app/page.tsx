"use client"
import { useState } from 'react';
import useSWR from 'swr';
import Image from 'next/image';

interface Holding {
  id: number;
  bitcoinAmount: string;
  holdingDuration: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  const [bitcoinAmount, setBitcoinAmount] = useState('');
  const [holdingDuration, setHoldingDuration] = useState('');
  const { data, error } = useSWR<Holding[]>('/api/user', fetcher);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await fetch('/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ bitcoinAmount, holdingDuration }),
    });
    setBitcoinAmount('');
    setHoldingDuration('');
    window.location.reload();
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-darkgrey text-white">
      <div className="p-4 rounded-lg bg-gradient-to-r from-orange to-purple shadow-lg">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            value={bitcoinAmount}
            onChange={(e) => setBitcoinAmount(e.target.value)}
            placeholder="Bitcoin Amount"
            className="input input-bordered input-orange w-full max-w-xs"
            required
          />
          <input
            type="text"
            value={holdingDuration}
            onChange={(e) => setHoldingDuration(e.target.value)}
            placeholder="Holding Duration"
            className="input input-bordered input-orange w-full max-w-xs"
            required
          />
          <button type="submit" className="btn btn-purple">
            Update Holding
          </button>
        </form>
      </div>
      {error && <div className="mt-4">Failed to load</div>}
      {!data && <div className="mt-4">Loading...</div>}
      <ul className="mt-4">
        {data?.map((user) => (
          <li key={user.id} className="text-orange">
            Amount: {user.bitcoinAmount}, Held for: {user.holdingDuration}
          </li>
        ))}
      </ul>
    </div>
  );
}
