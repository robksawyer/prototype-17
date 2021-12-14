/**
 * ASCIIMorph.jsx
 */
 import * as React from 'react';

 // Component(s)
 import ASCIIMorph from './ASCIIMorph';

 export default {
   title: 'ASCIIMorph',
   component: ASCIIMorph,
   // Sets the layout parameter component wide.
   parameters: {
     layout: 'centered',
   },
 };

 export const Default = () => <ASCIIMorph />;

 Default.storyName = 'default';
