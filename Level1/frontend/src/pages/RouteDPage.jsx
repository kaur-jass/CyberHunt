import React from 'react';
import ChallengeCard from '../components/ChallengeCard';

export default function RouteDPage() {
  return (
    <ChallengeCard
      routeCode="D"
      challengeTitle="Hidden Exfiltration"
      category="Incident Response"
      difficulty="Medium"
      description={`The following actions were recorded:

Export of student records initiated
External connection established
Files copied from database
Information compressed
Large transfer detected
Transfer completed
Remote host disconnected
Account disabled
Trace logs preserved
Incident escalated
Operations restored
Network monitored

What cybersecurity term is hidden in the report?

Take the first letters.

E X F I L T R A T I O N

Flag format: CYBER{________}`}
      hint="Take the first letter of each recorded action."
      nextNode="TRC-D"
    />
  );
}