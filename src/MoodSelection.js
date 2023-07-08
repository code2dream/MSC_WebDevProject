import React from "react";
import { useState } from 'react';

const MoodSelection = ({onMoodSelect}) => {
  const [selectedMood, setSelectedMood] = useState('');

  const moods = ['Dance','Happy', 'Sad', 'Energetic', 'Relaxed', 'Work-Out'];

  const handleMoodSelection = (mood) => {
    setSelectedMood(mood);
    onMoodSelect(mood);
  };

  return (
    <div>
      <h2>Select your mood:</h2>
      <ul>
        {moods.map((mood) => (
          <li
            key={mood}
            onClick={() => handleMoodSelection(mood)}
            style={{ fontWeight: selectedMood === mood ? 'bold' : 'normal' }}
          >
            {mood}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MoodSelection;