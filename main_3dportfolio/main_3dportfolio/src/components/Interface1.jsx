import { ValidationError, useForm } from "@formspree/react";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { currentProjectAtom, projects } from "./Projects";

const Section = (props) => {
  const { children, mobileTop } = props;

  return (
    <motion.section
      className={`
  h-screen w-screen p-8 max-w-screen-2xl mx-auto
  flex flex-col items-start
  ${mobileTop ? "justify-start md:justify-center" : "justify-center"}
  `}
      initial={{
        opacity: 0,
        y: 50,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 1,
          delay: 0.6,
        },
      }}
    >
      {children}
    </motion.section>
  );
};

export const Interface1 = (props) => {
  const { setSection } = props;
  return (
    <div className="flex flex-col items-center w-screen">
      <TalkSection setSection={setSection}/>
    </div>
  );
};



const TalkSection = (props) => {
  const { setSection } = props;
  return (
    <Section>
      <h1 className="text-gray-900 text-4xl font-extrabold leading-snug">
        " The best way to 
        <br />
        predict your future 
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;is to create it." 
        <br />
      </h1>
      <motion.p
        className="text-lg text-gray-500 mt-4"
        initial={{
          opacity: 0,
          y: 25,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 1,
          delay: 1.5,
        }}
      >
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-Abraham Lincoln
      </motion.p>
      
    </Section>
  );
}
