import React from 'react';
import ChallengeCard from '../components/ChallengeCard';

export default function RouteCPage() {
  return (
    <ChallengeCard
      routeCode="C"
      challengeTitle="Packet Anomaly Detection"
      category="Network Traffic"
      difficulty="Medium"
      description="Inspect the payload stream from node transceiver C. A concealed ICMP data field contains encoded payload tokens. Decode the sequence to uncover the key."
      hint="Extract the data payload bytes from echo request frames."
      nextNode="TRC-C"
    />
  );
}