import React from 'react';
import ChallengeCard from '../components/ChallengeCard';

export default function RouteCPage() {
  return (
    <ChallengeCard
      routeCode="C"
      challengeTitle="Decode the Message"
      category="Encoding / Decryption"
      difficulty="Medium"
      description={`An attacker intercepted this message:

        RkxBR3tERUNPREV9SEVSRX0xMjN9

        The analyst says:

        "It's not encrypted. It's just wearing a different representation."

        Decode the message.

        Flag format: CYBER{________}`}
      hint="The message is Base64 encoded."
      nextNode="TRC-C"
    />
  );
}