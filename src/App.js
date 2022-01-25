import { useState } from "react";
import FeedbackOptions from "./components/FeedbackOptions/FeedbackOptions";
import Statistics from "./components/Statistics/Statistics";
import Section from "./components/Section/Section";
import Notification from "./components/Notification/Notification";
import { SectionButtonStyled, StatisticTitle } from "./App.styled";

export default function Feedback() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleIncrementFeedback = (position) => {
    switch (position) {
      case "good":
        setGood((prevState) => prevState + 1);
        break;

      case "neutral":
        setNeutral((prevState) => prevState + 1);
        break;

      case "bad":
        setBad((prevState) => prevState + 1);
        break;
      default:
        console.log("Invalid data type");
    }
  };

  const countTotalFeedback = () => good + neutral + bad;

  const countPositiveFeedbackPercentage = () => {
    return good
      ? `${Math.round((good * 100) / countTotalFeedback()) + "%"}`
      : `0`;
  };

  return (
    <Section title="Please leave feedback">
      <SectionButtonStyled>
        <FeedbackOptions
          options={["good", "neutral", "bad"]}
          onLeaveFeedback={handleIncrementFeedback}
        />
      </SectionButtonStyled>

      <StatisticTitle>Statistics</StatisticTitle>

      {good === 0 && neutral === 0 && bad === 0 ? (
        <Notification message="There is no feedback" />
      ) : (
        <Statistics
          good={good}
          neutral={neutral}
          bad={bad}
          total={countTotalFeedback()}
          positivePercentage={countPositiveFeedbackPercentage()}
        />
      )}
    </Section>
  );
}
