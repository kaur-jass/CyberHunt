import React from 'react';
import ChallengeCard from '../components/ChallengeCard';

export default function RouteCPage() {
  return (
    <ChallengeCard
      routeCode="C"
      challengeTitle="The Attacker Who Never Existed"
      category="Digital Identity"
      difficulty="Medium"
      description={`A student's account at NIT Jalandhar is breached at 3:17 AM.

The logs show a successful login.
The database shows records being accessed.
The firewall shows an outgoing connection.

But when investigators try to identify the attacker, there is no real user, no physical machine, and no traceable identity.

The attacker was there.
The evidence proves it.
But the attacker seems to have never existed.

What single word best describes such an attacker?

Submit the word as the flag.

Flag: CYBER{________}`}
      hint="Think of something that appears to exist but cannot be physically identified."
      nextNode="BRH-C"
    />
  );
}