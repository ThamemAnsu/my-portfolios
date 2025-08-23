declare module 'react-scroll' {
    import * as React from 'react';
  
    export interface LinkProps {
      to: string;
      spy?: boolean;
      smooth?: boolean;
      duration?: number;
      delay?: number;
      isDynamic?: boolean;
      onSetActive?: (to: string) => void;
      onSetInactive?: () => void;
      ignoreCancelEvents?: boolean;
      hashSpy?: boolean;
      spyThrottle?: number;
      activeClass?: string;
      className?: string;
      style?: React.CSSProperties;
      offset?: number;
      onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
      children?: React.ReactNode;
    }
  
    export class Link extends React.Component<LinkProps> {}
    
    export interface ElementProps {
      name: string;
      id?: string;
      className?: string;
      style?: React.CSSProperties;
      children?: React.ReactNode;
    }
    
    export class Element extends React.Component<ElementProps> {}
    
    export interface ScrollProps {
      to: string;
      container?: string;
      activeClass?: string;
      spy?: boolean;
      smooth?: boolean;
      offset?: number;
      delay?: number;
      isDynamic?: boolean;
      onSetActive?: (to: string) => void;
      onSetInactive?: () => void;
      ignoreCancelEvents?: boolean;
      duration?: number;
    }
    
    export const scroller: {
      scrollTo(name: string, props?: ScrollProps): void;
    };
    
    export function animateScroll(options?: any): void;
  }