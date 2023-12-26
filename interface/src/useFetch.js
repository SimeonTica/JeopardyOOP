import { useEffect, useState } from "react";

const useFetch = (link) => {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
    
        fetch(link)
            .then(res => res.json())
            .then(d => {
                setData(d);
                setLoading(false);
            })
            .catch(e => {
                setError(e);
            });
    
    }, [link]);
    
    return {data, loading, error};
};


export default useFetch;