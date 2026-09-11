import React from 'react';
import ChallengeCard from '../components/ChallengeCard';

export default function RouteEPage() {
  return (
    <ChallengeCard
      routeCode="E"
      challengeTitle="Metadata Log Examination"
      category="Metadata Forensics"
      difficulty="Easy"
      description="Analyze the EXIF and file attribute logs of the physical asset tag image. The author field holds an encoded sequence required for path continuation."
      hint="Inspect raw file properties using standard command line utility."
      nextNode="TRC-E"
    />
  );
}