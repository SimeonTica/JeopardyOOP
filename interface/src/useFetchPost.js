import { useEffect, useState } from "react";

const useFetchPost = (initialLink, data) => {

    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(initialLink, {
            method: "POST",
            mode: "cors",
            headers: {
                'Access-Control-Allow-Origin':'*',
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(d => {
                setMessage(d);
                setLoading(false);
            })
            .catch(e =>{
                setError(e);
            });
    
    }, [initialLink, data]);
    
    return {message, loading, error};
};


export default useFetchPost;