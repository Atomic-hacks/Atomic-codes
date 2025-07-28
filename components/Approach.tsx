/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";

interface CardProps {
  title: string;
  description: string;
  icon: ReactNode;
  children: ReactNode;
}

const Approach: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto py-20 px-4 md:px-8">
      <h1 className="heading tex-3xl md:text-6xl text-white text-left">
        My <span className="text-purple">Approach</span>
      </h1>
      <div className="my-20 flex flex-col lg:flex-row items-center justify-center gap-6">
        <Card
          title="Planning and Strategy"
          icon={<AceternityIcon order="Phase 1" />}
          description="We kick things off with a fun, no-stress brainstorming session. Tell me your ideas, goals, and must-haves—I’ll map out the best way to bring it all to life. We pick the right tools, set clear milestones, and make sure we’re on the same page from the start!"
        >
          <CanvasRevealEffect
            animationSpeed={5.1}
            containerClassName="bg-emerald-900"
          />
        </Card>
        <Card
          title="Designing and Prototype"
          icon={<AceternityIcon order="Phase 2" />}
          description="Time to turn ideas into reality! I develop, integrate, and test every detail to make sure everything runs like a dream. You get sneak peeks along the way, and once it's polished and ready, we launch something truly spectacular!"
        >
          <CanvasRevealEffect
            animationSpeed={3}
            containerClassName="bg-black"
            colors={[
              [236, 72, 153],
              [232, 121, 249],
            ]}
            dotSize={2}
          />
        </Card>
        <Card
          title="Development and Testing"
          icon={<AceternityIcon order="Phase 3" />}
          description="Using agile sprints, I build core features, integrate backend systems, and optimize cloud deployment. Rigorous testing guarantees security, performance, and reliability."
        >
          <CanvasRevealEffect
            animationSpeed={3}
            containerClassName="bg-sky-600"
            colors={[[125, 211, 252]]}
          />
        </Card>
      </div>
    </section>
  );
};

const Card: React.FC<CardProps> = ({ title, description, icon, children }) => {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="border bg-black/10 backdrop-blur-xl border-black/[0.2] dark:border-white/[0.2] group/canvas-card flex flex-col items-center justify-center max-w-sm w-full mx-auto p-6 h-[30rem] lg:h-[35rem] rounded-3xl relative overflow-hidden transition duration-300"
    >
      {[
        "top-3 left-3",
        "bottom-3 left-3",
        "top-3 right-3",
        "bottom-3 right-3",
      ].map((pos, index) => (
        <Icon
          key={index}
          className={`absolute h-6 w-6 -${pos} dark:text-white text-black`}
        />
      ))}

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-full w-full absolute inset-0"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-20 text-center">
        <div className="group-hover/canvas-card:-translate-y-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group-hover/canvas-card:opacity-0 transition duration-200 w-full flex items-center justify-center">
          {icon}
        </div>
        <h2 className="dark:text-white text-3xl font-bold text-black mt-4 opacity-0 group-hover/canvas-card:opacity-100 relative z-10 transition duration-200 group-hover/canvas-card:text-white group-hover/canvas-card:-translate-y-2">
          {title}
        </h2>
        <p className="dark:text-white text-sm text-gray-300 mt-4 opacity-0 group-hover/canvas-card:opacity-100 relative z-10 transition duration-200 group-hover/canvas-card:-translate-y-2">
          {description}
        </p>
      </div>
    </div>
  );
};

interface AceternityIconProps {
  order: string;
}

const AceternityIcon: React.FC<AceternityIconProps> = ({ order }) => {
  return (
    <button className="relative inline-flex h-12 rounded-full px-6 py-2 border border-white/10 bg-white/5 text-white text-2xl font-semibold backdrop-blur-md shadow-md transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-transparent">
      <span className="inline-flex w-full items-center justify-center">
        {order}
      </span>
    </button>
  );
};

type IconProps = React.SVGProps<SVGSVGElement>;

const Icon: React.FC<IconProps> = ({ className, ...rest }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
      {...rest}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  );
};

export default Approach;
