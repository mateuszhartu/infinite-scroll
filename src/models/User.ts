
type Gender = 'female' | 'male';


// partly based on data returned by randomuser.me
export interface User {
    gender: Gender;
    name: {
        title: string;
        first: string;
        last: string;
    };
    location: {
        street: {
            name: string;
            number: number
        },
        city: string;
        country: string

    };
    email: string;
}

export interface RandomUserReturnType {
    info: {
        seed: string;
        results: number;
        page: number;
        version: string;
    }
    results: User[];
}

export function isRandomUser(object: any): object is RandomUserReturnType {
    return 'info' in object;
}