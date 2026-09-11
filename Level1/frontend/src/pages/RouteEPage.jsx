import React from 'react';
import ChallengeCard from '../components/ChallengeCard';

export default function RouteEPage() {
  return (
    <ChallengeCard
      routeCode="E"
      challengeTitle="Hidden Hash Clue"
      category="Password Security / Hashing"
      difficulty="Medium"
      description={`NIT Jalandhar SOC

Investigators recovered this MD5 hash from a compromised account:

5f4dcc3b5aa765d61d8327deb882cf99

The account password was weak enough to be found in a common password list.

Recover the original password.

Submit the recovered password as the flag.`}
      hint="This MD5 hash corresponds to a very common weak password."
      nextNode="TRC-E"
    />
  );
}