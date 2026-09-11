import React from 'react';
import ChallengeCard from '../components/ChallengeCard';

export default function RouteDPage() {
  return (
    <ChallengeCard
      routeCode="D"
      challengeTitle="Decode the Message"
      category="Encoding"
      difficulty="Medium"
      description={`An attacker intercepted this message:

RkxBR3tERUNPREV9SEVSRX0xMjN9

The analyst says:

"It's not encrypted. It's just wearing a different representation."

Decode the message.

Flag format: CYBER{________}`}
      hint="This is Base64. Decode the message to reveal the flag."
      nextNode="TRC-D"
    />
  );
}