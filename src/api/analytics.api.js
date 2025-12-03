const APIURL = "https://tt-jsonserver-01.alt-tools.tech";

export const getAnalytics = async () => {
    try{
        const res = await fetch(APIURL+`/analytics`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        return await res.json();
    }catch(error){
        console.log(error);
    }
};