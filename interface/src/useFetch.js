import { useEffect, useState } from "react";

const useFetch = (link) => {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
    
        fetch(link)
            .then(res => res.json())
            .then(d => {
                setData(d);
                setLoading(false);
            })
    
    }, []);
    
    return {data, loading};
};


export default useFetch;