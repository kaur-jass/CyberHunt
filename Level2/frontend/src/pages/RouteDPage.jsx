import React from 'react';
import ChallengeCard from '../components/ChallengeCard';

export default function RouteDPage() {
  return (
    <ChallengeCard
      routeCode="D"
      challengeTitle="My Favorite — Breach Evidence"
      category="Digital Forensics"
      difficulty="Medium"
      description={`NIT Jalandhar SOC — Evidence Room

Investigators recovered seven pieces of evidence from a compromised system:

File 1:  p@$$word.txt
File 2:  host.log
File 3:  admin_backup.zip
File 4:  network.pcap
File 5:  token.dat
File 6:  output.enc
File 7:  malware.exe

The analyst notices that each filename begins with a letter that matters.

Extract the first letter from each filename, in order.

Flag: CYBER{________}`}
      hint="Take the first character of each filename."
      nextNode="BRH-D"
    />
  );
}