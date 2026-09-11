import React from 'react';
import ChallengeCard from '../components/ChallengeCard';

export default function RouteBPage() {
  return (
    <ChallengeCard
      routeCode="B"
      challengeTitle="Identify the Suspicious Address"
      category="Digital Footprint / IP Investigation"
      difficulty="Easy"
      description={`You find the following entry in a web server log:

        192.168.1.24 — GET /admin
        10.0.0.7 — GET /login
        203.0.113.42 — GET /secret
        192.168.1.31 — GET /home

        Three addresses are private/internal addresses.

        Which IP address is NOT from a private IPv4 range and therefore is the suspicious external address?

        Submit only the IP address as the flag.`}
      hint="Look at the standard private IPv4 address ranges."
      nextNode="TRC-B"
    />
  );
}