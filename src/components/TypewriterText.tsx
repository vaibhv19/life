'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

export interface TypewriterItemState {
  typedText: string;
  untypedText: string;
  isTyping: boolean;
  isDone: boolean;
}

interface UseTypewriterSectionOptions {
  speed?: number; // ms per char for body text
  headingSpeed?: number; // ms per char for headings
  pauseBetween?: number; // ms pause between sequential items
  threshold?: number;
}

/**
 * Reusable hook managing an IntersectionObserver-driven typewriter text-reveal sequence.
 * - Triggers once when the section enters the viewport.
 * - Respects prefers-reduced-motion by rendering full text immediately.
 * - Drives sequential reveal (headings first, then body text).
 */
export function useTypewriterSection(
  items: string[],
  options: UseTypewriterSectionOptions = {}
) {
  const {
    speed = 9,
    headingSpeed = 22,
    pauseBetween = 140,
    threshold = 0.15,
  } = options;

  const sectionRef = useRef<HTMLElement | null>(null);
  const [isTriggered, setIsTriggered] = useState(false);
  const [state, setState] = useState({
    currentStep: 0,
    charIndex: 0,
    isComplete: false,
  });

  // Check prefers-reduced-motion immediately on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setState({
        currentStep: items.length,
        charIndex: 0,
        isComplete: true,
      });
      setIsTriggered(true);
    }
  }, [items.length]);

  // IntersectionObserver: starts only when the section enters viewport
  useEffect(() => {
    if (isTriggered || state.isComplete) return;
    const element = sectionRef.current;
    if (!element) return;

    if (typeof IntersectionObserver === 'undefined') {
      setIsTriggered(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsTriggered(true);
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [isTriggered, state.isComplete, threshold]);

  // High-performance animation frame loop
  useEffect(() => {
    if (!isTriggered || state.isComplete) return;

    let animId: number;
    let lastTime = performance.now();
    let pauseUntil = 0;
    let step = state.currentStep;
    let char = state.charIndex;

    const tick = (now: number) => {
      if (now < pauseUntil) {
        animId = requestAnimationFrame(tick);
        return;
      }

      const isHeading = step === 0;
      const targetInterval = isHeading ? headingSpeed : speed;
      const delta = now - lastTime;

      if (delta >= targetInterval) {
        const advanceCount = Math.max(1, Math.floor(delta / targetInterval));
        lastTime = now;
        char += advanceCount;

        const currentText = items[step] || '';

        if (char >= currentText.length) {
          char = currentText.length;
          // Completed this item
          if (step + 1 >= items.length) {
            setState({
              currentStep: step,
              charIndex: char,
              isComplete: true,
            });
            return;
          } else {
            // Pause before next sequential item
            step += 1;
            char = 0;
            pauseUntil = now + (isHeading ? pauseBetween * 1.3 : pauseBetween);
          }
        }

        setState({
          currentStep: step,
          charIndex: char,
          isComplete: false,
        });
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [isTriggered, items, speed, headingSpeed, pauseBetween]);

  const getItemState = useCallback(
    (index: number): TypewriterItemState => {
      const full = items[index] || '';

      if (state.isComplete || index < state.currentStep) {
        return {
          typedText: full,
          untypedText: '',
          isTyping: false,
          isDone: true,
        };
      }

      if (index === state.currentStep && isTriggered) {
        return {
          typedText: full.slice(0, state.charIndex),
          untypedText: full.slice(state.charIndex),
          isTyping: true,
          isDone: false,
        };
      }

      // Not yet reached
      return {
        typedText: '',
        untypedText: full,
        isTyping: false,
        isDone: false,
      };
    },
    [items, state.currentStep, state.charIndex, state.isComplete, isTriggered]
  );

  return {
    sectionRef,
    isTriggered,
    isComplete: state.isComplete,
    getItemState,
  };
}

interface TypewriterSpanProps {
  text: string;
  state: TypewriterItemState;
  className?: string;
  as?: 'span' | 'p' | 'h2' | 'div';
}

/**
 * Typewriter presentation element:
 * - Emits accessible text for screen readers (`sr-only`)
 * - Emits visually typed characters without layout shifts (via invisible placeholder)
 * - Appends zero-width blinking cursor while typing
 */
export const TypewriterSpan: React.FC<TypewriterSpanProps> = ({
  text,
  state,
  className = '',
  as = 'span',
}) => {
  const Component = as;

  return (
    <Component className={className}>
      {/* Screen-reader accessible full text */}
      <span className="sr-only">{text}</span>

      {/* Zero-layout-shift visual presentation */}
      <span aria-hidden="true" className="inline">
        <span>{state.typedText}</span>
        {state.isTyping && (
          <span className="inline-block w-0 relative overflow-visible pointer-events-none align-baseline">
            <span className="typewriter-cursor ml-[1px]" />
          </span>
        )}
        <span className="invisible select-none pointer-events-none">
          {state.untypedText}
        </span>
      </span>
    </Component>
  );
};
