import { createConnections } from 'typeorm';

createConnections().then(() => {
  console.log('🎲 Databases started!');
});
