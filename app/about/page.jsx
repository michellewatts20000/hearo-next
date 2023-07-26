"use client";

const About = () => {
    return (
        <>
            <div className="text-left h-50">
                <h1 className="font-display font-medium tracking-tight text-slate-900 sm:text-5xl mb-10">
                    About <span className="relative whitespace-nowrap text-primary-500">Hearo</span>
                </h1>
                <p className="mb-5">
                    Ever wanted to go out with friends and not have to shout at them to be heard?
                </p>
                <p className="mb-5">
                    A long, long time ago... before COVID, we could go out, and sometimes
                    when we went out, the places we went to eat or drink were too loud.
                </p>
                <p className="mb-5">
                    This app will allow you to search for venues that are quiet or not too
                    loud based on what you feel like. It will also allow you to rate and
                    review the venues you go to, for how loud they are. It’s like
                    TripAdvisor or Google Review... but for sound.
                </p>
            </div>
        </>
    );
};

export default About;