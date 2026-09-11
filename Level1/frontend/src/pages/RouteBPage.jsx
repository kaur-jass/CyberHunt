import React from 'react';
import ChallengeCard from '../components/ChallengeCard';

export default function RouteBPage() {
  return (
    <ChallengeCard
      routeCode="B"
      challengeTitle="First-Letter Extraction"
      category="Digital Forensics"
      difficulty="Easy"
      description={`NIT Jalandhar SOC Report

A suspicious Process was detected on the student portal.
The attacker used Harvested credentials to log in.
The SOC found an Internal database connection.
Thousands of records were Selected and copied.
The attacker then Handed the data to an external server.
The compromised account was finally Isolated.
The incident was Notified to the security team.
Investigators Gathered the logs.

Find the hidden word and submit it as the flag.

Take the first letters:
P H I S H I N G

Flag format: CYBER{________}`}
      hint="Look at the first letter of each important sentence."
      nextNode="TRC-B"
    />
  );
}