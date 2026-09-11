import React from 'react';
import ChallengeCard from '../components/ChallengeCard';

export default function RouteBPage() {
  return (
    <ChallengeCard
      routeCode="B"
      challengeTitle="Compromised-Account Investigation — INVISIBLE"
      category="Account Security"
      difficulty="Easy"
      description={`NIT Jalandhar Cyber Cell

Investigators found that an attacker accessed the system without triggering the normal login alerts.

The following words were highlighted in the incident report:

Infiltration
Network
Vulnerability
Identity
Session
Intrusion
Backdoor
Logs
Exfiltration

Take the first letter of each highlighted word.

Flag: CYBER{________}`}
      hint="Take the first letter of each highlighted word."
      nextNode="BRH-B"
    />
  );
}