import React from 'react';
import ChallengeCard from '../components/ChallengeCard';

export default function RouteAPage() {
  return (
    <ChallengeCard
      routeCode="A"
      challengeTitle="Protocol Baseline Reconnaissance"
      category="Protocol Analysis"
      difficulty="Easy"
      description="Examine the initial network handshake frame captured at the starting post. Identify the unconventional TCP flag combination used to bypass standard filters."
      hint="Look closely at the reserved bits in the TCP header."
      nextNode="TRC-A"
    />
  );
}