import React from 'react';
import ChallengeCard from '../components/ChallengeCard';

export default function RouteEPage() {
  return (
    <ChallengeCard
      routeCode="E"
      challengeTitle="Metadata Investigation"
      category="Digital Forensics"
      difficulty="Easy"
      description={`Give them an image containing a normal-looking picture.

The QR says:

"The picture tells you what you see.
The metadata tells you what happened.
Find the hidden clue."

Investigate the image's metadata.

Flag format: CYBER{________}

Set the image's metadata so that, for example:

Comment: FLAG{METADATA_NEVER_LIES}`}
      hint="Inspect the image's metadata, especially the Comment field."
      nextNode="TRC-E"
    />
  );
}