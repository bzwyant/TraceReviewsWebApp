import React from 'react';
import { useState } from 'react';
import { gql, useQuery } from '@apollo/client';

function LoadCommentsButton() {
    const [reviews, setReviews] = useState([])

    function queryReviews({instructor}) {

    }

    return(
        <button onClick={queryReviews}>
            Enter
        </button>
    );
}

const GET_REVIEWS = gql`
    query Query($instructorInput: InstructorInput!r) {
        getCourseComments(instructorInput: $instructorInput) {
            termTitle
            subject
            number
            comments
        }
    }
`

function InstructorReviews() {
    const [inputText, setInputText] = useState('');

    const { loading, error, data } = useQuery(GET_REVIEWS);

    if (loading) return <p>'Loading...'</p>;
    if (error) return <p>Error: {error.message}</p>;


    return (
        <form onSubmit={setInputText}></form>
    )
}

export default function InstructorReviewsComponent() {
    return(
        <>
        <h4>Reviews</h4>
        <LoadCommentsButton />
        </>
    );
}
