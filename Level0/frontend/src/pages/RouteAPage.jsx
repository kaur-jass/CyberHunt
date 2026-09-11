import React from 'react';
import ChallengeCard from '../components/ChallengeCard';

export default function RouteAPage() {
  return (
    <ChallengeCard
      routeCode="A"
      challengeTitle="Trace the Attacker"
      category="Log Analysis"
      difficulty="Easy"
      description={`A suspicious login occurred on a college server:

        22:41:03 — Login attempt: admin
        22:41:04 — Failed password
        22:41:08 — Login attempt: admin
        22:41:09 — Failed password
        22:41:15 — Login attempt: root
        22:41:16 — Successful login
        22:41:20 — Command executed: cat /var/log/auth.log

        The attacker left one instruction:

        "Follow my footprints. Don't look at where I am. Look at where I came from."

        What cybersecurity technique/concept describes following an attacker's activity through logs?

        Flag format: CYBER{________}`}
      hint="The answer should point toward TRACE, the next level."
      nextNode="TRC-A"
    />
  );
}