import React from 'react';
import ChallengeCard from '../components/ChallengeCard';

export default function RouteDPage() {
  return (
    <ChallengeCard
      routeCode="D"
      challengeTitle="Hidden Hash Clue"
      category="Password Cracking"
      difficulty="Medium"
      description={`Investigators recovered this MD5 hash from a compromised account:

5f4dcc3b5aa765d61d8327deb882cf99

The account password was weak enough to be found in a common password list.

Recover the original password.

Submit the recovered password as the flag.

Flag format: CYBER{________}

The hash resolves to:

password`}
      hint="Identify the hash type and recover the original password from a common password list."
      nextNode="TRC-D"
    />
  );
}