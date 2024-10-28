import { faker } from '@faker-js/faker';

export function fakerLib() {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    const length = 8;

    for (let i = 0; i < length; i++) {
        const randomIndex = faker.datatype.number({
            min: 0,
            max: characters.length - 1,
        });

        password += characters[randomIndex];
    }

    console.log(password);
    return password;
}
