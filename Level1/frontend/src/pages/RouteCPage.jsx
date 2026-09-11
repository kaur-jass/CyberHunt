import React from 'react';
import ChallengeCard from '../components/ChallengeCard';

export default function RouteCPage() {
  return (
    <ChallengeCard
      routeCode="C"
      challengeTitle="Web Application Breach"
      category="Web Application Security"
      difficulty="Medium"
      description={`NIT Jalandhar Student Portal

During an investigation, the SOC discovers that an attacker entered malicious input into a login field and was able to retrieve information from the backend database.

The suspicious input was:

' OR '1'='1

What vulnerability was exploited?

Flag: Submit the vulnerability name.`}
      hint="The attacker manipulated the SQL condition inside the login input."
      nextNode="TRC-C"
    />
  );
}