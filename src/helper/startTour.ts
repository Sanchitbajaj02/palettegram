import Shepherd from "shepherd.js";
import "../../node_modules/shepherd.js/dist/cjs/css/shepherd.css";

import "@/styles/shepherdStyles.css";

export const startTour = () => {
  const tour = new Shepherd.Tour({
    defaultStepOptions: {
      cancelIcon: {
        enabled: true,
      },
      classes: "shepherd-theme-arrows custom-tour",
      scrollTo: { behavior: "smooth", block: "center" },
    },
    useModalOverlay: true,
  });

  tour.addStep({
    id: "step1",
    text: "Welcome to Palettegram! Let's start with an overview of what this platform offers.",
    attachTo: {
      element: ".hero",
      on: "bottom",
    },
    buttons: [
      {
        text: "Next",
        action: tour.next,
        classes: "shepherd-button",
      },
    ],
  });

  tour.addStep({
    id: "step2",
    text: "Click to change the theme either dark mode or light mode.",
    attachTo: {
      element: "#theme",
      on: "bottom",
    },
    buttons: [
      {
        text: "Next",
        action: tour.next,
        classes: "shepherd-button",
      },
    ],
  });

  tour.addStep({
    id: "step3",
    text: "Click this button to navigate to the codebase.",
    attachTo: {
      element: ".git",
      on: "bottom",
    },
    buttons: [
      {
        text: "Next",
        action: tour.next,
        classes: "shepherd-button",
      },
    ],
  });

  tour.addStep({
    id: "step4",
    text: "Click here to sign in.",
    attachTo: {
      element: ".register",
      on: "top",
    },
    buttons: [
      {
        text: "Next",
        action: tour.next,
        classes: "shepherd-button",
      },
    ],
  });

  tour.addStep({
    id: "step5",
    text: "Already have an account? Login here.",
    attachTo: {
      element: ".loginin",
      on: "top",
    },
    buttons: [
      {
        text: "Next",
        action: tour.next,
        classes: "shepherd-button",
      },
    ],
  });

  tour.addStep({
    id: "step6",
    text: 'Click "Start your journey" to begin exploring all the exciting features we offer. Let\'s get started on creating something amazing together!',
    attachTo: {
      element: "#start-your-journey",
      on: "bottom-start",
    },
    buttons: [
      {
        text: "Next",
        action: tour.next,
        classes: "shepherd-button",
      },
    ],
  });
  tour.addStep({
    id: "step7",
    text: "This section explains what Palettegram is about.",
    attachTo: {
      element: "section:nth-of-type(2)",
      on: "bottom",
    },
    buttons: [
      {
        text: "Next",
        action: tour.next,
        classes: "shepherd-button",
      },
    ],
  });
  tour.addStep({
    id: "step8",
    text: "This section explains who Palettegram is for. ",
    attachTo: {
      element: "section:nth-of-type(3)",
      on: "top",
    },
    buttons: [
      {
        text: "Next",
        action: tour.next,
        classes: "shepherd-button",
      },
    ],
  });
  tour.addStep({
    id: "step9",
    text: "This section explains what you can do on Palettegram.",
    attachTo: {
      element: "section:nth-of-type(4)",
      on: "top",
    },
    buttons: [
      {
        text: "Finish",
        action: tour.complete,
        classes: "shepherd-button",
      },
    ],
  });

  return tour;
};
