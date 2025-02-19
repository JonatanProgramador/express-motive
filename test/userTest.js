import cookie from 'cookie'


export class UserTest {
    static async run() {
        console.log("Iniciando el test de usuarios...")
        await this.register()
        const token =await this.login()
        await this.protected(token)
    }

    static async register() {
        const result = await fetch('http://localhost:3000/register/', {
            method: 'post',
            body: JSON.stringify({ name: "Battusay", password: "1234" }),
            headers: { "Content-Type": "application/json" }
        })
        console.log('Register:', result.status === 201 ? 'OK' : 'FAILED')
        return await result.json()
    }

    static async login() {
        const result = await fetch('http://localhost:3000/login/', {
            method: 'post',
            headers: { "Content-Type": "application/json",
                'Authorization': `Basic ${btoa("Battusay:cosa")}`
             }
        })
        console.log('Login:', result.status === 200 ? 'OK' : 'FAILED')
        const token = result.headers.get('set-cookie');
        return cookie.parse(token).token
    }

    static async protected(token) {
        const result = await fetch('http://localhost:3000/protected/', {
            method: 'post',
            headers: { "Content-Type": "application/json",
                'Cookie': `token=${token.token}`
             }
        })
        console.log('Protected:', result.status === 200 ? 'OK' : 'FAILED')
    }
}