import React from 'react';
import { useState } from 'react';
import { gql, useQuery } from '@apollo/client';

const GET_REVIEWS = gql`
    query Query($instructorInput: InstructorInput!, $courseFilter: CourseFilter) {
        getCourseComments(instructorInput: $instructorInput, courseFilter: $courseFilter) {
            termTitle
            subject
            number
            comments
    }
}
`;

function InstructorInputForm({ setInstructorName }) {
    const [instructorInput, setInstructorInput] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      // Split the input into first and last name
      const [firstName, lastName] = instructorInput.split(' ');
  
      // Set the instructor name in the parent component
      setInstructorName({ firstName, lastName });
    };

    const handleChange = (e) => {
        setInstructorInput(e.target.value);
    }
  
    return (
      <form onSubmit={handleSubmit}>
        <label>
          Instructor Name:
          <input
            type="text"
            value={instructorInput}
            placeholder="Enter instructor name"
            onChange={handleChange}
          />
        </label>
        {/* No submit button, form will submit on pressing 'Enter' in the input field */}
      </form>
    );
  }

function InstructorReviews({ firstName, lastName }) {
    // firstName = "Felix";
    // lastName = "Muzny";

    const { loading, error, data } = useQuery(GET_REVIEWS, {
        variables: {
            instructorInput: { firstName, lastName }
        }
    });

    let content = null;
    if (loading) return null;
    if (error) {
        console.error('Error fetching reviews:', error);
    }

    const reviews = data?.getCourseComments || [];

    content = reviews.length === 0 ? null : (
        <ul>
            {reviews.map(({termTitle, subject, number, comments}, reviewIndex) => (
                <li key={reviewIndex}>
                    <h4>{termTitle} - {subject} {number}</h4>
                    <h4>comments:</h4>
                    <ul>
                        {comments.map((comment, commentIndex) => (
                            <li key={commentIndex}>{comment}</li>
                        ))}
                    </ul>
                </li>
            ))}
        </ul>
    )
    
    return (
        <>
        <h2>Reviews</h2>
        <div>{content}</div>
        </>
    )
}

  
export default function InstructorReviewsComponent() {
    const [instructorName, setInstructorName] = useState({ firstName: '', lastName: '' });
    return (
        <>
            <InstructorInputForm setInstructorName={setInstructorName} />
            <InstructorReviews firstName={instructorName.firstName} lastName={instructorName.lastName} />
        </>
    );
}