'use client';

import React, { useState, useRef } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

import type { Testimonial, TestimonialsBlock as TestimonialsBlockProps } from '@/payload-types';

import RichText from '@/components/RichText';
import { BlockBackground } from '@/components/BlockBackground';
import { TestimonialCard } from '@/components/TestimonialCard';

import styles from './style.module.css';

export const TestimonialsClient: React.FC<
  TestimonialsBlockProps & { testimonials: Testimonial[] }
> = ({
  theme,
  cardTheme,
  width,
  heading,
  backgroundImage = { image: null, opacity: 0 },
  cardBackgroundImage = { image: null, opacity: 0 },
  testimonials,
}) => {
  const [slide, setSlide] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const next = () => {
    setSlide((prevState) => (prevState + 1) % testimonials.length);
  };

  const previous = () => {
    setSlide((prevState) => (prevState - 1 + testimonials.length) % testimonials.length);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartX.current) return;

    const touchEndX = e.changedTouches[0].clientX;
    const distance = touchStartX.current - touchEndX;

    if (distance > 50) {
      next();
    } else if (distance < -50) {
      previous();
    }

    touchStartX.current = null;
  };

  return (
    <BlockBackground theme={theme} {...backgroundImage}>
      <div className={`${styles.wrapper} ${width} ${theme}`}>
        {heading && (
          <div className={styles.heading}>
            <RichText data={heading} type="heading" />
          </div>
        )}
        <div className={styles.carouselWrapper} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          <button onClick={previous} aria-label="previous" className={theme}>
            <ChevronLeft size={36} />
          </button>
          <div className={styles.carousel}>
            <div className={styles.window} style={{ transform: `translateX(${-slide * 100}%)` }}>
              {testimonials.map((testimonial, i) => (
                <div key={i} className={styles.slide}>
                  <TestimonialCard
                    testimonialObj={testimonial}
                    cardBackgroundImage={cardBackgroundImage}
                    theme={cardTheme}
                    index={0}
                  />
                </div>
              ))}
            </div>
          </div>
          <button onClick={next} aria-label="Next" className={theme}>
            <ChevronRight size={36} />
          </button>
        </div>
        <div className={`${styles.dots} ${theme}`}>
          {testimonials.map((_testimonials, i) => (
            <button
              className={slide === i ? styles.active : styles.inactive}
              key={i}
              onClick={() => setSlide(i)}
              aria-label={`Go to slide ${i}`}
            />
          ))}
        </div>
      </div>
    </BlockBackground>
  );
};
