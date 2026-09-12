import React from 'react';
import ChallengeCard from '../components/ChallengeCard';

export default function RouteBPage() {
  return (
    <ChallengeCard
      routeCode="E"
      challengeTitle="Password Breach"
      category="Cybersecurity Basics"
      difficulty="Medium"
      description={`A vulnerability discovered in the student portal has been reported to the security team.

The report contains:

Vendor: Internal Portal
Vulnerability: Authentication bypass
Severity: Critical
Reference: CVE-2026-XXXX

What four-letter abbreviation is used to identify publicly documented cybersecurity vulnerabilities?

Flag format: CYBER{____}`}
      hint="Look at the reference format in the security report. The four-letter abbreviation is used for publicly documented vulnerabilities."
      nextNode="TRC-E"
    />
  );
}
