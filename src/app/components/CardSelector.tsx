import { useEffect, useState } from "react";

interface CardSelectorData {
  cards: any;
  onCardChange: (data: any) => void;
}

const CardSelector: React.FC<CardSelectorData> = ({ cards, onCardChange }) => {
  const [cardNumber, setCardNumber] = useState();

  //use UseEffect to handle card change on first render
  useEffect(() => {
    onCardChange(cards[0].number);
    setCardNumber(cards[0].number);
  }, []);

  const handleCardChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCardNumber(event.target.value);
    onCardChange(event.target.value);
  };

  const groupedCards = cards.reduce((groups: any, card: any) => {
    const key = card.action;
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(card);
    return groups;
  }, {});

  // Sort groups by action
  const sortedActions = Object.keys(groupedCards).sort();

  return (
    <select
      className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
      onChange={handleCardChange}
    >
      {sortedActions.map((action) => (
        <optgroup label={action} key={action}>
          {groupedCards[action].map((card, index) => (
            <option key={index} value={card.number}>
              {card.text}
            </option>
          ))}
        </optgroup>
      ))}
    </select>
  );
};

export default CardSelector;
