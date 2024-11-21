'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';


interface Card {
  id: number;
  name: string;
  price: number;
  image?: string;
  likes: number;
}

export default function Home() {
  const [cards, setCards] = useState<Card[]>([]);

  useEffect(() => {
    fetch('/api/cards')
      .then((res) => res.json())
      .then(setCards);
  }, []);

  const handleLike = async (cardId: number) => {
    await fetch('/api/like', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'testuser', cardId }),
    });
    const updatedCards = await fetch('/api/cards').then((res) => res.json());
    setCards(updatedCards);
  };

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {cards.map((card) => (
        <div key={card.id} className="p-4 border rounded shadow">
          {card.image && <Image src={card.image} alt={card.name} />}
          <h3>{card.name}</h3>
          <p>{card.price} €</p>
          <button
            onClick={() => handleLike(card.id)}
            className="mt-2 p-2 bg-blue-500 text-white rounded"
          >
            {card.likes} Likes
          </button>
        </div>
      ))}
    </div>
  );
}
