const APIURL = "https://tt-jsonserver-01.alt-tools.tech";

export const getTools = async (filters) => {
    try{
        const query = new URLSearchParams(filters).toString();

        const res = await fetch(APIURL+`/tools?${query}`, {
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

export const getToolById = async (id) => {
    const { data } = await fetch(APIURL+`/tools/${id}`);
    return data;
};

export const getRecentTools = async () => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const isoDate = thirtyDaysAgo.toISOString();

    const res = await fetch(
        `${APIURL}/tools?_sort=updated_at&_order=desc&updated_at_gte=${isoDate}`
    );

    return await res.json();
};