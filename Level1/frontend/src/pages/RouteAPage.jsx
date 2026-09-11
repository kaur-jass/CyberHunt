import React from 'react';
import ChallengeCard from '../components/ChallengeCard';

export default function RouteAPage() {
  return (
    <ChallengeCard
      routeCode="A"
      challengeTitle="The Exposed Student Database"
      category="Database Security"
      difficulty="Easy"
      description={`NIT Jalandhar — SOC Alert

At 02:17 AM, the SOC detects an unusual database query:

User: db_admin
Source IP: 185.44.21.91
Query: SELECT * FROM students;
Records returned: 48,721

The administrator confirms that this activity was not authorized.

The database contains:
• Student names
• Roll numbers
• Email addresses
• Phone numbers

What type of cybersecurity incident should the SOC classify this as?

Flag format: CYBER{________}`}
      hint="Think about unauthorized access to sensitive student information."
      nextNode="TRC-A"
    />
  );
}