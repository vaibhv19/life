'use client';

import React from 'react';
import { PersonSpaceConfig, ContentBlock } from '@/lib/between-us/types';
import { PersonalIntro } from './PersonalIntro';
import { MemoryCollection } from './MemoryCollection';
import { Letter } from './Letter';
import { SharedMemory } from './SharedMemory';
import { Timeline } from './Timeline';
import { CustomSection } from './CustomSection';

interface PersonSpaceRendererProps {
  config: PersonSpaceConfig;
}

export const PersonSpaceRenderer: React.FC<PersonSpaceRendererProps> = ({ config }) => {
  return (
    <div className="w-full flex flex-col">
      {config.blocks.map((block: ContentBlock) => {
        switch (block.type) {
          case 'personal-intro':
            return <PersonalIntro key={block.id} block={block} />;
          case 'memory-collection':
            return <MemoryCollection key={block.id} block={block} />;
          case 'letter':
            return <Letter key={block.id} block={block} />;
          case 'shared-memory':
            return <SharedMemory key={block.id} block={block} />;
          case 'timeline':
            return <Timeline key={block.id} block={block} />;
          case 'custom-section':
            return <CustomSection key={block.id} block={block} />;
          default:
            return null;
        }
      })}
    </div>
  );
};
