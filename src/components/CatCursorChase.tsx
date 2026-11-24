import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

export function CatCursorChase() {
  const catRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isChasing, setIsChasing] = useState(false);
  const [facingLeft, setFacingLeft] = useState(false);
  const [mouseFacingLeft, setMouseFacingLeft] = useState(false);

  const stateRef = useRef({
    targetX: -200,
    targetY: -200,
    catX: -200,
    catY: -200,
    mouseX: -200,
    mouseY: -200,
    initialized: false,
    chasing: false,
    facingLeft: false,
    mouseFacingLeft: false,
  });

  useLayoutEffect(() => {
    if (!isVisible) return;
    const s = stateRef.current;
    if (mouseRef.current) {
      mouseRef.current.style.transform = `translate3d(${s.mouseX + 12}px, ${s.mouseY + 10}px, 0)`;
    }
    if (catRef.current) {
      catRef.current.style.transform = `translate3d(${s.catX - 28}px, ${s.catY - 26}px, 0)`;
    }
  }, [isVisible]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (prefersReducedMotion || !hasFinePointer) return;

    let rafId = 0;

    const startLoop = () => {
      if (rafId !== 0) return;
      rafId = window.requestAnimationFrame(tick);
    };

    const stopLoop = () => {
      if (rafId === 0) return;
      window.cancelAnimationFrame(rafId);
      rafId = 0;
    };

    const handleMouseMove = (event: MouseEvent) => {
      const s = stateRef.current;
      const prevTargetX = s.targetX;

      s.targetX = event.clientX;
      s.targetY = event.clientY;

      if (!s.initialized) {
        s.initialized = true;
        s.mouseX = event.clientX;
        s.mouseY = event.clientY;
        s.catX = Math.max(24, event.clientX - 96);
        s.catY = event.clientY;
        setIsVisible(true);
      }

      if (Math.abs(event.clientX - prevTargetX) > 1.5) {
        const nextMouseLeft = event.clientX < prevTargetX;
        if (nextMouseLeft !== s.mouseFacingLeft) {
          s.mouseFacingLeft = nextMouseLeft;
          setMouseFacingLeft(nextMouseLeft);
        }
      }

      startLoop();
    };

    const hideChase = () => {
      const s = stateRef.current;
      s.initialized = false;
      s.chasing = false;
      setIsChasing(false);
      setIsVisible(false);
      stopLoop();
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        hideChase();
      }
    };

    const tick = () => {
      rafId = 0;
      const s = stateRef.current;
      if (!s.initialized) return;

      // Tiny mouse stays snugly near the cursor tip
      s.mouseX += (s.targetX - s.mouseX) * 0.42;
      s.mouseY += (s.targetY - s.mouseY) * 0.42;

      // Cat chases the mouse smoothly with hysteresis so it doesn't jitter at threshold
      const dx = s.mouseX - s.catX;
      const dy = s.mouseY - s.catY;
      const distance = Math.hypot(dx, dy);

      const shouldChase = s.chasing ? distance > 34 : distance > 42;

      if (shouldChase) {
        const speed = Math.min(0.085, 0.045 + distance * 0.00012);
        s.catX += dx * speed;
        s.catY += dy * speed;

        if (Math.abs(dx) > 2) {
          const nextLeft = dx < 0;
          if (nextLeft !== s.facingLeft) {
            s.facingLeft = nextLeft;
            setFacingLeft(nextLeft);
          }
        }
        if (!s.chasing) {
          s.chasing = true;
          setIsChasing(true);
        }
      } else if (s.chasing) {
        s.chasing = false;
        setIsChasing(false);
      }

      if (mouseRef.current) {
        mouseRef.current.style.transform = `translate3d(${s.mouseX + 12}px, ${s.mouseY + 10}px, 0)`;
      }
      if (catRef.current) {
        const hop = s.chasing ? Math.abs(Math.sin(performance.now() * 0.014)) * -6 : 0;
        catRef.current.style.transform = `translate3d(${s.catX - 28}px, ${s.catY - 26 + hop}px, 0)`;
      }

      const mouseSettled =
        Math.abs(s.targetX - s.mouseX) < 0.2 && Math.abs(s.targetY - s.mouseY) < 0.2;
      if (s.chasing || !mouseSettled) {
        startLoop();
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', hideChase);
    window.addEventListener('blur', hideChase);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', hideChase);
      window.removeEventListener('blur', hideChase);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      stopLoop();
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-40 pointer-events-none overflow-hidden select-none"
    >
      {/* Cute little coquette mouse near the cursor */}
      <div
        ref={mouseRef}
        className="absolute top-0 left-0 will-change-transform"
      >
        <svg
          viewBox="0 0 38 26"
          className={`w-8 h-6 drop-shadow-xs transition-transform duration-150 ${
            mouseFacingLeft ? '-scale-x-100' : ''
          }`}
          fill="none"
        >
          {/* Curved pink tail */}
          <path
            d="M4 17C1 14 2 10 6 11"
            stroke="#DF8CA4"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          {/* Plump cream mouse body */}
          <ellipse
            cx="19"
            cy="16"
            rx="11"
            ry="7.5"
            fill="#FFFDFD"
            stroke="#C9748D"
            strokeWidth="1.6"
          />
          {/* Round blush ear */}
          <circle
            cx="23"
            cy="8.5"
            r="4.2"
            fill="#FFFDFD"
            stroke="#C9748D"
            strokeWidth="1.5"
          />
          <circle cx="23" cy="8.8" r="2.2" fill="#F4B6C7" />
          {/* Eye & pink nose */}
          <circle cx="26.5" cy="14.5" r="1.2" fill="#4B2632" />
          <circle cx="30.2" cy="16" r="1.3" fill="#E36D8E" />
          {/* Cheek blush */}
          <ellipse cx="24.5" cy="17" rx="1.6" ry="0.9" fill="#F4B6C7" opacity="0.85" />
        </svg>
      </div>

      {/* Fluffy coquette kitty chasing the mouse */}
      <div
        ref={catRef}
        className="absolute top-0 left-0 will-change-transform"
      >
        <div
          className={`relative transition-transform duration-150 ${
            facingLeft ? '-scale-x-100' : ''
          }`}
        >
          {/* Tiny heart when kitty catches up to the mouse */}
          {!isChasing && (
            <svg
              viewBox="0 0 16 16"
              className="w-3.5 h-3.5 text-[#D85A7F] absolute -top-3.5 right-2 animate-bounce"
              fill="currentColor"
            >
              <path d="M8 14.2s-5.6-3.5-6.9-7.1C.3 4.8 1.9 2.5 4.3 2.5c1.5 0 2.8.8 3.7 2 .9-1.2 2.2-2 3.7-2 2.4 0 4 2.3 3.2 4.6-1.3 3.6-6.9 7.1-6.9 7.1z" />
            </svg>
          )}

          <svg
            viewBox="0 0 68 54"
            className="w-14 h-11 drop-shadow-sm"
            fill="none"
          >
            {/* Fluffy curved tail */}
            <path
              d="M14 34C6 31 5 20 11 17C14 15.5 16 19 14 23"
              stroke="#B85C77"
              strokeWidth="4.2"
              strokeLinecap="round"
            />
            <path
              d="M14 34C6 31 5 20 11 17C14 15.5 16 19 14 23"
              stroke="#FFFDFD"
              strokeWidth="2.4"
              strokeLinecap="round"
            />

            {/* Kitty legs (extended when chasing, tucked when sitting) */}
            {isChasing ? (
              <>
                <path
                  d="M21 40L15 47"
                  stroke="#B85C77"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                />
                <path
                  d="M21 40L15 47"
                  stroke="#FFFDFD"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <path
                  d="M42 40L49 46"
                  stroke="#B85C77"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                />
                <path
                  d="M42 40L49 46"
                  stroke="#FFFDFD"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </>
            ) : (
              <>
                <ellipse
                  cx="23"
                  cy="44"
                  rx="4"
                  ry="2.5"
                  fill="#FFFDFD"
                  stroke="#B85C77"
                  strokeWidth="1.4"
                />
                <ellipse
                  cx="39"
                  cy="44"
                  rx="4"
                  ry="2.5"
                  fill="#FFFDFD"
                  stroke="#B85C77"
                  strokeWidth="1.4"
                />
              </>
            )}

            {/* Plump kitty body */}
            <ellipse
              cx="30"
              cy="34"
              rx="14"
              ry="10"
              fill="#FFFDFD"
              stroke="#B85C77"
              strokeWidth="1.8"
            />

            {/* Kitty head */}
            <circle
              cx="42"
              cy="22"
              r="11.5"
              fill="#FFFDFD"
              stroke="#B85C77"
              strokeWidth="1.8"
            />

            {/* Ears */}
            <path
              d="M33 14L34 5L40.5 11"
              fill="#FFFDFD"
              stroke="#B85C77"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
            <path d="M34.8 12.2L35.2 7.5L39 10.8Z" fill="#F4B6C7" />

            <path
              d="M44 11L50 5L51.5 14"
              fill="#FFFDFD"
              stroke="#B85C77"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
            <path d="M45.5 10.8L49.2 7.5L49.8 12.2Z" fill="#F4B6C7" />

            {/* Coquette pink satin bow behind ear */}
            <path
              d="M36.5 10.5C33.5 7.5 30 9.5 32.5 12.5C34 13.5 35.8 12 36.5 10.5Z"
              fill="#E57D9B"
              stroke="#B84868"
              strokeWidth="1"
            />
            <path
              d="M36.5 10.5C39.5 7.5 43 9.5 40.5 12.5C39 13.5 37.2 12 36.5 10.5Z"
              fill="#E57D9B"
              stroke="#B84868"
              strokeWidth="1"
            />
            <circle cx="36.5" cy="11" r="1.6" fill="#C45473" />

            {/* Cute face: eyes, nose, whiskers, blush */}
            <circle cx="40.5" cy="21" r="1.4" fill="#4B2632" />
            <circle cx="47.5" cy="21" r="1.4" fill="#4B2632" />
            <ellipse cx="38" cy="23.8" rx="2" ry="1.1" fill="#F4B6C7" opacity="0.85" />
            <ellipse cx="50" cy="23.8" rx="2" ry="1.1" fill="#F4B6C7" opacity="0.85" />
            <path
              d="M43.2 22.8L44.8 22.8L44 23.8Z"
              fill="#E36D8E"
            />
            <path
              d="M42.2 24.7C43 25.6 43.7 25.3 44 24.4C44.3 25.3 45 25.6 45.8 24.7"
              stroke="#75394A"
              strokeWidth="1.1"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
