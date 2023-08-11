"use client";

import React from "react";
import {
  GiBookCover,
  GiCarSeat,
  GiElectricalSocket,
  GiFireworkRocket,
  GiHairStrands,
  GiHelicopter,
  GiJetFighter,
  GiPerson,
  GiPoliceCar,
  GiRaining,
  GiTalk,
  GiThreeLeaves,
  GiTruck,
  GiTrumpet,
} from "react-icons/gi";
import DbLevel from "@/components/DbLevel";

const About = () => {
  return (
    <div>
     <h1 className="font-display font-medium tracking-tight text-slate-900 sm:text-5xl mb-10">
        About <span className="relative whitespace-nowrap text-primary-500">Hero</span>
      </h1>

      <p className="text-base mb-5">
        Ever wanted to go out with friends and not have to shout at them to be heard?
      </p>

      <p className="mb-5">
        A long, long time ago... before COVID, we could go out, and sometimes
        when we went out, the places we went to eat or drink were too loud.
      </p>

      <p className="mb-10">
        This app will allow you to search for venues that are quiet or not too
        loud based on what you feel like. It will also allow you to rate and
        review the venues you go to, for how loud they are. It’s like
        TripAdvisor or Google Review... but for sound.
      </p>

  
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-7 gap-5">
        <DbLevel title="Breathing" icon={<GiPerson />} db="10db" />
        <DbLevel title="Leaves" icon={<GiThreeLeaves />} db="20db" />
        <DbLevel title="Whisper" icon={<GiBookCover />} db="30db" />
        <DbLevel title="Refrigerator" icon={<GiElectricalSocket />} db="40db" />
        <DbLevel title="Rainfall" icon={<GiRaining />} db="50db" />
        <DbLevel title="Conversation" icon={<GiTalk />} db="60db" />
        <DbLevel title="Traffic" icon={<GiCarSeat />} db="70db" />
        <DbLevel title="Truck" icon={<GiTruck />} db="80db" />
        <DbLevel title="Hair Dryer" icon={<GiHairStrands />} db="90db" />
        <DbLevel title="Helicopter" icon={<GiHelicopter />} db="100db" />
        <DbLevel title="Trumpet" icon={<GiTrumpet />} db="110db" />
        <DbLevel title="Police Siren" icon={<GiPoliceCar />} db="120db" />
        <DbLevel title="Jet Engine" icon={<GiJetFighter />} db="130db" />
        <DbLevel title="Fireworks" icon={<GiFireworkRocket />} db="140db" />
      </div>
    </div>
  );
};

export default About;
