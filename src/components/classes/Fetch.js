export default class Fetch {

    static post(url, object) {
        return fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(object)
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error(response.status);
                }
            })
    }

    static get(url) {
        return fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error(response.status);
                }
            })
    }

    static put(url, object) {
        return fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(object)

            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error(response.status);
                }
            })
    }

    static delete(url) {
        return fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        })
    }


}