export interface EventData {
  id: string;
  title: string;
  org: string;
  type: string;
  status: string;
  color: 'blue' | 'purple' | 'amber';
  locked?: boolean;
  price: number;
  description?: string;
}

export const events: EventData[] = [
  {
    id: 'c2c',
    title: 'Campus to Corporate',
    org: 'HR Dept. / PCSB',
    type: 'Interview Sim',
    status: 'High Priority',
    color: 'blue',
    price: 150,
    description: 'The definitive corporate simulation protocol. Adapt, survive, and secure your placement.'
  },
  {
    id: 'ideathon',
    title: 'Innova-X Ideathon',
    org: 'R&D Division',
    type: 'Innovation Hack',
    status: 'Open for Bids',
    color: 'purple',
    price: 400,
    description: '36 Hours of Code. Infinite Possibilities. Defining the future of FinTech and Health.'
  },
  { id: 'datacup', title: 'Data Cup 2026', org: 'Analytics Wing', type: 'Competition', status: 'Classified', color: 'amber', locked: true, price: 200 },
  { id: 'codex', title: 'Codex Hack', org: 'Cyber Security Unit', type: 'Security Sprint', status: 'Active', color: 'blue', price: 250 },
  { id: 'uiforge', title: 'UI/UX Forge', org: 'Design Lab', type: 'Design Sprint', status: 'In Review', color: 'purple', price: 200 },
  { id: 'ainexus', title: 'AI Nexus', org: 'Neural Labs', type: 'Machine Learning', status: 'Experimental', color: 'blue', price: 300 },
  { id: 'web3warp', title: 'Web3 Warp', org: 'Blockchain Node', type: 'Protocol Hack', status: 'Open Source', color: 'purple', price: 300 },
  { id: 'datapulse', title: 'Data Pulse', org: 'Insights Div', type: 'Big Data', status: 'Live', color: 'amber', price: 150 },
  { id: 'realitylab', title: 'Reality Lab', org: 'XR Division', type: 'VR/AR', status: 'Immersive', color: 'blue', price: 200 },
];
