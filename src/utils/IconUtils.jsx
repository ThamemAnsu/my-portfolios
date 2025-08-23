import React from 'react';

// This utility function wraps react-icons components to fix TypeScript issues
export const IconWrapper = (Icon, props) => {
  return <Icon {...props} />;
};