---
to: ./src/presentation/pages/<%= Name %>/index.tsx
---
/**
 *  Page <%= Name %>
 *  This code will do <%= description %>
 */

// ! Import react module and library first on top of tsx file.
import React from 'react'

// Import custom module of components
import {Layout} from '@atoms'

// Import styling and types of module you created
import <%= Name %>Props from './<%= Name %>.types';
import <%= Name %>Style from './History.style';

/**
 * Init <%= Name %> pages
 * @param {<%= Name %>Props} props 
 * @returns {JSX.Element}
 */
const <%= Name %> : React.FC = (props: <%= Name %>Props) => (
    <Layout></Layout>
)


// Export <%= Name %> pages as default
export default <%= Name %>
