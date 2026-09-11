import React, { useState } from 'react';
import ChallengeCard from '../components/ChallengeCard';

export default function RouteBPage() {
  return (
    <ChallengeCard
      routeCode="B"
      challengeTitle="Digital Footprint Discovery"
      category="OSINT Investigation"
      difficulty="Easy"
      description="A rogue administrator left an unindexed reference file on the public bulletin board. Track down the social repository handle to extract the hidden string."
      hint="Check archive records of past commits."
      nextNode="TRC-B"
    />
  );
}