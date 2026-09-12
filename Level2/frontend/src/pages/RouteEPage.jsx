import React from 'react';
import ChallengeCard from '../components/ChallengeCard';

export default function RouteEPage() {
  return (
    <ChallengeCard
      routeCode="E"
      challengeTitle="More Clever — Binary"
      category="Binary / ASCII Decoding"
      difficulty="Medium"
      description={`NIT Jalandhar — Breach Analysis

The attacker left this binary sequence in the compromised server:

01010000 01001000 01000001
01001110 01010100 01001111
01001101

The SOC analyst says:

"The data is not encrypted. Interpret each 8-bit group as an ASCII character."

Decode it.

Flag: CYBER{________}
`}
      hint="Interpret every 8-bit binary group as one ASCII character."
      nextNode="BRH-E"
    />
  );
}