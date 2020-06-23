const { func } = require("joi");

// getCustomer(1, (customer) => {
//     console.log('Customer: ', customer);
//     if (customer.isGold) {
//         getTopMovies((movies) => {
//             console.log('Top movies: ', movies);
//             sendEmail(customer.email, movies, () => {
//                 console.log('Email sent...')
//             });
//         });
//     }
// });
async function notifyCustomer(id) {
    try {
        const customer = await getCustomer(id);
        console.log('Customer: ', customer);
        if (customer.isGold) {
            const movies = await getTopMovies();
            console.log('Top movies: ', movies);
            const sendMail = await sendEmail(customer.email, movies)
            console.log('Email sent...')
        }
    } catch (err) {
        console.log(err);
    }
}

notifyCustomer(1);


function getCustomer(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                id: 1,
                name: 'Mosh Hamedani',
                isGold: true,
                email: 'email'
            });
        }, 1000);
    })
}

function getTopMovies() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(['movie1', 'movie2']);
        }, 1000);
    })
}

function sendEmail(email, movies) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(true);
        }, 1000);
    })
}