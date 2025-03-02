// src/Question.jsx
import React from 'react';

// Reusable Question Component
const Question = ({ questionData, onChange, level = 0 }) => {
const { id, question, options, response, targets } = questionData;

return (
<div style={{ marginLeft: `${level * 20}px`, marginBottom: '15px' }}>
    <label style={{ display: 'block', marginBottom: '5px' }}>{question}</label>
    <select
        value={response || ''}
        onChange={(e) => onChange(id, e.target.value)}
        style={{ padding: '5px', width: '200px' }}
    >
    
    <option value="" disabled>Select an option</option>
    {options.map((option) => (
        <option key={option} value={option}>
        {option.charAt(0).toUpperCase() + option.slice(1)}
        </option>
    ))}
    </select>

    {/* Render sub-targets if they exist and main question response is "yes" */}
    {targets && (response === "yes" || response === "unsure") && (
    <div style={{ marginTop: '10px' }}>
        {targets.map((target) => (
        <Question
            key={target.id}
            questionData={target}
            onChange={onChange}
            level={level + 1}
        />
        ))}
    </div>
    )}
    
</div>
);
};

export default Question;