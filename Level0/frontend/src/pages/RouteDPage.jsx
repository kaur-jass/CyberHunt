import React from 'react';
import ChallengeCard from '../components/ChallengeCard';

export default function RouteDPage() {
  return (
    <ChallengeCard
      routeCode="D"
      challengeTitle="Cryptographic Encoding Layer"
      category="Decryption & Encoding"
      difficulty="Medium"
      description="An encoded block string has been transmitted via local frequency beacon. Decode the Base64 nested cipher to reveal the flag text."
      hint="Multiple encoding passes were applied recursively."
      nextNode="TRC-D"
    />
  );
}