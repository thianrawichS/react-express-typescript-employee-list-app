import { addEmployee } from "../types/addEmployee";

class HttpService {
    public static getHeader () {
        return {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        };
    }

    public static async getEmployeeData (url:string, name?:string) {
        let getEmployeeUrl = url + '/employee';
        if (name) {
            getEmployeeUrl += `?name=${name}`;
        }
        const res:Response = await fetch(getEmployeeUrl, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                ...HttpService.getHeader(),
            }
        })
        const data = await res.json();
        return data
    }

    public static async postEmployeeData (url:string, insertData:addEmployee) {
        const res:Response = await fetch(url + '/employee', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                ...HttpService.getHeader(),
            },
            body: JSON.stringify(insertData)
        })
        const data = await res.json();
        return data
    }

    public static async putEmployeeData (url:string, updateData:addEmployee, id:number) {
        const res:Response = await fetch(url + `/employee/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                ...HttpService.getHeader(),
            },
            body: JSON.stringify(updateData)
        })
        const data = await res.json();
        return data
    }

    public static async deleteEmployeeData (url:string, id:string | number) {
        const res:Response = await fetch(url + `/employee/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                ...HttpService.getHeader(),
            }
        })
        const data = await res.json();
        return data
    }

    public static async authenUserToken (url:string) {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                ...HttpService.getHeader(),
            }
        })
        const data = await res.json();
        return data
    }

    public static async login (url:string, loginData:userLogin) {
        const res = await fetch(url + '/user/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData)
        })
        const data = res.json();
        return data
    }

    public static async register (url:string, registerData:{}) {
        const res = await fetch(url + '/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registerData)
        })
        const data = res.json();
        return data
    }
}

export default HttpService;