import React from 'react';
import ChallengeCard from '../components/ChallengeCard';

export default function RouteAPage() {
  return (
    <ChallengeCard
      routeCode="A"
      challengeTitle="Hidden in the Breach Report — SHADOW"
      category="Incident Investigation"
      difficulty="Easy"
      description={`NIT Jalandhar SOC — Data Breach Investigation

An unauthorized user accessed the student portal at 02:13 AM.

The attacker Started with a stolen account.
They Harvested information from the database.
The SOC found Anomalous login activity.
The attacker Downloaded several files.
Investigators Observed communication with an unknown server.
The account was Wiped from the affected machine.

The flag is hidden in the first letters of the bold words.

Flag: CYBER{________}

Extract the hidden word.`}
      hint="Take the first letter of each bold word: Started, Harvested, Anomalous, Downloaded, Observed, Wiped."
      nextNode="BRH-A"
    />
  );
}