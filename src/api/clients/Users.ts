
export function generateUser() {
    const random = Math.floor(Math.random() * 10000);

    return {
        name: `user${random}`,
        job: `qa${random}`
    };
}

export const registerUser = {
    email: 'rachel.howell@reqres.in',
    password: 'qwerty'
};

export const registerUserNoPass = {
    email: 'rachel.howell@reqres.in'
};

export const nUsers = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 }
];